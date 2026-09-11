import React, { useEffect, useRef } from 'react';

/**
 * RippleEffect
 *
 * Elegant electromagnetic / water-wave distortion that follows the mouse.
 * Rules:
 *  - No permanent shape, circle, or object when idle
 *  - On mouse move: spawn expanding concentric ripple rings at cursor
 *  - Rings grow outward, fade smoothly to zero opacity
 *  - Subtle ambient cursor glow (tiny dot, 4px) — no large object
 *  - Colors: warm white / pale amber — matches the sci-fi background palette
 *  - Canvas is fully transparent when idle
 *  - OS cursor is NOT replaced (pointer-events:none, cursor untouched)
 */

const RIPPLE_SPAWN_INTERVAL_MS = 55; // throttle: one ripple burst per ~55ms of movement
const MAX_RIPPLES               = 28;

export default function RippleEffect() {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const ripplesRef   = useRef([]);
  const mouseRef     = useRef({ x: -999, y: -999, active: false });
  const lastSpawnRef = useRef(0);

  // ── Mouse tracking ─────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x      = e.clientX;
      mouseRef.current.y      = e.clientY;
      mouseRef.current.active = true;

      const now = performance.now();
      if (now - lastSpawnRef.current >= RIPPLE_SPAWN_INTERVAL_MS) {
        lastSpawnRef.current = now;
        spawnRipple(e.clientX, e.clientY);
      }
    };
    const onLeave = () => { mouseRef.current.active = false; };

    window.addEventListener('mousemove',    onMove,  { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove',    onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Spawn a ripple burst (2 concentric rings with slight offset) ───────────
  const spawnRipple = (x, y) => {
    const list = ripplesRef.current;

    // Outer slow ring
    list.push({
      x, y,
      r:       0,
      maxR:    110 + Math.random() * 50,
      alpha:   0.38,
      decay:   0.008 + Math.random() * 0.004,
      speed:   1.8  + Math.random() * 0.8,
      lw:      1.0,
      colorH:  30 + Math.random() * 20,   // amber-warm-white
      colorS:  20,
      colorL:  92,
    });

    // Inner faster ring (slightly more vivid)
    list.push({
      x, y,
      r:       0,
      maxR:    70 + Math.random() * 30,
      alpha:   0.55,
      decay:   0.014 + Math.random() * 0.005,
      speed:   2.6  + Math.random() * 1.0,
      lw:      0.8,
      colorH:  220 + Math.random() * 40,  // cool blue-white
      colorS:  40,
      colorL:  90,
    });

    // Trim if over budget
    if (list.length > MAX_RIPPLES) {
      list.splice(0, list.length - MAX_RIPPLES);
    }
  };

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

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const ripples = ripplesRef.current;
      const mouse   = mouseRef.current;

      // ── Update & draw each ripple ring ──────────────────────────────────
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r     += rp.speed;
        rp.alpha -= rp.decay;

        if (rp.alpha <= 0 || rp.r >= rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        // Progress 0→1 as ring expands
        const t = rp.r / rp.maxR;

        ctx.save();
        ctx.globalAlpha  = rp.alpha * (1 - t * 0.6);   // fade faster near edge
        ctx.strokeStyle  = `hsl(${rp.colorH}, ${rp.colorS}%, ${rp.colorL}%)`;
        ctx.lineWidth    = rp.lw * (1 - t * 0.5);       // thin as it expands
        ctx.shadowColor  = `hsl(${rp.colorH}, 60%, 95%)`;
        ctx.shadowBlur   = 8 * (1 - t);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── Ambient cursor micro-glow (tiny, elegant — not a shape) ─────────
      if (mouse.active && mouse.x > 0) {
        const mx = mouse.x;
        const my = mouse.y;

        // Soft radial bloom — very subtle, ~32px
        const bloom = ctx.createRadialGradient(mx, my, 0, mx, my, 32);
        bloom.addColorStop(0,   'rgba(255, 240, 210, 0.14)');
        bloom.addColorStop(0.4, 'rgba(220, 210, 255, 0.06)');
        bloom.addColorStop(1,   'rgba(0,   0,   0,  0)');
        ctx.save();
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(mx, my, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Micro dot at exact cursor (3px, warm white)
        ctx.save();
        ctx.globalAlpha  = 0.55;
        ctx.fillStyle    = 'rgba(255, 248, 230, 0.90)';
        ctx.shadowColor  = 'rgba(255, 220, 140, 0.9)';
        ctx.shadowBlur   = 10;
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
        position:      'fixed',
        inset:         0,
        zIndex:        9999,
        pointerEvents: 'none',
        display:       'block',
      }}
      aria-hidden="true"
    />
  );
}
