
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Loader2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGasFee } from '@/contexts/GasFeeContext';
import { getTranslation } from '@/utils/translations';

interface WithdrawDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShowTopUp: () => void;
}

const WithdrawDialog: React.FC<WithdrawDialogProps> = ({ 
  open, 
  onOpenChange,
  onShowTopUp
}) => {
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { canWithdraw, withdrawalErrorReason } = useGasFee();

  const resetForm = () => {
    setWithdrawAddress('');
    setWithdrawAmount('');
    setProgress(0);
  };

  const handleWithdraw = () => {
    if (!canWithdraw()) {
      // Show Top Up dialog instead if gas fee is the reason
      const reason = withdrawalErrorReason();
      if (reason && reason === getTranslation('noGasFee', language)) {
        onOpenChange(false);
        onShowTopUp();
      } else {
        toast.error(reason || getTranslation('withdrawalNotPossible', language));
      }
      return;
    }

    if (!withdrawAddress || !withdrawAmount) {
      toast.error(getTranslation('fillAllFields', language));
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
            toast.error(getTranslation('withdrawalFailed', language), {
              description: getTranslation('withdrawalFailedDesc', language),
              action: {
                label: getTranslation('goToSettings', language),
                onClick: () => navigate("/settings")
              }
            });
            onOpenChange(false);
            resetForm();
          }, 1000);
          return 69;
        }
        return prev + 5;
      });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTranslation('withdrawFunds', language)}</DialogTitle>
          <DialogDescription>
            {getTranslation('withdrawDescription', language)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!canWithdraw() && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  {getTranslation('withdrawalNotAvailable', language)}
                </p>
                <p className="text-xs text-red-600 dark:text-red-400/80 mt-1">
                  {withdrawalErrorReason()}
                </p>
                <Button 
                  size="sm" 
                  className="mt-2 bg-red-600 hover:bg-red-700" 
                  onClick={() => {
                    onOpenChange(false);
                    onShowTopUp();
                  }}
                >
                  {getTranslation('topUpGasFee', language)}
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">{getTranslation('walletAddress', language)}</label>
            <Input
              id="address"
              placeholder={getTranslation('enterAddress', language)}
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              disabled={loading || !canWithdraw()}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">{getTranslation('amount', language)}</label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              disabled={loading || !canWithdraw()}
            />
          </div>
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{getTranslation('processingWithdrawal', language)}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => {
            onOpenChange(false);
            resetForm();
          }} disabled={loading}>
            {getTranslation('cancel', language)}
          </Button>
          <Button onClick={handleWithdraw} disabled={loading || !canWithdraw()}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getTranslation('processing', language)}
              </>
            ) : (
              getTranslation('withdraw', language)
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawDialog;
