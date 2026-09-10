/**
 * APEX TELEMETRY - PROJECTS SHOWCASE MODULE
 * Dynamic rendering, tag filtering, and interactive project cards.
 */

import { projectsData } from '../data/projects.data.js';

export function initProjects() {
  const container = document.getElementById('projects-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container) return;

  renderProjects(projectsData, container);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'ALL';
      if (filter === 'ALL') {
        renderProjects(projectsData, container);
      } else {
        const filtered = projectsData.filter(p => p.category === filter || p.tags.includes(filter));
        renderProjects(filtered, container);
      }
    });
  });
}

function renderProjects(projects, container) {
  container.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);

    const metricsHtml = project.metrics.map(m => `
      <div class="project-metric-item">
        ${m.label}: <span>${m.value}</span>
      </div>
    `).join('');

    const tagsHtml = project.tags.map(tag => `
      <span class="tech-tag">${tag}</span>
    `).join('');

    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-card-id">${project.id} // ${project.subsystem}</span>
        <span class="hud-indicator">[VERIFIED]</span>
      </div>

      <div class="project-schematic-wrap">
        <img class="project-schematic-svg" src="${project.schematic}" alt="${project.title} Architectural Schematic" loading="lazy" />
      </div>

      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-summary">${project.summary}</p>
        
        <div class="project-metrics-row">
          ${metricsHtml}
        </div>

        <div class="tech-tag-strip">
          ${tagsHtml}
        </div>
      </div>

      <div class="project-actions-row">
        <a href="${project.sourceUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span>SOURCE</span>
        </a>
        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          <span>INSPECT ↗</span>
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}
