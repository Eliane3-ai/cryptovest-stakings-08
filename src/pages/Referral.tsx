
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import useReferrals from '@/hooks/useReferrals';

// Import refactored components
import ReferralBalanceCard from '@/components/referral/ReferralBalanceCard';
import ReferralStatsCard from '@/components/referral/ReferralStatsCard';
import ReferralLinkCard from '@/components/referral/ReferralLinkCard';
import HowItWorksCard from '@/components/referral/HowItWorksCard';
import DailyTasksCard from '@/components/referral/DailyTasksCard';
import LoginPrompt from '@/components/referral/LoginPrompt';
import LoadingState from '@/components/referral/LoadingState';

const Referral: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { referrals, referralCode, stats, isLoading, referralLink } = useReferrals();
  
  // Show login prompt if user is not authenticated
  if (!user) {
    return <LoginPrompt />;
  }
  
  // Show loading state while data is being fetched
  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/wallet')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Refer & Earn</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Referral Balance Card */}
          <ReferralBalanceCard stats={stats} />
          
          {/* Referral Stats Card */}
          <ReferralStatsCard stats={stats} />
          
          {/* Referral Link Card */}
          <ReferralLinkCard 
            referralLink={referralLink} 
            referralCode={referralCode} 
          />
        </div>
        
        {/* How it works section */}
        <HowItWorksCard />
        
        {/* Daily Tasks */}
        <DailyTasksCard stats={stats} isLoggedIn={!!user} />
      </div>
    </div>
  );
};

export default Referral;
