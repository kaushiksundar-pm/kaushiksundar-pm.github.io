function escapeHtml(value) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return String(value ?? '').replace(
    /[&<>"']/g,
    (character) => entities[character],
  );
}

function renderNamedList(items) {
  if (!Array.isArray(items)) return '';

  return items
    .filter((item) => item && (item.title || item.description))
    .map((item) => {
      return `<li>
        <strong>${escapeHtml(item.title)}:</strong>
        ${escapeHtml(item.description)}
      </li>`;
    })
    .join('');
}

function renderPillars(items) {
  if (!Array.isArray(items)) return '';

  return items
    .filter((item) => item && (item.title || item.description))
    .map((item, index) => {
      return `<dt>${index + 1}. ${escapeHtml(item.title)}</dt>
      <dd>${escapeHtml(item.description)}</dd>`;
    })
    .join('');
}

export function prepareProjects(projects) {
  if (!Array.isArray(projects)) return [];

  return projects
    .map((project, inputIndex) => ({ project, inputIndex }))
    .filter(({ project }) => project && project.status === 'active')
    .sort((left, right) => {
      const leftOrder = Number.isFinite(Number(left.project.order))
        ? Number(left.project.order)
        : Number.POSITIVE_INFINITY;

      const rightOrder = Number.isFinite(Number(right.project.order))
        ? Number(right.project.order)
        : Number.POSITIVE_INFINITY;

      return leftOrder - rightOrder || left.inputIndex - right.inputIndex;
    })
    .map(({ project }) => project);
}

function renderCompactProject(project) {
  return `<article class="project">
  <div class="project-copy">
    <p class="eyebrow">Product case study</p>
    <h3>${escapeHtml(project.title)}</h3>

    <div class="case-study-details">
      <section>
        <h4>Problem</h4>
        <p>${escapeHtml(project.problem)}</p>
      </section>

      <section>
        <h4>Approach</h4>
        <p>${escapeHtml(project.approach)}</p>
      </section>

      <section>
        <h4>Impact</h4>
        <p>${escapeHtml(project.impact)}</p>
      </section>
    </div>
  </div>
</article>`;
}

function renderDeepDiveProject(project) {
  const stack = Array.isArray(project.stack)
    ? project.stack.map(escapeHtml).join(', ')
    : escapeHtml(project.stack);

  return `<article class="project project-deep-dive">
  <div class="project-copy">
    <p class="eyebrow">${escapeHtml(project.eyebrow)}</p>
    <h3>${escapeHtml(project.title)}</h3>

    <div class="case-study-meta">
      <span>
        <strong>Role:</strong>
        ${escapeHtml(project.role)}
      </span>

      <span>
        <strong>Stack:</strong>
        ${stack}
      </span>
    </div>

    <div class="case-study-details">
      <section class="cs-section">
        <h4>
          <span aria-hidden="true">⚠️</span>
          The Problem &amp; Context
        </h4>

        <p>${escapeHtml(project.context)}</p>

        <h5>The Technical Hurdles</h5>
        <ul>
          ${renderNamedList(project.technicalHurdles)}
        </ul>
      </section>

      <section class="cs-section">
        <h4>
          <span aria-hidden="true">🛠️</span>
          Product Strategy &amp; Discovery
        </h4>

        <p>${escapeHtml(project.strategy)}</p>

        <h5>Key Product Trade-offs</h5>
        <ul>
          ${renderNamedList(project.tradeoffs)}
        </ul>
      </section>

      <section class="cs-section">
        <h4>
          <span aria-hidden="true">🏗️</span>
          Platform Architecture &amp; Pillars
        </h4>

        <dl class="cs-features">
          ${renderPillars(project.pillars)}
        </dl>
      </section>

      <section class="cs-section">
        <h4>
          <span aria-hidden="true">🚀</span>
          Execution &amp; Operating Model
        </h4>

        <ul>
          ${renderNamedList(project.operatingModel)}
        </ul>
      </section>

      <section class="cs-section highlight-impact">
        <h4>
          <span aria-hidden="true">📈</span>
          Measured Value Realization
        </h4>

        <ul>
          ${renderNamedList(project.outcomes)}
        </ul>
      </section>
    </div>
  </div>
</article>`;
}

export function renderProject(project) {
  const hasDeepDiveContent =
    Array.isArray(project?.technicalHurdles) ||
    Array.isArray(project?.tradeoffs) ||
    Array.isArray(project?.pillars) ||
    Array.isArray(project?.operatingModel) ||
    Array.isArray(project?.outcomes);

  if (hasDeepDiveContent) {
    return renderDeepDiveProject(project);
  }

  return renderCompactProject(project);
}

export function renderProjects(projects) {
  return prepareProjects(projects)
    .map(renderProject)
    .join('');
}
