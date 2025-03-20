
import React from 'react';
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";

interface WalletHeaderProps {
  totalBalance: number;
  className?: string;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ totalBalance, className }) => {
  return (
    <div className={cn("p-6 rounded-2xl glassmorphism soft-shadow mb-6 w-full", className)}>
      <div className="flex items-center gap-2">
        <div className="bg-crypto-blue bg-opacity-10 p-2 rounded-lg">
          <Wallet className="h-5 w-5 text-crypto-blue" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Main Wallet</p>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground mb-1">Total Balance</p>
        <h1 className="text-4xl font-bold tracking-tight">${totalBalance.toLocaleString()}</h1>
      </div>
      
      <div className="mt-6 flex gap-3">
        <button className="flex-1 bg-crypto-blue text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
          Send
        </button>
        <button className="flex-1 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
          Receive
        </button>
        <button className="flex-1 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
          Swap
        </button>
      </div>
    </div>
  );
};

export default WalletHeader;
