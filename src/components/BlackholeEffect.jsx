import React, { useEffect, useRef, useCallback } from 'react';

/**
 * BlackholeEffect
 * Renders a full-screen canvas overlay with a gravitational black hole
 * that follows the mouse cursor. Features:
 *  - Dark singularity core
 *  - Spinning accretion disk particles (amber/orange glow — matching brand)
 *  - Gravitational lensing distortion rings
 *  - Background image revealed in a radial window around cursor
 *  - Smooth lerp-based mouse tracking
 */
export default function BlackholeEffect() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    mouse: { x: -9999, y: -9999 },
    target: { x: -9999, y: -9999 },
    particles: [],
    angle: 0,
    entered: false,
  });

  // ── Build accretion disk particles ────────────────────────────────────────
  const buildParticles = useCallback((count = 280) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const orbitRadius = 60 + Math.random() * 110;
      const speed = (0.004 + Math.random() * 0.012) * (Math.random() < 0.5 ? 1 : -1);
      const angleOffset = Math.random() * Math.PI * 2;
      const size = 0.6 + Math.random() * 2.2;
      // elongated ellipse ratio to simulate perspective disk
      const yRatio = 0.22 + Math.random() * 0.32;
      const alpha = 0.15 + Math.random() * 0.75;
      // colour: deep amber → orange → white-hot
      const hue = 20 + Math.random() * 30;        // 20–50 → amber/gold
      const sat = 80 + Math.random() * 20;
      const lit = 55 + Math.random() * 35;
      particles.push({ orbitRadius, speed, angleOffset, size, yRatio, alpha, hue, sat, lit });
    }
    return particles;
  }, []);

  useEffect(() => {
    stateRef.current.particles = buildParticles();
  }, [buildParticles]);

  // ── Mouse tracking ────────────────────────────────────────────────────────
  useEffect(() => {
    const onMouseMove = (e) => {
      stateRef.current.target.x = e.clientX;
      stateRef.current.target.y = e.clientY;
      stateRef.current.entered = true;
    };
    const onMouseLeave = () => {
      stateRef.current.entered = false;
    };
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // ── Render loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const LERP = 0.085; // smoothing factor

    const draw = () => {
      const s = stateRef.current;
      const W = canvas.width;
      const H = canvas.height;

      // Lerp mouse toward target
      s.mouse.x += (s.target.x - s.mouse.x) * LERP;
      s.mouse.y += (s.target.y - s.mouse.y) * LERP;

      const mx = s.mouse.x;
      const my = s.mouse.y;

      // ── Clear canvas ────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      if (!s.entered) {
        // Full dark veil when mouse hasn't entered
        ctx.fillStyle = 'rgba(8,10,14,0.96)';
        ctx.fillRect(0, 0, W, H);
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // ── Step 1: Dark veil with radial "window" cut out ──────────────────
      // We draw a full dark rect, then punch a soft circular reveal
      const revealRadius = 260;
      const veil = ctx.createRadialGradient(mx, my, 0, mx, my, revealRadius);
      veil.addColorStop(0,    'rgba(8,10,14,0.0)');   // fully transparent at centre
      veil.addColorStop(0.45, 'rgba(8,10,14,0.0)');
      veil.addColorStop(0.78, 'rgba(8,10,14,0.55)');
      veil.addColorStop(1,    'rgba(8,10,14,0.96)');

      ctx.fillStyle = 'rgba(8,10,14,0.96)';
      ctx.fillRect(0, 0, W, H);

      // Composite the reveal hole using destination-out then back to source-over
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      const hole = ctx.createRadialGradient(mx, my, 0, mx, my, revealRadius);
      hole.addColorStop(0,    'rgba(0,0,0,1)');
      hole.addColorStop(0.5,  'rgba(0,0,0,1)');
      hole.addColorStop(0.78, 'rgba(0,0,0,0.5)');
      hole.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.fillStyle = hole;
      ctx.beginPath();
      ctx.arc(mx, my, revealRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── Step 2: Gravitational lensing distortion rings ──────────────────
      const ringCount = 5;
      for (let r = 0; r < ringCount; r++) {
        const ringR = 38 + r * 28;
        const ringAlpha = 0.06 - r * 0.01;
        ctx.save();
        ctx.strokeStyle = `rgba(255,140,30,${ringAlpha})`;
        ctx.lineWidth = 1 + (ringCount - r) * 0.4;
        ctx.shadowColor = 'rgba(255,110,0,0.6)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(mx, my, ringR, ringR * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── Step 3: Accretion disk particles ────────────────────────────────
      s.angle += 0.008;
      s.particles.forEach((p) => {
        p.angleOffset += p.speed;
        const a = p.angleOffset + s.angle;
        const px = mx + Math.cos(a) * p.orbitRadius;
        const py = my + Math.sin(a) * p.orbitRadius * p.yRatio;

        // Depth cue: particles at the "back" (sin negative) are dimmer
        const depthAlpha = p.alpha * (0.45 + 0.55 * ((Math.sin(a) + 1) / 2));

        ctx.save();
        ctx.globalAlpha = depthAlpha;
        ctx.fillStyle = `hsl(${p.hue},${p.sat}%,${p.lit}%)`;
        ctx.shadowColor = `hsl(${p.hue},100%,70%)`;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Step 4: Jet / photon sphere glow streaks ────────────────────────
      const jetLen = 90;
      [-1, 1].forEach((dir) => {
        const grad = ctx.createLinearGradient(
          mx, my,
          mx, my + dir * jetLen
        );
        grad.addColorStop(0,   'rgba(255,140,50,0.18)');
        grad.addColorStop(0.5, 'rgba(255,90,0,0.06)');
        grad.addColorStop(1,   'rgba(255,60,0,0)');
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(mx, my + dir * jetLen * 0.5, 6, jetLen * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── Step 5: Singularity core ─────────────────────────────────────────
      // Outer photon ring glow
      const outerGlow = ctx.createRadialGradient(mx, my, 12, mx, my, 42);
      outerGlow.addColorStop(0,    'rgba(255,140,30,0.28)');
      outerGlow.addColorStop(0.55, 'rgba(255,80,0,0.12)');
      outerGlow.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(mx, my, 42, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Black singularity
      ctx.save();
      const coreGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 20);
      coreGrad.addColorStop(0,   '#000000');
      coreGrad.addColorStop(0.7, '#050505');
      coreGrad.addColorStop(1,   'rgba(0,0,0,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(mx, my, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
