import React, { useState } from 'react';

export default function Contact({ onShowToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = async () => {
    const emailAddress = 'sahuadityaprasad40@gmail.com';
    try {
      await navigator.clipboard.writeText(emailAddress);
      onShowToast(`COORDINATES COPIED // ${emailAddress}`);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = emailAddress;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      onShowToast(`COORDINATES COPIED // ${emailAddress}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      onShowToast('TRANSMISSION ERROR: ALL FIELDS REQUIRED');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onShowToast(`PACKET DISPATCHED // THANK YOU, ${name.toUpperCase()}`);
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <section id="contact" className="telemetry-section" aria-labelledby="contact-heading">
      <div className="container">
        <header className="section-header">
          <div className="section-meta-rail">
            <span>05 // SIGNAL TRANSMISSION</span>
          </div>
          <h2 id="contact-heading" className="headline-lg">Initiate Transmission</h2>
          <p className="section-subtitle">
            Direct communication funnel for engineering leadership, technical recruiters, and architectural collaborations.
          </p>
        </header>

        <div className="contact-grid">
          {/* Communication Coordinates Panel */}
          <div className="contact-info-panel">
            <div className="contact-comm-card">
              <span className="telemetry-tag">DIRECT CHANNEL // VERIFIED</span>
              <h3 className="headline-sm">Coordinate Access</h3>
              <p className="body-sm">
                Open to full-time engineering roles, high-impact distributed systems contracts, and architectural advisories.
              </p>

              {/* One-click Email Copy Chip */}
              <div
                className="quick-email-chip"
                role="button"
                tabIndex={0}
                title="Click to copy email coordinates"
                onClick={handleCopyEmail}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCopyEmail(); }}
              >
                <span>sahuadityaprasad40@gmail.com</span>
                <span className="telemetry-tag" style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  [COPY]
                </span>
              </div>

              {/* Social Links Strip */}
              <div className="social-telemetry-row">
                <a
                  href="https://github.com/sahuadityaprasad40-cmyk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GITHUB</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LINKEDIN</span>
                </a>
                <a href="mailto:sahuadityaprasad40@gmail.com" className="social-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>DIRECT MAIL</span>
                </a>
              </div>
            </div>
          </div>

          {/* Transmission Form */}
          <form className="transmission-form" onSubmit={handleSubmit} noValidate>
            <span className="telemetry-tag">DISPATCH PACKET // ENCRYPTED</span>

            <div className="form-field">
              <label htmlFor="form-name" className="form-label">TRANSMITTER IDENTITY (NAME)</label>
              <input
                type="text"
                id="form-name"
                className="form-input"
                placeholder="e.g. Lead Architect // Alex Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="form-email" className="form-label">RETURN COORDINATES (EMAIL)</label>
              <input
                type="email"
                id="form-email"
                className="form-input"
                placeholder="e.g. alex@engineering.corp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="form-message" className="form-label">PAYLOAD (TRANSMISSION MESSAGE)</label>
              <textarea
                id="form-message"
                className="form-textarea"
                placeholder="Detail project scope, opportunity parameters, or technical inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: 'flex-start', marginTop: '4px' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'DISPATCHING...' : '[DISPATCH TRANSMISSION →]'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
