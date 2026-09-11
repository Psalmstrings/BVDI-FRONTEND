// API Base URL — retrieved only from .env
const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error(
    'VITE_API_URL is not defined. Please add VITE_API_URL to your .env file.'
  );
}

export const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem('bvdi_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
  } catch (err) {
    throw new Error(
      'Unable to connect to BVDI backend server. Please check your API URL and ensure the backend is running.'
    );
  }

  // Handle CSV Blob download
  if (response.headers.get('content-type')?.includes('text/csv')) {
    if (!response.ok) {
      throw new Error('Export failed.');
    }

    return await response.blob();
  }

  const data = await response.json();

  if (!response.ok) {
    const errorMsg =
      data.message || 'An unexpected error occurred.';

    throw new Error(errorMsg);
  }

  return data;
};

// API Services
export const authService = {
  login: (credentials) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  logout: () =>
    fetchAPI('/auth/logout', {
      method: 'POST',
    }),

  getMe: () =>
    fetchAPI('/auth/me'),
};

export const adminService = {
  getAnalytics: () =>
    fetchAPI('/admin/analytics'),

  getWardAnalytics: () =>
    fetchAPI('/admin/analytics/wards'),

  getRecruiterAnalytics: () =>
    fetchAPI('/admin/analytics/recruiters'),

  getRecruiters: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/recruiters?${query}`);
  },

  createRecruiter: (data) =>
    fetchAPI('/admin/recruiters', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  toggleRecruiterStatus: (id, status) =>
    fetchAPI(`/admin/recruiters/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  getVoters: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/voters?${query}`);
  },

  getVoterById: (id) =>
    fetchAPI(`/admin/voters/${id}`),

  exportVoters: (filters) =>
    fetchAPI('/admin/voters/export', {
      method: 'POST',
      body: JSON.stringify(filters),
    }),

  getAuditLogs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/admin/audit-logs?${query}`);
  },
};

export const recruiterService = {
  getProfile: () =>
    fetchAPI('/recruiter/profile'),

  registerVoter: (voterData) =>
    fetchAPI('/recruiter/voters', {
      method: 'POST',
      body: JSON.stringify(voterData),
    }),

  getMyVoters: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchAPI(`/recruiter/voters?${query}`);
  },
};

export const publicService = {
  getStats: () =>
    fetchAPI('/public/stats'),

  getWards: () =>
    fetchAPI('/public/wards'),
};