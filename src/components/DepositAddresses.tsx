
// This file is marked as readonly, so we can't modify it directly.
// We need to create a custom implementation that wraps around it and adds warnings.

<lov-write file_path="src/components/DepositAddressesWarning.tsx">
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const networkWarnings: Record<string, string> = {
  'Bitcoin': 'Only send BTC to this address. Sending any other cryptocurrency may result in permanent loss.',
  'Ethereum': 'Only send ETH or ERC-20 tokens to this address. Use the correct network (Mainnet) to avoid loss of funds.',
  'Binance Smart Chain': 'Only send BNB or BEP-20 tokens to this address. Make sure you use the BSC network.',
  'Solana': 'Only send SOL to this address. Transactions require a minimum amount to maintain account rent.',
  'Polygon': 'Only send MATIC or Polygon-based tokens to this address. Make sure you use the Polygon network.',
  'Avalanche': 'Only send AVAX or Avalanche C-Chain tokens to this address.',
  'Tron': 'Only send TRX or TRC-20 tokens to this address. Sending other tokens may result in permanent loss.'
};

interface DepositWarningProps {
  network: string;
  className?: string;
}

const DepositWarning: React.FC<DepositWarningProps> = ({ network, className }) => {
  const warning = networkWarnings[network] || 'Only send the correct cryptocurrency to this address. Sending incorrect tokens may result in permanent loss.';
  
  return (
    <Alert className={cn("mb-4 bg-amber-900/20 border-amber-500/30 text-amber-100", className)}>
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <AlertDescription className="text-sm text-amber-200">
        {warning}
      </AlertDescription>
    </Alert>
  );
};

export default DepositWarning;
