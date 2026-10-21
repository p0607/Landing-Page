import React, { useEffect, useRef } from 'react';
import './FestiveBackground.css';

/*
  Festive night scene rendered behind the landing page:
  moon & clouds, rotating mandala, hills with temples and diyas, hanging garlands,
  fog, cursor lantern glow, and two canvases (stars, wisps, fireworks behind;
  embers and floating lanterns in front). Everything is pointer-events: none.
*/

const THEME = {
  ember: '255,190,80',
  wisps: ['255,170,60', '255,90,140', '255,210,100', '255,120,60'],
  wispCount: 22,
  wispAlpha: 1.1,
  stars: ['#fff', '#ffe6a8', '#ffc0d8'],
  skyLanterns: 7,
  emberDensity: 1.1,
};

const FIREWORK_COLORS = ['255,200,70', '255,100,150', '255,150,60', '200,120,255', '255,240,170'];

const GARLAND_STRINGS = [[18, 150], [54, 250], [92, 190], [130, 300], [168, 220]];

const MANDALA_RINGS = [[12, 40, 100, 22], [16, 105, 165, 22], [24, 170, 230, 18]];
const MANDALA_CIRCLES = [35, 100, 168, 236, 252];

const CRATERS = [
  { left: '24%', top: '26%', width: '20%', height: '20%' },
  { left: '60%', top: '52%', width: '13%', height: '13%' },
  { left: '38%', top: '64%', width: '9%', height: '9%' },
  { left: '66%', top: '22%', width: '8%', height: '8%' },
];

const TEMPLE = 'V150h8V138h8V124h6V112l8-16 8 16V124h6v14h8v12h8v22z';

const rnd = (a, b) => a + Math.random() * (b - a);

function Garland({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 320">
      {GARLAND_STRINGS.map(([x, len], k) => {
        const beads = [];
        for (let y = 8, i = 0; y < len; y += 13, i++) {
          beads.push(
            <circle
              key={`b${i}`}
              cx={x + (i % 2 ? 1.2 : -1.2)}
              cy={y}
              r={5.2}
              fill={i % 3 === 0 ? '#ffd23a' : '#ff9a1f'}
              stroke="#7a2a08"
              strokeWidth={0.5}
            />
          );
          if (i % 3 === 1) beads.push(<circle key={`h${i}`} cx={x} cy={y} r={1.8} fill="#fff0a0" />);
        }
        return (
          <g
            key={x}
            style={{
              transformOrigin: `${x}px 0px`,
              animation: `fb-garsway ${5 + k * 0.9}s ease-in-out ${-k}s infinite`,
            }}
          >
            <line x1={x} y1={0} x2={x} y2={len} stroke="#8a3b12" strokeWidth={1} />
            {beads}
            <path d={`M${x - 4} ${len}q4 10 8 0z`} fill="#ffd86b" />
          </g>
        );
      })}
    </svg>
  );
}

