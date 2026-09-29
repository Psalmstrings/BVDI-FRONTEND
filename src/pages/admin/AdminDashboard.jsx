import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import StatCard from '../../components/common/StatCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { adminService } from '../../services/api';
import {
  Users,
  UserCheck,
  FileCheck,
  Building2,
  Calendar,
  TrendingUp,
  UserPlus,
  ArrowRight,
  Eye,
  Search,
  Mail,
  Phone,
  Filter,
  CheckCircle,
  XCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const BADAGRY_WARDS = [
  'Ward A: Jegba',
  'Ward B: Posukoh',
  'Ward C: Awanjigoh',
  'Ward D: Aovikoh',
  'Ward E: Ajara Vetho',
  'Ward F: Ajara Topa',
  'Ward G: Ajido',
  'Ward H: Iyafin',
  'Ward I: Ikoga',
  'Ward J: Topo-Idale',
];

const AdminDashboard = ({ onMobileMenuToggle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Query Recruiters by Ward state
  const [selectedWard, setSelectedWard] = useState('All');
  const [wardRecruiters, setWardRecruiters] = useState([]);
  const [wardRecruitersLoading, setWardRecruitersLoading] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminService.getAnalytics();
        setData(res);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const fetchWardRecruiters = async (ward) => {
    try {
      setWardRecruitersLoading(true);
      const params = { limit: 50 };
      if (ward && ward !== 'All') {
        params.ward = ward;
      }
      const res = await adminService.getRecruiters(params);
      setWardRecruiters(res.recruiters || []);
    } catch (err) {
      console.error('Failed to load recruiters for ward:', err);
    } finally {
      setWardRecruitersLoading(false);
    }
  };

  useEffect(() => {
    fetchWardRecruiters(selectedWard);
  }, [selectedWard]);

  if (loading) return <LoadingSpinner fullPage text="Loading Badagry LGA Analytics..." />;

  const stats = data?.stats || {};
  const charts = data?.charts || {};

  const PIE_COLORS = ['#007043', '#F15A24', '#00A9E0', '#475569', '#8B5CF6'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Badagry LGA Executive Dashboard"
        subtitle="Voter registration progress and grassroots telemetry overview"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {error && (
          <div style={{ backgroundColor: '#FFF1F2', border: '1px solid #FECDD3', color: '#E11D48', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Quick Actions Bar */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#111111' }}>Quick Administrative Actions:</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/recruiters?action=new" className="btn btn-primary btn-sm">
              <UserPlus size={16} /> + Register Recruiter
            </Link>
            <Link to="/admin/voters" className="btn btn-outline btn-sm">
              <Search size={16} /> View All Voters
            </Link>
            <Link to="/admin/analytics" className="btn btn-secondary btn-sm">
              <TrendingUp size={16} /> Ward Analytics
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-6 gap-4" style={{ marginBottom: '1.75rem' }}>
          <StatCard
            title="Total Registered Voters"
            value={stats.totalVoters}
            icon={FileCheck}
            color="green"
            subtitle="Consented records"
          />
          <StatCard
            title="Total Field Recruiters"
            value={stats.totalRecruiters}
            icon={Users}
            color="slate"
            subtitle="Registered accounts"
          />
          <StatCard
            title="Active Field Recruiters"
            value={stats.activeRecruiters}
            icon={UserCheck}
            color="orange"
            subtitle="Currently field ready"
          />
          <StatCard
            title="Wards Covered"
            value={`${stats.wardsCovered} / ${stats.totalWards}`}
            icon={Building2}
            color="cyan"
            subtitle="Badagry official wards"
          />
          <StatCard
            title="Today's Registrations"
            value={stats.todayRegistrations}
            icon={Calendar}
            color="green"
            subtitle="Registered today"
          />
          <StatCard
            title="This Week's Registrations"
            value={stats.thisWeekRegistrations}
            icon={TrendingUp}
            color="orange"
            subtitle="Past 7 days"
          />
        </div>

        {/* RECRUITERS BY WARD QUERY PANEL */}
        <div
          className="card"
          style={{
            marginBottom: '1.75rem',
            padding: '1.5rem',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 4px 16px -2px rgba(0, 112, 67, 0.06)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderBottom: '1px solid #F1F5F9',
              paddingBottom: '1rem',
              marginBottom: '1.25rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Building2 size={22} color="#007043" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111111', margin: 0 }}>
                  Query Field Recruiters by Ward
                </h3>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#64748B', marginTop: '0.25rem' }}>
                Inspect and track authorized field recruiters assigned across Badagry wards
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Filter size={16} color="#64748B" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Select Ward:</span>
                <select
                  className="form-select"
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  style={{ width: 'auto', fontWeight: 600, padding: '0.4rem 0.85rem', fontSize: '0.875rem' }}
                >
                  <option value="All">All Badagry Wards</option>
                  {BADAGRY_WARDS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to={`/admin/recruiters?action=new${selectedWard !== 'All' ? `&ward=${encodeURIComponent(selectedWard)}` : ''}`}
                className="btn btn-primary btn-sm"
              >
                <UserPlus size={16} /> + Register Recruiter
              </Link>
            </div>
          </div>

          {/* Quick Telemetry Pill summary for this Ward */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              border: '1px solid #E2E8F0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>Currently Querying:</span>
              <span
                style={{
                  backgroundColor: selectedWard === 'All' ? '#F1F5F9' : '#e6f3ed',
                  color: selectedWard === 'All' ? '#334155' : '#007043',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '6px',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                }}
              >
                {selectedWard === 'All' ? 'All 10 Badagry Wards' : selectedWard}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#475569' }}>
                Assigned Recruiters:{' '}
                <strong style={{ color: '#111111' }}>{wardRecruiters.length}</strong>
              </span>
              <span style={{ color: '#475569' }}>
                Active Field Agents:{' '}
                <strong style={{ color: '#007043' }}>
                  {wardRecruiters.filter((r) => r.status === 'active').length}
                </strong>
              </span>
              <span style={{ color: '#475569' }}>
                Total Voters Registered:{' '}
                <strong style={{ color: '#F15A24' }}>
                  {wardRecruiters.reduce((sum, r) => sum + (r.votersCount || 0), 0)}
                </strong>
              </span>
            </div>
          </div>

          {/* Recruiter List or Empty State */}
          {wardRecruitersLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <LoadingSpinner text={`Fetching recruiters for ${selectedWard}...`} />
            </div>
          ) : wardRecruiters.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                backgroundColor: '#FAFBFB',
                borderRadius: '12px',
                border: '1px dashed #CBD5E1',
              }}
            >
              <Users size={36} color="#94A3B8" style={{ margin: '0 auto 0.75rem auto' }} />
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111111', marginBottom: '0.35rem' }}>
                No Recruiters Assigned to {selectedWard === 'All' ? 'this query' : selectedWard}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                {selectedWard === 'All'
                  ? 'There are no recruiters registered in the database yet.'
                  : `There are currently no field recruiters assigned to ${selectedWard}. Assign a recruiter to start grassroots voter registration in this ward.`}
              </p>
              <Link
                to={`/admin/recruiters?action=new${selectedWard !== 'All' ? `&ward=${encodeURIComponent(selectedWard)}` : ''}`}
                className="btn btn-primary btn-sm"
              >
                <UserPlus size={16} /> + Assign Recruiter to {selectedWard !== 'All' ? selectedWard : 'a Ward'}
              </Link>
            </div>
          ) : (
            <div className="table-container" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Recruiter Name</th>
                    <th>Recruiter Code</th>
                    <th>Assigned Ward</th>
                    <th>Contact Info</th>
                    <th>Voters Registered</th>
                    <th>Account Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {wardRecruiters.map((r) => (
                    <tr key={r._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#fff0eb',
                              color: '#F15A24',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                            }}
                          >
                            {r.firstName.charAt(0)}{r.lastName.charAt(0)}
                          </div>
                          <div>
                            <strong style={{ color: '#111111', fontSize: '0.9rem' }}>
                              {r.firstName} {r.lastName}
                            </strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: '#e6f3ed',
                            color: '#007043',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '6px',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            border: '1px solid #007043',
                          }}
                        >
                          {r.recruiterCode}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: r.assignedWard ? '#e6f3ed' : '#F1F5F9',
                            color: r.assignedWard ? '#007043' : '#64748B',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.78rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            border: r.assignedWard ? '1px solid #B8E2D1' : '1px solid #CBD5E1',
                          }}
                        >
                          <Building2 size={12} /> {r.assignedWard || 'Unassigned'}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                          <div>{r.email}</div>
                          <div style={{ color: '#64748B' }}>{r.phone}</div>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-green" style={{ fontSize: '0.8rem' }}>
                          <FileCheck size={13} style={{ marginRight: '0.25rem' }} /> {r.votersCount || 0} Voters
                        </span>
                      </td>
                      <td>
                        {r.status === 'active' ? (
                          <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                            <CheckCircle size={12} /> Active
                          </span>
                        ) : (
                          <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                            <XCircle size={12} /> Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/admin/recruiters?filterWard=${encodeURIComponent(r.assignedWard || 'All')}`}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          Manage <ExternalLink size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 grid-cols-2 gap-6" style={{ marginBottom: '1.75rem' }}>
          {/* Chart 1: Voters by Ward */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>Voters Registered by Ward</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Distribution across Badagry 10 Wards</p>
              </div>
              <span className="badge badge-green">10 Wards</span>
            </div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.votersByWard} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="shortWard" tick={{ fontSize: 11, fill: '#64748B' }} interval={0} angle={-25} textAnchor="end" />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(value) => [`${value} Voters`, 'Total Registered']}
                    labelFormatter={(label) => `Ward: ${label}`}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Bar dataKey="count" fill="#007043" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Registrations by Recruiter */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>Top Recruiter Performance</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Total voters registered by recruiter code</p>
              </div>
              <span className="badge badge-orange">Leaderboard</span>
            </div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.registrationsByRecruiter} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} width={100} />
                  <Tooltip
                    formatter={(value) => [`${value} Voters`, 'Registered']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }}
                  />
                  <Bar dataKey="count" fill="#F15A24" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 grid-cols-3 gap-6" style={{ marginBottom: '1.75rem' }}>
          {/* Chart 3: Registration Trend */}
          <div className="card" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>Registration Trend Timeline</h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Daily registrations recorded over past 14 days</p>
              </div>
            </div>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.registrationTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#007043" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#007043" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="_id" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                  <Area type="monotone" dataKey="count" stroke="#007043" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Voter Age Distribution */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111111' }}>Age Distribution</h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Demographic age breakdown</p>
            </div>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.ageDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="count"
                    nameKey="range"
                  >
                    {charts.ageDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {charts.ageDistribution?.map((item, idx) => (
                <span key={idx} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                  {item.range}: {item.count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
