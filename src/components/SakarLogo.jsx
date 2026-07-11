import React from 'react';

export default function SakarLogo({ className = '', height = 60, showText = true, light = false }) {
  // Select color values based on theme prop
  const textColor = light ? '#FFFFFF' : '#1E252B';
  const subtextColor = light ? '#A3ABB2' : '#232A30';
  const lineStroke = light ? 'rgba(255, 255, 255, 0.3)' : '#1E252B';

  return (
    <div 
      className={`sakar-logo-container ${className}`} 
      style={{ 
        height: `${height}px`, 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px' 
      }}
    >
      {/* SVG Icon part of Logo */}
      <svg 
        viewBox="0 0 80 80" 
        style={{ height: '100%', width: 'auto', display: 'block', flexShrink: 0 }}
        xmlns="http://www.w3.org/2000/svg"
        className="sakar-logo-icon select-none"
      >
        <defs>
          <linearGradient id="sakarBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#093154" />
            <stop offset="40%" stop-color="#0F3F6B" />
            <stop offset="70%" stop-color="#165D95" />
            <stop offset="100%" stop-color="#2c82c9" />
          </linearGradient>
          
          <linearGradient id="sakarCharcoalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3A4650" />
            <stop offset="60%" stop-color="#232A30" />
            <stop offset="100%" stop-color="#1E252B" />
          </linearGradient>
          
          <linearGradient id="sakarGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#EBF6FF" />
            <stop offset="50%" stop-color="#D3EAFA" />
            <stop offset="100%" stop-color="#B2DAF5" />
          </linearGradient>

          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-opacity="0.15" />
          </filter>
        </defs>

        <g transform="translate(10, 0)" filter="url(#logoShadow)">
          <rect x="28" y="14" width="34" height="52" fill="url(#sakarGlassGrad)" rx="2" />
          
          <path d="M 28,14 L 62,14 L 28,48 Z" fill="#ffffff" opacity="0.35" />
          <path d="M 40,40 L 62,40 L 62,62 Z" fill="#ffffff" opacity="0.25" />

          <line x1="45" y1="14" x2="45" y2="66" stroke="#0F3F6B" stroke-width="1.5" opacity="0.5" />
          <line x1="28" y1="40" x2="62" y2="40" stroke="#0F3F6B" stroke-width="1.5" opacity="0.5" />
          
          <rect x="28" y="14" width="34" height="52" fill="none" stroke="#232A30" stroke-width="1.5" opacity="0.4" rx="2" />

          <path 
            d="M 45,40 
               C 32,40 24,34 24,24 
               C 24,11 36,6 64,6 
               C 50,10 34,13 34,24 
               C 34,31 40,37 49,40 
               Z" 
            fill="url(#sakarCharcoalGrad)" 
          />

          <path 
            d="M 45,40 
               C 56,40 66,44 66,56 
               C 66,69 54,74 26,74 
               C 40,70 56,67 56,56 
               C 56,49 50,43 41,40 
               Z" 
            fill="url(#sakarBlueGrad)" 
          />
        </g>
      </svg>

      {/* SVG Text part of Logo */}
      {showText && (
        <svg 
          viewBox="0 0 250 80" 
          style={{ height: '100%', width: 'auto', display: 'block', flexShrink: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          className="sakar-logo-text select-none"
        >
          <defs>
            <linearGradient id="sakarBlueGradText" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#093154" />
              <stop offset="40%" stop-color="#0F3F6B" />
              <stop offset="70%" stop-color="#165D95" />
              <stop offset="100%" stop-color="#2c82c9" />
            </linearGradient>
          </defs>
          <g transform="translate(5, 0)">
            <path 
              d="M 32,28.5 H 17 C 14,28.5 14,39 17,39 H 27 C 30,39 30,49.5 27,49.5 H 12" 
              fill="none" 
              stroke={textColor} 
              stroke-width="5" 
              stroke-linecap="square" 
              stroke-linejoin="miter" 
            />
            
            <path 
              d="M 36,51 L 47,26 H 51 L 62,51 H 55.5 L 51,40 H 47 L 42.5,51 Z" 
              fill={textColor} 
            />
            <path 
              d="M 49,41 L 53,48 H 45 Z" 
              fill="url(#sakarBlueGradText)" 
            />

            <path 
              d="M 63,26 L 68,26 L 68,37 L 78,26 L 84,26 L 72,39 L 85,50 L 79,50 L 68,41 L 68,50 L 63,50 Z" 
              fill={textColor} 
            />

            <path 
              d="M 89,51 L 100,26 H 104 L 115,51 H 108.5 L 104,40 H 100 L 95.5,51 Z" 
              fill={textColor} 
            />
            <path 
              d="M 102,41 L 106,48 H 98 Z" 
              fill="url(#sakarBlueGradText)" 
            />

            <path 
              d="M 118,26 H 134 C 139,26 142,29 142,34 C 142,39 138,41 133,41 L 142,50 H 135 L 127,41 H 123 L 123,50 L 118,50 Z M 123,31 V 37 H 133 C 135,37 136,36 136,34 C 136,32 135,31 133,31 Z" 
              fill={textColor} 
            />

            <line x1="12" y1="64" x2="24" y2="64" stroke={lineStroke} stroke-width="1.2" />
            <text 
              x="77" 
              y="67" 
              font-family="'Inter', sans-serif" 
              font-size="7.5" 
              font-weight="600" 
              letter-spacing="3.5" 
              text-anchor="middle"
              fill={subtextColor}
            >
              WINDOW SYSTEM
            </text>
            <line x1="130" y1="64" x2="142" y2="64" stroke={lineStroke} stroke-width="1.2" />
          </g>
        </svg>
      )}
    </div>
  );
}