export default function FestiveBackground() {
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  const skyRef = useRef(null);
  const mandalaRef = useRef(null);
  const hillsRef = useRef(null);
  const propsRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const fg = fgRef.current;
    const bx = bg.getContext('2d');
    const fx = fg.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let VW = 0;
    let VH = 0;

    const sprite = (rgb, size = 64, core = 0.9) => {
      const c = document.createElement('canvas');
      c.width = c.height = size;
      const g = c.getContext('2d');
      const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gr.addColorStop(0, `rgba(${rgb},${core})`);
      gr.addColorStop(0.25, `rgba(${rgb},.45)`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, size, size);
      return c;
    };
    const emberSprite = sprite(THEME.ember);
    const wispSprites = THEME.wisps.map((c) => sprite(c, 96, 0.7));

    const spawnEmber = (init) => ({
      x: rnd(0, VW), y: init ? rnd(0, VH) : VH + rnd(0, 60),
      vy: rnd(16, 52), sw: rnd(10, 38), f: rnd(0.4, 1.4), p: rnd(0, 6.28),
      s: rnd(1.6, 4.2), a: rnd(0.5, 1), life: rnd(0.6, 1),
    });
    const spawnLantern = (init) => ({
      x: rnd(0, VW), y: init ? rnd(VH * 0.2, VH) : VH + rnd(20, 120),
      vy: rnd(14, 30), sw: rnd(8, 22), f: rnd(0.5, 1.2), p: rnd(0, 6.28), s: rnd(1.6, 2.8),
    });

    let stars = [];
    let wisps = [];
    let embers = [];
    let lanterns = [];
    const seed = () => {
      stars = Array.from({ length: Math.min(220, Math.round((VW * VH) / 9000)) }, () => ({
        x: rnd(0, VW), y: Math.pow(Math.random(), 1.5) * VH * 0.7, r: rnd(0.3, 1.35),
        a: rnd(0.25, 0.95), f: rnd(0.6, 2.4), p: rnd(0, 6.28),
        c: THEME.stars[Math.floor(Math.random() * THEME.stars.length)],
      }));
      wisps = Array.from({ length: THEME.wispCount }, (_, i) => ({
        s: wispSprites[i % wispSprites.length], bx: rnd(0, VW), by: rnd(VH * 0.32, VH * 0.92),
        ax: rnd(40, 180), ay: rnd(20, 90), sx: rnd(0.4, 1.1), sy: rnd(0.4, 1.1), p: rnd(0, 6.28),
        size: rnd(70, 170), a: rnd(0.22, 0.5) * THEME.wispAlpha,
      }));
      embers = Array.from({ length: Math.round(Math.min(90, VW / 20) * THEME.emberDensity) }, () => spawnEmber(true));
      lanterns = Array.from({ length: THEME.skyLanterns }, () => spawnLantern(true));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      VW = window.innerWidth;
      VH = window.innerHeight;
      [bg, fg].forEach((c) => {
        c.width = VW * dpr;
        c.height = VH * dpr;
      });
      bx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let fireworks = [];
    let nextFirework = performance.now() + 2500;
    const burst = () => {
      const x = rnd(VW * 0.12, VW * 0.88);
      const y = rnd(VH * 0.1, VH * 0.4);
      const c = FIREWORK_COLORS[(Math.random() * FIREWORK_COLORS.length) | 0];
      const c2 = FIREWORK_COLORS[(Math.random() * FIREWORK_COLORS.length) | 0];
      const n = 54;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.2832 + rnd(-0.05, 0.05);
        const sp = rnd(70, 170) * (i % 2 ? 1 : 0.62);
        fireworks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, l: 1, d: rnd(0.7, 1.15), c: i % 2 ? c : c2 });
      }
    };

    const ptr = {
      x: window.innerWidth / 2, y: window.innerHeight * 0.4, nx: 0, ny: 0,
      sx: window.innerWidth / 2, sy: window.innerHeight * 0.4, snx: 0, sny: 0,
    };
    const onPointerMove = (e) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ptr.ny = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const parallax = [
      [skyRef.current, -9],
      [hillsRef.current, 7],
      [mandalaRef.current, -4],
      [propsRef.current, 11],
    ];
    const glow = glowRef.current;

    let last = performance.now();
    let rafId = 0;
    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      ptr.sx += (ptr.x - ptr.sx) * 0.08;
      ptr.sy += (ptr.y - ptr.sy) * 0.08;
      ptr.snx += (ptr.nx - ptr.snx) * 0.05;
      ptr.sny += (ptr.ny - ptr.sny) * 0.05;
      glow.style.setProperty('--lx', `${ptr.sx}px`);
      glow.style.setProperty('--ly', `${ptr.sy}px`);
      parallax.forEach(([node, k]) => {
        node.style.transform = `translate3d(${(ptr.snx * k).toFixed(2)}px,${(ptr.sny * k * 0.6).toFixed(2)}px,0)`;
      });

      bx.clearRect(0, 0, VW, VH);
      for (const s of stars) {
        bx.globalAlpha = s.a * (0.5 + 0.5 * Math.sin(t * 0.001 * s.f + s.p));
        bx.fillStyle = s.c;
        bx.beginPath();
        bx.arc(s.x, s.y, s.r, 0, 6.2832);
        bx.fill();
      }
      bx.globalCompositeOperation = 'lighter';
      for (const w of wisps) {
        const x = w.bx + Math.sin(t * 0.00018 * w.sx + w.p) * w.ax;
        const y = w.by + Math.cos(t * 0.00022 * w.sy + w.p) * w.ay;
        bx.globalAlpha = w.a * (0.55 + 0.45 * Math.sin(t * 0.0009 + w.p * 3));
        bx.drawImage(w.s, x - w.size / 2, y - w.size / 2, w.size, w.size);
      }
      bx.globalCompositeOperation = 'source-over';
      bx.globalAlpha = 1;
      if (!reduce) {
        if (t > nextFirework) {
          burst();
          nextFirework = t + rnd(5000, 10000);
        }
        if (fireworks.length) {
          bx.save();
          bx.globalCompositeOperation = 'lighter';
          bx.lineCap = 'round';
          bx.lineWidth = 2;
          for (let i = fireworks.length - 1; i >= 0; i--) {
            const p = fireworks[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 55 * dt;
            p.vx *= 0.985;
            p.vy *= 0.985;
            p.l -= dt / p.d;
            if (p.l <= 0) {
              fireworks.splice(i, 1);
              continue;
            }
            bx.strokeStyle = `rgba(${p.c},${Math.min(1, p.l * 1.2).toFixed(2)})`;
            bx.beginPath();
            bx.moveTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04);
            bx.lineTo(p.x, p.y);
            bx.stroke();
          }
          bx.restore();
        }
      }

      fx.clearRect(0, 0, VW, VH);
      fx.globalCompositeOperation = 'lighter';
      for (const e of embers) {
        e.y -= e.vy * dt;
        e.x += Math.sin(t * 0.001 * e.f + e.p) * e.sw * dt;
        e.life -= dt * 0.05;
        if (e.y < -20 || e.life <= 0) Object.assign(e, spawnEmber(false));
        const fade = Math.min(1, (VH - e.y) / 120) * Math.min(1, e.y / 200 + 0.2);
        fx.globalAlpha = Math.max(0, e.a * fade * (0.6 + 0.4 * Math.sin(t * 0.008 * e.f + e.p))) * 0.9;
        fx.drawImage(emberSprite, e.x - e.s * 3, e.y - e.s * 3, e.s * 6, e.s * 6);
      }
      fx.globalCompositeOperation = 'source-over';
      fx.globalAlpha = 1;
      for (const b of lanterns) {
        b.y -= b.vy * dt;
        b.x += Math.sin(t * 0.0006 * b.f + b.p) * b.sw * dt;
        if (b.y < -60) Object.assign(b, spawnLantern(false));
        const a = Math.min(1, (VH - b.y) / 160) * Math.min(1, b.y / 120 + 0.3);
        const w = 7 * b.s;
        const h = 10 * b.s;
        fx.globalCompositeOperation = 'lighter';
        fx.globalAlpha = a * 0.7 * (0.8 + 0.2 * Math.sin(t * 0.004 * b.f + b.p));
        fx.drawImage(emberSprite, b.x - b.s * 7, b.y - b.s * 7, b.s * 14, b.s * 14);
        fx.globalCompositeOperation = 'source-over';
        fx.globalAlpha = a * 0.95;
        fx.fillStyle = '#ffb45a';
        fx.fillRect(b.x - w / 2, b.y - h / 2, w, h);
        fx.fillStyle = '#7a2a10';
        fx.fillRect(b.x - w / 2, b.y - h / 2 - 1.5 * b.s, w, 1.5 * b.s);
        fx.fillRect(b.x - w / 2, b.y + h / 2, w, 1.5 * b.s);
      }
      fx.globalAlpha = 1;
      if (!reduce) rafId = requestAnimationFrame(frame);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();
    if (reduce) frame(performance.now());
    else rafId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fb-root" aria-hidden="true">
      <div className="fb-base" />
      <canvas ref={bgRef} className="fb-canvas fb-canvas-back" />

      <div className="fb-layer fb-sky" ref={skyRef}>
        <div className="fb-moon-wrap">
          <div className="fb-moon-rays" />
          <div className="fb-moon">
            {CRATERS.map((style, i) => (
              <i key={i} className="fb-crater" style={style} />
            ))}
          </div>
          <div className="fb-clouds">
            <i className="fb-cloud fb-c1" />
            <i className="fb-cloud fb-c2" />
            <i className="fb-cloud fb-c3" />
          </div>
        </div>
      </div>

      <div className="fb-layer fb-scenery" ref={mandalaRef}>
        <svg className="fb-mand" viewBox="-260 -260 520 520">
          <g fill="none" stroke="#ffc15a" strokeWidth={1.2}>
            {MANDALA_RINGS.flatMap(([n, r0, r1, w]) =>
              Array.from({ length: n }, (_, i) => (
                <path
                  key={`${r0}-${i}`}
                  d={`M0 ${-r0}Q${w} ${-(r0 + r1) / 2} 0 ${-r1}Q${-w} ${-(r0 + r1) / 2} 0 ${-r0}Z`}
                  transform={`rotate(${(i / n) * 360})`}
                />
              ))
            )}
            {MANDALA_CIRCLES.map((r, i) => (
              <circle key={r} r={r} strokeDasharray={i % 2 ? '3 7' : 'none'} />
            ))}
          </g>
        </svg>
      </div>

      <div className="fb-layer fb-scenery" ref={hillsRef}>
        <svg className="fb-hills" viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="fb-hfar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--hill-far-a)' }} />
              <stop offset="1" style={{ stopColor: 'var(--hill-far-b)' }} />
            </linearGradient>
            <linearGradient id="fb-rim" x1="0" x2="1">
              <stop offset="0" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity="0" />
              <stop offset=".5" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity=".55" />
              <stop offset="1" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="fb-dglow">
              <stop offset="0" stopColor="#ffcf5a" stopOpacity="0.65" />
              <stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <path d="M0 118C200 78 380 128 600 102S1000 66 1250 108 1500 98 1600 88V220H0Z" fill="url(#fb-hfar)" />
          <path d="M0 118C200 78 380 128 600 102S1000 66 1250 108 1500 98 1600 88" fill="none" stroke="url(#fb-rim)" strokeWidth="1.2" />
          <path d="M0 162C250 132 420 176 700 150S1150 130 1380 162 1550 150 1600 142V220H0Z" style={{ fill: 'var(--hill-near)' }} />
          <g style={{ fill: 'var(--hill-stone)' }}>
            <path d={`M290 172${TEMPLE}`} />
            <path d="M318 96V84M312 88h16" style={{ stroke: 'var(--hill-stone)' }} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d={`M1210 172${TEMPLE}`} />
            <path d="M1238 96V84M1232 88h16" style={{ stroke: 'var(--hill-stone)' }} strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M1088 170v-18q0-8 8-8t8 8v18zM1112 170v-12q0-6 6-6t6 6v12z" />
          </g>
          <g>
            {Array.from({ length: 15 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${70 + i * (1460 / 14)} 205)`}
                style={{ '--dl': `${(-(i * 0.37) % 2).toFixed(2)}s` }}
              >
                <circle r={26} cy={-9} fill="url(#fb-dglow)" className="fb-dg" />
                <path d="M-9 0Q0 12 9 0Z" fill="#b4521a" stroke="#ffcf5a" strokeWidth={0.8} />
                <path d="M0 -1C-4.5 -6-1.5 -11 0 -17 1.5-11 4.5-6 0 -1Z" fill="#ffd25a" className="fb-fl" />
                <path d="M0 -2C-2 -5-.7 -8 0 -11 .7-8 2-5 0 -2Z" fill="#fff4c0" className="fb-fl" />
              </g>
            ))}
          </g>
        </svg>
      </div>

      <div className="fb-layer fb-scenery" ref={propsRef}>
        <Garland className="fb-garland fb-garland-l" />
        <Garland className="fb-garland fb-garland-r" />
      </div>

      <div className="fb-fog" />
      <div className="fb-fog fb-fog-b" />

      <div className="fb-vignette" />
      <div className="fb-grain" />
      <canvas ref={fgRef} className="fb-canvas fb-canvas-front" />
      <div className="fb-lantern" ref={glowRef} />
    </div>
  );
}
