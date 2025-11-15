import React from 'react';

import './landingpage.css';

const LandingPage = () => {
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
  
  return (
    <div className="landing-container">
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
              onClick={() => window.open(app.link, "_blank")}
            >
              <span className="app-icon">{app.icon}</span>
              <span className="app-text">{app.name}</span>
            </button>
          ))}
        </section>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;