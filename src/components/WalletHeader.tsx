
import React from 'react';
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown, ArrowDownToLine, ArrowUpFromLine, Trophy, MessageCircle } from "lucide-react";

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
    </div>
  );
};

export default WalletHeader;
