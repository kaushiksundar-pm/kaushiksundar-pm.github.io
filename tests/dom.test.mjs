import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function normalizedVisibleText(source) {
  return source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&copy;/g, '©')
    .replace(/\s+/g, ' ')
    .trim();
}

function attributeValue(tag, name) {
  return tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
}

function openingTags(source, tag) {
  return [...source.matchAll(new RegExp(`<${tag}\\b[^>]*>`, 'gi'))].map((match) => match[0]);
}

function section(id) {
  const start = html.indexOf(`<section id="${id}"`);
  assert.notEqual(start, -1, `section ${id} must exist`);
  const end = html.indexOf('</section>', start);
  assert.notEqual(end, -1, `section ${id} must close`);
  return html.slice(start, end + '</section>'.length);
}

test('publishes accurate product-manager metadata and structured data', () => {
  assert.match(html, /<title>Kaushik Sundar \| Product Manager<\/title>/);
  assert.match(html, /name="description"[\s\S]*Product Manager with 11 years/);
  assert.match(html, /property="og:title" content="Kaushik Sundar \| Product Manager"/);

  const script = openingTags(html, 'script').find((tag) => {
    return attributeValue(tag, 'type') === 'application/ld+json';
  });
  assert.ok(script, 'Person JSON-LD must exist');
  const start = html.indexOf(script) + script.length;
  const payload = JSON.parse(html.slice(start, html.indexOf('</script>', start)));
  assert.equal(payload.name, 'Kaushik Sundar');
  assert.equal(payload.jobTitle, 'Product Manager');
  assert.equal(payload.email, 'mailto:sundar.kaushik23@gmail.com');
  assert.deepEqual(payload.sameAs, ['https://www.linkedin.com/in/kaushik-sundar23']);
  assert.equal('telephone' in payload, false);
});

test('uses semantic navigation and verified contact links', () => {
  assert.equal(openingTags(html, 'h1').length, 1);
  for (const landmark of ['header', 'nav', 'main', 'footer']) {
    assert.ok(openingTags(html, landmark).length > 0, `${landmark} landmark must exist`);
  }

  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]));
  for (const href of [...html.matchAll(/\bhref="#([^"]+)"/g)].map((match) => match[1])) {
    assert.ok(ids.has(href), `#${href} must point to an existing id`);
  }

  assert.match(html, /href="mailto:sundar\.kaushik23@gmail\.com"/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/kaushik-sundar23"/);
  assert.doesNotMatch(html, /github\.com|tel:/i);
});

test('renders the approved portfolio sections and resume-backed content', () => {
  const visible = normalizedVisibleText(html);
  for (const required of [
    'Kaushik Sundar',
    'Bengaluru, India',
    'Product Impact',
    'Technical Product Manager',
    'Product Owner III',
    'Senior Business Analyst',
    'Product Leadership Capabilities',
    'Product Case Studies',
    'Credentials & Recognition',
    'Certified Scrum Product Owner',
    'English · Hindi · Kannada · Tulu',
  ]) {
    assert.ok(visible.includes(required), `visible page must include: ${required}`);
  }
  assert.equal((html.match(/class="system-row"/g) ?? []).length, 4);
  assert.equal((section('experience').match(/<li data-reveal>/g) ?? []).length, 3);
  assert.equal((section('expertise').match(/class="capability-group"/g) ?? []).length, 6);
});

test('provides an accessible portrait and progressive case-study fallback', () => {
  assert.match(
    html,
    /<img[\s\S]*class="hero-profile"[\s\S]*src="assets\/images\/kaushik-sundar-profile\.webp"[\s\S]*alt="Kaushik Sundar"[\s\S]*width="720"[\s\S]*height="720"/,
  );
  assert.match(html, /<canvas id="system-map" class="system-map" aria-hidden="true"><\/canvas>/);
  assert.match(section('projects'), /<div id="project-list" class="project-list" aria-live="polite">/);
  assert.match(section('projects'), /<noscript>[\s\S]*AI-Powered Scientific Research Assistant/);
});

test('keeps phone and inherited identity details out of public markup', () => {
  for (const forbidden of [
    '9481757744',
    'debi-prasad-profile.webp',
    'Debi_Prasad.pdf',
    'dpp2017@gmail.com',
    'Staff Software Engineer',
    'Applications Engineer',
  ]) {
    assert.equal(html.includes(forbidden), false, `public markup must omit: ${forbidden}`);
  }
});

test('passes the local asset checker', () => {
  const checker = fileURLToPath(new URL('../scripts/check-local-links.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [checker], {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stdout}${result.stderr}`);
});
