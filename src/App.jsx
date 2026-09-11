import React from 'react';
import { Routes, Route, useOutletContext } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Privacy from './pages/public/Privacy';
import DataResponsibility from './pages/public/DataResponsibility';

// Auth Pages
import AdminLogin from './pages/auth/AdminLogin';
import RecruiterLogin from './pages/auth/RecruiterLogin';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import RecruiterLayout from './layouts/RecruiterLayout';

// Admin System Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRecruiters from './pages/admin/AdminRecruiters';
import AdminVoters from './pages/admin/AdminVoters';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminAuditLogs from './pages/admin/AdminAuditLogs';

// Recruiter System Pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterRegisterVoter from './pages/recruiter/RecruiterRegisterVoter';
import RecruiterMyVoters from './pages/recruiter/RecruiterMyVoters';
import RecruiterProfile from './pages/recruiter/RecruiterProfile';

// Helper wrappers to pass mobile toggle context from Layout to Pages
const AdminPageWrapper = ({ Component }) => {
  const { onMobileMenuToggle } = useOutletContext() || {};
  return <Component onMobileMenuToggle={onMobileMenuToggle} />;
};

const RecruiterPageWrapper = ({ Component }) => {
  const { onMobileMenuToggle } = useOutletContext() || {};
  return <Component onMobileMenuToggle={onMobileMenuToggle} />;
};

function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/data-responsibility" element={<DataResponsibility />} />

        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/recruiter/login" element={<RecruiterLogin />} />

        {/* Admin System Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminPageWrapper Component={AdminDashboard} />} />
          <Route path="recruiters" element={<AdminPageWrapper Component={AdminRecruiters} />} />
          <Route path="voters" element={<AdminPageWrapper Component={AdminVoters} />} />
          <Route path="analytics" element={<AdminPageWrapper Component={AdminAnalytics} />} />
          <Route path="audit-logs" element={<AdminPageWrapper Component={AdminAuditLogs} />} />
          <Route path="*" element={<AdminPageWrapper Component={AdminDashboard} />} />
        </Route>

        {/* Recruiter System Routes */}
        <Route
          path="/recruiter"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<RecruiterPageWrapper Component={RecruiterDashboard} />} />
          <Route path="register-voter" element={<RecruiterPageWrapper Component={RecruiterRegisterVoter} />} />
          <Route path="my-voters" element={<RecruiterPageWrapper Component={RecruiterMyVoters} />} />
          <Route path="profile" element={<RecruiterPageWrapper Component={RecruiterProfile} />} />
          <Route path="*" element={<RecruiterPageWrapper Component={RecruiterDashboard} />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
