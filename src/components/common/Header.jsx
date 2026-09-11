import React from 'react';
import { Menu, Shield, UserCheck, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title, subtitle, onMobileMenuToggle }) => {
  const { user, isAdmin } = useAuth();

  return (
    <header
      style={{
        height: '72px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 800,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onMobileMenuToggle}
          style={{
            background: 'none',
            border: 'none',
            color: '#111111',
            cursor: 'pointer',
            padding: '0.4rem',
            display: 'none',
          }}
          className="mobile-header-toggle"
          aria-label="Open sidebar menu"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111111', lineHeight: 1.2 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div style={{ display: 'none', alignItems: 'center', gap: '1.25rem' }}>
        {/* Recruiter Code Pill Header */}
        {!isAdmin && user?.recruiterCode && (
          <div
            style={{
              backgroundColor: '#e6f3ed',
              color: '#007043',
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: '1px solid #007043',
              display: 'none',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>CODE:</span> <strong>{user.recruiterCode}</strong>
          </div>
        )}

        {/* User Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isAdmin ? '#007043' : '#F15A24',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              fontWeight: 700,
              fontSize: '1rem',
            }}
          >
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="user-details-header" style={{ display: 'none', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111111' }}>
              {user?.firstName} {user?.lastName}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'none', alignItems: 'center', gap: '0.25rem' }}>
              {isAdmin ? <Shield size={12} color="#007043" /> : <UserCheck size={12} color="#F15A24" />}
              {user?.role?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .mobile-header-toggle { display: block !important; }
        }
        @media (max-width: 600px) {
          .user-details-header { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
