import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const catalog = JSON.parse(
  await readFile(new URL('../public.json', import.meta.url), 'utf8'),
);

test('publishes Kaushik Sundar product-manager identity and verified contact details', () => {
  for (const required of [
    'Kaushik Sundar',
    'Product Manager',
    'Bengaluru, India',
    'sundar.kaushik23@gmail.com',
    'https://www.linkedin.com/in/kaushik-sundar23',
    'assets/images/kaushik-sundar-profile.webp',
  ]) {
    assert.ok(html.includes(required), `page must include: ${required}`);
  }
});

test('keeps private and inherited identity details out of the public page', () => {
  for (const forbidden of [
    '+91-9481757744',
    '9481757744',
    'debi-prasad-profile.webp',
    'Staff Software Engineer',
    'github.com/kaushik',
    'dpp2017@gmail.com',
    'Debi_Prasad.pdf',
  ]) {
    assert.equal(html.includes(forbidden), false, `page must omit: ${forbidden}`);
  }
});

test('publishes the three resume-backed product case studies', () => {
  const active = catalog.projects.filter(({ status }) => status === 'active');
  assert.deepEqual(active.map(({ title }) => title), [
    'AI-Powered Scientific Research Assistant',
    'Software Download & Licensing Platform',
    'Analytical Data Store & Semantic Knowledge Graph',
  ]);
  for (const record of active) {
    assert.ok(record.problem);
    assert.ok(record.approach);
    assert.ok(record.impact);
    assert.equal('sourceUrl' in record, false);
    assert.equal('liveUrl' in record, false);
  }
});

test('ships an optimized Kaushik Sundar portrait', async () => {
  const portrait = new URL('../assets/images/kaushik-sundar-profile.webp', import.meta.url);
  const details = await stat(portrait);
  const bytes = await readFile(portrait);

  assert.ok(details.size > 20_000, 'portrait must be a nontrivial image');
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
});
