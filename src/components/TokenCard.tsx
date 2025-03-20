
import React from 'react';
import { cn } from "@/lib/utils";
import * as LucideIcons from 'lucide-react';

interface TokenCardProps {
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  iconColor: string;
  iconComponent: string;
  className?: string;
}

const TokenCard: React.FC<TokenCardProps> = ({
  name,
  symbol,
  balance,
  usdValue,
  iconColor,
  iconComponent,
  className,
}) => {
  // Get the icon component from Lucide icons safely
  const IconComponent = iconComponent in LucideIcons 
    ? LucideIcons[iconComponent as keyof typeof LucideIcons] 
    : LucideIcons.Coins; // Fallback to Coins icon if not found
  
  return (
    <div className={cn(
      "p-4 rounded-xl border border-border bg-white dark:bg-gray-800 token-card soft-shadow",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${iconColor}20` }}>
          <div className="text-xl" style={{ color: iconColor }}>
            {IconComponent && <IconComponent />}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{symbol}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-baseline">
          <p className="text-xs text-muted-foreground">Balance</p>
          <p className="text-xs text-muted-foreground">USD Value</p>
        </div>
        <div className="flex justify-between items-baseline mt-1">
          <p className="text-sm font-medium">{balance.toLocaleString(undefined, { maximumFractionDigits: 6 })} {symbol}</p>
          <p className="text-sm font-medium">${usdValue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
