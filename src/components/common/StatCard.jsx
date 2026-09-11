import React from 'react';

const StatCard = ({ title, value, icon: Icon, trend, color = 'green', subtitle }) => {
  const colorMap = {
    green: { bg: '#e6f3ed', border: 'rgba(0, 112, 67, 0.2)', iconBg: '#007043', text: '#007043' },
    orange: { bg: '#fff0eb', border: 'rgba(241, 90, 36, 0.2)', iconBg: '#F15A24', text: '#F15A24' },
    cyan: { bg: '#e6f7fc', border: 'rgba(0, 169, 224, 0.2)', iconBg: '#00A9E0', text: '#00779e' },
    slate: { bg: '#f8fafc', border: '#e2e8f0', iconBg: '#475569', text: '#334155' },
  };

  const currentTheme = colorMap[color] || colorMap.green;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: `1px solid ${currentTheme.border}`,
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: currentTheme.bg,
              color: currentTheme.iconBg,
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.85rem', fontWeight: 800, color: '#111111', lineHeight: 1 }}>
          {value !== undefined && value !== null ? value : 0}
        </span>
        {trend && (
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: currentTheme.text }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default StatCard;
