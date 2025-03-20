
import React, { useState } from 'react';
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

// Fixed wallet addresses for all users
const FIXED_ADDRESSES = {
  BTC: "19hjRhd7pYKdGvqDA9S6SPYbz6gfN5potm",
  ETH: "0x3951714b1886442255858e42653d9552b5d5073a",
  BNB: "0x3951714b1886442255858e42653d9552b5d5073a",
  TRX: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL",
  USDT: "TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL"
};

interface DepositAddressProps {
  className?: string;
}

const DepositAddresses: React.FC<DepositAddressProps> = ({ className }) => {
  const [copiedCoin, setCopiedCoin] = useState<string | null>(null);
  const { language } = useLanguage();

  const handleCopyAddress = (coin: string, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedCoin(coin);
    
    const coinName = coin === 'BTC' ? 'Bitcoin' :
                    coin === 'ETH' ? 'Ethereum' :
                    coin === 'BNB' ? 'Binance Coin' :
                    coin === 'TRX' ? 'Tron' : 'USDT';
    
    toast.success(getTranslation('addressCopied', language), {
      description: `${coinName} ${getTranslation('addressCopiedDesc', language)}`,
    });
    
    // Reset copied state after 3 seconds
    setTimeout(() => {
      setCopiedCoin(null);
    }, 3000);
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl border border-border p-5 ${className}`}>
      <h2 className="font-medium mb-4">{getTranslation('depositAddresses', language)}</h2>
      
      <div className="space-y-4">
        {Object.entries(FIXED_ADDRESSES).map(([coin, address]) => (
          <div key={coin} className="p-3 border border-border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{coin}</h3>
              <button
                onClick={() => handleCopyAddress(coin, address)}
                className="text-sm text-crypto-blue hover:underline flex items-center"
              >
                {copiedCoin === coin ? (
                  <>
                    <CheckCircle className="h-3.5 w-3.5 mr-1 text-crypto-green" />
                    <span>{getTranslation('copied', language)}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    <span>{getTranslation('copyAddress', language)}</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-muted/30 p-2 rounded text-xs font-mono break-all">
              {address}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {getTranslation('onlySend', language)} {coin} {getTranslation('toThisAddress', language)}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-5 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
        <p className="text-sm text-yellow-800 dark:text-yellow-400">
          <span className="font-medium">{getTranslation('important', language)}:</span> {getTranslation('depositWarning', language)}
        </p>
      </div>
    </div>
  );
};

export default DepositAddresses;
