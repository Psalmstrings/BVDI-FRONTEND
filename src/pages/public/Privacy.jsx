import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Shield, Lock, CheckCircle, FileText, UserCheck, Server } from 'lucide-react';

const Privacy = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '3.5rem 0' }}>
        <div className="container-narrow">
          <div className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#007043' }}>
              <Lock size={28} />
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111111' }}>
                Privacy Policy & Governance
              </h1>
            </div>

            <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.7' }}>
              The Badagry Voters Digitization Initiative (BVDI) is committed to protecting the privacy, confidentiality, and security of all personal voter information collected across the wards of Badagry Local Government.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#007043', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={20} /> 1. Information We Collect
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                With explicit, voluntary voter consent, field recruiters collect basic demographic and voter registration information including full name, address, Voter Identification Number (VIN), phone number, age, occupation, ward, and polling unit.
              </p>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#007043', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Shield size={20} /> 2. Purpose of Collection
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Voter records are collected strictly for local government planning, grassroots civic engagement, community development, and accurate ward-level demographic statistics. Personal voter information is <strong>never</strong> sold, rented, or publicly exposed.
              </p>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#007043', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <UserCheck size={20} /> 3. Data Access & Authorization
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Access to voter records is restricted strictly to authenticated administrators and designated field recruiters according to role-based access control. Field recruiters can only access records registered under their authorization code. Sensitive voter identifiers (such as VIN) are masked by default.
              </p>
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#007043', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Server size={20} /> 4. Storage & Security Measures
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Data is stored in encrypted databases using industry-standard security protocols, including password hashing (bcrypt), JWT authorization tokens, HTTPS encryption, and comprehensive administrative audit logging.
              </p>
            </section>

            <div style={{ backgroundColor: '#e6f3ed', padding: '1.25rem', borderRadius: '10px', border: '1px solid #007043', fontSize: '0.9rem', color: '#004d2e', fontWeight: 600 }}>
              <CheckCircle size={18} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
              For inquiries regarding voter data privacy or governance, contact the Secretariat at privacy@bvdi.gov.ng.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
