import assert from 'node:assert/strict';
import test from 'node:test';

import { prepareProjects, renderProject, renderProjects } from '../assets/js/render-projects.js';

const project = {
  title: 'Product Case Study',
  problem: 'Customers lose time to a fragmented process.',
  approach: 'Aligned teams around one governed platform.',
  impact: 'Reduced effort and improved adoption.',
  order: 2,
  status: 'active',
};

test('keeps only active case studies and sorts them by numeric order', () => {
  const projects = [
    project,
    { ...project, title: 'First', order: 1 },
    { ...project, title: 'Hidden', order: 0, status: 'draft' },
    { ...project, title: 'Third', order: 3 },
  ];

  assert.deepEqual(prepareProjects(projects).map(({ title }) => title), [
    'First',
    'Product Case Study',
    'Third',
  ]);
  assert.equal(projects[0].title, 'Product Case Study', 'input order must not be mutated');
});

test('renders a problem, approach, and impact case study without external actions', () => {
  const output = renderProject(project);

  assert.match(output, /<article class="project">/);
  assert.match(output, /<h3>Product Case Study<\/h3>/);
  assert.match(output, /<h4>Problem<\/h4><p>Customers lose time/);
  assert.match(output, /<h4>Approach<\/h4><p>Aligned teams/);
  assert.match(output, /<h4>Impact<\/h4><p>Reduced effort/);
  assert.doesNotMatch(output, /<a\b|sourceUrl|liveUrl|View Source|Explore Live/);
});

test('escapes every user-controlled case-study field', () => {
  const output = renderProject({
    ...project,
    title: '<script>alert(1)</script>',
    problem: 'Useful & safe',
    approach: '<img src=x onerror=alert(2)>',
    impact: 'Adoption > effort',
  });

  assert.doesNotMatch(output, /<(?:script|img)\b/i);
  assert.match(output, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(output, /Useful &amp; safe/);
  assert.match(output, /Adoption &gt; effort/);
});

test('renders any number of eligible case studies in configured order', () => {
  const output = renderProjects([
    { ...project, title: 'Second', order: 20 },
    { ...project, title: 'First', order: 10 },
    { ...project, title: 'Third', order: 30 },
  ]);

  assert.equal((output.match(/<article class="project"/g) ?? []).length, 3);
  assert.ok(output.indexOf('>First<') < output.indexOf('>Second<'));
  assert.ok(output.indexOf('>Second<') < output.indexOf('>Third<'));
});
