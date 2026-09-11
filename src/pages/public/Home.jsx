import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Logo from '../../components/common/Logo';
import { publicService } from '../../services/api';
import {
  ShieldCheck,
  CheckCircle2,
  Database,
  Users,
  BarChart2,
  Lock,
  ArrowRight,
  MapPin,
  Sparkles,
  Search,
  UserPlus,
  Server,
  Building2,
} from 'lucide-react';

const Home = () => {
  const [stats, setStats] = useState({
    totalWards: 10,
    registeredRecords: 0,
    activeRecruiters: 0,
    coveragePercentage: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchPublicStats = async () => {
      try {
        const res = await publicService.getStats();
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.warn('Unable to load homepage stats:', err.message);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchPublicStats();
  }, []);

  const wardsList = [
    { code: 'Ward A', name: 'Jegba', desc: 'Central Badagry historic administrative ward.' },
    { code: 'Ward B', name: 'Posukoh', desc: 'Coastal commercial & vibrant community ward.' },
    { code: 'Ward C', name: 'Awanjigoh', desc: 'Dense residential & traditional heritage ward.' },
    { code: 'Ward D', name: 'Aovikoh', desc: 'Healthcare & community development hub.' },
    { code: 'Ward E', name: 'Ajara Vetho', desc: 'Educational & township expansion zone.' },
    { code: 'Ward F', name: 'Ajara Topa', desc: 'Key transport & grassroots civic ward.' },
    { code: 'Ward G', name: 'Ajido', desc: 'Coastal fishing & maritime economic ward.' },
    { code: 'Ward H', name: 'Iyafin', desc: 'Agricultural & suburban voter community.' },
    { code: 'Ward I', name: 'Ikoga', desc: 'Northern Badagry agricultural belt ward.' },
    { code: 'Ward J', name: 'Topo-Idale', desc: 'Historic coconut estate & coastal ward.' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Navbar />

      {/* A. HERO SECTION */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          padding: '4rem 0 5rem 0',
          borderBottom: '1px solid #E2E8F0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Background Civic Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '45%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(0, 112, 67, 0.04) 0%, rgba(255, 255, 255, 0) 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#e6f3ed',
                  color: '#007043',
                  padding: '0.4rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  width: 'fit-content',
                }}
              >
                <ShieldCheck size={16} /> Official Badagry LGA Civic Initiative
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                  fontWeight: 800,
                  color: '#111111',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}
              >
                Digitizing Badagry.{' '}
                <span style={{ color: '#007043' }}>Connecting Communities.</span>
              </h1>

              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#475569',
                  lineHeight: 1.6,
                  maxWidth: '560px',
                }}
              >
                Building a secure, accurate and accessible digital database of consented voter information across Badagry Local Government.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <Link to="/recruiter/login" className="btn btn-primary btn-lg">
                  Get Started <ArrowRight size={18} />
                </Link>
                <a href="#about" className="btn btn-secondary btn-lg">
                  Learn About Initiative
                </a>
              </div>

              {/* Quick Assurance Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                  <CheckCircle2 size={16} color="#007043" /> 100% Consented Records
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                  <Lock size={16} color="#F15A24" /> Restricted & Encrypted
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', fontWeight: 600, color: '#334155' }}>
                  <Building2 size={16} color="#00A9E0" /> All 10 Wards Covered
                </span>
              </div>
            </div>

            {/* Right Visual Emblem Card */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  boxShadow: '0 20px 40px -15px rgba(0, 112, 67, 0.15)',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  maxWidth: '420px',
                  width: '100%',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    margin: '0 auto 1.5rem auto',
                    borderRadius: '50%',
                    backgroundColor: '#e6f3ed',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                  }}
                >
                  <Logo size="large" showText={false} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#007043', marginBottom: '0.5rem' }}>
                  BADAGRY LOCAL GOVERNMENT
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Voters Digitization Initiative (BVDI)
                </p>

                <div
                  style={{
                    backgroundColor: '#F5F8F6',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    color: '#334155',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Coverage Wards:</span>
                    <strong>10 Official Wards</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>Data Governance:</span>
                    <strong style={{ color: '#007043' }}>Verified Consent</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Primary LGA:</span>
                    <strong>Badagry, Lagos State</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. ABOUT THE INITIATIVE */}
      <section id="about" style={{ padding: '5rem 0', backgroundColor: '#F5F8F6' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <span className="badge badge-green" style={{ width: 'fit-content', margin: '0 auto' }}>
              ABOUT BVDI
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111111' }}>
              Responsible Civic Technology for Badagry
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7 }}>
              The <strong>Badagry Voters Digitization Initiative (BVDI)</strong> is a digital data collection and management program designed to responsibly digitize consented voter information across the wards of Badagry Local Government.
            </p>
          </div>
        </div>
      </section>

      {/* C & D. VISION & MISSION STATEMENTS */}
      <section id="vision-mission" style={{ padding: '4rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Vision Card */}
            <div
              style={{
                backgroundColor: '#e6f3ed',
                borderRadius: '16px',
                padding: '2.5rem',
                border: '1px solid rgba(0, 112, 67, 0.2)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#007043',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#007043', marginBottom: '1rem' }}>
                Vision Statement
              </h3>
              <blockquote
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#004d2e',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                "To build a digitally connected Badagry where secure and reliable voter information strengthens inclusive civic participation, effective planning and grassroots engagement."
              </blockquote>
            </div>

            {/* Mission Card */}
            <div
              style={{
                backgroundColor: '#fff0eb',
                borderRadius: '16px',
                padding: '2.5rem',
                border: '1px solid rgba(241, 90, 36, 0.2)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#F15A24',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Database size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F15A24', marginBottom: '1rem' }}>
                Mission Statement
              </h3>
              <blockquote
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#9a3412',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                "To create and maintain a secure, accurate and searchable database of consented voter records across all wards in Badagry Local Government through responsible data collection, verification and digital technology."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* E. WHY THE INITIATIVE MATTERS */}
      <section style={{ padding: '5rem 0', backgroundColor: '#F5F8F6' }}>
        <div className="container">
          <div style={{ textBaseline: 'center', textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>KEY PILLARS</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111111' }}>
              Why The Initiative Matters
            </h2>
            <p style={{ color: '#64748B', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Empowering local governance and community development through verified civic data.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 gap-6">
            {[
              { title: 'Accurate Data', desc: 'Eliminating duplicate entries and ensuring clean, verified voter information across Badagry.', icon: CheckCircle2 },
              { title: 'Digital Accessibility', desc: 'Structured database allowing authorized administrators instant ward-level intelligence.', icon: Database },
              { title: 'Grassroots Engagement', desc: 'Connecting directly with community stakeholders through designated field recruiters.', icon: Users },
              { title: 'Better Planning', desc: 'Enabling local government leadership to plan infrastructure and services effectively.', icon: BarChart2 },
              { title: 'Secure Information', desc: 'Protecting voter privacy with role-based security, encryption, and strict consent rules.', icon: Lock },
              { title: 'Inclusive Civic Participation', desc: 'Ensuring every registered voter in every ward is accounted for in community planning.', icon: ShieldCheck },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#e6f3ed', color: '#007043', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111111' }}>{pillar.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.6 }}>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* F. HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '5rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>WORKFLOW</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111111' }}>
              How The Platform Works
            </h2>
          </div>

          <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Recruit', desc: 'Vetted field recruiters are assigned unique authorization codes.', icon: UserPlus },
              { step: '02', title: 'Register', desc: 'Recruiters register consented voter details via mobile-friendly forms.', icon: Database },
              { step: '03', title: 'Verify', desc: 'System automatically checks VIN uniqueness and validates entries.', icon: Search },
              { step: '04', title: 'Digitize & Manage', desc: 'Data is securely processed into administrative ward analytics.', icon: Server },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#F5F8F6',
                    padding: '2rem 1.5rem',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    position: 'relative',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1.25rem',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: 'rgba(0, 112, 67, 0.15)',
                    }}
                  >
                    {item.step}
                  </span>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#007043', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111111', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* G. WARD COVERAGE */}
      <section id="wards" style={{ padding: '5rem 0', backgroundColor: '#F5F8F6' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>BADAGRY LGA</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111111' }}>
              Coverage Across All 10 Wards
            </h2>
            <p style={{ color: '#64748B', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              Complete grassroots coverage across Badagry Local Government Area.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-5 gap-4">
            {wardsList.map((w, idx) => (
              <div
                key={idx}
                className="card card-hover"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  borderTop: '3px solid #007043',
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F15A24' }}>
                  {w.code}
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>
                  {w.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.4 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* I. STATISTICS SECTION */}
      <section
        style={{
          backgroundColor: '#004d2e',
          color: '#FFFFFF',
          padding: '4rem 0',
        }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Initiative Progress Overview
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              High-level non-sensitive summary of data collection progress.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-6" style={{ textAlign: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A9E0', display: 'block', lineHeight: 1 }}>
                {stats.totalWards}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.5rem', display: 'block' }}>
                Total LGA Wards
              </span>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#FFFFFF', display: 'block', lineHeight: 1 }}>
                {stats.registeredRecords.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.5rem', display: 'block' }}>
                Digitized Records
              </span>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F15A24', display: 'block', lineHeight: 1 }}>
                {stats.activeRecruiters}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.5rem', display: 'block' }}>
                Active Field Recruiters
              </span>
            </div>

            <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00A9E0', display: 'block', lineHeight: 1 }}>
                {stats.coveragePercentage}%
              </span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600, marginTop: '0.5rem', display: 'block' }}>
                LGA Ward Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* J. CALL TO ACTION */}
      <section style={{ padding: '5rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#e6f3ed',
              borderRadius: '24px',
              padding: '3.5rem 2rem',
              maxWidth: '850px',
              margin: '0 auto',
              border: '1px solid rgba(0, 112, 67, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#007043' }}>
              Help build a digitally connected Badagry.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '600px', lineHeight: 1.6 }}>
              Authorized field recruiters and system administrators can log into the platform to manage grassroots data collection.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
              <Link to="/recruiter/login" className="btn btn-primary btn-lg">
                Access Platform <ArrowRight size={18} />
              </Link>
              <Link to="/admin/login" className="btn btn-secondary btn-lg">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
