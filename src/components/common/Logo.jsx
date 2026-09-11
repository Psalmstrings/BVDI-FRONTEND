import React from 'react';

const Logo = ({ size = 'normal', showText = true, lightMode = false }) => {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const iconDimensions = isLarge ? 48 : isSmall ? 28 : 36;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      <svg
        width={iconDimensions}
        height={iconDimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Shield Outer Ring */}
        <path
          d="M50 5 L88 20 V50 C88 72 50 95 50 95 C50 95 12 72 12 50 V20 L50 5 Z"
          fill="#007043"
        />
        {/* Inner Shield */}
        <path
          d="M50 12 L80 24 V48 C80 66 50 85 50 85 C50 85 20 66 20 48 V24 L50 12 Z"
          fill="#FFFFFF"
        />
        {/* Accent Geometric Layers */}
        <path
          d="M50 18 L73 28 V46 C73 60 50 75 50 75 V18 Z"
          fill="#00A9E0"
          opacity="0.25"
        />
        {/* Coastal Badagry Motif - Coconut Tree Emblem */}
        <path
          d="M50 42 C46 36 36 34 32 37 C38 40 44 42 50 46 C56 42 62 40 68 37 C64 34 54 36 50 42 Z"
          fill="#F15A24"
        />
        <path
          d="M50 45 C43 40 33 42 28 46 C35 47 42 48 50 52 C58 48 65 47 72 46 C67 42 57 40 50 45 Z"
          fill="#007043"
        />
        {/* Trunk & Digital Grid Nodes */}
        <rect x="47" y="50" width="6" height="20" rx="3" fill="#007043" />
        <circle cx="50" cy="30" r="4" fill="#F15A24" />
        <circle cx="34" cy="40" r="3" fill="#00A9E0" />
        <circle cx="66" cy="40" r="3" fill="#00A9E0" />
        {/* Foundation Base */}
        <path d="M35 70 Q50 67 65 70 L60 74 Q50 72 40 74 Z" fill="#007043" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: isLarge ? '1.5rem' : isSmall ? '1rem' : '1.2rem',
              color: lightMode ? '#FFFFFF' : '#007043',
              letterSpacing: '-0.02em',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            BVDI
          </span>
          <span
            style={{
              fontSize: isLarge ? '0.75rem' : '0.65rem',
              fontWeight: 700,
              color: lightMode ? 'rgba(255,255,255,0.85)' : '#64748B',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Badagry Voters Initiative
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
