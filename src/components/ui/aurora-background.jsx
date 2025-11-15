import React from "react";
import "./aurora-background.css";

export const AuroraBackground = ({
  className = "",
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={`aurora-background-container ${className}`}
      {...props}
    >
      <div className="aurora-background-inner">
        <div className={`aurora-layer ${showRadialGradient ? 'aurora-radial-mask' : ''}`}></div>
      </div>
      {children}
    </div>
  );
};
