import React, { useState, useEffect, useRef, useMemo } from 'react';
import './landingpage.css';
import FestiveBackground from '../components/FestiveBackground';

/*
  Constellation landing page for the Alchemy portal, over a festive night scene.
  Features:
  - Pixel-perfect SVG flow connectors with anchored laser pulses
  - Zero-clipping step badges & precision-aligned card midpoints
  - Stage scales to fit both viewport width and height (single screen, no scroll)
  - Standalone Matrix module with no connectors
  - 3D magnetic card tilt & interactive telemetry modal
  - Ambient Web Audio synthesizer for futuristic feedback
*/

export const DEFAULT_MODULES = [
  {
    id: 'crm',
    name: 'CRM',
    code: 'MOD-01',
    sub: 'Prospects and pipeline',
    tag: 'Pipeline & Deals',
    stats: '1,420 Active Leads',
    metric: '+18.4%',
    href: 'https://q9lab.in/crm/login',
    color: '#00f0ff',
    d: 'M3 17L9 10L13 14L21 5M15 5H21V11',
    desc: 'Intelligent lead qualification, automated funnel analytics, and multi-channel pipeline acceleration engine.',
  },
  {
    id: 'client',
    name: 'Client Module',
    code: 'MOD-02',
    sub: 'Client accounts & portals',
    tag: 'Enterprise Accounts',
    stats: '348 Synchronized',
    metric: '99.98%',
    href: 'https://q9lab.in/cms',
    color: '#10b981',
    d: 'M5 7h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2zM9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18',
    desc: 'Centralized client hub featuring automated billing milestones, SLA tracking, and real-time client collaboration.',
  },
  {
    id: 'vms',
    name: 'Alchemflow [VMS]',
    code: 'MOD-03',
    sub: 'Vendors and applicants',
    tag: 'Talent Ecosystem',
    stats: '12.8k Profiles',
    metric: 'Live Flow',
    href: 'http://q9lab.in/vms',
    color: '#f59e0b',
    d: 'M5 4h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2zM5 13h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2zM7 7.5h.01M7 16.5h.01',
    desc: 'Automated vendor onboarding, candidate verification pipelines, and compliant workforce provisioning.',
  },
  {
    id: 'hrms',
    name: 'HRMS',
    code: 'MOD-04',
    sub: 'People and HR ops',
    tag: 'Core Operations',
    stats: '864 Team Members',
    metric: 'Global',
    href: 'https://q9lab.in/hrms/',
    color: '#a855f7',
    d: 'M12 4a4 4 0 100 8 4 4 0 000-8zM4 21c0-4 4-6 8-6s8 2 8 6',
    desc: 'Comprehensive talent lifecycle platform managing payroll, performance frameworks, attendance, and benefits.',
  },
  {
    id: 'financials',
    name: 'Financials',
    code: 'MOD-05',
    sub: 'Billing and books',
    tag: 'Ledger & Audit',
    stats: '$4.2M Cleared / Mo',
    metric: 'Realtime',
    href: 'http://q9lab.in/vendormanagement/',
    color: '#38bdf8',
    d: 'M12 2v20M17 6H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
    desc: 'High-precision automated ledger, real-time liquidity forecasts, multi-currency reconciliations, and tax compliance.',
  },
  {
    id: 'matrix',
    name: 'Matrix',
    code: 'MOD-00',
    sub: 'Team insights & telemetry',
    tag: 'Neural Synthesis',
    stats: '184k Synapses/s',
    metric: 'Autonomous',
    href: 'http://20.244.92.198/COSEC/Login/Login',
    standalone: true,
    color: '#ec4899',
    d: 'M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5zM3 9.5h5v5H3zM9.5 9.5h5v5h-5zM16 9.5h5v5h-5zM3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z',
    desc: 'The connective neural fabric correlating cross-module metrics, predictive workforce analytics, and macro business insights.',
  },
];

