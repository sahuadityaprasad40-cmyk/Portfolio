import React, { useEffect, useRef, useCallback } from 'react';

/**
 * BlackholeEffect — Custom cursor replacement.
 *
 * Renders a full-screen transparent canvas fixed on top of everything.
 * The default OS cursor is hidden via CSS (cursor: none on body).
 * In its place, a miniature black hole is drawn at the mouse position:
 *   • Deep black singularity core
 *   • Spinning amber/gold accretion disk (ellipse particles)
 *   • Gravitational lensing glow rings
 *   • Relativistic jets (vertical glows above/below)
 *   • Smooth lerp tracking
 */
export default function BlackholeEffect() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  const stateRef = useRef({
    mouse:     { x: -999, y: -999 },
    target:    { x: -999, y: -999 },
    particles: [],
    spin:      0,
    entered:   false,
  });

  // ── Build accretion particles ──────────────────────────────────────────────
  const buildParticles = useCallback(() => {
    const list = [];
    for (let i = 0; i < 200; i++) {
      list.push({
        r:       22 + Math.random() * 36,          // orbit radius
        speed:   (0.018 + Math.random() * 0.042) * (Math.random() < 0.5 ? 1 : -1),
        phase:   Math.random() * Math.PI * 2,
        yRatio:  0.18 + Math.random() * 0.28,      // ellipse flatten
        size:    0.5 + Math.random() * 1.8,
        alpha:   0.25 + Math.random() * 0.75,
        hue:     18 + Math.random() * 28,          // amber-gold
        sat:     85 + Math.random() * 15,
        lit:     55 + Math.random() * 35,
      });
    }
    return list;
  }, []);

  useEffect(() => {
    stateRef.current.particles = buildParticles();
  }, [buildParticles]);

  // ── Mouse / touch tracking ─────────────────────────────────────────────────
  useEffect(() => {
    const move = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x !== undefined) {
        stateRef.current.target.x = x;
        stateRef.current.target.y = y;
        stateRef.current.entered  = true;
      }
    };
    const leave = () => { stateRef.current.entered = false; };

    window.addEventListener('mousemove',  move,  { passive: true });
    window.addEventListener('touchmove',  move,  { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove',  move);
      window.removeEventListener('touchmove',  move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  // ── Render loop ────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const LERP = 0.12;

    const drawFrame = () => {
      const s  = stateRef.current;
      const W  = canvas.width;
      const H  = canvas.height;

      ctx.clearRect(0, 0, W, H);

      if (!s.entered) {
        rafRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      // Smooth follow
      s.mouse.x += (s.target.x - s.mouse.x) * LERP;
      s.mouse.y += (s.target.y - s.mouse.y) * LERP;
      const mx = s.mouse.x;
      const my = s.mouse.y;

      s.spin += 0.012;

      // ── 1. Outer glow halo ────────────────────────────────────────────────
      const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 72);
      halo.addColorStop(0,    'rgba(255, 130, 20, 0.18)');
      halo.addColorStop(0.4,  'rgba(255,  80,  0, 0.08)');
      halo.addColorStop(1,    'rgba(0,     0,  0, 0)');
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(mx, my, 72, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 2. Gravitational lensing rings ────────────────────────────────────
      const rings = [
        { rx: 28, ry: 7,  lw: 1.8, alpha: 0.55 },
        { rx: 40, ry: 10, lw: 1.2, alpha: 0.30 },
        { rx: 54, ry: 13, lw: 0.8, alpha: 0.16 },
      ];
      rings.forEach(({ rx, ry, lw, alpha }) => {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 140, 30, ${alpha})`;
        ctx.lineWidth   = lw;
        ctx.shadowColor = 'rgba(255, 110, 0, 0.9)';
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.ellipse(mx, my, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ── 3. Accretion disk particles ───────────────────────────────────────
      s.particles.forEach((p) => {
        p.phase += p.speed;
        const angle = p.phase + s.spin;
        const px    = mx + Math.cos(angle) * p.r;
        const py    = my + Math.sin(angle) * p.r * p.yRatio;

        // Depth: rear particles dimmer
        const depth = (Math.sin(angle) + 1) / 2;   // 0 = back, 1 = front
        const a     = p.alpha * (0.3 + 0.7 * depth);

        // Skip particles that are inside the singularity radius
        const dx = px - mx, dy = py - my;
        if (Math.sqrt(dx * dx + dy * dy) < 9) return;

        ctx.save();
        ctx.globalAlpha  = a;
        ctx.fillStyle    = `hsl(${p.hue}, ${p.sat}%, ${p.lit}%)`;
        ctx.shadowColor  = `hsl(${p.hue}, 100%, 72%)`;
        ctx.shadowBlur   = 5;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── 4. Relativistic polar jets ────────────────────────────────────────
      [-1, 1].forEach((dir) => {
        const jetH  = 55;
        const cy    = my + dir * jetH * 0.5;
        const jet   = ctx.createLinearGradient(mx, my, mx, my + dir * jetH);
        jet.addColorStop(0,   'rgba(255, 160, 50, 0.22)');
        jet.addColorStop(0.5, 'rgba(255,  90,  0, 0.08)');
        jet.addColorStop(1,   'rgba(  0,   0,  0, 0)');
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = jet;
        ctx.beginPath();
        ctx.ellipse(mx, cy, 5, jetH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── 5. Photon sphere bright ring ──────────────────────────────────────
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 200, 80, 0.70)';
      ctx.lineWidth   = 1.2;
      ctx.shadowColor = 'rgba(255, 160, 30, 1)';
      ctx.shadowBlur  = 14;
      ctx.beginPath();
      ctx.ellipse(mx, my, 13, 3.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ── 6. Singularity — absolute black core ──────────────────────────────
      const core = ctx.createRadialGradient(mx, my, 0, mx, my, 11);
      core.addColorStop(0,    '#000000');
      core.addColorStop(0.75, '#000000');
      core.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.save();
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(mx, my, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        pointerEvents:  'none',
        display:        'block',
      }}
      aria-hidden="true"
    />
  );
}
