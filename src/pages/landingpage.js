import React from 'react';

import './landingpage.css';

const LandingPage = () => {
  // Map app names to their links
  const apps = [
    {
      name: "HRMS",
      link: "https://q9hrms.com/#/login"
    },
    {
      name: "VMS",
      link: "http://172.172.65.159:8000"
    },
    {
      name: "CRM",
      link: "http://crm.q9hrms.com:8082/"
    },
    {
      name: "Financials",
      link: "http://40.67.147.19/#/"
    },
    {
      name: "Matrix",
      link: "http://20.244.92.198/COSEC/Login/Login"
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
              {app.name}
            </button>
          ))}
        </section>
      </div>
    </div>
  );
};

export default LandingPage;