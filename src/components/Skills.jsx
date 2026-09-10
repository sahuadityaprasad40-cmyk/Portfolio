import React from 'react';
import { skillsData } from '../data/skills.data.js';

export default function Skills() {
  return (
    <section id="arsenal" className="telemetry-section" aria-labelledby="arsenal-heading">
      <div className="container">
        <header className="section-header">
          <div className="section-meta-rail">
            <span>03 // TECHNICAL ARSENAL</span>
          </div>
          <h2 id="arsenal-heading" className="headline-lg">Competency Telemetry Matrix</h2>
          <p className="section-subtitle">
            Measured proficiency across core system layers, languages, networking protocols, and developer instrumentation.
          </p>
        </header>

        <div id="skills-container" className="skills-grid" role="region" aria-label="Skills Gauges">
          {skillsData.map(domain => (
            <div key={domain.domain} className="skills-domain-card">
              <div className="domain-header">
                <h3 className="domain-title">{domain.domain}</h3>
                <span className="domain-count">[{domain.items.length} MODULES]</span>
              </div>
              <p className="body-sm">{domain.description}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
                {domain.items.map(item => (
                  <div key={item.name} className="skill-row">
                    <div className="skill-info">
                      <span className="skill-name">{item.name}</span>
                      <span className="skill-val">{item.meta} // {item.level * 10}%</span>
                    </div>

                    <div
                      className="seg-gauge"
                      role="progressbar"
                      aria-valuenow={item.level * 10}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${item.name} proficiency`}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map(blockNum => (
                        <div
                          key={blockNum}
                          className={`seg-block ${blockNum <= item.level ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
