import React, { useState } from 'react';
import { projectsData } from '../data/projects.data.js';

export default function Projects() {
  const [filter, setFilter] = useState('ALL');

  const filteredProjects = filter === 'ALL'
    ? projectsData
    : projectsData.filter(p => p.category === filter || p.tags.includes(filter));

  const filterTabs = [
    { key: 'ALL', label: '[ALL SYSTEMS]' },
    { key: 'SYSTEMS', label: 'SYSTEMS & ENGINES' },
    { key: 'FRONTEND', label: 'FRONTEND & TELEMETRY' },
    { key: 'APIS', label: 'APIS & CLOUD' }
  ];

  return (
    <section id="projects" className="telemetry-section" aria-labelledby="projects-heading">
      <div className="container">
        <header className="section-header">
          <div className="section-meta-rail">
            <span>02 // ARCHITECTURAL SHOWCASE</span>
          </div>
          <h2 id="projects-heading" className="headline-lg">Featured Systems &amp; Case Studies</h2>
          <p className="section-subtitle">
            Engineered systems designed with high data density, real-time protocols, and verifiable performance outcomes.
          </p>
        </header>

        {/* Category Filter Bar */}
        <div className="filter-rail" role="tablist" aria-label="Filter Projects by Domain">
          {filterTabs.map(tab => (
            <button
              key={tab.key}
              className={`filter-btn ${filter === tab.key ? 'active' : ''}`}
              role="tab"
              aria-selected={filter === tab.key}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Projects Grid */}
        <div id="projects-container" className="projects-grid" role="region" aria-live="polite">
          {filteredProjects.map(project => (
            <article key={project.id} className="project-card" data-id={project.id}>
              <div className="project-card-header">
                <span className="project-card-id">{project.id} // {project.subsystem}</span>
                <span className="hud-indicator">[VERIFIED]</span>
              </div>

              <div className="project-schematic-wrap">
                <img
                  className="project-schematic-svg"
                  src={project.schematic}
                  alt={`${project.title} Architectural Schematic`}
                  loading="lazy"
                />
              </div>

              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-summary">{project.summary}</p>

                <div className="project-metrics-row">
                  {project.metrics.map(m => (
                    <div key={m.label} className="project-metric-item">
                      {m.label}: <span>{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="tech-tag-strip">
                  {project.tags.map(tag => (
                    <span key={tag} className="tech-tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-actions-row">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>SOURCE</span>
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  <span>INSPECT ↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
