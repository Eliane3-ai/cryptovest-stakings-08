
import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import KycVerificationAdmin from './KycVerificationAdmin';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { adminLogout } = useAdminAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
          onClick={adminLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold mb-4">KYC Verification Management</h2>
        <KycVerificationAdmin />
      </div>
    </div>
  );
};

export default AdminDashboard;
