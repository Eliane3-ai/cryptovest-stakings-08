
import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Trophy, MessageCircle, Repeat, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface WalletActionsProps {
  className?: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ className }) => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleWithdraw = () => {
    if (!withdrawAddress || !withdrawAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 69) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            toast.error("Withdrawal failed: KYC verification required", {
              description: "Please complete your KYC verification in the settings page",
              action: {
                label: "Go to Settings",
                onClick: () => navigate("/settings")
              }
            });
            setWithdrawDialogOpen(false);
            resetForm();
          }, 1000);
          return 69;
        }
        return prev + 5;
      });
    }, 300);
  };

  const resetForm = () => {
    setWithdrawAddress('');
    setWithdrawAmount('');
    setProgress(0);
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      <button 
        className="flex items-center justify-center gap-2 bg-crypto-blue text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50"
        onClick={() => setWithdrawDialogOpen(true)}
      >
        <ArrowDownToLine className="h-4 w-4" />
        <span>Withdraw</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <ArrowUpFromLine className="h-4 w-4" />
        <span>Deposit</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <Trophy className="h-4 w-4" />
        <span>View Winners</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <MessageCircle className="h-4 w-4" />
        <span>Chat Now</span>
      </button>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Withdraw Funds</DialogTitle>
            <DialogDescription>
              Enter the wallet address or bank account details and amount you'd like to withdraw.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Wallet Address / Bank Account</label>
              <Input
                id="address"
                placeholder="Enter destination address or account details"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="amount" className="text-sm font-medium">Amount</label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                disabled={loading}
              />
            </div>
            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing withdrawal</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => {
              setWithdrawDialogOpen(false);
              resetForm();
            }} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleWithdraw} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Withdraw'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletActions;
