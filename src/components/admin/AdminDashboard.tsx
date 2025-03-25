
import React, { useState } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Users, CheckSquare, MessageSquare, ShieldCheck } from 'lucide-react';

// Admin Components
import KycVerificationAdmin from './KycVerificationAdmin';
import UserManagementAdmin from './UserManagementAdmin';
import ReferralTasksAdmin from './ReferralTasksAdmin';
import MessageCenterAdmin from './MessageCenterAdmin';

const AdminDashboard: React.FC = () => {
  const { adminLogout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("kyc");
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-[#F0B90B] mr-2" />
            <h1 className="text-2xl font-bold">ADMIN Dashboard</h1>
          </div>
          
          <Button 
            variant="outline" 
            className="text-red-500 border-red-200 hover:bg-red-950 hover:text-red-400"
            onClick={adminLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            LOGOUT
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-[#1E2329] border border-[#2B3139]">
            <TabsTrigger 
              value="kyc" 
              className="flex items-center gap-2 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-[#0B0E11]"
            >
              <CheckSquare className="h-4 w-4" />
              <span>KYC VERIFICATION</span>
            </TabsTrigger>
            <TabsTrigger 
              value="users" 
              className="flex items-center gap-2 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-[#0B0E11]"
            >
              <Users className="h-4 w-4" />
              <span>USER Management</span>
            </TabsTrigger>
            <TabsTrigger 
              value="referrals" 
              className="flex items-center gap-2 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-[#0B0E11]"
            >
              <CheckSquare className="h-4 w-4" />
              <span>REFERRAL Tasks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="flex items-center gap-2 data-[state=active]:bg-[#F0B90B] data-[state=active]:text-[#0B0E11]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>MESSAGE Center</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="kyc" className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
            <KycVerificationAdmin />
          </TabsContent>
          
          <TabsContent value="users" className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
            <UserManagementAdmin />
          </TabsContent>
          
          <TabsContent value="referrals" className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
            <ReferralTasksAdmin />
          </TabsContent>
          
          <TabsContent value="messages" className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6">
            <MessageCenterAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
