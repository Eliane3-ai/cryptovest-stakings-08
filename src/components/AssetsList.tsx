
import React from 'react';
import TokenCard from "@/components/TokenCard";
import { Token } from "@/data/initialTokens";

interface AssetsListProps {
  tokens: Token[];
}

const AssetsList: React.FC<AssetsListProps> = ({ tokens }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in mb-6">
      {tokens.map((token, index) => (
        <TokenCard 
          key={index}
          name={token.name}
          symbol={token.symbol}
          balance={token.balance}
          usdValue={token.usdValue}
          iconColor={token.iconColor}
          iconComponent={token.iconComponent}
        />
      ))}
    </div>
  );
};

export default AssetsList;
