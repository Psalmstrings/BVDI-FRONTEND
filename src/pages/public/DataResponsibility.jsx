import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { ShieldCheck, CheckCircle2, Lock, UserCheck, AlertTriangle } from 'lucide-react';

const DataResponsibility = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 0' }}>
        <div className="container-narrow">
          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#007043' }}>
              <ShieldCheck size={28} />
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111' }}>
                Data Responsibility Charter
              </h1>
            </div>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7' }}>
              The Badagry Voters Digitization Initiative operates under a strict ethical data governance framework to ensure grassroots voter data is managed with absolute responsibility, transparency, and integrity.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />

            <div className="grid grid-cols-1 grid-cols-2 gap-4">
              <div style={{ padding: '1.25rem', backgroundColor: '#F5F8F6', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ color: '#007043', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={18} /> Mandated Consent
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                  No voter record is submitted without explicit written or digital consent confirmation.
                </p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#F5F8F6', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ color: '#F15A24', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={18} /> Zero Public Exposure
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                  Individual voter lists, VINs, addresses, and phone numbers are strictly prohibited from public directory display.
                </p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#F5F8F6', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ color: '#00A9E0', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <UserCheck size={18} /> Recruiter Accountability
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                  Every registered record is indelibly tagged with the unique recruiter code of the field agent who conducted registration.
                </p>
              </div>

              <div style={{ padding: '1.25rem', backgroundColor: '#F5F8F6', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <h4 style={{ color: '#111111', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={18} color="#E11D48" /> Immutable Audit Trail
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#475569' }}>
                  Administrative actions, logins, status changes, and data exports are logged with IP addresses and timestamps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataResponsibility;
