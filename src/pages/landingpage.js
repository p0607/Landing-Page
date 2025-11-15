import React, { useRef, useEffect, useState } from 'react';

import './landingpage.css';
import './GooeyNav.css';
import AuroraBackground from './AuroraBackground';

const LandingPage = () => {
  const containerRef = useRef(null);
  const appsSectionRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const animationTime = 600;
  const particleCount = 15;
  const particleDistances = [90, 10];
  const particleR = 100;
  const timeVariance = 300;
  const colors = [1, 2, 3, 1, 2, 3, 1, 4];

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');

      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);

        requestAnimationFrame(() => {
          element.classList.add('active');
        });

        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.querySelector('.app-text')?.textContent || element.textContent;
  };

  const handleClick = (e, index, link) => {
    e.preventDefault();
    const buttonEl = e.currentTarget;
    if (activeIndex === index) {
      window.open(link, "_blank");
      return;
    }

    setActiveIndex(index);
    updateEffectPosition(buttonEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => {
        try {
          filterRef.current.removeChild(p);
        } catch {
          // Do nothing
        }
      });
    }

    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    // Open link after animation starts
    setTimeout(() => {
      window.open(link, "_blank");
    }, 100);
  };

  // Icon components
  const PersonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"></path>
    </svg>
  );

  const HandshakeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"></path>
      <path d="M7 18h1a2 2 0 0 0 2-2v-4.5a2.5 2.5 0 0 1 5 0V15a2 2 0 0 0 2 2h1"></path>
      <path d="M21 12h-3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"></path>
    </svg>
  );

  const DollarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      <polyline points="8 12 12 8 16 12"></polyline>
    </svg>
  );

  const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="5" height="5"></rect>
      <rect x="10" y="3" width="5" height="5"></rect>
      <rect x="17" y="3" width="5" height="5"></rect>
      <rect x="3" y="10" width="5" height="5"></rect>
      <rect x="10" y="10" width="5" height="5"></rect>
      <rect x="17" y="10" width="5" height="5"></rect>
      <rect x="3" y="17" width="5" height="5"></rect>
      <rect x="10" y="17" width="5" height="5"></rect>
      <rect x="17" y="17" width="5" height="5"></rect>
    </svg>
  );

  // Map app names to their links and icons
  const apps = [
    {
      name: "HRMS",
      link: "https://q9hrms.com/#/login",
      icon: <PersonIcon />
    },
    {
      name: "VMS",
      link: "http://172.172.65.159:8000",
      icon: <ShieldIcon />
    },
    {
      name: "CRM",
      link: "http://crm.q9hrms.com:8082/",
      icon: <HandshakeIcon />
    },
    {
      name: "Financials",
      link: "http://40.67.147.19/#/",
      icon: <DollarIcon />
    },
    {
      name: "Matrix",
      link: "http://20.244.92.198/COSEC/Login/Login",
      icon: <GridIcon />
    }
  ];
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sun and Moon icons
  const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  return (
    <div className={`landing-container ${darkMode ? 'dark-mode' : ''}`} ref={containerRef}>
      {/* Aurora Background Animation */}
      <AuroraBackground className={darkMode ? 'dark-mode' : ''} />

      {/* Dark/Light Mode Toggle */}
      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Logo at top center */}
      <div className="logo-header">
        <div className="logo">
          <img 
            src="/alchemy.png" 
            alt="Company Logo" 
          />
        </div>
        <p className="motto">Enrich lives and empower communities</p>
      </div>

      {/* Apps Section with text labels */}
      <div className="apps-section" ref={appsSectionRef}>
        <section className="apps-grid">
          {apps.map((app, idx) => (
            <button 
              key={idx}
              className={`app-button ${activeIndex === idx ? 'gooey-active' : ''}`}
              onClick={(e) => handleClick(e, idx, app.link)}
            >
              <span className="app-icon">{app.icon}</span>
              <span className="app-text">{app.name}</span>
            </button>
          ))}
        </section>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </div>
  );
};

export default LandingPage;