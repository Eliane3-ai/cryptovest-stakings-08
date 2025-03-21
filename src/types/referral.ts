
export interface Referral {
  id: string;
  referrer_id: string;
  referred_id: string | null;
  code: string;
  status: 'pending' | 'completed';
  reward: number;
  created_at: string;
  completed_at: string | null;
}

export interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalEarned: number;
}
