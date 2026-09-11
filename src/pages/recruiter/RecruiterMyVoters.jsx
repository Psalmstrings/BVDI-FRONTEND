import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { recruiterService, publicService } from '../../services/api';
import { Search, Filter, FileCheck, Phone, MapPin } from 'lucide-react';
import { toast } from 'sonner';

const RecruiterMyVoters = ({ onMobileMenuToggle }) => {
  const [voters, setVoters] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('All');
  const [wardsList, setWardsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await publicService.getWards();
        setWardsList(res.wards || []);
      } catch (err) {
        console.warn('Wards load error:', err.message);
      }
    };
    fetchWards();
  }, []);

  const fetchMyVotersList = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (search) params.search = search;
      if (wardFilter !== 'All') params.ward = wardFilter;

      const res = await recruiterService.getMyVoters(params);
      setVoters(res.voters || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch registered voters.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVotersList();
  }, [page, limit, wardFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMyVotersList();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="My Registered Voters"
        subtitle="Directory of voter records submitted under your recruiter code"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {/* Search & Filter Header */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid #E2E8F0',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search my registered voters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Search size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <select
              className="form-select"
              value={wardFilter}
              onChange={(e) => { setWardFilter(e.target.value); setPage(1); }}
              style={{ width: 'auto' }}
            >
              <option value="All">All Wards</option>
              {wardsList.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Voter Directory List */}
        {loading ? (
          <LoadingSpinner text="Loading registered voters..." />
        ) : voters.length === 0 ? (
          <EmptyState
            title="No Voters Registered Yet"
            message="You haven't registered any voters matching these filters."
            icon={FileCheck}
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Voter Full Name</th>
                  <th>Ward</th>
                  <th>Polling Unit</th>
                  <th>Phone Number</th>
                  <th>Masked VIN</th>
                  <th>Date Registered</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((v) => (
                  <tr key={v._id}>
                    <td>
                      <strong style={{ color: '#111111', display: 'block' }}>{v.fullName}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{v.address}</span>
                    </td>
                    <td>
                      <span className="badge badge-green">{v.ward}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#334155' }}>{v.pollingUnit}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#334155' }}>{v.phoneNumber}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {v.vin}
                      </code>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {new Date(v.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              page={page}
              pages={pages}
              total={total}
              limit={limit}
              onPageChange={setPage}
              onLimitChange={setLimit}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default RecruiterMyVoters;
