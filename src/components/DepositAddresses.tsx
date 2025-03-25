
import React, { useState } from 'react';
import { Bitcoin, Coins, Copy, Check, AlertTriangle } from 'lucide-react';
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

// Deposit warnings for each address
const DEPOSIT_WARNINGS = {
  BTC: "Only send Bitcoin (BTC) to this address. Sending any other cryptocurrency may result in permanent loss.",
  ETH_BNB: "This address supports both Ethereum (ETH) on ERC-20 and Binance Coin (BNB) on BEP-20. Ensure you select the correct network when sending funds.",
  USDT_TRX: "Only send USDT on the Tron (TRC-20) network to this address. Using other networks may result in loss of funds."
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
      <Card className="bg-[#1E2026] border-[#2B3139] text-white">
        <CardHeader className="border-b border-[#2B3139]">
          <CardTitle className="text-[#F0B90B]">{getTranslation('depositAddresses', language)}</CardTitle>
          <CardDescription className="text-[#848E9C]">
            {getTranslation('depositAddressesDesc', language)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {/* Bitcoin Address */}
          <div className="p-4 rounded-lg border border-[#2B3139] bg-[#0B0E11]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#F0B90B]/10">
                <Bitcoin className="h-5 w-5 text-[#F0B90B]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Bitcoin (BTC)</h3>
                <p className="text-xs text-[#848E9C]">Bitcoin Network</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-[#2B3139] rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all text-[#E6E8EA]">{FIXED_ADDRESSES.BTC}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.BTC)}
                className="ml-2 flex-shrink-0 text-[#F0B90B] hover:text-[#F0B90B] hover:bg-[#F0B90B]/10"
              >
                {copiedAddress === FIXED_ADDRESSES.BTC ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 p-3 bg-[#F0B90B]/5 border border-[#F0B90B]/20 rounded-lg flex items-start">
              <AlertTriangle className="h-4 w-4 text-[#F0B90B] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-[#F0B90B]">{DEPOSIT_WARNINGS.BTC}</p>
            </div>
          </div>
          
          {/* Ethereum & BNB Address */}
          <div className="p-4 rounded-lg border border-[#2B3139] bg-[#0B0E11]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#627EEA]/10">
                <Coins className="h-5 w-5 text-[#627EEA]" />
              </div>
              <div>
                <h3 className="font-medium text-white">Ethereum (ETH) & Binance Coin (BNB)</h3>
                <p className="text-xs text-[#848E9C]">ERC-20 & BEP-20 Networks</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-[#2B3139] rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all text-[#E6E8EA]">{FIXED_ADDRESSES.ETH_BNB}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.ETH_BNB)}
                className="ml-2 flex-shrink-0 text-[#F0B90B] hover:text-[#F0B90B] hover:bg-[#F0B90B]/10"
              >
                {copiedAddress === FIXED_ADDRESSES.ETH_BNB ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 p-3 bg-[#F0B90B]/5 border border-[#F0B90B]/20 rounded-lg flex items-start">
              <AlertTriangle className="h-4 w-4 text-[#F0B90B] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-[#F0B90B]">{DEPOSIT_WARNINGS.ETH_BNB}</p>
            </div>
          </div>
          
          {/* USDT & TRX Address */}
          <div className="p-4 rounded-lg border border-[#2B3139] bg-[#0B0E11]/30">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#26A17B]/10">
                <Coins className="h-5 w-5 text-[#26A17B]" />
              </div>
              <div>
                <h3 className="font-medium text-white">USDT & Tron (TRX)</h3>
                <p className="text-xs text-[#848E9C]">TRC-20 Network</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-[#2B3139] rounded-lg flex items-center justify-between">
              <code className="text-xs md:text-sm break-all text-[#E6E8EA]">{FIXED_ADDRESSES.USDT_TRX}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => handleCopyAddress(FIXED_ADDRESSES.USDT_TRX)}
                className="ml-2 flex-shrink-0 text-[#F0B90B] hover:text-[#F0B90B] hover:bg-[#F0B90B]/10"
              >
                {copiedAddress === FIXED_ADDRESSES.USDT_TRX ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="mt-3 p-3 bg-[#F0B90B]/5 border border-[#F0B90B]/20 rounded-lg flex items-start">
              <AlertTriangle className="h-4 w-4 text-[#F0B90B] mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-xs text-[#F0B90B]">{DEPOSIT_WARNINGS.USDT_TRX}</p>
            </div>
          </div>
          
          <div className="p-4 bg-[#F0B90B]/5 border border-[#F0B90B]/20 rounded-lg mt-4">
            <p className="text-sm text-[#F0B90B] flex items-start">
              <AlertTriangle className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
              <span>
                <strong>{getTranslation('important', language)}:</strong> {getTranslation('depositWarning', language)}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositAddresses;
