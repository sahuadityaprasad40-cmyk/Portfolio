import React from 'react';

export default function Hero({ uptimeText, pingText }) {
  return (
    <section id="overview" class="telemetry-section" aria-labelledby="hero-title">
      <div className="container hero-wrapper">
        {/* Metadata Coordinates Strip */}
        <div className="hero-meta-strip">
          <div className="hero-coord-chip">
            SYS.LOC // <span>20.2961° N, 85.8245° E [IN]</span>
          </div>
          <div className="hero-coord-chip">
            SYS.ROLE // <span>FULL-STACK SYSTEMS ENGINEER &amp; ARCHITECT</span>
          </div>
          <div className="hero-coord-chip">
            {uptimeText}
          </div>
          <div className="hero-coord-chip">
            {pingText}
          </div>
        </div>

        {/* Headline & Narrative */}
        <h1 id="hero-title" className="display-hero hero-heading">
          Engineering High-Throughput <span className="hero-highlight">Telemetry</span> &amp; Low-Latency Systems.
        </h1>

        <p className="body-lg hero-description">
          I build resilient, data-dense software architectures at the intersection of distributed systems, real-time biometrics, deterministic simulation engines, and zero-bloat native web craft.
        </p>

        {/* Action Trigger Cluster */}
        <div className="hero-cta-cluster">
          <a href="#contact" className="btn btn-primary btn-lg">
            <span>[DEPLOY CONTACT →]</span>
          </a>
          <a href="#projects" className="btn btn-outline btn-lg">
            <span>[INSPECT PROJECTS //]</span>
          </a>
          <a
            href="https://github.com/sahuadityaprasad40-cmyk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>CURRICULUM VITAE</span>
          </a>
        </div>

        {/* Quantitative Architectural Metrics */}
        <div className="hero-metrics-grid" role="region" aria-label="System Performance Metrics">
          <div className="metric-card">
            <div className="metric-value">&lt; 15 ms</div>
            <div className="metric-label">Inference &amp; Stream Latency</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">99.99%</div>
            <div className="metric-label">Pipeline Availability SLA</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">60 FPS</div>
            <div className="metric-label">Deterministic WebGL Render</div>
          </div>
          <div className="metric-card">
            <div className="metric-value">0.0 MB</div>
            <div className="metric-label">Runtime Framework Bloat</div>
          </div>
        </div>
      </div>
    </section>
  );
}
