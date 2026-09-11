import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { adminService } from '../../services/api';
import {
  UserPlus,
  Search,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  Mail,
  MapPin,
  FileCheck,
} from 'lucide-react';
import { toast } from 'sonner';

const AdminRecruiters = ({ onMobileMenuToggle }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New Recruiter Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const fetchRecruitersList = async () => {
    try {
      setLoading(true);
      const params = { page, limit };
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;

      const res = await adminService.getRecruiters(params);
      setRecruiters(res.recruiters || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch recruiters list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruitersList();
  }, [page, limit, statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchRecruitersList();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateRecruiter = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      setSubmitting(true);
      const res = await adminService.createRecruiter(formData);
      toast.success(`Recruiter registered! Code: ${res.recruiter.recruiterCode}`);
      setIsAddModalOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
      fetchRecruitersList();
    } catch (err) {
      toast.error(err.message || 'Failed to create recruiter.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (recruiterId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await adminService.toggleRecruiterStatus(recruiterId, newStatus);
      toast.success(`Recruiter status changed to ${newStatus.toUpperCase()}`);
      fetchRecruitersList();
    } catch (err) {
      toast.error(err.message || 'Failed to update recruiter status.');
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await adminService.getRecruiterById(id);
      setSelectedRecruiter(res.recruiter);
      setIsDetailModalOpen(true);
    } catch (err) {
      toast.error(err.message || 'Failed to load recruiter details.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Field Recruiter Management"
        subtitle="Manage authorized voter registration agents across Badagry wards"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {/* Header Actions & Filter Bar */}
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
                placeholder="Search recruiters by name, code (e.g. SAMUEL7XQ9), email or phone..."
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
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              style={{ width: 'auto' }}
            >
              <option value="All">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-accent">
              <UserPlus size={18} /> Add Recruiter
            </button>
          </div>
        </div>

        {/* Recruiters Directory */}
        {loading ? (
          <LoadingSpinner text="Fetching recruiter directory..." />
        ) : recruiters.length === 0 ? (
          <EmptyState
            title="No Recruiters Found"
            message="There are no recruiters matching your search or filter parameters."
            icon={Users}
            actionButton={
              <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary btn-sm">
                + Register First Recruiter
              </button>
            }
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Recruiter Name</th>
                  <th>Generated Recruiter Code</th>
                  <th>Contact Info</th>
                  <th>Voters Registered</th>
                  <th>Account Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((r) => (
                  <tr key={r._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            backgroundColor: '#fff0eb',
                            color: '#F15A24',
                            display: 'flex',
                            alignItems: 'center',
                            justify: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                          }}
                        >
                          {r.firstName.charAt(0)}{r.lastName.charAt(0)}
                        </div>
                        <div>
                          <strong style={{ display: 'block', color: '#111111' }}>
                            {r.firstName} {r.lastName}
                          </strong>
                          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                            Registered {new Date(r.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: '#e6f3ed',
                          color: '#007043',
                          padding: '0.3rem 0.65rem',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          letterSpacing: '0.05em',
                          border: '1px solid #007043',
                        }}
                      >
                        {r.recruiterCode}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.825rem', color: '#475569' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Mail size={13} color="#64748B" /> {r.email}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Phone size={13} color="#64748B" /> {r.phone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-green">
                        <FileCheck size={14} style={{ marginRight: '0.3rem' }} /> {r.votersCount || 0} Voters
                      </span>
                    </td>
                    <td>
                      {r.status === 'active' ? (
                        <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <CheckCircle size={12} /> Active
                        </span>
                      ) : (
                        <span className="badge badge-gray" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          <XCircle size={12} /> Deactivated
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleViewDetail(r._id)}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '0.35rem 0.6rem' }}
                          title="View Recruiter Performance"
                        >
                          <Eye size={15} /> Details
                        </button>
                        <button
                          onClick={() => handleToggleStatus(r._id, r.status)}
                          className={`btn btn-sm ${r.status === 'active' ? 'btn-outline' : 'btn-primary'}`}
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                        >
                          {r.status === 'active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
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

        {/* MODAL 1: ADD RECRUITER */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Register New Field Recruiter"
        >
          <form onSubmit={handleCreateRecruiter} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  placeholder="e.g. Samuel"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  placeholder="e.g. Akran"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="samuel.akran@bvdi.gov.ng"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+2348023456789"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Physical Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                placeholder="24 Marina Road, Badagry"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Account Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div style={{ backgroundColor: '#e6f3ed', padding: '0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#007043' }}>
              <strong>Notice:</strong> Submitting will automatically generate a unique Recruiter Code (e.g. <code>SAMUEL7XQ9</code>) in MongoDB for authorization tracking.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn btn-outline">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Generating Recruiter...' : 'Create Recruiter'}
              </button>
            </div>
          </form>
        </Modal>

        {/* MODAL 2: RECRUITER DETAILS & WARDS BREAKDOWN */}
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={`Recruiter Details: ${selectedRecruiter?.firstName} ${selectedRecruiter?.lastName}`}
          maxWidth="650px"
        >
          {selectedRecruiter && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F8F6', padding: '1rem', borderRadius: '10px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>RECRUITER CODE</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#007043' }}>{selectedRecruiter.recruiterCode}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B' }}>TOTAL VOTERS REGISTERED</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F15A24' }}>{selectedRecruiter.totalVoters} Voters</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                <div><strong>Email:</strong> {selectedRecruiter.email}</div>
                <div><strong>Phone:</strong> {selectedRecruiter.phone}</div>
                <div><strong>Address:</strong> {selectedRecruiter.address || 'N/A'}</div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111111' }}>Ward Registration Distribution</h4>
              {selectedRecruiter.wardBreakdown?.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>No voters registered yet by this recruiter.</p>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {selectedRecruiter.wardBreakdown?.map((w, idx) => (
                    <div key={idx} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0.6rem 0.85rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span>{w._id}</span>
                      <strong>{w.count} voters</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
};

export default AdminRecruiters;
