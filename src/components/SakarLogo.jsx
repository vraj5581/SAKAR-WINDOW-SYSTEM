import React from 'react';
import logoImg from '../assets/logo.png';

export default function SakarLogo({ className = '', height = 60, showText = true, light = false }) {
  // If showText is false, we crop the logo to show only the "S" icon part.
  if (!showText) {
    return (
      <div 
        className={`sakar-logo-icon-only ${className}`} 
        style={{ 
          height: `${height}px`, 
          width: `${height}px`,
          overflow: 'hidden',
          display: 'inline-flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <img 
          src={logoImg} 
          alt="Sakar Logo Icon" 
          style={{ 
            height: '142%', // Scale up to hide text
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block'
          }} 
        />
      </div>
    );
  }

  // If light is true (meaning it is on a dark background like the footer), we present the logo
  // inside a white pill/badge wrapper to keep the original brand colors and text readable.
  if (light) {
    return (
      <div 
        className={`sakar-logo-container sakar-logo-light ${className}`} 
        style={{ 
          height: `${height}px`, 
          backgroundColor: '#FFFFFF',
          padding: '4px 12px',
          borderRadius: '8px',
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease'
        }}
      >
        <img 
          src={logoImg} 
          alt="Sakar Window System Logo" 
          style={{ height: '100%', width: 'auto', display: 'block' }} 
        />
      </div>
    );
  }

  // Standard display on light backgrounds (e.g. Header)
  return (
    <div 
      className={`sakar-logo-container ${className}`} 
      style={{ 
        height: `${height}px`, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        mixBlendMode: 'multiply' // Blends the white background of the image with the header background
      }}
    >
      <img 
        src={logoImg} 
        alt="Sakar Window System Logo" 
        style={{ height: '100%', width: 'auto', display: 'block' }} 
      />
    </div>
  );
}

