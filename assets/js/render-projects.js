function escapeHtml(value) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return String(value ?? '').replace(/[&<>"']/g, (character) => entities[character]);
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

export function renderProject(project) {
  const title = escapeHtml(project.title);

  return `<article class="project">
  <div class="project-copy">
    <p class="eyebrow">Product case study</p>
    <h3>${title}</h3>
    <div class="case-study-details">
      <section><h4>Problem</h4><p>${escapeHtml(project.problem)}</p></section>
      <section><h4>Approach</h4><p>${escapeHtml(project.approach)}</p></section>
      <section><h4>Impact</h4><p>${escapeHtml(project.impact)}</p></section>
    </div>
  </div>
</article>`;
}

export function renderProjects(projects) {
  return prepareProjects(projects)
    .map(renderProject)
    .join('');
}
