# Kaushik Product Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the inherited software-engineer portfolio with an accurate, responsive product-management portfolio for Kaushik Sundar using the approved resume and portrait.

**Architecture:** Keep the existing static HTML, CSS, and vanilla JavaScript structure. Store the three product case studies in `public.json`, render them with the existing progressive-enhancement path, and preserve a complete no-JavaScript fallback in `index.html`.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript ES modules, Node test runner, Playwright, Sharp for one-time image optimization

---

## File Structure

- `index.html`: identity, metadata, navigation, product-management content, static case-study fallback, credentials, and contact actions.
- `assets/css/styles.css`: existing editorial layout plus case-study and credential presentation rules.
- `assets/js/render-projects.js`: safe rendering for problem, approach, and impact fields without external project actions.
- `public.json`: three resume-backed product case studies.
- `assets/images/kaushik-sundar-profile.webp`: optimized supplied portrait.
- `tests/dom.test.mjs`: page content, privacy, metadata, accessibility, and fallback contracts.
- `tests/render-projects.test.mjs`: case-study ordering, escaping, and schema behavior.
- `tests/main-runtime.test.mjs`: runtime data fixture matching the case-study schema.
- `tests/assets.test.mjs`: portrait asset and updated README contract.
- `tests/visual.spec.mjs`: desktop/mobile product portfolio checks.
- `README.md`: case-study schema documentation.

### Task 1: Lock The New Public Identity In Tests

**Files:**
- Modify: `tests/dom.test.mjs`
- Modify: `tests/assets.test.mjs`
- Modify: `tests/visual.spec.mjs`

- [ ] **Step 1: Replace old identity expectations**

Assert the page contains `Kaushik Sundar`, `Product Manager`, the verified email and LinkedIn URL, the new portrait path, the approved impact metrics, three experience roles, three case studies, and credentials.

- [ ] **Step 2: Add privacy and stale-content assertions**

```js
for (const forbidden of [
  '+91-9481757744',
  'debi-prasad-profile.webp',
  'Staff Software Engineer',
  'github.com/kaushik',
]) {
  assert.equal(html.includes(forbidden), false);
}
```

- [ ] **Step 3: Run focused tests and confirm failure**

Run: `node --test tests/dom.test.mjs tests/assets.test.mjs tests/visual.spec.mjs`

Expected: FAIL because the implementation still exposes the old identity and content.

### Task 2: Replace The Portfolio Content And Portrait

**Files:**
- Modify: `index.html`
- Modify: `assets/css/styles.css`
- Create: `assets/images/kaushik-sundar-profile.webp`

- [ ] **Step 1: Optimize the supplied image**

Convert `/Users/debi.pradhan/Downloads/KS_PIC (2).png` to a 720 by 720 WebP at quality 86 while preserving its square composition.

- [ ] **Step 2: Replace metadata and structured data**

Use `Kaushik Sundar | Product Manager` for the title, identify the Product Manager role in the description and JSON-LD, include Bengaluru, and keep only the verified LinkedIn profile in `sameAs`.

- [ ] **Step 3: Replace page sections**

Implement Overview, Impact, Experience, Capabilities, Case Studies, Credentials, and Contact using only resume-supported claims. Use email and LinkedIn actions, omit the phone number, and omit GitHub and resume-download controls.

- [ ] **Step 4: Adapt the existing CSS**

Keep the editorial palette, responsive navigation, canvas visual, and reveal behavior. Add compact styles for case-study labels and credentials while retaining stable dimensions and mobile text fitting.

- [ ] **Step 5: Run the focused DOM and style tests**

Run: `node --test tests/dom.test.mjs tests/styles.test.mjs tests/assets.test.mjs`

Expected: PASS.

### Task 3: Convert Projects To Product Case Studies

**Files:**
- Modify: `public.json`
- Modify: `assets/js/render-projects.js`
- Modify: `tests/render-projects.test.mjs`
- Modify: `tests/main-runtime.test.mjs`
- Modify: `README.md`

- [ ] **Step 1: Write renderer tests for the new schema**

Use records with `title`, `problem`, `approach`, `impact`, `order`, and `status`. Assert escaped output, active-only sorting, no external action links, and a three-part Problem, Approach, Impact structure.

- [ ] **Step 2: Run renderer tests and confirm failure**

Run: `node --test tests/render-projects.test.mjs tests/main-runtime.test.mjs`

Expected: FAIL because the renderer still expects summaries, images, and URLs.

- [ ] **Step 3: Implement the case-study renderer**

```js
export function renderProject(project) {
  return `<article class="project">
  <div class="project-copy">
    <h3>${escapeHtml(project.title)}</h3>
    <p><strong>Problem</strong>${escapeHtml(project.problem)}</p>
    <p><strong>Approach</strong>${escapeHtml(project.approach)}</p>
    <p><strong>Impact</strong>${escapeHtml(project.impact)}</p>
  </div>
</article>`;
}
```

- [ ] **Step 4: Replace the catalog and document it**

Add the three resume case studies in approved order and update README examples to show the new schema.

- [ ] **Step 5: Run renderer and runtime tests**

Run: `node --test tests/render-projects.test.mjs tests/main-runtime.test.mjs`

Expected: PASS.

### Task 4: Verify The Complete Portfolio

**Files:**
- Modify: `tests/visual.spec.mjs`

- [ ] **Step 1: Update browser assertions**

Assert the Product Manager hero, visible portrait, three case studies, credentials, verified contact links, functioning mobile navigation, nonblank canvas, no horizontal overflow, and no hidden reveal content.

- [ ] **Step 2: Run the complete automated suite**

Run: `npm test`

Expected: all tests PASS.

- [ ] **Step 3: Check local assets**

Run: `npm run check:links`

Expected: no missing or invalid local references.

- [ ] **Step 4: Run browser verification**

Start `npm run serve`, then run `npm run test:visual`.

Expected: desktop and mobile visual tests PASS; screenshots show no overlap, clipping, stale identity, or broken image.

- [ ] **Step 5: Review the final diff**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; only intended portfolio files and existing user changes appear.
