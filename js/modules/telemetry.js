/**
 * APEX TELEMETRY - REAL-TIME TELEMETRY ENGINE
 * Synchronizes live UTC/IST clocks, session uptime counter, and telemetry signals.
 */

export function initTelemetry() {
  const clockElement = document.getElementById('telemetry-clock');
  const sessionElement = document.getElementById('session-uptime');
  const pingElement = document.getElementById('telemetry-ping');

  const sessionStartTime = Date.now();

  function updateClock() {
    const now = new Date();

    // UTC formatted
    const utcHours = String(now.getUTCHours()).padStart(2, '0');
    const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
    const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
    const utcString = `${utcHours}:${utcMinutes}:${utcSeconds} UTC`;

    // Local / IST formatted
    const localHours = String(now.getHours()).padStart(2, '0');
    const localMinutes = String(now.getMinutes()).padStart(2, '0');
    const localSeconds = String(now.getSeconds()).padStart(2, '0');
    const localString = `${localHours}:${localMinutes}:${localSeconds} LOC`;

    if (clockElement) {
      clockElement.textContent = `${utcString} // ${localString}`;
    }

    // Update Session Uptime
    if (sessionElement) {
      const elapsedSec = Math.floor((Date.now() - sessionStartTime) / 1000);
      const m = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const s = String(elapsedSec % 60).padStart(2, '0');
      sessionElement.textContent = `UPTIME // ${m}:${s}`;
    }
  }

  // Jitter ping metric slightly to reflect live network telemetry
  function updatePing() {
    if (pingElement) {
      const simulatedPing = Math.floor(12 + Math.random() * 6);
      pingElement.textContent = `PING // ${simulatedPing}ms`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  updatePing();
  setInterval(updatePing, 4000);
}
