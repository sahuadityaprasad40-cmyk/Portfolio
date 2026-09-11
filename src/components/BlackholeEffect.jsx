import React, { useEffect, useRef, useCallback } from 'react';

/**
 * BlackholeEffect — Realistic black hole cursor
 *
 * Modelled after the reference image:
 *   • Absolute black event horizon (large pure-black circle)
 *   • Bright white/lavender photon ring right at the edge
 *   • Swirling blue-purple accretion wisps (rotating arc strands)
 *   • Outer diffuse purple-blue nebula glow
 *   • Tiny star-field scattered around the singularity
 *   • Smooth lerp mouse tracking
 *   • Canvas sits at z-index:9999, pointer-events:none
 *   • OS cursor hidden via body CSS
 */
export default function BlackholeEffect() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  const stateRef = useRef({
    mouse:   { x: -999, y: -999 },
    target:  { x: -999, y: -999 },
    entered: false,
    spin:    0,
    stars:   [],
    wisps:   [],
  });

  // ── Pre-build star field ───────────────────────────────────────────────────
  const buildStars = useCallback(() => {
    const s = [];
    for (let i = 0; i < 120; i++) {
      const angle  = Math.random() * Math.PI * 2;
      const dist   = 90 + Math.random() * 160;
      s.push({
        angle,
        dist,
        size:  0.4 + Math.random() * 1.4,
        alpha: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return s;
  }, []);

  // ── Pre-build accretion wisps (arc strands) ───────────────────────────────
  const buildWisps = useCallback(() => {
    const w = [];
    for (let i = 0; i < 18; i++) {
      w.push({
        startAngle: Math.random() * Math.PI * 2,
        arcLen:     0.8 + Math.random() * 1.8,       // radians
        radius:     74 + Math.random() * 60,
        width:      1.2 + Math.random() * 3.5,
        alpha:      0.08 + Math.random() * 0.22,
        // colour: cool blue → lavender → white
        hue:        200 + Math.random() * 60,
        sat:        40  + Math.random() * 40,
        lit:        65  + Math.random() * 30,
        speed:      (0.003 + Math.random() * 0.007) * (Math.random() < 0.5 ? 1 : -1),
        yScale:     0.82 + Math.random() * 0.18,     // slight ellipse
      });
    }
    return w;
  }, []);

  useEffect(() => {
    stateRef.current.stars = buildStars();
    stateRef.current.wisps = buildWisps();
  }, [buildStars, buildWisps]);

  // ── Mouse tracking ─────────────────────────────────────────────────────────
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
    window.addEventListener('mousemove',    move,  { passive: true });
    window.addEventListener('touchmove',    move,  { passive: true });
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove',    move);
      window.removeEventListener('touchmove',    move);
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

    const LERP       = 0.10;
    const CORE_R     = 48;   // black event horizon radius
    const PHOTON_R   = 58;   // bright white ring inner edge
    const PHOTON_OUT = 70;   // bright white ring outer edge

    const drawFrame = () => {
      const s = stateRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!s.entered) {
        rafRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      // Smooth follow
      s.mouse.x += (s.target.x - s.mouse.x) * LERP;
      s.mouse.y += (s.target.y - s.mouse.y) * LERP;
      const mx = s.mouse.x;
      const my = s.mouse.y;
      s.spin   += 0.006;

      // ── 1. Outermost diffuse nebula glow (blue-purple) ─────────────────
      const nebula = ctx.createRadialGradient(mx, my, PHOTON_OUT, mx, my, 260);
      nebula.addColorStop(0,    'rgba(160, 120, 220, 0.13)');
      nebula.addColorStop(0.3,  'rgba(100,  80, 200, 0.09)');
      nebula.addColorStop(0.65, 'rgba( 60,  40, 140, 0.05)');
      nebula.addColorStop(1,    'rgba(  0,   0,   0, 0)');
      ctx.save();
      ctx.fillStyle = nebula;
      ctx.beginPath();
      ctx.arc(mx, my, 260, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 2. Star field ───────────────────────────────────────────────────
      s.stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const a       = star.alpha * twinkle;
        const px      = mx + Math.cos(star.angle + s.spin * 0.1) * star.dist;
        const py      = my + Math.sin(star.angle + s.spin * 0.1) * star.dist * 0.88;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle   = '#ffffff';
        ctx.shadowColor = '#ddeeff';
        ctx.shadowBlur  = 3;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── 3. Swirling accretion wisps (arc strands) ──────────────────────
      s.wisps.forEach((w) => {
        w.startAngle += w.speed;
        const sa = w.startAngle + s.spin;
        ctx.save();
        ctx.translate(mx, my);
        ctx.scale(1, w.yScale);
        ctx.strokeStyle = `hsla(${w.hue}, ${w.sat}%, ${w.lit}%, ${w.alpha})`;
        ctx.lineWidth   = w.width;
        ctx.shadowColor = `hsla(${w.hue}, 60%, 90%, 0.4)`;
        ctx.shadowBlur  = 8;
        ctx.beginPath();
        ctx.arc(0, 0, w.radius, sa, sa + w.arcLen);
        ctx.stroke();
        ctx.restore();
      });

      // ── 4. Photon ring glow (outer warm-white bloom) ────────────────────
      const ringBloom = ctx.createRadialGradient(mx, my, CORE_R * 0.9, mx, my, PHOTON_OUT + 28);
      ringBloom.addColorStop(0,    'rgba(255, 255, 255, 0)');
      ringBloom.addColorStop(0.35, 'rgba(230, 220, 255, 0.25)');
      ringBloom.addColorStop(0.58, 'rgba(255, 255, 255, 0.55)');
      ringBloom.addColorStop(0.72, 'rgba(255, 255, 255, 0.20)');
      ringBloom.addColorStop(1,    'rgba(180, 160, 255, 0)');
      ctx.save();
      ctx.fillStyle = ringBloom;
      ctx.beginPath();
      ctx.arc(mx, my, PHOTON_OUT + 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 5. Photon ring sharp bright band ───────────────────────────────
      for (let i = 0; i < 3; i++) {
        const r  = PHOTON_R + i * 4;
        const lw = 3.5 - i * 0.9;
        const al = 0.85 - i * 0.22;
        ctx.save();
        ctx.strokeStyle = `rgba(255, 252, 255, ${al})`;
        ctx.lineWidth   = lw;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur  = 18;
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // ── 6. Inner shadow between photon ring and event horizon ───────────
      const innerShadow = ctx.createRadialGradient(mx, my, CORE_R, mx, my, PHOTON_R);
      innerShadow.addColorStop(0,   'rgba(0, 0, 0, 0.95)');
      innerShadow.addColorStop(0.6, 'rgba(10, 5, 20, 0.6)');
      innerShadow.addColorStop(1,   'rgba(0, 0, 0, 0)');
      ctx.save();
      ctx.fillStyle = innerShadow;
      ctx.beginPath();
      ctx.arc(mx, my, PHOTON_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── 7. Absolute black event horizon ────────────────────────────────
      ctx.save();
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(mx, my, CORE_R, 0, Math.PI * 2);
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
