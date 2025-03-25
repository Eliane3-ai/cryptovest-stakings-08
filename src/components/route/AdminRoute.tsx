
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { toast } from "sonner";

/**
 * AdminRoute component - ensures users are admin authenticated
 * Redirects non-admin users to the admin login page
 */
const AdminRoute: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (!isAdmin) {
      toast.error("Admin access required. Please login with admin credentials.");
    }
  }, [isAdmin]);
  
  // If not admin, redirect to admin login page
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // User is admin authenticated, render the protected route
  return <Outlet />;
};

export default AdminRoute;
