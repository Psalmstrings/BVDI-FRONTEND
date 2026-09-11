import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Shield, UserCheck, Lock, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#004d2e',
        color: '#FFFFFF',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        borderTop: '4px solid #007043',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Logo size="large" lightMode={true} />
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Badagry Voters Digitization Initiative (BVDI) is a grassroots voter information digitization platform designed for Badagry Local Government, Lagos State.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
              <MapPin size={16} color="#F15A24" /> Badagry Local Government Secretariat, Ajara, Badagry
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
              Initiative
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#about" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>About Initiative</a>
              </li>
              <li>
                <a href="#vision-mission" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>Vision & Mission</a>
              </li>
              <li>
                <a href="#wards" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>Ward Coverage (10 Wards)</a>
              </li>
              <li>
                <a href="#how-it-works" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>How It Works</a>
              </li>
            </ul>
          </div>

          {/* Data Responsibility & Privacy */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
              Governance & Security
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/privacy" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color="#00A9E0" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/data-responsibility" style={{ color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}>
                  Data Responsibility
                </Link>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                  Consented Voter Storage
                </span>
              </li>
              <li>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
                  Strict Role Authorization
                </span>
              </li>
            </ul>
          </div>

          {/* Authorised Login Portals */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', color: '#FFFFFF', letterSpacing: '0.02em' }}>
              Authorized Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <Link
                to="/recruiter/login"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s',
                }}
              >
                <UserCheck size={16} color="#00A9E0" /> Field Recruiter Login
              </Link>
              <Link
                to="/admin/login"
                style={{
                  backgroundColor: '#007043',
                  color: '#FFFFFF',
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: '1px solid #007043',
                  transition: 'all 0.2s',
                }}
              >
                <Shield size={16} color="#F15A24" /> Administrator Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
          <p>© {new Date().getFullYear()} Badagry Local Government. All Rights Reserved.</p>
          <p style={{ fontWeight: 600 }}>Badagry Voters Digitization Initiative (BVDI)</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
