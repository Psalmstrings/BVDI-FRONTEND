import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { adminService, publicService } from '../../services/api';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileCheck,
  ShieldAlert,
  User,
  Calendar,
  Phone,
  Building,
} from 'lucide-react';
import { toast } from 'sonner';

const AdminVoters = ({ onMobileMenuToggle }) => {
  const [voters, setVoters] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState('');
  const [wardFilter, setWardFilter] = useState('All');
  const [recruiterFilter, setRecruiterFilter] = useState('All');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [wardsList, setWardsList] = useState([]);

  // Detail Modal
  const [selectedVoter, setSelectedVoter] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await publicService.getWards();
        setWardsList(res.wards || []);
      } catch (err) {
        console.warn('Wards list load error:', err.message);
      }
    };
    fetchWards();
  }, []);

  const fetchVotersList = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (search) params.search = search;
      if (wardFilter !== 'All') params.ward = wardFilter;
      if (recruiterFilter !== 'All') params.recruiterCode = recruiterFilter;
      if (minAge) params.minAge = minAge;
      if (maxAge) params.maxAge = maxAge;

      const res = await adminService.getVoters(params);
      setVoters(res.voters || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      toast.error(err.message || 'Failed to load voter database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVotersList();
  }, [page, limit, wardFilter, recruiterFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchVotersList();
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await adminService.getVoterById(id);
      setSelectedVoter(res.voter);
      setIsDetailModalOpen(true);
    } catch (err) {
      toast.error(err.message || 'Failed to load voter details.');
    }
  };

  const handleExportCSV = async () => {
    try {
      setExporting(true);
      const blob = await adminService.exportVoters({
        ward: wardFilter,
        recruiterCode: recruiterFilter,
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BVDI_Voters_Export_${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Voter directory exported successfully as CSV!');
    } catch (err) {
      toast.error(err.message || 'CSV export failed.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Master Voter Database"
        subtitle="Search, filter, and audit verified voter records across Badagry"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {/* Search & Filter Control Panel */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid #E2E8F0',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '300px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by name, VIN, phone or recruiter code..."
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

            <button onClick={handleExportCSV} className="btn btn-secondary btn-sm" disabled={exporting || total === 0}>
              <Download size={16} /> {exporting ? 'Exporting CSV...' : 'Export Filtered CSV'}
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>
              <Filter size={16} color="#007043" /> Filters:
            </div>

            {/* Ward Filter */}
            <select
              className="form-select"
              value={wardFilter}
              onChange={(e) => { setWardFilter(e.target.value); setPage(1); }}
              style={{ width: 'auto', fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
            >
              <option value="All">All Badagry Wards (10)</option>
              {wardsList.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>

            {/* Recruiter Code Filter */}
            <input
              type="text"
              className="form-input"
              placeholder="Recruiter Code (e.g. SAMUEL7XQ9)"
              value={recruiterFilter === 'All' ? '' : recruiterFilter}
              onChange={(e) => { setRecruiterFilter(e.target.value || 'All'); setPage(1); }}
              style={{ width: '210px', fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
            />

            {(wardFilter !== 'All' || recruiterFilter !== 'All' || search) && (
              <button
                onClick={() => { setWardFilter('All'); setRecruiterFilter('All'); setSearch(''); setPage(1); }}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
              >
                Reset Filters
              </button>
            )}

            <div style={{ marginLeft: 'auto', fontSize: '0.85rem', fontWeight: 700, color: '#007043' }}>
              Matching Records: {total} Voters
            </div>
          </div>
        </div>

        {/* Master Voter Table */}
        {loading ? (
          <LoadingSpinner text="Fetching voter records..." />
        ) : voters.length === 0 ? (
          <EmptyState
            title="No Voters Found"
            message="No voter records match your current search or filter criteria."
            icon={FileCheck}
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Voter Full Name</th>
                  <th>Official Ward</th>
                  <th>Polling Unit</th>
                  <th>Masked VIN</th>
                  <th>Age / Occupation</th>
                  <th>Recruiter Code</th>
                  <th>Reg Date</th>
                  <th>Action</th>
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
                      <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                        {v.ward}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
                        {v.pollingUnit}
                      </span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', backgroundColor: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        {v.vin}
                      </code>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.825rem', color: '#334155' }}>
                        <span>Age: <strong>{v.age}</strong></span> • <span>{v.occupation}</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-orange">
                        {v.recruiterCode}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {new Date(v.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewDetail(v._id)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '0.35rem 0.6rem' }}
                      >
                        <Eye size={15} /> View
                      </button>
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

        {/* VOTER DETAIL MODAL */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title="Authorized Voter Record View"
          maxWidth="600px"
        >
          {selectedVoter && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ backgroundColor: '#e6f3ed', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#007043' }}>REGISTRATION REF</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#004d2e' }}>{selectedVoter.referenceCode || 'BVDI-RECORD'}</div>
                </div>
                <span className="badge badge-green">Consented Storage</span>
              </div>

              <div className="grid grid-cols-2 gap-4" style={{ fontSize: '0.9rem' }}>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Full Name</span>
                  <strong>{selectedVoter.fullName}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Voter ID (VIN)</span>
                  <strong style={{ color: '#007043' }}>{selectedVoter.vin}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Phone Number</span>
                  <strong>{selectedVoter.phoneNumber}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Age / Occupation</span>
                  <strong>{selectedVoter.age} yrs — {selectedVoter.occupation}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Ward</span>
                  <strong>{selectedVoter.ward}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Polling Unit</span>
                  <strong>{selectedVoter.pollingUnit}</strong>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Residential Address</span>
                  <strong>{selectedVoter.address}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Recruiter Code</span>
                  <span className="badge badge-orange">{selectedVoter.recruiterCode}</span>
                </div>
                <div>
                  <span style={{ color: '#64748B', fontSize: '0.8rem', display: 'block' }}>Registered By</span>
                  <strong>{selectedVoter.registeredBy?.firstName} {selectedVoter.registeredBy?.lastName}</strong>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default AdminVoters;