// Layout constants (stage coordinates, px)
const CARD_W = 226;    // Card width
const CARD_H = 78;     // Card height
const HALF_W = CARD_W / 2; // 113px
const HALF_H = CARD_H / 2; // 39px
const PAD = 135;       // First card centre from left edge
const GAP = 265;       // Distance between card centres
const Y_HI = 115;      // High wave row
const Y_LO = 255;      // Low wave row
const Y_SOLO = 395;    // Standalone module row
const H = 475;         // Total stage height
const V_RESERVE = 70;  // Root padding + stage margins + badge overhang, kept free below the header
const MIN_SCALE = 0.48;
const MAX_SCALE = 1.2; // Lets the stage grow a little on large monitors

// Web Audio sound synthesizer for sleek sci-fi effects
class SoundFx {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  hover(freq = 587.33) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch (_) {}
  }
  click() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    } catch (_) {}
  }
}

const sfx = new SoundFx();

// Official Alchemy Brand Logo
function Wordmark() {
  return (
    <div className="ap-logo-wrap">
      <div className="ap-logo-glow" aria-hidden="true" />
      <img
        src="/alchemy-logo.png"
        alt="Alchemy"
        className="ap-logo-img"
      />
    </div>
  );
}

// 3D Tilt Card wrapper (with smooth return & zero clipping)
function TiltCard({ children, className, style, onClick, onMouseEnter, onMouseLeave, accentColor, href, target, rel }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) scale3d(1.03, 1.03, 1.03)`);
    setSheen({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = (e) => {
    setTransform('perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)');
    setSheen({ x: 50, y: 50, opacity: 0 });
    if (onMouseLeave) onMouseLeave(e);
  };

  const Component = href ? 'a' : 'div';

  return (
    <Component
      ref={cardRef}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{
        ...style,
        transform: transform || undefined,
        '--card-accent': accentColor,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className="ap-sheen"
        style={{
          background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255, 255, 255, ${sheen.opacity}) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </Component>
  );
}

export default function LandingPage({
  modules = DEFAULT_MODULES,
  logo,
  tagline = 'Enrich lives and empower communities',
  onSelect,
}) {
  const [activeModule, setActiveModule] = useState(null);
  const [hoveredModuleId, setHoveredModuleId] = useState(null);
  const [scale, setScale] = useState(1);
  const headRef = useRef(null);

  const flow = useMemo(() => modules.filter((m) => !m.standalone), [modules]);
  const solo = useMemo(() => modules.filter((m) => m.standalone), [modules]);
  const W = 2 * PAD + GAP * Math.max(flow.length - 1, 0);

  // Scale the stage to fit the space left under the header, so the page never scrolls
  useEffect(() => {
    const handleResize = () => {
      const screenW = window.innerWidth;
      if (screenW <= 720) {
        setScale(1); // Mobile stacked mode
      } else {
        const headH = headRef.current ? headRef.current.offsetHeight : 0;
        const availableW = screenW - 40;
        const availableH = window.innerHeight - headH - V_RESERVE;
        const s = Math.min(MAX_SCALE, Math.max(MIN_SCALE, Math.min(availableW / W, availableH / H)));
        setScale(s);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [W]);

  const placed = useMemo(() => [
    ...flow.map((m, i) => ({ m, step: i + 1, x: PAD + GAP * i, y: i % 2 === 0 ? Y_HI : Y_LO })),
    ...solo.map((m, k) => ({ m, step: null, x: W / 2 + (k - (solo.length - 1) / 2) * GAP, y: Y_SOLO })),
  ], [flow, solo, W]);

  // Seamless flow connectors: exact card edge-to-edge alignment
  const segments = useMemo(() => flow.slice(0, -1).map((_, i) => {
    const a = placed[i];
    const b = placed[i + 1];
    const x1 = a.x + HALF_W; // Exit right edge of Card A
    const x2 = b.x - HALF_W; // Enter left edge of Card B
    return {
      key: `${a.m.id}-${b.m.id}`,
      fromId: a.m.id,
      toId: b.m.id,
      line: `M${x1} ${a.y} C${x1 + 38} ${a.y} ${x2 - 38} ${b.y} ${x2 - 2} ${b.y}`,
      arrow: `M${x2 - 10} ${b.y - 5.5} L${x2 - 2} ${b.y} L${x2 - 10} ${b.y + 5.5}`,
      fromPoint: { x: x1, y: a.y },
      toPoint: { x: x2, y: b.y },
    };
  }), [flow, placed]);

  const handleCardClick = (m, e) => {
    sfx.click();
    if (onSelect) {
      e.preventDefault();
      onSelect(m);
      return;
    }
    const isExternal = Boolean(m.href && (m.href.startsWith('http://') || m.href.startsWith('https://')));
    if (isExternal) {
      // Direct opening handled by link or fallback
      if (e.defaultPrevented) {
        window.open(m.href, '_blank', 'noopener,noreferrer');
      }
      return;
    }
    e.preventDefault();
    setActiveModule(m);
  };

  const handleCardHover = (m) => {
    setHoveredModuleId(m.id);
    sfx.hover();
  };

  const handleCardLeave = () => {
    setHoveredModuleId(null);
  };

  return (
    <div className="ap-root">
      <FestiveBackground />

      {/* Header */}
      <header className="ap-head" ref={headRef}>
        {logo ?? <Wordmark />}
        <div className="ap-tag">
          <span className="ap-tag-bullet">✦</span>
          <span>{tagline}</span>
          <span className="ap-tag-bullet">✦</span>
        </div>
      </header>

      {/* Stage Scaler Container */}
      <div
        className="ap-stage-scaler"
        style={{
          width: W * scale,
          height: H * scale,
        }}
      >
        <nav
          className="ap-stage"
          aria-label="Constellation Modules"
          style={{
            width: W,
            height: H,
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top center',
          }}
        >
          {/* Flow Lines SVG Layer */}
          <svg className="ap-lines" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Segment Lines */}
            {segments.map((s) => {
              const isHighlighted = hoveredModuleId === s.fromId || hoveredModuleId === s.toId;
              return (
                <g key={s.key} className={isHighlighted ? 'ap-seg-active' : ''}>
                  {/* Outer Glow Path */}
                  <path className="ap-base-glow" d={s.line} />
                  {/* Base Wireframe Line */}
                  <path className="ap-base" d={s.line} />
                  {/* Glowing Arrowhead */}
                  <path className="ap-arrow" d={s.arrow} />
                  {/* Exit Port Circle */}
                  <circle cx={s.fromPoint.x} cy={s.fromPoint.y} r="3" className="ap-node-port" />
                  {/* Entry Port Circle */}
                  <circle cx={s.toPoint.x} cy={s.toPoint.y} r="3" className="ap-node-port" />
                </g>
              );
            })}

            {/* High Energy Photons / Laser Pulses */}
            {segments.map((s, i) => (
              <g key={`pulse-group-${s.key}`}>
                <path
                  className="ap-pulse"
                  pathLength="100"
                  d={s.line}
                  style={{ animationDelay: `${i * 0.85}s` }}
                />
                <path
                  className="ap-pulse-dot-stream"
                  pathLength="100"
                  d={s.line}
                  style={{ animationDelay: `${i * 0.85 + 0.4}s` }}
                />
              </g>
            ))}
          </svg>

          {/* Module Nodes */}
          {placed.map(({ m, step, x, y }) => {
            const isSelected = activeModule?.id === m.id;
            const isExternal = Boolean(m.href && (m.href.startsWith('http://') || m.href.startsWith('https://')));
            return (
              <div
                key={m.id}
                className={`ap-nd${isSelected ? ' ap-nd-selected' : ''}`}
                style={{
                  left: x - HALF_W,
                  top: y - HALF_H,
                }}
              >
                {/* Step Badge (mounted outside card so it is never clipped) */}
                {step ? (
                  <span className="ap-badge" aria-label={`Step ${step}`} style={{ background: m.color, boxShadow: `0 0 16px ${m.color}` }}>
                    <span className="ap-badge-num">{step}</span>
                  </span>
                ) : (
                  <span className="ap-badge ap-badge-solo" aria-label="Standalone Matrix Hub">
                    <span className="ap-badge-num">AI</span>
                  </span>
                )}

                {/* Metric Status Pill (on the top edge so the card text gets the full width) */}
                {m.metric && (
                  <span className="ap-metric-pill" style={{ color: m.color, borderColor: `${m.color}50` }}>
                    {m.metric}
                  </span>
                )}

                <TiltCard
                  className={`ap-c${m.standalone ? ' ap-solo' : ''}`}
                  accentColor={m.color}
                  href={m.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => handleCardHover(m)}
                  onMouseLeave={handleCardLeave}
                  onClick={(e) => handleCardClick(m, e)}
                >
                  {/* Corner Crosshairs */}
                  <div className="ap-corner ap-c-tl" aria-hidden="true" />
                  <div className="ap-corner ap-c-br" aria-hidden="true" />

                  {/* Icon Orb */}
                  <div className="ap-i-wrap">
                    <span className="ap-i" style={{ color: m.color, borderColor: `${m.color}40` }}>
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={m.d} />
                      </svg>
                    </span>
                    <div className="ap-i-glow" style={{ background: m.color }} />
                  </div>

                  {/* Text Details */}
                  <div className="ap-card-body">
                    <div className="ap-n">{m.name}</div>
                    <div className="ap-s">{m.sub}</div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Telemetry Modal Window */}
      {activeModule && (
        <div className="ap-modal-backdrop" onClick={() => setActiveModule(null)}>
          <div className="ap-modal" onClick={(e) => e.stopPropagation()} style={{ '--modal-accent': activeModule.color }}>
            <div className="ap-modal-header">
              <div className="ap-modal-tag">
                <span className="ap-modal-dot" style={{ background: activeModule.color }} />
                <span>{`${activeModule.code} // ${activeModule.tag}`}</span>
              </div>
              <button
                type="button"
                className="ap-modal-close"
                onClick={() => setActiveModule(null)}
                aria-label="Close Preview"
              >
                ✕
              </button>
            </div>

            <div className="ap-modal-hero">
              <div className="ap-modal-icon" style={{ color: activeModule.color, background: `${activeModule.color}15`, borderColor: activeModule.color }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={activeModule.d} />
                </svg>
              </div>
              <div>
                <h3 className="ap-modal-title">{activeModule.name}</h3>
                <p className="ap-modal-sub">{activeModule.sub}</p>
              </div>
            </div>

            <p className="ap-modal-desc">{activeModule.desc}</p>

            <div className="ap-modal-stats">
              <div className="ap-stat-box">
                <span className="ap-stat-label">System State</span>
                <span className="ap-stat-val" style={{ color: activeModule.color }}>Nominal Active</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-label">Live Telemetry</span>
                <span className="ap-stat-val">{activeModule.stats}</span>
              </div>
              <div className="ap-stat-box">
                <span className="ap-stat-label">Performance</span>
                <span className="ap-stat-val" style={{ color: '#10b981' }}>{activeModule.metric}</span>
              </div>
            </div>

            <div className="ap-modal-actions">
              <a
                href={activeModule.href}
                target={activeModule.href?.startsWith('http') ? '_blank' : undefined}
                rel={activeModule.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="ap-btn-primary"
                style={{ background: `linear-gradient(135deg, ${activeModule.color}, #3b82f6)` }}
                onClick={() => setActiveModule(null)}
              >
                <span>Launch {activeModule.name}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
              <button
                type="button"
                className="ap-btn-secondary"
                onClick={() => setActiveModule(null)}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
