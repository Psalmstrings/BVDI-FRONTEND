import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { Menu, X, Shield, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo size="normal" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          <Link
            to="/"
            style={{
              fontWeight: isCurrent('/') ? 700 : 500,
              color: isCurrent('/') ? '#007043' : '#334155',
              fontSize: '0.95rem',
            }}
          >
            Home
          </Link>
          <a
            href="#about"
            style={{ fontWeight: 500, color: '#334155', fontSize: '0.95rem' }}
          >
            About Initiative
          </a>
          <a
            href="#vision-mission"
            style={{ fontWeight: 500, color: '#334155', fontSize: '0.95rem' }}
          >
            Vision & Mission
          </a>
          <a
            href="#wards"
            style={{ fontWeight: 500, color: '#334155', fontSize: '0.95rem' }}
          >
            Ward Coverage
          </a>
          <Link
            to="/privacy"
            style={{
              fontWeight: isCurrent('/privacy') ? 700 : 500,
              color: isCurrent('/privacy') ? '#007043' : '#334155',
              fontSize: '0.95rem',
            }}
          >
            Privacy
          </Link>
        </nav>

        {/* CTA & Auth Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/recruiter/dashboard'}
                className="btn btn-primary btn-sm"
              >
                Go to Portal <ArrowRight size={16} />
              </Link>
              <button onClick={logout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/recruiter/login" className="btn btn-outline btn-sm">
                <UserCheck size={16} /> Recruiter Login
              </Link>
              <Link to="/admin/login" className="btn btn-primary btn-sm">
                <Shield size={16} /> Admin Portal
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#111111',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: '#007043', padding: '0.5rem 0' }}
          >
            Home
          </Link>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 500, color: '#334155', padding: '0.5rem 0' }}
          >
            About Initiative
          </a>
          <a
            href="#wards"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 500, color: '#334155', padding: '0.5rem 0' }}
          >
            Ward Coverage
          </a>
          <Link
            to="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 500, color: '#334155', padding: '0.5rem 0' }}
          >
            Privacy & Governance
          </Link>
          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '0.5rem 0' }} />
          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/recruiter/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
              >
                Go to Portal
              </Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link
                to="/recruiter/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline"
              >
                <UserCheck size={18} /> Recruiter Login
              </Link>
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
              >
                <Shield size={18} /> Admin Portal
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Inline style for responsive toggle */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
