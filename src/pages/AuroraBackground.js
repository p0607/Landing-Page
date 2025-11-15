import React from 'react';
import './AuroraBackground.css';

const AuroraBackground = ({ className = '' }) => {
  return (
    <div className={`aurora-background ${className}`}>
      <div className="aurora-layer aurora-layer-1"></div>
      <div className="aurora-layer aurora-layer-2"></div>
      <div className="aurora-layer aurora-layer-3"></div>
      <div className="aurora-layer aurora-layer-4"></div>
    </div>
  );
};

export default AuroraBackground;

