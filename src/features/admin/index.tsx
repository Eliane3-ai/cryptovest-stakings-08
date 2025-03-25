
import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  
  return isAdmin ? <AdminDashboard /> : <AdminLogin />;
};

export default Admin;
