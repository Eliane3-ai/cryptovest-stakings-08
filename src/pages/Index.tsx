
import React from 'react';
import AppHeader from "@/components/AppHeader";
import WalletHeader from "@/components/WalletHeader";
import TabsSection from "@/components/TabsSection";
import AssetsList from "@/components/AssetsList";
import TransactionsList from "@/components/TransactionsList";
import StakingSection from "@/components/StakingSection";
import LiveMarketView from "@/components/LiveMarketView";
import { useWalletData } from "@/hooks/useWalletData";
import { useChatContext } from "@/contexts/ChatContext";
import WithdrawDialog from "@/components/dialogs/WithdrawDialog";
import DepositDialog from "@/components/dialogs/DepositDialog";
import GasFeeTopUpDialog from "@/components/dialogs/GasFeeTopUpDialog";
import { useState } from "react";

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
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Top App Bar with Menu */}
        <AppHeader />
          
        {/* Main Content */}
        <div>
          {/* Wallet Header with actions integrated */}
          <WalletHeader totalBalance={totalBalance} />
          
          {/* Live Market View */}
          <LiveMarketView />
          
          {/* Tab Navigation */}
          <TabsSection activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {/* Content based on active tab */}
          {activeTab === 'assets' && <AssetsList tokens={tokens} />}
          {activeTab === 'transactions' && <TransactionsList transactions={transactions} />}
          {activeTab === 'staking' && <StakingSection stakingOptions={stakingOptions} />}
        </div>

        {/* Hidden button triggers for dialogs */}
        <button 
          id="withdraw-dialog-trigger" 
          className="hidden"
          onClick={() => setWithdrawDialogOpen(true)}
        />
        <button 
          id="deposit-dialog-trigger" 
          className="hidden"
          onClick={() => setDepositDialogOpen(true)}
        />
        
        {/* Dialogs */}
        <WithdrawDialog 
          open={withdrawDialogOpen} 
          onOpenChange={setWithdrawDialogOpen}
          onShowTopUp={() => setTopUpDialogOpen(true)}
        />
        
        <DepositDialog 
          open={depositDialogOpen} 
          onOpenChange={setDepositDialogOpen} 
        />
        
        <GasFeeTopUpDialog 
          open={topUpDialogOpen} 
          onOpenChange={setTopUpDialogOpen} 
        />
      </div>
    </div>
  );
};

export default Index;
