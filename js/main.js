/**
 * APEX TELEMETRY - MASTER BOOTSTRAPPER (main.js)
 * Initializes all modular subsystems and life-cycle services.
 */

import { initTheme } from './modules/theme.js';
import { initTelemetry } from './modules/telemetry.js';
import { initProjects } from './modules/projects.js';
import { initTerminal } from './modules/terminal.js';
import { initContact } from './modules/contact.js';
import { skillsData } from './data/skills.data.js';
import { experienceData } from './data/experience.data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  initTheme();
  initTelemetry();
  initProjects();
  initTerminal();
  initContact();

  // 2. Render Skills Telemetry Gauges
  renderSkills();

  // 3. Render Chronological Mission Log (Timeline)
  renderTimeline();

  // 4. Setup Scrollspy & Active Navigation
  setupScrollSpy();

  // 5. Setup Mobile Nav Toggle
  setupMobileNav();
});

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = '';

  skillsData.forEach(domain => {
    const card = document.createElement('div');
    card.className = 'skills-domain-card';

    const itemsHtml = domain.items.map(item => {
      // 10-block segmented gauge
      let blocksHtml = '';
      for (let i = 1; i <= 10; i++) {
        const isFilled = i <= item.level;
        blocksHtml += `<div class="seg-block ${isFilled ? 'filled' : ''}"></div>`;
      }

      return `
        <div class="skill-row">
          <div class="skill-info">
            <span class="skill-name">${item.name}</span>
            <span class="skill-val">${item.meta} // ${item.level * 10}%</span>
          </div>
          <div class="seg-gauge" role="progressbar" aria-valuenow="${item.level * 10}" aria-valuemin="0" aria-valuemax="100" aria-label="${item.name} proficiency">
            ${blocksHtml}
          </div>
        </div>
      `;
    }).join('');

    card.innerHTML = `
      <div class="domain-header">
        <h3 class="domain-title">${domain.domain}</h3>
        <span class="domain-count">[${domain.items.length} MODULES]</span>
      </div>
      <p class="body-sm">${domain.description}</p>
      <div style="display: flex; flex-direction: column; gap: 14px; margin-top: 8px;">
        ${itemsHtml}
      </div>
    `;

    container.appendChild(card);
  });
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = '';

  experienceData.forEach(item => {
    const entry = document.createElement('div');
    entry.className = 'timeline-entry';

    const deliverablesHtml = item.deliverables.map(d => `<li>${d}</li>`).join('');
    const techTagsHtml = item.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    entry.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-meta-tag">${item.tag}</div>
      <div class="timeline-card">
        <h3 class="timeline-role">${item.role}</h3>
        <div class="timeline-org">${item.organization}</div>
        <ul class="timeline-deliverables">
          ${deliverablesHtml}
        </ul>
        <div class="tech-tag-strip" style="margin-top: 10px;">
          ${techTagsHtml}
        </div>
      </div>
    `;

    container.appendChild(entry);
  });
}

function setupScrollSpy() {
  const navLinks = document.querySelectorAll('.hud-nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: '-10% 0px -50% 0px' }
  );

  sections.forEach(sec => observer.observe(sec));
}

function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('hud-nav');
  const links = document.querySelectorAll('.hud-nav-link');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }
}
