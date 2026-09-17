import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { loadPlaywright } from './helpers/playwright.mjs';

const baseUrl = 'http://127.0.0.1:4173';
const artifactsDirectory = fileURLToPath(new URL('../artifacts/', import.meta.url));
const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ channel: 'chrome', headless: true });

await mkdir(artifactsDirectory, { recursive: true });
test.after(async () => browser.close());

async function withPage(viewport, assertion) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    await page.locator('.project').first().waitFor({ state: 'visible' });
    await page.waitForFunction(() => {
      const canvas = document.querySelector('#system-map');
      if (!canvas?.getContext('2d') || !canvas.width || !canvas.height) return false;
      const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      let visible = 0;
      for (let index = 3; index < pixels.length; index += 4) {
        if (pixels[index] > 0) visible += 1;
        if (visible > 100) return true;
      }
      return false;
    });
    await assertion(page);
  } finally {
    await page.close();
  }
}

async function assertNoHorizontalOverflow(page) {
  const dimensions = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  assert.ok(
    dimensions.scroll <= dimensions.client + 1,
    `page overflows horizontally: ${dimensions.scroll} > ${dimensions.client}`,
  );
}

async function revealAll(page) {
  await page.locator('[data-reveal]').evaluateAll((elements) => {
    for (const element of elements) element.classList.add('is-visible');
  });
  await page.waitForTimeout(550);
  const hidden = await page.locator('[data-reveal]').evaluateAll((elements) => {
    return elements.filter((element) => getComputedStyle(element).opacity !== '1').length;
  });
  assert.equal(hidden, 0, 'all reveal content must be fully visible before capture');
}

test('desktop renders the complete product-management portfolio', async () => {
  await withPage({ width: 1440, height: 1000 }, async (page) => {
    assert.equal(
      (await page.locator('h1').textContent()).trim(),
      'I turn complex platform opportunities into products people adopt.',
    );
    assert.equal((await page.locator('.hero-name').textContent()).trim(), 'Kaushik Sundar');
    assert.equal(await page.locator('.project').count(), 3);
    assert.equal(await page.locator('.timeline > li').count(), 3);
    assert.equal(await page.locator('.capability-group').count(), 6);
    assert.equal(await page.locator('.credential-grid article').count(), 4);

    const portrait = await page.locator('.hero-profile').evaluate((image) => ({
      complete: image.complete,
      height: image.naturalHeight,
      width: image.naturalWidth,
    }));
    assert.deepEqual(portrait, { complete: true, height: 720, width: 720 });

    const publicLinks = await page.locator('a').evaluateAll((links) => {
      return links.map((link) => link.getAttribute('href') || '');
    });
    assert.equal(publicLinks.some((href) => href.startsWith('tel:')), false);
    assert.equal(publicLinks.some((href) => href.includes('github.com')), false);
    assert.ok(publicLinks.includes('mailto:sundar.kaushik23@gmail.com'));

    await assertNoHorizontalOverflow(page);
    await revealAll(page);
    await page.screenshot({
      path: path.join(artifactsDirectory, 'portfolio-desktop.png'),
      fullPage: true,
    });
  });
});

test('mobile navigation and all portfolio sections remain usable', async () => {
  await withPage({ width: 390, height: 844 }, async (page) => {
    const toggle = page.locator('.nav-toggle');
    assert.equal(await toggle.isVisible(), true);
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    assert.equal(await page.locator('#site-navigation').isVisible(), true);
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');

    assert.equal(await page.locator('.project').count(), 3);
    assert.equal(await page.locator('.project').first().locator('.case-study-details section').count(), 3);
    await assertNoHorizontalOverflow(page);
    await revealAll(page);
    await page.screenshot({
      path: path.join(artifactsDirectory, 'portfolio-mobile.png'),
      fullPage: true,
    });
  });
});
