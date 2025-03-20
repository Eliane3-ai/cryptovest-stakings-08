
import React from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Trophy, MessageCircle, Repeat } from "lucide-react";

interface WalletActionsProps {
  className?: string;
}

const WalletActions: React.FC<WalletActionsProps> = ({ className }) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 ${className}`}>
      <button className="flex items-center justify-center gap-2 bg-crypto-blue text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
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
    </div>
  );
};

export default WalletActions;
