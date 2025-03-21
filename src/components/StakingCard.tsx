
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Percent } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

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
  const navigate = useNavigate();
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  
  // Example saved wallet address - in a real app, this would come from user storage
  const savedWalletAddress = "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL";

  const handleStakeMore = () => {
    setDepositDialogOpen(true);
  };

  const handleClaimRewards = () => {
    // Redirect to withdrawal dialog
    document.getElementById('withdraw-dialog-trigger')?.click();
  };

  return (
    <div className={cn(
      "p-5 rounded-xl border border-[#474D57] bg-[#2B3139] transition-all hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-white">{token} Staking</h3>
        <div className="flex items-center bg-[#F0B90B]/10 px-2 py-1 rounded-full">
          <Percent className="h-3 w-3 text-[#F0B90B] mr-1" />
          <p className="text-xs font-medium text-[#F0B90B]">{apy}% APY</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs text-[#848E9C] mb-1">Staked Amount</p>
          <p className="text-sm font-medium text-white">{stakedAmount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {symbol}</p>
        </div>
        
        <div>
          <p className="text-xs text-[#848E9C] mb-1">Rewards Earned</p>
          <p className="text-sm font-medium text-white">{rewards.toLocaleString(undefined, { maximumFractionDigits: 6 })} {rewardToken}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button 
          className="bg-[#F0B90B] text-black py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-opacity-90"
          onClick={handleStakeMore}
        >
          Stake More
        </button>
        <button 
          className="bg-[#2B3139] border border-[#474D57] text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-[#474D57]/70"
          onClick={handleClaimRewards}
        >
          Claim Rewards
        </button>
      </div>

      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="bg-[#1E2026] border-[#474D57] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Stake More {token}</DialogTitle>
            <DialogDescription className="text-[#848E9C]">
              Send 100 USDT (TRC20) to the address below to increase your stake.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-3 bg-[#2B3139] rounded-lg border border-[#474D57] mt-2">
            <p className="text-xs text-[#848E9C] mb-1">Your USDT Deposit Address (TRC20)</p>
            <div className="bg-[#0B0E11] p-2 rounded-md font-mono text-sm break-all">
              {savedWalletAddress}
            </div>
            <button 
              className="mt-2 w-full text-xs text-[#F0B90B] hover:text-[#F0B90B]/80" 
              onClick={() => {
                navigator.clipboard.writeText(savedWalletAddress);
              }}
            >
              Copy Address
            </button>
          </div>
          
          <div className="p-3 bg-[#F0B90B]/10 rounded-lg border border-[#F0B90B]/30 mt-2">
            <p className="text-sm text-[#F0B90B]">
              <span className="font-semibold">Important:</span> Only send USDT via TRC20 network. Minimum deposit: 100 USDT.
            </p>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDepositDialogOpen(false)}
              className="bg-[#2B3139] border-[#474D57] text-white hover:bg-[#474D57]/20"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                navigate('/wallet-address');
                setDepositDialogOpen(false);
              }}
              className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90"
            >
              Manage Wallet Addresses
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StakingCard;
