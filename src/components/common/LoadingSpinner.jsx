import React from 'react';

const LoadingSpinner = ({ text = 'Loading data...', fullPage = false }) => {
  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', gap: '1rem' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e6f3ed',
          borderTop: '4px solid #007043',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 500 }}>{text}</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullPage) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
