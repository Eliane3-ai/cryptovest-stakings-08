
import React from 'react';
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";

interface StakingCardProps {
  token: string;
  symbol: string;
  stakedAmount: number;
  apy: number;
  rewards: number;
  rewardToken: string;
  className?: string;
}

const StakingCard: React.FC<StakingCardProps> = ({
  token,
  symbol,
  stakedAmount,
  apy,
  rewards,
  rewardToken,
  className,
}) => {
  return (
    <div className={cn(
      "p-5 rounded-xl border border-border bg-white dark:bg-gray-800 transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{token} Staking</h3>
        <div className="flex items-center bg-crypto-green/10 px-2 py-1 rounded-full">
          <Percent className="h-3 w-3 text-crypto-green mr-1" />
          <p className="text-xs font-medium text-crypto-green">{apy}% APY</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Staked Amount</p>
          <p className="text-sm font-medium">{stakedAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {symbol}</p>
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Rewards Earned</p>
          <p className="text-sm font-medium">{rewards.toLocaleString(undefined, { maximumFractionDigits: 6 })} {rewardToken}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="bg-crypto-green text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-opacity-90">
          Stake More
        </button>
        <button className="bg-white dark:bg-gray-700 border border-border py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-muted">
          Claim Rewards
        </button>
      </div>
    </div>
  );
};

export default StakingCard;
