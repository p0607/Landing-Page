import React, { useState } from 'react';

import './landingpage.css';
import { AuroraBackground } from '../components/ui/aurora-background';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const handleClick = (link) => {
    window.open(link, "_blank");
  };

  // Icon components
  const PersonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
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

  const ServerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
      <line x1="6" y1="6" x2="6.01" y2="6"></line>
      <line x1="6" y1="18" x2="6.01" y2="18"></line>
      <line x1="10" y1="6" x2="10.01" y2="6"></line>
      <line x1="10" y1="18" x2="10.01" y2="18"></line>
    </svg>
  );

  // Map app names to their links and icons
  const apps = [
    {
      name: "CRM",
      link: "http://crm.q9hrms.com:8082/",
      icon: <HandshakeIcon />
    },
    {
      name: "VMS",
      link: "http://q9lab.in/vms",
      icon: <ServerIcon />
    },
    {
      name: "HRMS",
      link: "https://q9hrms.com/#/login",
      icon: <PersonIcon />
    },
    {
      name: "Financials",
      link: "http://q9lab.in/vendormanagement/",
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
    <AuroraBackground className={darkMode ? 'dark' : ''}>
      <div className={`landing-container ${darkMode ? 'dark-mode' : ''}`}>

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
      <div className="apps-section">
        <section className="apps-grid">
          {apps.map((app, idx) => (
            <button 
              key={idx}
              className="app-button"
              onClick={() => handleClick(app.link)}
            >
              <span className="app-icon">{app.icon}</span>
              <span className="app-text">{app.name}</span>
            </button>
          ))}
        </section>
      </div>
      </div>
    </AuroraBackground>
  );
};

export default LandingPage;