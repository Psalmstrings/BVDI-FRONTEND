import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({ title = 'No records found', message = 'There are no items matching your criteria at this time.', icon: Icon = Inbox, actionButton }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px border-color #E2E8F0',
        gap: '0.85rem',
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#f1f5f9',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          marginBottom: '0.25rem',
        }}
      >
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111111' }}>{title}</h4>
      <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '420px', lineHeight: '1.5' }}>{message}</p>
      {actionButton && <div style={{ marginTop: '0.5rem' }}>{actionButton}</div>}
    </div>
  );
};

export default EmptyState;
