import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { adminService } from '../../services/api';
import { Building2, Users, Trophy, BarChart2 } from 'lucide-react';
import { toast } from 'sonner';

const AdminAnalytics = ({ onMobileMenuToggle }) => {
  const [wardStats, setWardStats] = useState([]);
  const [recruiterStats, setRecruiterStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [wRes, rRes] = await Promise.all([
          adminService.getWardAnalytics(),
          adminService.getRecruiterAnalytics(),
        ]);
        setWardStats(wRes.wardStats || []);
        setRecruiterStats(rRes.recruiters || []);
      } catch (err) {
        toast.error(err.message || 'Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner fullPage text="Compiling Ward & Recruiter Analytics..." />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Ward & Recruiter Telemetry Analytics"
        subtitle="Detailed performance metrics for Badagry 10 wards and active recruiters"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {/* Section 1: Ward Performance Breakdown */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Building2 size={22} color="#007043" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111111' }}>
              Badagry 10 Ward Performance Matrix
            </h2>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ward Name</th>
                  <th>Ward Code</th>
                  <th>Total Registered Voters</th>
                  <th>Active Field Recruiters</th>
                  <th>7-Day Registration Velocity</th>
                  <th>Ward Status</th>
                </tr>
              </thead>
              <tbody>
                {wardStats.map((w) => (
                  <tr key={w.ward}>
                    <td>
                      <strong style={{ color: '#007043' }}>{w.name}</strong>
                    </td>
                    <td>
                      <span className="badge badge-green">{w.code}</span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '1rem', color: '#111111' }}>{w.totalVoters}</strong>
                    </td>
                    <td>{w.activeRecruitersCount} Recruiters</td>
                    <td>+{w.recentRegistrations} this week</td>
                    <td>
                      {w.totalVoters > 0 ? (
                        <span className="badge badge-green">Active Coverage</span>
                      ) : (
                        <span className="badge badge-gray">Pending Registration</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 2: Recruiter Leaderboard */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Trophy size={22} color="#F15A24" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111111' }}>
              Field Recruiter Leaderboard & Output
            </h2>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Recruiter Name</th>
                  <th>Recruiter Code</th>
                  <th>Total Voters Registered</th>
                  <th>Wards Covered</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {recruiterStats.map((r, idx) => (
                  <tr key={r.id}>
                    <td>
                      <span
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: idx === 0 ? '#FEF08A' : idx === 1 ? '#E2E8F0' : idx === 2 ? '#FFEDD5' : '#F1F5F9',
                          color: '#111111',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justify: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                        }}
                      >
                        #{idx + 1}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#111111' }}>{r.name}</strong>
                    </td>
                    <td>
                      <span className="badge badge-orange">{r.recruiterCode}</span>
                    </td>
                    <td>
                      <strong style={{ fontSize: '1.05rem', color: '#007043' }}>{r.totalVoters}</strong> Voters
                    </td>
                    <td>{r.wardsWorkedCount} Wards</td>
                    <td>
                      <span className={`badge ${r.status === 'active' ? 'badge-green' : 'badge-gray'}`}>
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
