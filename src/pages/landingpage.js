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
            <div key={idx} className="app-item">
              <button 
                className="app-button"
                onClick={() => window.open(app.link, "_blank")} // Opens link in a new tab
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

      {/* Hero Section - Combined into one */}
      <section className="hero-section">
        <h1>
          Your Tools for Success <span className="highlight-yellow">– Built for You, By You</span>.
        </h1>
        <p>
          Work smarter, collaborate better, and achieve more with our powerful  <span className="highlight-blue">in-house solutions</span>!
        </p>

        
        
        <h1 className="hero-section-second">
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