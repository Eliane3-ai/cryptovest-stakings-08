
import React from 'react';
import { Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ReferralStats } from '@/types/referral';

interface ReferralBalanceCardProps {
  stats: ReferralStats;
}

const ReferralBalanceCard: React.FC<ReferralBalanceCardProps> = ({ stats }) => {
  return (
    <Card className="border-[#474D57] bg-[#1E2026]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="h-5 w-5 text-[#F0B90B]" />
          Referral Balance
        </CardTitle>
        <CardDescription className="text-gray-400">
          Rewards earned from referrals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{stats.totalEarned.toFixed(2)}</span>
          <span className="ml-2 text-lg text-[#F0B90B]">USDT</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          ~ ${(stats.totalEarned * 1).toFixed(2)} USD
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
          disabled={stats.totalEarned <= 0}
        >
          Withdraw Rewards
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReferralBalanceCard;
