import React from 'react';

export default function Footer() {
  return (
    <footer className="telemetry-footer" role="contentinfo">
      <div className="container footer-inner">
        <div>
          <span>ADITYA PRASAD SAHU</span> // &copy; {new Date().getFullYear()} APEX TELEMETRY. ALL RIGHTS RESERVED.
        </div>

        <div className="footer-telemetry-nodes">
          <div className="footer-node">BUILD // <span>REACT-2026.1</span></div>
          <div className="footer-node">ENGINE // <span>VITE + REACT 18</span></div>
          <div className="footer-node">STATUS // <span>ALL SYSTEMS NOMINAL</span></div>
        </div>
      </div>
    </footer>
  );
}
