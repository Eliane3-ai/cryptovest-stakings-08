
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

/**
 * AdminRoute component - ensures users are admin authenticated
 * Redirects non-admin users to the admin login page
 */
const AdminRoute: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  
  // If not admin, redirect to auth page
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // User is admin authenticated, render the protected route
  return <Outlet />;
};

export default AdminRoute;
