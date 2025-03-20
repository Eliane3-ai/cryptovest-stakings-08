
import React from 'react';
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export type TransactionType = 'send' | 'receive';

interface TransactionItemProps {
  type: TransactionType;
  amount: number;
  token: string;
  date: string;
  address: string;
  usdValue: number;
  className?: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  amount,
  token,
  date,
  address,
  usdValue,
  className,
}) => {
  return (
    <div className={cn(
      "p-4 border-b border-border transition-colors hover:bg-muted/30",
      className
    )}>
      <div className="flex items-center">
        <div className={cn(
          "p-2 rounded-full mr-3",
          type === 'send' ? "bg-destructive/10" : "bg-crypto-green/10"
        )}>
          {type === 'send' ? (
            <ArrowUpRight className="h-4 w-4 text-destructive" />
          ) : (
            <ArrowDownLeft className="h-4 w-4 text-crypto-green" />
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-sm">
              {type === 'send' ? 'Sent' : 'Received'} {token}
            </h3>
            <p className="font-medium text-sm">
              {type === 'send' ? '-' : '+'}{amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} {token}
            </p>
          </div>
          
          <div className="flex justify-between mt-1">
            <div className="flex items-center">
              <p className="text-xs text-muted-foreground">{date}</p>
              <span className="mx-1 text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">
                {address.substring(0, 6)}...{address.substring(address.length - 4)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              ${usdValue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
