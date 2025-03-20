
import React from 'react';
import AppHeader from "@/components/AppHeader";
import WalletHeader from "@/components/WalletHeader";
import TabsSection from "@/components/TabsSection";
import AssetsList from "@/components/AssetsList";
import TransactionsList from "@/components/TransactionsList";
import StakingSection from "@/components/StakingSection";
import LiveMarketView from "@/components/LiveMarketView";
import Chat from "@/components/Chat";
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
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Top App Bar with Menu */}
        <AppHeader />
          
        {/* Main Content */}
        <div>
          {/* Wallet Header with actions integrated */}
          <WalletHeader totalBalance={totalBalance} />
          
          {/* Action Buttons (with chat integration) */}
          <div className="mb-6">
            <WalletActions />
          </div>
          
          {/* Live Market View */}
          <LiveMarketView />
          
          {/* Chat is now controlled by the Chat button, no need to always show it */}
          {chatOpen && (
            <div className="mb-6">
              <Chat />
            </div>
          )}
          
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
