import React, { useState } from 'react';

import './landingpage.css'; // <<-- Important: Import the CSS file



const LandingPage = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  // Map app names to their respective icons & links
  const apps = [
    {
      name: "HRMS",
      icon: (
        <img 
          src="/hrms.png" 
          alt="HRMS Logo" 
        />
      ),
      link: "https://q9hrms.com/#/login"
    },
    {
      name: "VMS",
      icon: (
        <img 
          src="/vms.png" 
          alt="VMS Logo" 
        />
      ),
      link: "http://172.172.65.159:8000"
    },
    {
      name: "CRM",
      icon: (
        <img 
          src="/crm.png" 
          alt="CRM Logo" 
        />
      ),
      link: "http://crm.q9hrms.com:8082/"
    },
    {
      name: "Financials",
      icon: (
        <img 
          src="/financial.png" 
          alt="Financials Logo" 
        />
      ),
      link: "http://40.67.147.19/#/"
    }
  ];
  
  return (
    <div className="landing-container">
      {/* Logo and Navigation - No Header Section */}
      <div className="logo-nav-container">
        <div className="logo">
          <img 
            src="/alchemy.png" 
            alt="Alchemy Logo" 
            width="200" 
            height="200"
            style={{ objectFit: 'contain' }}
          />
        </div>
        <nav className="landing-nav">
          <div 
            className="nav-item" 
            onMouseEnter={() => setShowDropdown(true)} 
            onMouseLeave={() => setShowDropdown(false)}
          >
            <a href="#">Apps</a>
            {showDropdown && (
              <div className="dropdown-menu">
                {apps.map((app, idx) => (
                  <a 
                    key={idx} 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    {app.name}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="https://www.alchemytechsol.com/eng/index.html" target="_blank" rel="noopener noreferrer">Webpage</a>
          <a href="https://www.alchemytechsol.com/eng/contactus.html">Help</a>
        </nav>
      </div>

      {/* Apps Section - Moved to top */}
      <div className="apps-section-wrapper">
        <div className="apps-half-circle-bg"></div>
        <section className="apps-grid">
          {apps.map((app, idx) => (
            <div key={idx} className={`app-item ${app.name === 'Financials' ? 'financials-tab' : ''}`}>
              <button 
                className={`app-button ${app.name === 'Financials' ? 'financials-button' : ''}`}
                onClick={() => window.open(app.link, "_blank")} // Opens link in a new tab
                style={app.name === 'Financials' ? {
                  background: '#ffffff',
                  transition: 'all 0.3s ease'
                } : {}}
                onMouseEnter={(e) => {
                  if (app.name === 'Financials') {
                    e.target.style.background = '#1e3a8a';
                    e.target.style.boxShadow = '8px 8px 16px #1e1e1e, -8px -8px 16px #2a2a2a, inset 2px 2px 4px rgba(255, 255, 255, 0.1), inset -2px -2px 4px rgba(0, 0, 0, 0.3)';
                    e.target.style.transform = 'translateY(-3px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (app.name === 'Financials') {
                    e.target.style.background = '#ffffff';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div className="app-icon-container">
                  {app.icon}
                </div>
              </button>
              <div className="app-name">{app.name}</div>
            </div>
          ))}
        </section>
      </div>

      {/* Hero Section - Moved below apps */}
      <section className="hero-section">
        <h1>
          Your Tools for Success <span className="highlight-yellow">– Built for You, By You</span>.
        </h1>
        <p>
          Work smarter, collaborate better, and achieve more with our powerful  <span className="highlight-blue">in-house solutions</span>!
        </p>
        <div className="hero-buttons"></div>
      </section>
      <section className="hero-section">
        <h1>
          "Powering Your Productivity ⚡"
          "Designed to streamline workflows, enhance collaboration, and drive results." 
        </h1>
        <p>
          Great tools empower great teams—let's build excellence together.  <span className="highlight-blue">🏆 </span>!
        </p>
        <div className="hero-buttons"></div>
      </section>
    </div>
  );
};

export default LandingPage;