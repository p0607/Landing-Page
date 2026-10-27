import React, { useEffect, useRef, useState } from 'react';
import './landingpage.css';
import { LogoLettersDefs, LogoWord } from './logoDefs';

const MODULES = [
  { id: 'crm', n: '1', x: 0, y: 0, c: '#c8101e', icon: 'pumpkin', cls: 'pumpkin', t: 'CRM', d: 'Prospects and pipeline', tag: '+18.4%', href: 'https://q9lab.in/crm/login' },
  { id: 'clients', n: '2', x: 330, y: 175, c: '#ff2a38', icon: 'bat', cls: 'bat', t: 'Client Module', d: 'Client accounts and contacts', tag: '99.98%', inv: true, href: 'https://q9lab.in/cms' },
  { id: 'alchemflow', n: '3', x: 662, y: 0, c: '#0a0a0a', icon: 'web', cls: 'web', t: 'Alchemflow', d: 'Vendors and applicants', tag: 'Live Flow', href: 'http://q9lab.in/vms' },
  { id: 'hrms', n: '4', x: 995, y: 175, c: '#ff2a38', icon: 'skull', cls: 'skull', t: 'HRMS', d: 'People and HR ops', tag: 'Global', inv: true, href: 'https://q9lab.in/hrms/' },
  { id: 'financials', n: '5', x: 1325, y: 0, c: '#c8101e', icon: 'ghost', cls: 'ghost', t: 'Financials', d: 'Billing and books', tag: 'Realtime', href: 'http://q9lab.in/vendormanagement/' },
  { id: 'matrix', n: 'AI', x: 662, y: 350, c: '#e01524', icon: 'matrix', cls: 'matrix', t: 'Matrix', d: 'Team insights', tag: 'Autonomous', ai: true, href: 'http://20.244.92.198/COSEC/Login/Login' }
];

const ICONS = {
  pumpkin: (
    <svg viewBox="0 0 24 24">
      <path d="M12 7C9.5 5.5 5 6 3.8 10c-1 3.4.8 8 5 8.2 1.4 0 2.4-.5 3.2-1.2.8.7 1.8 1.2 3.2 1.2 4.2-.2 6-4.8 5-8.2C19 6 14.5 5.5 12 7z" />
      <path d="M12 7v11M8.4 6.6c-1.5 2.4-1.5 8.8 0 11.4M15.6 6.6c1.5 2.4 1.5 8.8 0 11.4M12 7c0-1.7.7-3 2.1-3.6" />
    </svg>
  ),
  bat: (
    <svg viewBox="0 0 24 24">
      <path d="M12 6.2l1.1 1.6c2.3-.9 5-.4 8 2.1-1.1.3-2 .9-2.6 1.9-.9-.7-2-.8-3-.4-.6.9-1 2-1.5 3.1L12 15.6l-2-1.1c-.5-1.1-.9-2.2-1.5-3.1-1-.4-2.1-.3-3 .4-.6-1-1.5-1.6-2.6-1.9 3-2.5 5.7-3 8-2.1z" />
      <path d="M10.7 9.6v.1M13.3 9.6v.1" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24">
      <path d="M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8L20.2 7.2" />
      <path d="M12 6.4l4.2 2.4v4.8L12 16l-4.2-2.4V8.8z" />
      <path d="M12 3.3l7.2 4.2v8.4L12 20.1l-7.2-4.2V7.5z" />
    </svg>
  ),
  skull: (
    <svg viewBox="0 0 24 24">
      <path d="M12 3C7.6 3 4.5 6 4.5 10.2c0 2.3 1 4 2.5 5.1V18c0 .6.4 1 1 1h1.5v1.5H11V19h2v1.5h1.5V19H16c.6 0 1-.4 1-1v-2.7c1.5-1.1 2.5-2.8 2.5-5.1C19.5 6 16.4 3 12 3z" />
      <circle cx="9" cy="10.6" r="1.7" />
      <circle cx="15" cy="10.6" r="1.7" />
      <path d="M12 13.2l-.9 1.7h1.8z" />
    </svg>
  ),
  ghost: (
    <svg viewBox="0 0 24 24">
      <path d="M12 3.4c-3.9 0-6.5 2.9-6.5 6.6v9.3c0 .6.7.9 1.1.5l1.4-1.3c.3-.3.8-.3 1.1 0l1.3 1.2c.3.3.8.3 1.1 0l1.3-1.2c.3-.3.8-.3 1.1 0l1.3 1.2c.3.3.8.3 1.1 0l1.4-1.3c.4-.4 1.1-.1 1.1.5V10c0-3.7-2.6-6.6-6.5-6.6z" />
      <circle cx="9.6" cy="10.2" r="1.05" />
      <circle cx="14.4" cy="10.2" r="1.05" />
      <path d="M10.8 13.4c.7.6 1.7.6 2.4 0" />
    </svg>
  ),
  matrix: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="10.5" r="6.6" />
      <path d="M7 19.6h10M8.6 17.1l-1.3 2.5M15.4 17.1l1.3 2.5" />
      <path className="sp" d="M12 6.9l.95 2.3 2.35.95-2.35.95L12 13.4l-.95-2.3-2.35-.95 2.35-.95z" />
    </svg>
  )
};

const W = 285;
const H = 98;
const NS = 'http://www.w3.org/2000/svg';

