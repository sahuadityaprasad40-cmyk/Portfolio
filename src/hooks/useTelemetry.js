import { useState, useEffect } from 'react';

export function useTelemetry() {
  const [clockText, setClockText] = useState('--:--:-- UTC // --:--:-- LOC');
  const [uptimeText, setUptimeText] = useState('UPTIME // 00:00');
  const [pingText, setPingText] = useState('PING // 14ms');

  useEffect(() => {
    const sessionStart = Date.now();

    const updateClock = () => {
      const now = new Date();
      const utc = `${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
      const loc = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} LOC`;
      setClockText(`${utc} // ${loc}`);

      const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
      const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
      const s = String(elapsed % 60).padStart(2, '0');
      setUptimeText(`UPTIME // ${m}:${s}`);
    };

    const updatePing = () => {
      const ms = Math.floor(12 + Math.random() * 6);
      setPingText(`PING // ${ms}ms`);
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    const pingInterval = setInterval(updatePing, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(pingInterval);
    };
  }, []);

  return { clockText, uptimeText, pingText };
}
