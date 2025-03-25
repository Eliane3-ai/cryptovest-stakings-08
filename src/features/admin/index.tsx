
import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import AdminDashboard from '@/components/admin/AdminDashboard';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {isAdmin ? (
          <AdminDashboard />
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  );
};

export default Admin;