export default function LandingPage() {
  const [muted, setMuted] = useState(false);
  const containerRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const fgCanvasRef = useRef(null);
  const linksSvgRef = useRef(null);
  const stageRef = useRef(null);
  const treeLRef = useRef(null);
  const treeRRef = useRef(null);
  const webLRef = useRef(null);
  const webRRef = useRef(null);
  const bloodSvgRef = useRef(null);
  const lanternRef = useRef(null);
  const flashRef = useRef(null);
  const flash2Ref = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    let animId = null;
    let ac = null;
    let sfxOn = !muted;

    const ctx = () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!ac && AudioCtx) ac = new AudioCtx();
        if (ac && ac.state === 'suspended') ac.resume();
        return ac;
      } catch (e) {
        return null;
      }
    };

    const tone = (f, dur, type = 'sine', vol = 0.04, delay = 0, slideTo) => {
      if (!sfxOn || !ac) return;
      if (ac.state !== 'running') return;
      try {
        const o = ac.createOscillator();
        const g = ac.createGain();
        const t = ac.currentTime + delay;
        o.type = type;
        o.frequency.setValueAtTime(f, t);
        if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(vol, t + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(ac.destination);
        o.start(t);
        o.stop(t + dur + 0.05);
      } catch (e) {}
    };

    const hoverChime = (i) => {
      const b = [392, 440, 494, 523, 587, 330][i] || 440;
      tone(b, 0.5, 'sine', 0.035);
      tone(b * 1.5, 0.6, 'triangle', 0.018, 0.05);
    };

    const clickThud = () => {
      tone(120, 0.35, 'sine', 0.09, 0, 45);
      tone(660, 0.25, 'triangle', 0.02, 0.02);
    };

    const onPointerDownFirst = () => ctx();
    window.addEventListener('pointerdown', onPointerDownFirst, { once: true });

    // Connectors
    const el = (n, a = {}, p) => {
      const e = document.createElementNS(NS, n);
      for (const k in a) e.setAttribute(k, a[k]);
      if (p) p.appendChild(e);
      return e;
    };

    const buildLinks = (fast) => {
      const links = linksSvgRef.current;
      if (!links) return;
      const defs = links.querySelector('defs');
      if (!defs) return;
      [...links.children].forEach((c) => {
        if (c !== defs) c.remove();
      });
      defs.querySelectorAll('linearGradient').forEach((g) => g.remove());
      const now = links.getCurrentTime ? links.getCurrentTime() : 0;
      for (let i = 0; i < 4; i++) {
        const a = MODULES[i];
        const b = MODULES[i + 1];
        const x1 = a.x + W;
        const y1 = a.y + H / 2;
        const x2 = b.x;
        const y2 = b.y + H / 2;
        const mx = (x1 + x2) / 2;
        const d = `M${x1} ${y1}C${mx + 14} ${y1} ${mx - 14} ${y2} ${x2} ${y2}`;
        const dd = (fast ? 0.15 + i * 0.18 : 1.35 + i * 0.28).toFixed(2) + 's';
        const gid = 'lg' + i;
        const g = el('linearGradient', { id: gid, gradientUnits: 'userSpaceOnUse', x1, y1: 0, x2, y2: 0 }, defs);
        el('stop', { offset: 0, 'stop-color': a.c }, g);
        el('stop', { offset: 1, 'stop-color': b.c }, g);
        const grp = el('g', { style: `--dd:${dd}` }, links);
        el('path', { d, class: 'glowp', stroke: `url(#${gid})` }, grp);
        el('path', { d, class: 'base', pathLength: 1, stroke: `url(#${gid})` }, grp);
        const fl = el('path', { d, class: 'flow', stroke: '#fff' }, grp);
        fl.style.stroke = `url(#${gid})`;
        const pid = 'cp' + i;
        el('path', { d, id: pid, fill: 'none' }, grp);
        const st = el('g', { class: 'port', transform: `translate(${x1} ${y1})` }, grp);
        el('circle', { r: 4, fill: '#ffffff', stroke: a.c, 'stroke-width': 1.6 }, st);
        const pr = el('circle', { r: 4, fill: 'none', stroke: a.c, 'stroke-width': 1 }, st);
        pr.innerHTML = `<animate attributeName="r" values="4;15" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="2.6s" repeatCount="indefinite"/>`;
        const en = el('g', { class: 'port', transform: `translate(${x2} ${y2})` }, grp);
        el('path', { d: 'M-9 -7L1 0L-9 7', fill: 'none', stroke: b.c, 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', filter: 'url(#orbglow)' }, en);
        const t0 = now + (fast ? 0.8 + i * 0.3 : 2.2 + i * 0.55);
        const dur = (3.2 + i * 0.35).toFixed(2);
        [[4.6, '#e01524', 0, 1], [3.2, b.c, 0.11, 0.8], [2.0, b.c, 0.22, 0.55]].forEach(([r, fill, off, op]) => {
          const c = el('circle', { r, fill, opacity: 0, filter: 'url(#orbglow)' }, grp);
          const bt = (t0 + off).toFixed(2);
          c.innerHTML = `<set attributeName="opacity" to="${op}" begin="${bt}s"/><animateMotion dur="${dur}s" begin="${bt}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".45 0 .55 1"><mpath href="#${pid}"/></animateMotion>`;
        });
      }
    };

    buildLinks(false);

    // Responsive scaling
    const fit = () => {
      const wrap = containerRef.current?.querySelector('.stagewrap');
      const stage = stageRef.current;
      if (!wrap || !stage) return;
      const r = wrap.getBoundingClientRect();
      stage.style.setProperty('--k', Math.max(0.4, Math.min(1.2, r.width / 1700, r.height / 525)).toFixed(3));
    };

    fit();
    window.addEventListener('resize', fit);

    // Procedural Tree & Web Generation
    function prng(s) {
      return () => (s = (s * 16807) % 2147483647) / 2147483647;
    }

    function buildTree(svg, { seed, x, y, len, ang, depth, w0 }) {
      if (!svg) return;
      svg.innerHTML = '';
      const r = prng(seed);
      const lv = Array.from({ length: depth + 1 }, () => []);
      (function grow(x, y, len, ang, d) {
        if (d > depth || len < 3.5) return;
        const x2 = x + Math.cos(ang) * len;
        const y2 = y + Math.sin(ang) * len;
        const bend = (r() - 0.5) * len * 0.4;
        const cx = (x + x2) / 2 + Math.cos(ang + 1.5708) * bend;
        const cy = (y + y2) / 2 + Math.sin(ang + 1.5708) * bend;
        lv[d].push(`M${x.toFixed(1)} ${y.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
        const n = d < 2 ? 2 : (r() < 0.76 ? 2 : (r() < 0.55 ? 1 : 3));
        for (let i = 0; i < n; i++) {
          if (d > 3 && r() < 0.13) continue;
          const spread = (i - (n - 1) / 2) * (0.55 + r() * 0.38) + (r() - 0.5) * 0.32;
          grow(x2, y2, len * (0.7 + r() * 0.13), ang + spread, d + 1);
        }
      })(x, y, len, ang, 0);
      lv.forEach((l, i) => {
        if (!l.length) return;
        el('path', { d: l.join(''), 'stroke-width': Math.max(0.8, w0 * Math.pow(0.64, i)).toFixed(2) }, svg);
      });
    }

    buildTree(treeLRef.current, { seed: 7, x: 120, y: 770, len: 175, ang: -1.42, depth: 9, w0: 26 });
    buildTree(treeRRef.current, { seed: 23, x: 120, y: 770, len: 150, ang: -1.52, depth: 9, w0: 22 });

    function buildWeb(svg) {
      if (!svg) return;
      svg.innerHTML = '';
      const rad = 8;
      const ang = [...Array(rad)].map((_, i) => (i / (rad - 1)) * Math.PI / 2);
      const R = [22, 45, 72, 104, 142, 188];
      let d = '';
      ang.forEach((a) => {
        d += `M0 0L${(Math.cos(a) * 205).toFixed(1)} ${(Math.sin(a) * 205).toFixed(1)}`;
      });
      R.forEach((r, ri) => {
        for (let i = 0; i < rad - 1; i++) {
          const a0 = ang[i];
          const a1 = ang[i + 1];
          const am = (a0 + a1) / 2;
          const sag = r * (0.84 - ri * 0.004);
          d += `M${(Math.cos(a0) * r).toFixed(1)} ${(Math.sin(a0) * r).toFixed(1)}Q${(Math.cos(am) * sag).toFixed(1)} ${(Math.sin(am) * sag).toFixed(1)} ${(Math.cos(a1) * r).toFixed(1)} ${(Math.sin(a1) * r).toFixed(1)}`;
        }
      });
      el('path', { d }, svg);
      [[R[3], ang[2]], [R[4], ang[5]]].forEach(([r, a]) =>
        el('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1.3, fill: '#d71a2d', stroke: 'none', opacity: 0.8 }, svg)
      );
    }

    buildWeb(webLRef.current);
    buildWeb(webRRef.current);

    // Blood Drips
    if (bloodSvgRef.current) {
      const svg = bloodSvgRef.current;
      const r = prng(11);
      let d = 'M0 0H1600V14';
      for (let x = 1600; x > 0; x -= 40) {
        d += `Q${x - 20} ${(8 + r() * 20).toFixed(1)} ${x - 40} ${(10 + r() * 12).toFixed(1)}`;
      }
      el('path', { d: d + 'V0Z', fill: 'url(#bloodg)' }, svg);
      [70, 180, 300, 430, 540, 1080, 1210, 1340, 1450, 1540].forEach((x) => {
        const w = 7 + r() * 7;
        const L = 38 + r() * 90;
        const g = el('g', { class: 'drip', style: `--dl:${(-r() * 8).toFixed(2)}s` }, svg);
        el('rect', { x: x - w / 2, y: 8, width: w, height: L, rx: w / 2, fill: 'url(#bloodg)' }, g);
        el('rect', { x: x - w / 2 + w * 0.2, y: 14, width: w * 0.2, height: L * 0.6, rx: w * 0.1, fill: '#ff7a7a', opacity: 0.45 }, g);
      });
    }

    // Canvas Engine
    const bg = bgCanvasRef.current;
    const fg = fgCanvasRef.current;
    if (!bg || !fg) return;
    const bx = bg.getContext('2d');
    const fx = fg.getContext('2d');
    let VW = window.innerWidth;
    let VH = window.innerHeight;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);

    const rnd = (a, b) => a + Math.random() * (b - a);

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

    const T = {
      ember: '200,16,30',
      wisps: ['200,16,30', '200,16,30', '255,255,255', '110,110,110'],
      wispN: 16,
      wispA: 0.55,
      stars: ['#0a0a0a', '#c8101e', '#0a0a0a'],
      bats: 5,
      emberN: 0.9,
      emberMul: 0.8,
      batEye: 'rgba(255,40,50,.95)',
      batStroke: 'rgba(200,16,30,.5)',
      bolt: { glow: '#ff1a2a', core: '#0a0a0a', branch: 'rgba(200,16,30,.9)' },
      flash: '#ff2030'
    };

    const SP = {
      ember: sprite(T.ember),
      w: T.wisps.map((c) => sprite(c, 96, 0.7))
    };

    let stars = [];
    let wisps = [];
    let embers = [];
    let bats = [];
    let drops = [];

    const spawnEmber = (init) => ({
      x: rnd(0, VW),
      y: init ? rnd(0, VH) : VH + rnd(0, 60),
      vy: rnd(16, 52),
      sw: rnd(10, 38),
      f: rnd(0.4, 1.4),
      p: rnd(0, 6.28),
      s: rnd(1.6, 4.2),
      a: rnd(0.5, 1),
      life: rnd(0.6, 1)
    });

    const spawnBat = (init) => {
      const dir = Math.random() < 0.5 ? 1 : -1;
      const depth = rnd(0.35, 1);
      return {
        x: init ? rnd(0, VW) : dir > 0 ? -80 : VW + 80,
        y: rnd(70, 250),
        vx: dir * rnd(40, 110) * (0.5 + depth),
        dir,
        s: 0.38 + depth * 0.5,
        depth,
        flap: rnd(0, 6.28),
        fs: rnd(10, 16),
        wob: rnd(0.5, 1.4),
        wa: rnd(18, 60),
        wp: rnd(0, 6.28),
        by: 0
      };
    };

    const seedCanvas = () => {
      stars = Array.from({ length: Math.min(220, Math.round((VW * VH) / 9000)) }, () => ({
        x: rnd(0, VW),
        y: Math.pow(Math.random(), 1.5) * VH * 0.7,
        r: rnd(0.3, 1.35),
        a: rnd(0.15, 0.55),
        f: rnd(0.6, 2.4),
        p: rnd(0, 6.28),
        c: T.stars[Math.floor(Math.random() * T.stars.length)]
      }));
      wisps = Array.from({ length: T.wispN }, (_, i) => ({
        s: SP.w[i % SP.w.length],
        bx: rnd(0, VW),
        by: rnd(VH * 0.32, VH * 0.92),
        ax: rnd(40, 180),
        ay: rnd(20, 90),
        sx: rnd(0.4, 1.1),
        sy: rnd(0.4, 1.1),
        p: rnd(0, 6.28),
        size: rnd(70, 170),
        a: rnd(0.22, 0.5) * T.wispA
      }));
      embers = Array.from({ length: Math.round(Math.min(90, VW / 20) * T.emberN) }, () => spawnEmber(true));
      bats = Array.from({ length: T.bats }, () => spawnBat(true));
      drops = Array.from({ length: Math.round(VW / 13) }, () => ({
        x: rnd(-120, VW),
        y: rnd(0, VH),
        l: rnd(12, 34),
        v: rnd(900, 1500),
        c: `rgba(200,16,30,${rnd(0.1, 0.28).toFixed(2)})`
      }));
    };

    const resizeCanvas = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      VW = window.innerWidth;
      VH = window.innerHeight;
      [bg, fg].forEach((c) => {
        c.width = VW * DPR;
        c.height = VH * DPR;
      });
      bx.setTransform(DPR, 0, 0, DPR, 0, 0);
      fx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedCanvas();
      fit();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawBat = (c, b) => {
      const f = Math.sin(b.flap);
      c.save();
      c.translate(b.x, b.y);
      c.scale(b.s * b.dir, b.s);
      c.fillStyle = '#050209';
      c.strokeStyle = T.batStroke;
      c.lineWidth = 0.9;
      for (const sg of [-1, 1]) {
        c.beginPath();
        c.moveTo(sg * 3, -3);
        c.quadraticCurveTo(sg * 20, -20 - 15 * f, sg * 46, -9 - 22 * f);
        c.quadraticCurveTo(sg * 38, 0 - 9 * f, sg * 33, 3 - 7 * f);
        c.quadraticCurveTo(sg * 29, 10 - 5 * f, sg * 22, 7 - 4 * f);
        c.quadraticCurveTo(sg * 15, 13 - 3 * f, sg * 9, 7 - 1 * f);
        c.quadraticCurveTo(sg * 5, 6, sg * 3, 5);
        c.closePath();
        c.fill();
        c.stroke();
      }
      c.beginPath();
      c.ellipse(0, 1, 5, 9, 0, 0, 6.2832);
      c.fill();
      c.beginPath();
      c.moveTo(-3.6, -6);
      c.lineTo(-4.4, -14);
      c.lineTo(0, -8.5);
      c.lineTo(4.4, -14);
      c.lineTo(3.6, -6);
      c.closePath();
      c.fill();
      c.fillStyle = T.batEye;
      c.fillRect(-2.6, -5.2, 1.3, 1.3);
      c.fillRect(1.3, -5.2, 1.3, 1.3);
      c.restore();
    };

    // Lightning
    let bolt = null;
    let nextBolt = performance.now() + 3800;

    const genBolt = (x0, y0, x1, y1, disp, out, depth = 0) => {
      if (disp < 5) {
        out.push([x0, y0, x1, y1, depth]);
        return;
      }
      const mx = (x0 + x1) / 2 + (Math.random() - 0.5) * disp;
      const my = (y0 + y1) / 2 + (Math.random() - 0.5) * disp * 0.35;
      genBolt(x0, y0, mx, my, disp / 2, out, depth);
      genBolt(mx, my, x1, y1, disp / 2, out, depth);
      if (depth < 2 && disp > 20 && Math.random() < 0.22) {
        genBolt(mx, my, mx + (Math.random() - 0.5) * disp * 3.2, my + disp * 1.5, disp / 2.1, out, depth + 1);
      }
    };

    const boltAlpha = (age) => (age < 70 ? 1 : age < 125 ? 0.22 : age < 210 ? 0.95 : Math.max(0, 0.95 * (1 - (age - 210) / 480)));

    const thunder = (dist) => {
      if (!sfxOn || !ac || ac.state !== 'running') return;
      try {
        const len = 3.4 + dist * 1.8;
        const sr = ac.sampleRate;
        const n = Math.floor(sr * len);
        const buf = ac.createBuffer(1, n, sr);
        const d = buf.getChannelData(0);
        let lastN = 0;
        for (let i = 0; i < n; i++) {
          lastN = (lastN + 0.02 * (Math.random() * 2 - 1)) / 1.02;
          d[i] = lastN * 3;
        }
        const src = ac.createBufferSource();
        src.buffer = buf;
        const lp = ac.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(1100 / (0.5 + dist), ac.currentTime);
        lp.frequency.exponentialRampToValueAtTime(60, ac.currentTime + len);
        const g = ac.createGain();
        const vol = 0.5 / (0.7 + dist * 0.5);
        g.gain.setValueAtTime(0, ac.currentTime);
        g.gain.linearRampToValueAtTime(vol, ac.currentTime + 0.06);
        for (let k = 1; k < 6; k++) {
          g.gain.linearRampToValueAtTime(vol * (1 - k * 0.14) * (0.55 + 0.45 * Math.random()), ac.currentTime + 0.06 + (k * len) / 7);
        }
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + len);
        src.connect(lp).connect(g).connect(ac.destination);
        src.start(ac.currentTime);
      } catch (e) {}
    };

    const startle = () => {
      document.querySelectorAll('.crow').forEach((c) => {
        c.classList.remove('startle');
        void c.getBoundingClientRect();
        c.classList.add('startle');
        setTimeout(() => c.classList.remove('startle'), 1000);
      });
      tone(520, 0.16, 'sawtooth', 0.02, 0, 330);
      tone(470, 0.2, 'sawtooth', 0.018, 0.22, 290);
      tone(540, 0.15, 'sawtooth', 0.016, 0.5, 340);
    };

    const flareCastles = () => {
      document.querySelectorAll('.castle').forEach((c) => {
        c.classList.add('flare');
        setTimeout(() => c.classList.remove('flare'), 650);
      });
    };

    const startBolt = (t, xo) => {
      const x = xo != null ? xo : Math.random() < 0.5 ? rnd(VW * 0.04, VW * 0.3) : rnd(VW * 0.68, VW * 0.95);
      const segs = [];
      genBolt(x, -10, x + rnd(-140, 140), VH * rnd(0.55, 0.85), 210, segs);
      bolt = { segs, t0: t };
      flareCastles();
      const dist = rnd(0.25, 1.5);
      setTimeout(() => {
        thunder(dist);
        startle();
      }, 120 + dist * 700);
    };

    const drawRain = (dt) => {
      const k = bolt ? 1.7 : 1;
      bx.save();
      bx.lineWidth = 1;
      bx.lineCap = 'round';
      for (const q of drops) {
        q.y += q.v * dt * k;
        q.x -= q.v * dt * 0.16 * k;
        if (q.y > VH + 40 || q.x < -60) {
          q.y = rnd(-90, -10);
          q.x = rnd(0, VW + 180);
        }
        bx.strokeStyle = q.c;
        bx.beginPath();
        bx.moveTo(q.x, q.y);
        bx.lineTo(q.x + q.l * 0.16, q.y - q.l);
        bx.stroke();
      }
      bx.restore();
    };

    // Pointer Tracking
    const ptr = {
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.4,
      nx: 0,
      ny: 0,
      sx: window.innerWidth / 2,
      sy: window.innerHeight * 0.4,
      snx: 0,
      sny: 0
    };

    const onPointerMove = (e) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      ptr.nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ptr.ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (logoRef.current) {
        logoRef.current.style.setProperty('--lx', ptr.nx.toFixed(3));
        logoRef.current.style.setProperty('--ly', ptr.ny.toFixed(3));
      }
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const par = [
      ['#L-sky', -9],
      ['#L-hills', 7],
      ['#L-castle', 8],
      ['#L-trees', 15],
      ['#L-scare', 12],
      ['#L-vamp', 12],
      ['#L-props', 11],
      ['#L-stage', -5]
    ].map(([s, k]) => [document.querySelector(s), k]);

    // Click lightning trigger
    const onWindowClick = (e) => {
      if (bolt || e.target.closest('.node, .pk, .mute')) return;
      startBolt(performance.now(), e.clientX);
    };
    window.addEventListener('click', onWindowClick);

    // 3D Tilt for cards
    const slotElements = document.querySelectorAll('.slot');
    slotElements.forEach((s, idx) => {
      const node = s.querySelector('.node');
      if (!node) return;
      s.addEventListener('pointerenter', () => hoverChime(idx));
      s.addEventListener('pointermove', (e) => {
        const r = node.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        node.style.setProperty('--px', px * 100 + '%');
        node.style.setProperty('--py', py * 100 + '%');
        node.style.transform = `perspective(900px) rotateY(${((px - 0.5) * 11).toFixed(2)}deg) rotateX(${((0.5 - py) * 9).toFixed(2)}deg) translateZ(0)`;
      });
      s.addEventListener('pointerleave', () => {
        node.style.transform = '';
      });
      node.addEventListener('click', (e) => {
        clickThud();
        const r = node.getBoundingClientRect();
        const k = r.width / W;
        const rp = document.createElement('span');
        rp.className = 'ripple';
        rp.style.left = (e.clientX - r.left) / k + 'px';
        rp.style.top = (e.clientY - r.top) / k + 'px';
        const scan = node.querySelector('.scan');
        if (scan) {
          scan.appendChild(rp);
          setTimeout(() => rp.remove(), 900);
        }
      });
    });

    // Animation Loop
    let last = performance.now();
    const frame = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      ptr.sx += (ptr.x - ptr.sx) * 0.08;
      ptr.sy += (ptr.y - ptr.sy) * 0.08;
      ptr.snx += (ptr.nx - ptr.snx) * 0.05;
      ptr.sny += (ptr.ny - ptr.sny) * 0.05;

      if (lanternRef.current) {
        lanternRef.current.style.setProperty('--lx', ptr.sx + 'px');
        lanternRef.current.style.setProperty('--ly', ptr.sy + 'px');
      }

      par.forEach(([e, k]) => {
        if (e) e.style.transform = `translate3d(${(ptr.snx * k).toFixed(2)}px,${(ptr.sny * k * 0.6).toFixed(2)}px,0)`;
      });

      // Background
      bx.clearRect(0, 0, VW, VH);
      for (const s of stars) {
        bx.globalAlpha = s.a * (0.5 + 0.5 * Math.sin(t * 0.001 * s.f + s.p));
        bx.fillStyle = s.c;
        bx.beginPath();
        bx.arc(s.x, s.y, s.r, 0, 6.2832);
        bx.fill();
      }
      bx.globalCompositeOperation = 'source-over';
      for (const w of wisps) {
        const x = w.bx + Math.sin(t * 0.00018 * w.sx + w.p) * w.ax;
        const y = w.by + Math.cos(t * 0.00022 * w.sy + w.p) * w.ay;
        bx.globalAlpha = w.a * (0.55 + 0.45 * Math.sin(t * 0.0009 + w.p * 3));
        bx.drawImage(w.s, x - w.size / 2, y - w.size / 2, w.size, w.size);
      }
      bx.globalCompositeOperation = 'source-over';
      bx.globalAlpha = 1;

      drawRain(dt);

      if (!bolt && t > nextBolt) {
        startBolt(t);
      }

      if (bolt) {
        const age = t - bolt.t0;
        const a = boltAlpha(age);
        if (a <= 0) {
          bolt = null;
          nextBolt = t + rnd(8000, 15000);
          if (flashRef.current) flashRef.current.style.opacity = '0';
          if (flash2Ref.current) flash2Ref.current.style.opacity = '0';
        } else {
          if (flashRef.current) flashRef.current.style.opacity = (a * 0.16).toFixed(3);
          if (flash2Ref.current) flash2Ref.current.style.opacity = (a * 0.24).toFixed(3);
          bx.save();
          bx.globalAlpha = a;
          bx.lineCap = 'round';
          bx.shadowColor = T.bolt.glow;
          bx.shadowBlur = 26;
          for (const [x0, y0, x1, y1, dp] of bolt.segs) {
            bx.strokeStyle = dp ? 'rgba(255,40,60,.9)' : '#ff1a2a';
            bx.lineWidth = dp ? 1.8 : 4.6;
            bx.beginPath();
            bx.moveTo(x0, y0);
            bx.lineTo(x1, y1);
            bx.stroke();
          }
          bx.shadowBlur = 0;
          for (const [x0, y0, x1, y1, dp] of bolt.segs) {
            bx.strokeStyle = dp ? 'rgba(255,200,200,.9)' : '#fff4f4';
            bx.lineWidth = dp ? 0.6 : 1.5;
            bx.beginPath();
            bx.moveTo(x0, y0);
            bx.lineTo(x1, y1);
            bx.stroke();
          }
          bx.restore();
        }
      }

      // Foreground
      fx.clearRect(0, 0, VW, VH);
      fx.globalCompositeOperation = 'source-over';
      for (const e of embers) {
        e.y -= e.vy * dt * T.emberMul;
        e.x += Math.sin(t * 0.001 * e.f + e.p) * e.sw * dt;
        e.life -= dt * 0.05;
        if (e.y < -20 || e.life <= 0) {
          Object.assign(e, spawnEmber(false));
        }
        const fade = Math.min(1, (VH - e.y) / 120) * Math.min(1, e.y / 200 + 0.2);
        fx.globalAlpha = Math.max(0, e.a * fade * (0.6 + 0.4 * Math.sin(t * 0.008 * e.f + e.p))) * 0.9;
        fx.drawImage(SP.ember, e.x - e.s * 3, e.y - e.s * 3, e.s * 6, e.s * 6);
      }
      fx.globalCompositeOperation = 'source-over';
      fx.globalAlpha = 1;

      for (const b of bats) {
        b.x += b.vx * dt;
        b.flap += b.fs * dt * (0.8 + 0.4 * Math.sin(t * 0.002 + b.wp));
        b.wp += dt;
        if (!b.by) b.by = b.y;
        b.y = b.by + Math.sin(t * 0.001 * b.wob + b.wp) * b.wa * 0.5;
        if (b.x < -120 || b.x > VW + 120) {
          Object.assign(b, spawnBat(false), { by: 0 });
        }
        fx.globalAlpha = 0.55 + b.depth * 0.45;
        drawBat(fx, b);
      }
      fx.globalAlpha = 1;

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('click', onWindowClick);
      window.removeEventListener('resize', fit);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', onPointerDownFirst);
      if (ac) {
        try {
          ac.close();
        } catch (e) {}
      }
    };
  }, [muted]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <canvas id="bg" ref={bgCanvasRef} aria-hidden="true" />

      {/* Sky: moon, rays, drifting clouds */}
      <div className="layer sky" id="L-sky" aria-hidden="true">
        <div className="moon-wrap">
          <div className="moon-rays" />
          <div className="moon">
            <i className="crater" style={{ left: '24%', top: '26%', width: '20%', height: '20%' }} />
            <i className="crater" style={{ left: '60%', top: '52%', width: '13%', height: '13%' }} />
            <i className="crater" style={{ left: '38%', top: '64%', width: '9%', height: '9%' }} />
            <i className="crater" style={{ left: '66%', top: '22%', width: '8%', height: '8%' }} />
          </div>
          <div className="clouds">
            <i className="cloud c1" />
            <i className="cloud c2" />
            <i className="cloud c3" />
          </div>
        </div>
      </div>

      {/* Scenery: trees, hills, castle, scarecrows, vampires, webs, spider */}
      <div className="layer scenery" id="L-trees" aria-hidden="true">
        <svg className="tree l" id="treeL" ref={treeLRef} viewBox="0 0 700 760" />
        <svg className="tree r" id="treeR" ref={treeRRef} viewBox="0 0 700 760" />
      </div>
      <div className="layer scenery" id="L-hills" aria-hidden="true">
        <svg className="hills" viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="hfar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--hill-far-a)' }} />
              <stop offset="1" style={{ stopColor: 'var(--hill-far-b)' }} />
            </linearGradient>
            <linearGradient id="rim" x1="0" x2="1">
              <stop offset="0" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity="0" />
              <stop offset="0.5" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity="0.55" />
              <stop offset="1" style={{ stopColor: 'rgb(var(--acc-rgb))' }} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 118C200 78 380 128 600 102S1000 66 1250 108 1500 98 1600 88V220H0Z" fill="url(#hfar)" />
          <path d="M0 118C200 78 380 128 600 102S1000 66 1250 108 1500 98 1600 88" fill="none" stroke="url(#rim)" strokeWidth="1.2" />
          <path d="M0 162C250 132 420 176 700 150S1150 130 1380 162 1550 150 1600 142V220H0Z" style={{ fill: 'var(--hill-near)' }} />
          <g style={{ fill: 'var(--hill-stone)' }}>
            <path d="M300 172v-30q0-12 12-12t12 12v30z" />
            <path d="M345 174v-22q0-9 9-9t9 9v22z" />
            <path d="M1130 160v-28q0-11 11-11t11 11v28z" />
            <path d="M1176 162v-20q0-8 8-8t8 8v20z" />
          </g>
          <g style={{ stroke: 'var(--hill-stone)' }} strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M880 156v-36M868 132h24" />
            <path d="M520 176v-26M511 158h18" />
          </g>
        </svg>
      </div>

      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1e060a" />
            <stop offset="1" stopColor="#040404" />
          </linearGradient>
          <radialGradient id="cback" cx="50%" cy="60%" r="60%">
            <stop offset="0" stopColor="#c8101e" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c8101e" stopOpacity="0" />
          </radialGradient>
          <pattern id="plaid" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#a80c1a" />
            <rect width="10" height="3" fill="#2a0508" opacity="0.85" />
            <rect width="3" height="10" fill="#2a0508" opacity="0.85" />
            <rect y="6" width="10" height="1.5" fill="#efe6c8" opacity="0.55" />
          </pattern>
        </defs>
      </svg>

      <div className="layer scenery" id="L-castle" aria-hidden="true">
        <svg className="castle main" viewBox="-20 -34 460 340" aria-hidden="true">
          <ellipse className="back" cx="210" cy="190" rx="250" ry="140" fill="url(#cback)" />
          <g className="cbody" fill="url(#cg)" stroke="rgba(255,60,70,.38)" strokeWidth="1">
            <rect x="16" y="132" width="58" height="170" />
            <path d="M8 134L82 134L45 46Z" />
            <path d="M74 302V214h14v12h14v-12h14v12h4v-12V302Z" />
            <path d="M120 302V160h14v12h14v-12h14v12h14v-12h14v12h14v-12h14v12h14v-12h14v12h14v-12h14v12h14v-12h2v12V302Z" />
            <rect x="172" y="74" width="66" height="100" />
            <path d="M162 76L248 76L205 6Z" />
            <rect x="128" y="120" width="30" height="44" />
            <path d="M123 122L163 122L143 84Z" />
            <path d="M290 302V112h14v12h14v-12h14v12h14v-12h6v12V302Z" />
            <path d="M284 114L358 114L321 34Z" />
            <path d="M352 302V226h14v12h14v-12h14v12h14v-12h6v12V302Z" />
            <rect x="204" y="-12" width="2" height="22" />
            <rect x="44" y="30" width="2" height="20" />
            <rect x="320" y="16" width="2" height="22" />
          </g>
          <g className="cflags" fill="#0a0a0a" stroke="rgba(255,60,70,.5)" strokeWidth="0.6">
            <path className="flag" d="M206 -12l24 6l-24 6z" style={{ '--fd': '0s' }} />
            <path className="flag" d="M46 30l24 6l-24 6z" style={{ '--fd': '0.4s' }} />
            <path className="flag" d="M322 16l24 6l-24 6z" style={{ '--fd': '0.8s' }} />
          </g>
          <path className="winr" style={{ '--wd': '1.2s' }} d="M190 302v-36a15 15 0 0 1 30 0v36z" />
          <g>
            <path className="win" style={{ '--wd': '0.2s' }} d="M34 186v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '1.1s' }} d="M34 236v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '0.7s' }} d="M138 150v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '1.6s' }} d="M144 214v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '0.4s' }} d="M256 214v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="winr" style={{ '--wd': '2.1s' }} d="M197 120v-18a5.5 5.5 0 0 1 11 0v18z" />
            <path className="win" style={{ '--wd': '0.9s' }} d="M200 100v-10a3.5 3.5 0 0 1 7 0v10z" />
            <path className="win" style={{ '--wd': '1.3s' }} d="M308 176v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '0.1s' }} d="M308 236v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '1.9s' }} d="M378 272v-14a4.5 4.5 0 0 1 9 0v14z" />
            <path className="win" style={{ '--wd': '0.6s' }} d="M98 262v-11a3.5 3.5 0 0 1 7 0v11z" />
            <path className="win" style={{ '--wd': '1.5s' }} d="M380 252v-11a3.5 3.5 0 0 1 7 0v11z" />
          </g>
          <g className="cbats" fill="#000">
            <g>
              <path className="cbat" d="M0 2Q-6 -6 -14 -2Q-9 -1 -8 3Q-4 1 0 4Q4 1 8 3Q9 -1 14 -2Q6 -6 0 2Z" />
              <animateMotion dur="7s" begin="0s" repeatCount="indefinite" path="M119 66a86 24 0 1 0 172 0a86 24 0 1 0 -172 0" />
            </g>
            <g>
              <path className="cbat" d="M0 2Q-6 -6 -14 -2Q-9 -1 -8 3Q-4 1 0 4Q4 1 8 3Q9 -1 14 -2Q6 -6 0 2Z" />
              <animateMotion dur="5.5s" begin="-1.5s" repeatCount="indefinite" path="M135 52a70 18 0 1 0 140 0a70 18 0 1 0 -140 0" />
            </g>
            <g>
              <path className="cbat" d="M0 2Q-6 -6 -14 -2Q-9 -1 -8 3Q-4 1 0 4Q4 1 8 3Q9 -1 14 -2Q6 -6 0 2Z" />
              <animateMotion dur="6.2s" begin="-2s" repeatCount="indefinite" path="M269 60a52 16 0 1 0 104 0a52 16 0 1 0 -104 0" />
            </g>
            <g>
              <path className="cbat" d="M0 2Q-6 -6 -14 -2Q-9 -1 -8 3Q-4 1 0 4Q4 1 8 3Q9 -1 14 -2Q6 -6 0 2Z" />
              <animateMotion dur="4.8s" begin="-0.7s" repeatCount="indefinite" path="M1 76a44 14 0 1 0 88 0a44 14 0 1 0 -88 0" />
            </g>
            <g>
              <path className="cbat" d="M0 2Q-6 -6 -14 -2Q-9 -1 -8 3Q-4 1 0 4Q4 1 8 3Q9 -1 14 -2Q6 -6 0 2Z" />
              <animateMotion dur="9s" begin="-3s" repeatCount="indefinite" path="M95 100a110 30 0 1 0 220 0a110 30 0 1 0 -220 0" />
            </g>
          </g>
        </svg>
      </div>

      <div className="layer" id="L-scare" aria-hidden="true">
        <div className="scare a">
          <svg viewBox="-20 0 200 262" aria-hidden="true">
            <g className="sc">
              <rect x="76" y="30" width="8" height="232" fill="#21140f" />
              <rect x="82" y="30" width="2" height="232" fill="#3a251a" />
              <path d="M52 150L108 150L112 236L90 236L80 192L70 236L48 236Z" fill="#141414" stroke="rgba(255,60,70,.25)" strokeWidth="0.8" />
              <rect x="55" y="190" width="15" height="15" fill="#efe6c8" transform="rotate(-7 62 197)" />
              <path d="M56 192l13-3M55 200l14 -3" stroke="#555" strokeWidth="1" strokeDasharray="2 2" />
              <g className="hay" stroke="#efe6c8" strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path d="M50 234l-8 12M56 236l-4 14M64 236l-1 13" />
                <path d="M96 236l2 13M104 234l6 12M110 232l10 8" />
              </g>
              <path d="M44 88L116 88L122 156L114 166L104 158L94 168L84 158L74 168L64 158L54 168L46 158L38 156Z" fill="url(#plaid)" stroke="rgba(0,0,0,.5)" strokeWidth="0.8" />
              <rect x="6" y="82" width="148" height="7" rx="2" fill="#21140f" transform="rotate(-1.2 80 85)" />
              <path d="M46 88L10 84L8 100L16 97L20 108L30 100L38 110L50 108Z" fill="url(#plaid)" stroke="rgba(0,0,0,.5)" strokeWidth="0.8" />
              <path d="M114 88L150 84L152 100L144 97L140 108L130 100L122 110L110 108Z" fill="url(#plaid)" stroke="rgba(0,0,0,.5)" strokeWidth="0.8" />
              <g className="hay" stroke="#efe6c8" strokeWidth="2.2" strokeLinecap="round" fill="none">
                <path d="M8 90L-6 84M8 94L-9 95M8 98L-5 106M10 101L2 111" />
                <path d="M152 90L166 84M152 94L169 95M152 98L165 106M150 101L158 111" />
                <path d="M66 90L58 80M72 90L68 76M80 88L80 74M88 90L92 76M94 90L102 80" />
              </g>
              <circle cx="80" cy="56" r="25" fill="#e6dcc0" />
              <path d="M57 64q23 26 46 0q-4 20 -23 22q-19 -2 -23 -22z" fill="rgba(0,0,0,.14)" />
              <path d="M80 31v50" stroke="#7a6844" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="70" cy="52" r="6.5" fill="#111" />
              <circle cx="90" cy="52" r="6.5" fill="#111" />
              <ellipse className="seye" cx="70" cy="52" rx="3.8" ry="2.8" />
              <ellipse className="seye" cx="90" cy="52" rx="3.8" ry="2.8" />
              <path d="M80 58l-3 8h6z" fill="#b9a67a" />
              <path d="M62 70l4 4l5 -4l5 4l5 -4l5 4l5 -4l4 4" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M64 68v7M72 68v7M80 68v7M88 68v7M96 68v7" stroke="#111" strokeWidth="1" opacity="0.7" />
              <ellipse cx="80" cy="36" rx="43" ry="8" fill="#0b0b0b" />
              <path d="M56 36L60 10Q80 2 100 10L104 36Z" fill="#0b0b0b" />
              <path d="M64 12Q80 21 96 12" stroke="#2a2a2a" fill="none" />
              <rect x="57" y="26" width="46" height="7" fill="#c8101e" />
              <circle cx="96" cy="25" r="4" fill="#efe6c8" />
              <path d="M38 36Q80 47 122 36" stroke="rgba(255,60,70,.45)" fill="none" />
              <g className="crow" transform="translate(126 70)" fill="#050505">
                <path d="M10 0l17 6l-4 -9z" />
                <ellipse cx="0" cy="0" rx="11" ry="7" />
                <path d="M-3 -1Q10 -11 22 0Q8 7 -3 4z" fill="#0c0c0c" />
                <g className="chead">
                  <circle cx="-11" cy="-5" r="5" />
                  <path d="M-15 -6l-10 3l10 2z" fill="#2c2c2c" />
                  <circle cx="-12.5" cy="-6" r="1.3" fill="#ff2233" />
                </g>
                <path d="M-3 7v6M3 7v6" stroke="#000" strokeWidth="1.4" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="layer" id="L-vamp" aria-hidden="true">
        <div className="vamp a">
          <svg viewBox="0 0 120 262" aria-hidden="true">
            <defs>
              <linearGradient id="vla" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e01524" />
                <stop offset="1" stopColor="#5a0610" />
              </linearGradient>
            </defs>
            <g className="vsway">
              <path d="M60 58C22 66 6 140 0 258L120 258C114 140 98 66 60 58Z" fill="#0c0508" />
              <path d="M60 64C34 74 22 140 20 258L100 258C98 140 86 74 60 64Z" fill="url(#vla)" />
            </g>
            <rect x="46" y="190" width="11" height="68" fill="#0a0a0c" />
            <rect x="63" y="190" width="11" height="68" fill="#0a0a0c" />
            <path d="M42 82L78 82L84 196L36 196Z" fill="#0b0b0e" />
            <path d="M52 82L68 82L60 142Z" fill="#f2efea" />
            <path d="M54 90L60 86L66 90L60 94Z" fill="#c8101e" />
            <path d="M40 54L22 22L56 70Z" fill="#0b0b0e" stroke="#c8101e" strokeWidth="1.6" />
            <path d="M80 54L98 22L64 70Z" fill="#0b0b0e" stroke="#c8101e" strokeWidth="1.6" />
            <ellipse cx="60" cy="48" rx="13.5" ry="18" fill="#ece7e0" />
            <path d="M45.5 42C44 20 76 20 74.5 42L66 35L60 43L54 35Z" fill="#0a0709" />
            <g className="veye">
              <circle cx="54" cy="49" r="2.3" fill="#ff1f33" />
              <circle cx="66" cy="49" r="2.3" fill="#ff1f33" />
            </g>
            <path d="M54 60Q60 63.5 66 60" stroke="#3a0a10" strokeWidth="1.6" fill="none" />
            <path d="M55.5 60.6L57.4 66L59 61.5ZM64.5 60.6L62.6 66L61 61.5Z" fill="#fff" />
            <circle className="vdrip" cx="57.4" cy="66.5" r="1.3" fill="#d71a2d" />
            <path d="M42 84C30 110 30 150 42 172" stroke="#0b0b0e" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M78 84C90 110 90 150 78 172" stroke="#0b0b0e" strokeWidth="9" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="layer scenery" id="L-props" aria-hidden="true">
        <svg className="web l" id="webL" ref={webLRef} viewBox="0 0 200 200" fill="none" stroke="#dcd0f0" strokeWidth="0.7" />
        <svg className="web r" id="webR" ref={webRRef} viewBox="0 0 200 200" fill="none" stroke="#dcd0f0" strokeWidth="0.7" />
        <div className="spider">
          <i />
          <svg viewBox="0 0 24 24">
            <ellipse cx="12" cy="14" rx="4.2" ry="5" />
            <circle cx="12" cy="8.6" r="2.6" />
            <path fill="none" d="M8 12 3 8 1 11M8 14 2 14 1 18M8.4 16.5 4 21M16 12l5-4 2 3M16 14l6 0 1 4M15.6 16.5 20 21" />
          </svg>
        </div>
      </div>

      <div className="blood" aria-hidden="true">
        <svg id="bloodSvg" ref={bloodSvgRef} viewBox="0 0 1600 200">
          <defs>
            <linearGradient id="bloodg" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#e01524" />
              <stop offset="0.6" stopColor="#b00a18" />
              <stop offset="1" stopColor="#6a0510" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="fog" />
      <div className="fog b" />

      {/* Main App */}
      <main className="app">
        <section className="hero">
          <div className="logo" id="logo" ref={logoRef}>
            <svg viewBox="60 96 1865 629" role="img" aria-label="Alchemy Techsol">
              <defs>
                <clipPath id="ctop">
                  <rect x="0" y="0" width="2100" height="306.5" />
                </clipPath>
                <clipPath id="cbot">
                  <rect x="0" y="535.5" width="2100" height="300" />
                </clipPath>
                <linearGradient id="shine" x1="0" x2="1">
                  <stop offset="0" stopColor="#7fbcff" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#a9d3ff" />
                  <stop offset="1" stopColor="#7fbcff" stopOpacity="0" />
                </linearGradient>
                <filter id="lglow" x="-10%" y="-30%" width="120%" height="160%">
                  <feGaussianBlur stdDeviation="9" />
                </filter>
                <path id="pTop" pathLength="1" d="M384.1 330A312 312 0 0 1 965.5 330" />
                <path id="pBot" pathLength="1" d="M1629.4 510A324.6 324.6 0 0 1 1046.6 510" />
                <LogoLettersDefs />
              </defs>
              <g className="arcs">
                <g clipPath="url(#ctop)">
                  <g className="arcwrap a1">
                    <use href="#pTop" className="arc" fill="none" stroke="#0066E6" strokeWidth="37.7" />
                    <use href="#pTop" className="comet glow" fill="none" stroke="#4da3ff" strokeWidth="30" filter="url(#lglow)" />
                    <use href="#pTop" className="comet" fill="none" stroke="#9ccdff" strokeWidth="13" />
                  </g>
                </g>
                <g clipPath="url(#cbot)">
                  <g className="arcwrap a2">
                    <use href="#pBot" className="arc" fill="none" stroke="#0066E6" strokeWidth="35.8" />
                    <use href="#pBot" className="comet c2 glow" fill="none" stroke="#4da3ff" strokeWidth="30" filter="url(#lglow)" />
                    <use href="#pBot" className="comet c2" fill="none" stroke="#9ccdff" strokeWidth="13" />
                  </g>
                </g>
                <g className="pulses" fill="none" stroke="#0066E6" strokeWidth="5">
                  <circle cx="395" cy="306" r="10" style={{ '--d': '0s' }} />
                  <circle cx="954" cy="306" r="10" style={{ '--d': '.9s' }} />
                  <circle cx="1068" cy="536" r="10" style={{ '--d': '1.8s' }} />
                  <circle cx="1610" cy="536" r="10" style={{ '--d': '2.7s' }} />
                </g>
              </g>
              <LogoWord />
            </svg>
          </div>
          <div className="tagline">
            <svg viewBox="0 0 24 24">
              <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
            </svg>
            ENRICH LIVES AND EMPOWER COMMUNITIES
            <svg viewBox="0 0 24 24">
              <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4z" />
            </svg>
          </div>
        </section>

        <section className="stagewrap">
          <div className="shift" id="L-stage">
            <div id="stage" ref={stageRef}>
              <svg id="links" ref={linksSvgRef} viewBox="-60 -60 1730 590" aria-hidden="true">
                <defs>
                  <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                  <filter id="orbglow" x="-300%" y="-300%" width="700%" height="700%">
                    <feGaussianBlur stdDeviation="3.2" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>

              {MODULES.map((o, i) => (
                <div
                  key={o.id}
                  className="slot"
                  style={{
                    left: `${o.x}px`,
                    top: `${o.y}px`,
                    '--c': o.c,
                    '--d': `${(0.75 + i * 0.14).toFixed(2)}s`
                  }}
                >
                  <a
                    className={`node${o.ai ? ' ai' : ''}${o.inv ? ' inv' : ''}`}
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${o.t} — ${o.d}`}
                  >
                    <span className="spot" />
                    <span className="scan" />
                    {o.ai && (
                      <>
                        <span className="aura" />
                        <span className="aura b" />
                      </>
                    )}
                    <span className={`num${o.ai ? ' ai' : ''}`}>{o.n}</span>
                    <span className={`ico ${o.cls}`}>{ICONS[o.icon]}</span>
                    <span className="txt">
                      <span className="t">{o.t}</span>
                      <span className="d">{o.d}</span>
                    </span>
                    <span className="corner" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="vignette" />
      <div className="grain" />
      <canvas id="fg" ref={fgCanvasRef} aria-hidden="true" />
      <div className="lantern" id="lantern" ref={lanternRef} />
      <div className="flash" id="flash" ref={flashRef} />
      <div className="flash2" id="flash2" ref={flash2Ref} />

      <button
        className="mute"
        id="mute"
        type="button"
        aria-label="Toggle sound"
        aria-pressed={!muted}
        title="Sound (M)"
        onClick={() => setMuted((prev) => !prev)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" />
          <path className="w" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" />
          <path className="x" d="M16 9.5l5 5M21 9.5l-5 5" />
        </svg>
      </button>
    </div>
  );
}
