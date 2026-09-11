import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage text="Verifying authorization credentials..." />;
  }

  if (!isAuthenticated) {
    const loginRedirect = role === 'admin' ? '/admin/login' : '/recruiter/login';
    return <Navigate to={loginRedirect} replace />;
  }

  if (role && user.role !== role) {
    const defaultHome = user.role === 'admin' ? '/admin/dashboard' : '/recruiter/dashboard';
    return <Navigate to={defaultHome} replace />;
  }

  return children;
};

export default ProtectedRoute;
