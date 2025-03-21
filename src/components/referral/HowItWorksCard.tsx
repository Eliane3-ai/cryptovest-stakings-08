
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HowItWorksCard: React.FC = () => {
  return (
    <Card className="border-[#474D57] bg-[#1E2026] mt-6">
      <CardHeader>
        <CardTitle className="text-lg">How It Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
            1
          </div>
          <div>
            <h3 className="font-semibold">Share Your Referral Link</h3>
            <p className="text-gray-400 text-sm">Share your unique referral link with friends and family.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
            2
          </div>
          <div>
            <h3 className="font-semibold">They Sign Up & Deposit</h3>
            <p className="text-gray-400 text-sm">When your friends sign up and make their first deposit, they become your referrals.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#F0B90B] text-black rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
            3
          </div>
          <div>
            <h3 className="font-semibold">Earn Rewards</h3>
            <p className="text-gray-400 text-sm">You receive 3 USDT for each successful referral. Your friends also get a bonus!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HowItWorksCard;
