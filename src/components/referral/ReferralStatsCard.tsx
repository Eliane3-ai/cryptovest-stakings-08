
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReferralStats } from '@/types/referral';

interface ReferralStatsCardProps {
  stats: ReferralStats;
}

const ReferralStatsCard: React.FC<ReferralStatsCardProps> = ({ stats }) => {
  return (
    <Card className="border-[#474D57] bg-[#1E2026]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-[#F0B90B]" />
          Referral Statistics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Your referral performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Referrals</span>
          <span className="font-semibold">{stats.totalReferrals}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Completed</span>
          <span className="font-semibold text-green-500">{stats.completedReferrals}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Pending</span>
          <span className="font-semibold text-yellow-500">{stats.pendingReferrals}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Total Earned</span>
          <span className="font-semibold text-[#F0B90B]">{stats.totalEarned.toFixed(2)} USDT</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralStatsCard;
