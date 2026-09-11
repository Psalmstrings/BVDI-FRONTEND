import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { adminService } from '../../services/api';
import { ShieldCheck, Lock, Activity } from 'lucide-react';
import { toast } from 'sonner';

const AdminAuditLogs = ({ onMobileMenuToggle }) => {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        setLoading(true);
        const res = await adminService.getAuditLogs({ page, limit });
        setLogs(res.logs || []);
        setTotal(res.total || 0);
        setPages(res.pages || 1);
      } catch (err) {
        toast.error(err.message || 'Failed to fetch audit trail.');
      } finally {
        setLoading(false);
      }
    };
    fetchAuditLogs();
  }, [page, limit]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F5F8F6' }}>
      <Header
        title="Administrative Security Audit Logs"
        subtitle="Immutable security trail of administrative logins, recruiter creations, and data exports"
        onMobileMenuToggle={onMobileMenuToggle}
      />

      <main style={{ padding: '1.5rem', flex: 1 }}>
        {loading ? (
          <LoadingSpinner text="Fetching security audit trail..." />
        ) : logs.length === 0 ? (
          <EmptyState
            title="No Audit Logs Recorded"
            message="No system audit logs have been recorded yet."
            icon={ShieldCheck}
          />
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action Executed</th>
                  <th>User / Role</th>
                  <th>Recruiter Code</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <span className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#111111' }}>{log.userEmail}</strong> ({log.userRole})
                    </td>
                    <td>
                      {log.recruiterCode ? (
                        <span className="badge badge-orange">{log.recruiterCode}</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {log.ipAddress}
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

export default AdminAuditLogs;
