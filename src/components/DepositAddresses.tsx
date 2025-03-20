
import React, { useState } from 'react';
import { Bitcoin, Coins, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { cn } from '@/lib/utils';

// Fixed deposit addresses
const FIXED_ADDRESSES = {
  BTC: '19hjRhd7pYKdGvqDA9S6SPYbz6gfN5potm',
  ETH_BNB: '0x3951714b1886442255858e42653d9552b5d5073a',
  USDT_TRX: 'TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL'
};

interface DepositAddressesProps {
  className?: string;
}

const DepositAddresses: React.FC<DepositAddressesProps> = ({ className }) => {
  const { language } = useLanguage();
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedAddress(null);
    }, 2000);
  };
  
  return (
    <div className={cn("", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{getTranslation('depositAddresses', language)}</CardTitle>
          <CardDescription>
            {getTranslation('depositAddressesDesc', language)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bitcoin Address */}
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-amber-100">
                <Bitcoin className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Bitcoin (BTC)</h3>
                <p className="text-xs text-muted-foreground">Bitcoin Network</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-muted rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all">{FIXED_ADDRESSES.BTC}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.BTC)}
                className="ml-2 flex-shrink-0"
              >
                {copiedAddress === FIXED_ADDRESSES.BTC ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Ethereum & BNB Address */}
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-100">
                <Coins className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Ethereum (ETH) & Binance Coin (BNB)</h3>
                <p className="text-xs text-muted-foreground">ERC-20 & BEP-20 Networks</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-muted rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all">{FIXED_ADDRESSES.ETH_BNB}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.ETH_BNB)}
                className="ml-2 flex-shrink-0"
              >
                {copiedAddress === FIXED_ADDRESSES.ETH_BNB ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          {/* USDT & TRX Address */}
          <div className="p-4 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-100">
                <Coins className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-medium">USDT & Tron (TRX)</h3>
                <p className="text-xs text-muted-foreground">TRC-20 Network</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-muted rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all">{FIXED_ADDRESSES.USDT_TRX}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.USDT_TRX)}
                className="ml-2 flex-shrink-0"
              >
                {copiedAddress === FIXED_ADDRESSES.USDT_TRX ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-lg mt-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>{getTranslation('important', language)}:</strong> {getTranslation('depositWarning', language)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositAddresses;
