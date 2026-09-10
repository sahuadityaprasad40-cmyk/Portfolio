import React from 'react';
import { experienceData } from '../data/experience.data.js';

export default function Timeline() {
  return (
    <section id="timeline" className="telemetry-section" aria-labelledby="timeline-heading">
      <div className="container">
        <header className="section-header">
          <div className="section-meta-rail">
            <span>04 // MISSION LOG</span>
          </div>
          <h2 id="timeline-heading" className="headline-lg">Chronological Deployments &amp; Milestones</h2>
          <p className="section-subtitle">
            Engineering milestones, production responsibilities, and foundational academic accreditations.
          </p>
        </header>

        <div id="timeline-container" className="timeline-stream" role="region" aria-label="Experience Timeline">
          {experienceData.map((item, idx) => (
            <div key={idx} className="timeline-entry">
              <div className="timeline-node"></div>
              <div className="timeline-meta-tag">{item.tag}</div>
              <div className="timeline-card">
                <h3 className="timeline-role">{item.role}</h3>
                <div className="timeline-org">{item.organization}</div>
                <ul className="timeline-deliverables">
                  {item.deliverables.map((d, dIdx) => (
                    <li key={dIdx}>{d}</li>
                  ))}
                </ul>
                <div className="tech-tag-strip" style={{ marginTop: '10px' }}>
                  {item.tech.map(t => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
