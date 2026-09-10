import React, { useState } from 'react';
import { useTelemetry } from '../hooks/useTelemetry';

export default function TelemetryHud({ theme, toggleTheme, onOpenTerminal, activeSection }) {
  const { clockText } = useTelemetry();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'OVERVIEW', idx: '01.' },
    { id: 'projects', label: 'PROJECTS', idx: '02.' },
    { id: 'arsenal', label: 'ARSENAL', idx: '03.' },
    { id: 'timeline', label: 'TIMELINE', idx: '04.' },
    { id: 'contact', label: 'CONTACT', idx: '05.' }
  ];

  return (
    <header className="telemetry-hud" role="banner">
      <div className="container hud-inner">
        {/* Brand & Callsign */}
        <a href="#overview" className="hud-brand" aria-label="Aditya Prasad Sahu Home">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none" stroke="#FF6B00" strokeWidth="2">
            <polygon points="16,4 28,16 16,28 4,16" />
            <circle cx="16" cy="16" r="3" fill="#FF6B00" />
          </svg>
          <span>ADITYA PRASAD SAHU</span>
          <span className="hud-callsign">// APEX-01</span>
        </a>

        {/* Real-time Status Indicator LED */}
        <div className="status-pill" title="Current Availability Status">
          <span className="status-led" aria-hidden="true"></span>
          <span>STATUS: ACTIVE_FOR_OPPORTUNITIES</span>
        </div>

        {/* Live Clock Telemetry */}
        <div className="hud-clock" id="telemetry-clock" aria-label="Synchronized Real-Time Clock">
          {clockText}
        </div>

        {/* Nav Anchors */}
        <nav className={`hud-nav ${mobileNavOpen ? 'open' : ''}`} role="navigation" aria-label="Primary Navigation">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`hud-nav-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <span className="nav-idx">{link.idx}</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Tools Cluster */}
        <div className="hud-tools">
          <button
            className="tool-btn"
            onClick={onOpenTerminal}
            title="Open Interactive CLI Terminal (Hotkeys: ` or Ctrl+K)"
          >
            <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>&gt;_</span>
            <span>CLI</span>
            <kbd style={{ fontSize: '9px', opacity: 0.6, padding: '1px 4px', background: 'var(--color-surface-1)', borderRadius: '2px' }}>~</kbd>
          </button>

          <button
            className="tool-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                </svg>
                <span>LIGHT</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>OBSIDIAN</span>
              </>
            )}
          </button>

          <button
            className="tool-btn mobile-nav-toggle"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileNavOpen(prev => !prev)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
