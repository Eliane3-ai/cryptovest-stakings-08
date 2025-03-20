
import React from 'react';
import AppHeader from "@/components/AppHeader";
import WalletHeader from "@/components/WalletHeader";
import TabsSection from "@/components/TabsSection";
import AssetsList from "@/components/AssetsList";
import TransactionsList from "@/components/TransactionsList";
import StakingSection from "@/components/StakingSection";
import LiveMarketView from "@/components/LiveMarketView";
import WalletActions from "@/components/WalletActions";
import { useWalletData } from "@/hooks/useWalletData";
import { useChatContext } from "@/contexts/ChatContext";

const Index: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    transactions, 
    tokens, 
    totalBalance,
    stakingOptions 
  } = useWalletData();
  
  const { chatOpen } = useChatContext();

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Top App Bar with Menu */}
        <AppHeader />
          
        {/* Main Content */}
        <div>
          {/* Wallet Header with actions integrated */}
          <WalletHeader totalBalance={totalBalance} />
          
          {/* Action Buttons (without chat and winners buttons) */}
          <div className="mb-6">
            <WalletActions />
          </div>
          
          {/* Live Market View */}
          <LiveMarketView />
          
          {/* Tab Navigation */}
          <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Content based on active tab */}
          {activeTab === 'assets' && <AssetsList tokens={tokens} />}
          {activeTab === 'transactions' && <TransactionsList transactions={transactions} />}
          {activeTab === 'staking' && <StakingSection stakingOptions={stakingOptions} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
