import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { recruiterService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { UserCheck, ShieldCheck, Mail, Phone, MapPin, FileCheck, Calendar, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const RecruiterProfile = ({ onMobileMenuToggle }) => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await recruiterService.getProfile();
        setProfileData(res.recruiter);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch recruiter profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <LoadingSpinner fullPage text="Loading profile details..." />;

  const stats = profileData?.stats || {};

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Field Recruiter Profile"
        subtitle="Your authorization credentials and field registration summary"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', borderRadius: '16px' }}>
          {/* Header Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#fff0eb',
                color: '#F15A24',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                fontWeight: 800,
                fontSize: '1.5rem',
              }}
            >
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>

            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111111' }}>
                {user?.firstName} {user?.lastName}
              </h2>
              <span className="badge badge-orange" style={{ marginTop: '0.25rem' }}>
                FIELD RECRUITER
              </span>
            </div>
          </div>

          {/* Authorization Code Box */}
          <div
            style={{
              backgroundColor: '#e6f3ed',
              border: '1px solid #007043',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#007043', textTransform: 'uppercase' }}>
                Your Unique Recruiter Code
              </span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#004d2e', letterSpacing: '0.05em' }}>
                {user?.recruiterCode}
              </div>
            </div>
            <ShieldCheck size={36} color="#007043" />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 grid-cols-2 gap-4" style={{ fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
              <Mail size={18} color="#007043" />
              <span><strong>Email:</strong> {user?.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
              <Phone size={18} color="#007043" />
              <span><strong>Phone:</strong> {user?.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
              <Building2 size={18} color="#007043" />
              <span><strong>Assigned Ward:</strong> <span className="badge badge-green" style={{ marginLeft: '0.35rem' }}>{user?.assignedWard || profileData?.assignedWard || 'Unassigned'}</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#475569' }}>
              <MapPin size={18} color="#007043" />
              <span><strong>Address:</strong> {user?.address || 'Badagry, Lagos State'}</span>
            </div>
          </div>

          {/* Field Performance Summary */}
          <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #E2E8F0' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111111', marginBottom: '1rem' }}>
              Field Registration Telemetry
            </h4>

            <div className="grid grid-cols-3 gap-4">
              <div style={{ backgroundColor: '#F5F8F6', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#007043', display: 'block' }}>
                  {stats.totalVoters || 0}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Total Voters</span>
              </div>
              <div style={{ backgroundColor: '#F5F8F6', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F15A24', display: 'block' }}>
                  {stats.todayCount || 0}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>Registered Today</span>
              </div>
              <div style={{ backgroundColor: '#F5F8F6', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#00A9E0', display: 'block' }}>
                  {stats.thisWeekCount || 0}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>This Week</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfile;
