import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { recruiterService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  UserPlus,
  FileCheck,
  Calendar,
  Building2,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

const RecruiterDashboard = ({ onMobileMenuToggle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await recruiterService.getProfile();
        setData(res.recruiter);
      } catch (err) {
        toast.error(err.message || 'Failed to load recruiter statistics.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleCopyCode = () => {
    if (user?.recruiterCode) {
      navigator.clipboard.writeText(user.recruiterCode);
      setCopied(true);
      toast.success('Recruiter code copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner fullPage text="Loading field dashboard..." />;

  const stats = data?.stats || {};

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Field Registration Portal"
        subtitle="Grassroots voter data registration workspace"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.25rem', flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {/* Recruiter Code Header Banner */}
        <div
          style={{
            backgroundColor: '#007043',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '1.75rem 1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 8px 20px -5px rgba(0, 112, 67, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              Authorized Field Agent Code
            </span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '0.05em', marginTop: '0.2rem' }}>
              {user?.recruiterCode || 'REC-CODE'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.25rem' }}>
              Welcome back, <strong>{user?.firstName} {user?.lastName}</strong>. Ensure voter consent before submission.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleCopyCode}
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>

            <Link
              to="/recruiter/register-voter"
              className="btn btn-accent btn-lg"
              style={{ boxShadow: '0 4px 12px rgba(241, 90, 36, 0.4)' }}
            >
              <UserPlus size={20} /> Register New Voter
            </Link>
          </div>
        </div>

        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 grid-cols-2 grid-cols-4 gap-4" style={{ marginBottom: '1.5rem' }}>
          <StatCard
            title="Total Registered Voters"
            value={stats.totalVoters}
            icon={FileCheck}
            color="green"
            subtitle="Registered by you"
          />
          <StatCard
            title="Today's Registrations"
            value={stats.todayCount}
            icon={Calendar}
            color="orange"
            subtitle="Field count today"
          />
          <StatCard
            title="This Week"
            value={stats.thisWeekCount}
            icon={TrendingUp}
            color="cyan"
            subtitle="Past 7 days"
          />
          <StatCard
            title="Wards Covered"
            value={stats.wardBreakdown?.length || 0}
            icon={Building2}
            color="slate"
            subtitle="Distinct wards worked"
          />
        </div>

        {/* Quick Actions & Recent Ward Breakdown */}
        <div className="grid grid-cols-1 grid-cols-2 gap-6">
          {/* Quick Registration Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fff0eb', color: '#F15A24', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <UserPlus size={28} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111111' }}>
              Register a New Voter
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '380px', margin: '0 auto' }}>
              Use the mobile-friendly 4-step wizard to digitize consented voter details in the field.
            </p>
            <Link to="/recruiter/register-voter" className="btn btn-accent btn-lg" style={{ margin: '0.5rem auto 0 auto' }}>
              Start Voter Registration <ArrowRight size={18} />
            </Link>
          </div>

          {/* Ward Distribution Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>Your Ward Breakdown</h3>
              <Link to="/recruiter/my-voters" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#007043' }}>
                View All Records →
              </Link>
            </div>

            {stats.wardBreakdown?.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: '#94A3B8', padding: '1.5rem 0', textAlign: 'center' }}>
                No voters registered yet. Click above to register your first voter!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {stats.wardBreakdown?.map((w, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      padding: '0.65rem 0.85rem',
                      backgroundColor: '#F5F8F6',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  >
                    <span style={{ fontWeight: 600, color: '#334155' }}>{w._id}</span>
                    <span className="badge badge-green">{w.count} Voters</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
