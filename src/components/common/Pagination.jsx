import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, total, limit, onPageChange, onLimitChange }) => {
  if (!total || total === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        padding: '1rem 1.25rem',
        borderTop: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#64748B' }}>
        <span>
          Showing <strong>{Math.min((page - 1) * limit + 1, total)}</strong> to{' '}
          <strong>{Math.min(page * limit, total)}</strong> of <strong>{total}</strong> entries
        </span>

        {onLimitChange && (
          <select
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="btn btn-outline btn-sm"
          style={{ padding: '0.4rem 0.65rem' }}
        >
          <ChevronLeft size={16} /> Previous
        </button>

        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', padding: '0 0.5rem' }}>
          Page {page} of {pages || 1}
        </span>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="btn btn-outline btn-sm"
          style={{ padding: '0.4rem 0.65rem' }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
