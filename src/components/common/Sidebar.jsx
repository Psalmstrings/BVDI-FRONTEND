import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileCheck,
  BarChart3,
  ShieldCheck,
  Lock,
  LogOut,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, isAdmin, isRecruiter, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminNav = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Voter Directory', path: '/admin/voters', icon: FileCheck },
    { label: 'Recruiters', path: '/admin/recruiters', icon: Users },
    { label: 'Ward Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Audit Trail', path: '/admin/audit-logs', icon: ShieldCheck },
  ];

  const recruiterNav = [
    { label: 'Dashboard', path: '/recruiter/dashboard', icon: LayoutDashboard },
    { label: 'Register Voter', path: '/recruiter/register-voter', icon: UserPlus },
    { label: 'My Registered Voters', path: '/recruiter/my-voters', icon: FileCheck },
    { label: 'My Profile', path: '/recruiter/profile', icon: User },
  ];

  const navItems = isAdmin ? adminNav : recruiterNav;

  return (
    <>
      {/* Sidebar Backdrop for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 998,
          }}
          className="lg-hide-backdrop"
        />
      )}

      <aside
        style={{
          width: '260px',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justify: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          transition: 'transform 0.3s ease',
        }}
        className={`sidebar-container ${mobileOpen ? 'mobile-show' : ''}`}
      >
        <div>
          {/* Header Branding */}
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
            }}
          >
            <Logo size="normal" />
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748B',
                display: 'none',
              }}
              className="mobile-close-btn"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Role Banner */}
          <div
            style={{
              margin: '1.25rem 1.5rem',
              padding: '0.85rem 1rem',
              backgroundColor: isAdmin ? 'rgba(0, 112, 67, 0.08)' : 'rgba(241, 90, 36, 0.08)',
              borderRadius: '10px',
              border: `1px solid ${isAdmin ? 'rgba(0, 112, 67, 0.2)' : 'rgba(241, 90, 36, 0.2)'}`,
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isAdmin ? '#007043' : '#F15A24',
                display: 'block',
              }}
            >
              {isAdmin ? 'System Administrator' : 'Field Recruiter'}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#111111' }}>
              {user?.firstName} {user?.lastName}
            </span>
            {isRecruiter && user?.recruiterCode && (
              <div
                style={{
                  marginTop: '0.4rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  backgroundColor: '#FFFFFF',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  display: 'inline-block',
                  color: '#007043',
                  border: '1px dashed #007043',
                }}
              >
                Code: {user.recruiterCode}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.9rem',
                    color: isActive ? '#007043' : '#475569',
                    backgroundColor: isActive ? '#e6f3ed' : 'transparent',
                    transition: 'all 0.15s ease',
                  })}
                >
                  <Icon size={18} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <NavLink
            to="/privacy"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.85rem',
              color: '#64748B',
              fontSize: '0.85rem',
              borderRadius: '6px',
            }}
          >
            <Lock size={16} /> Privacy & Data Policy
          </NavLink>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              width: '100%',
              backgroundColor: '#FFF1F2',
              color: '#E11D48',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 1023px) {
          .sidebar-container {
            position: fixed !important;
            top: 0;
            left: 0;
            bottom: 0;
            transform: translateX(-100%);
            z-index: 1000 !important;
          }
          .sidebar-container.mobile-show {
            transform: translateX(0) !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
