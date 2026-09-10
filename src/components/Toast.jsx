import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="toast-container" aria-live="polite">
      <div className="toast">
        <span className="toast-dot"></span>
        <span>{message}</span>
      </div>
    </div>
  );
}
