import React, { useEffect, useRef, useCallback } from 'react';

/**
 * BlackholeEffect — Cinematic black hole custom cursor
 *
 * Reference: black-hole.webp
 *  • Small compact event horizon (pure black, deeply recessed look)
 *  • Large luminous white/lavender photon ring surrounding it
 *  • Multi-layer transition from bright ring → shadow throat → black core
 *  • Swirling blue-purple-lavender accretion arc wisps
 *  • Outer diffuse purple-blue nebula bloom
 *  • Twinkling star field orbiting the singularity
 *  • OS cursor replaced (cursor:none set on body via CSS)
 *  • Smooth lerp mouse tracking
 */

// ── Sizing constants ──────────────────────────────────────────────────────────
const CORE_R      = 20;   // event horizon radius — compact, ~40% of old size
const THROAT_R    = 36;   // shadow-throat transition zone end
const PHOTON_IN   = 46;   // inner edge of bright photon ring
const PHOTON_OUT  = 68;   // outer edge of bright photon ring
const NEBULA_R    = 270;  // diffuse outer nebula radius

export default function BlackholeEffect() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const stateRef  = useRef({
    mouse:   { x: -999, y: -999 },
    target:  { x: -999, y: -999 },
    entered: false,
    spin:    0,
    stars:   [],
    wisps:   [],
  });

  // ── Star field ────────────────────────────────────────────────────────────
  const buildStars = useCallback(() => {
    const s = [];
    for (let i = 0; i < 160; i++) {
      const dist = 95 + Math.random() * 175;
      s.push({
        angle:        Math.random() * Math.PI * 2,
        dist,
        size:         0.3 + Math.random() * 1.5,
        alpha:        0.2 + Math.random() * 0.8,
        twinkleSpeed: 0.015 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return s;
  }, []);

  // ── Accretion wisps (swirling arc strands) ────────────────────────────────
  const buildWisps = useCallback(() => {
    const w = [];
    for (let i = 0; i < 24; i++) {
      w.push({
        startAngle: Math.random() * Math.PI * 2,
        arcLen:     0.6 + Math.random() * 2.2,
        radius:     80 + Math.random() * 90,
        width:      0.8 + Math.random() * 3.2,
        alpha:      0.06 + Math.random() * 0.20,
        hue:        195 + Math.random() * 65,   // blue → violet → lavender
        sat:        35  + Math.random() * 45,
        lit:        62  + Math.random() * 32,
        speed:      (0.002 + Math.random() * 0.006) * (Math.random() < 0.5 ? 1 : -1),
        yScale:     0.78 + Math.random() * 0.22,
      });
    }
    return w;
  }, []);

  useEffect(() => {
    stateRef.current.stars = buildStars();
    stateRef.current.wisps = buildWisps();
  }, [buildStars, buildWisps]);

  // ── Mouse tracking ────────────────────────────────────────────────────────
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

  // ── Render loop ───────────────────────────────────────────────────────────
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

    const LERP = 0.10;

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
      s.spin   += 0.005;

      // ── LAYER 1 — Outermost diffuse nebula (purple-blue bloom) ──────────
      const nebula = ctx.createRadialGradient(mx, my, PHOTON_OUT, mx, my, NEBULA_R);
      nebula.addColorStop(0,    'rgba(180, 140, 255, 0.16)');
      nebula.addColorStop(0.18, 'rgba(130, 100, 230, 0.12)');
      nebula.addColorStop(0.45, 'rgba( 80,  55, 180, 0.07)');
      nebula.addColorStop(0.75, 'rgba( 40,  25, 110, 0.03)');
      nebula.addColorStop(1,    'rgba(  0,   0,   0, 0)');
      ctx.save();
      ctx.fillStyle = nebula;
      ctx.beginPath();
      ctx.arc(mx, my, NEBULA_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── LAYER 2 — Star field ─────────────────────────────────────────────
      s.stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = 0.4 + 0.6 * Math.sin(star.twinklePhase);
        const a       = star.alpha * twinkle;
        const angle   = star.angle + s.spin * 0.08;
        const px      = mx + Math.cos(angle) * star.dist;
        const py      = my + Math.sin(angle) * star.dist * 0.85;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle   = '#ffffff';
        ctx.shadowColor = '#cce0ff';
        ctx.shadowBlur  = 3;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ── LAYER 3 — Accretion wisps (arc strands, rotating) ───────────────
      s.wisps.forEach((w) => {
        w.startAngle += w.speed;
        const sa = w.startAngle + s.spin;
        ctx.save();
        ctx.translate(mx, my);
        ctx.scale(1, w.yScale);
        ctx.strokeStyle = `hsla(${w.hue}, ${w.sat}%, ${w.lit}%, ${w.alpha})`;
        ctx.lineWidth   = w.width;
        ctx.shadowColor = `hsla(${w.hue}, 55%, 88%, 0.35)`;
        ctx.shadowBlur  = 10;
        ctx.beginPath();
        ctx.arc(0, 0, w.radius, sa, sa + w.arcLen);
        ctx.stroke();
        ctx.restore();
      });

      // ── LAYER 4 — Outer photon ring: broad warm-white radial bloom ───────
      const ringBloom = ctx.createRadialGradient(mx, my, THROAT_R, mx, my, PHOTON_OUT + 40);
      ringBloom.addColorStop(0,    'rgba(  0,   0,   0,  0)');
      ringBloom.addColorStop(0.38, 'rgba(200, 190, 255, 0.18)');
      ringBloom.addColorStop(0.55, 'rgba(255, 252, 255, 0.50)');
      ringBloom.addColorStop(0.68, 'rgba(255, 255, 255, 0.72)');
      ringBloom.addColorStop(0.80, 'rgba(240, 235, 255, 0.35)');
      ringBloom.addColorStop(1,    'rgba(160, 140, 220, 0)');
      ctx.save();
      ctx.fillStyle = ringBloom;
      ctx.beginPath();
      ctx.arc(mx, my, PHOTON_OUT + 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── LAYER 5 — Photon ring: sharp bright concentric bands ─────────────
      const ringBands = [
        { r: PHOTON_IN + 2,  lw: 3.5, alpha: 0.92, blur: 16 },
        { r: PHOTON_IN + 8,  lw: 2.8, alpha: 0.75, blur: 12 },
        { r: PHOTON_IN + 16, lw: 2.0, alpha: 0.50, blur: 10 },
        { r: PHOTON_IN + 24, lw: 1.4, alpha: 0.28, blur:  8 },
        { r: PHOTON_IN + 32, lw: 0.8, alpha: 0.12, blur:  5 },
      ];
      ringBands.forEach(({ r, lw, alpha, blur }) => {
        ctx.save();
        ctx.strokeStyle = `rgba(255, 252, 255, ${alpha})`;
        ctx.lineWidth   = lw;
        ctx.shadowColor = 'rgba(230, 220, 255, 0.9)';
        ctx.shadowBlur  = blur;
        ctx.beginPath();
        ctx.arc(mx, my, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });

      // ── LAYER 6 — Shadow throat (ring → core transition, deep recession) ─
      // This is what makes the core look RECESSED, not flat.
      // Goes from semi-transparent just inside the photon ring to full black at core.
      const throat = ctx.createRadialGradient(mx, my, CORE_R, mx, my, PHOTON_IN);
      throat.addColorStop(0,    'rgba( 0,  0,  0, 1)');       // pure black at core edge
      throat.addColorStop(0.25, 'rgba( 4,  2, 12, 0.97)');   // near-black, hint of purple
      throat.addColorStop(0.50, 'rgba(10,  6, 28, 0.90)');   // deep purple-black
      throat.addColorStop(0.72, 'rgba(20, 12, 50, 0.72)');   // purple transition
      throat.addColorStop(0.88, 'rgba(35, 20, 80, 0.40)');   // lighter purple-violet
      throat.addColorStop(1,    'rgba(60, 35,120, 0)');       // fades into ring glow
      ctx.save();
      ctx.fillStyle = throat;
      ctx.beginPath();
      ctx.arc(mx, my, PHOTON_IN, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ── LAYER 7 — Event horizon (absolute black, deeply recessed core) ───
      // Multi-stop gradient to create depth illusion — slight purple at very
      // centre edge before going pitch black, simulating infinite depth.
      const core = ctx.createRadialGradient(mx, my, 0, mx, my, CORE_R + 4);
      core.addColorStop(0,    '#000000');
      core.addColorStop(0.55, '#000000');
      core.addColorStop(0.78, 'rgba(2, 1, 6, 1)');
      core.addColorStop(0.92, 'rgba(5, 2, 18, 0.98)');
      core.addColorStop(1,    'rgba(0, 0, 0, 0)');
      ctx.save();
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(mx, my, CORE_R + 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Crisp black disc on top — ensures hard edge
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
