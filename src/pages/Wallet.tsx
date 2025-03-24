
import React, { useEffect, useState } from 'react';
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Wallet: React.FC = () => {
  console.log("Wallet component is rendering");
  
  const { 
    activeTab, 
    setActiveTab, 
    transactions, 
    tokens, 
    totalBalance,
    stakingOptions,
    setCustomInitialFunding 
  } = useWalletData();
  
  console.log("useWalletData hook returned:", { 
    activeTabLoaded: !!activeTab, 
    transactionsCount: transactions?.length, 
    tokensCount: tokens?.length,
    totalBalance 
  });
  
  const { chatOpen } = useChatContext();
  const { user, profile, isFirstLogin, fundUserWallet } = useAuth();
  
  console.log("Auth context values:", { 
    userExists: !!user, 
    profileExists: !!profile, 
    isFirstLogin 
  });
  
  const { toast } = useToast();
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [topUpDialogOpen, setTopUpDialogOpen] = useState(false);
  const [isFundingComplete, setIsFundingComplete] = useState(false);

  // Check if we need to fund the user on first login
  useEffect(() => {
    console.log("First login effect running", { isFirstLogin, user, profile, isFundingComplete });
    
    if (isFirstLogin && user && profile && !isFundingComplete) {
      console.log("Attempting to fund user wallet");
      const stakingKnowledge = profile.staking_knowledge || 'beginner';
      
      // Fund the user's wallet
      fundUserWallet(user.id, stakingKnowledge).then((fundAmount) => {
        console.log("Funding completed with amount:", fundAmount);
        if (fundAmount > 0) {
          // Update wallet with initial tokens
          setCustomInitialFunding(fundAmount);
          
          // Show welcome message with funding details
          toast({
            title: "Welcome to Crypto Vest! 🎉",
            description: `Your wallet has been funded with $${fundAmount.toLocaleString()} worth of cryptocurrency to start your journey!`,
            duration: 10000, // Show for 10 seconds
          });
          
          setIsFundingComplete(true);
        }
      }).catch(error => {
        console.error("Error funding wallet:", error);
      });
    }
  }, [isFirstLogin, user, profile, fundUserWallet, toast, setCustomInitialFunding, isFundingComplete]);

  console.log("Wallet component rendering UI");

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

export default Wallet;
