
import React, { useState, useEffect } from 'react';
import { 
  Bitcoin, 
  Coins, 
  ArrowRight, 
  Wallet, 
  History, 
  TrendingUp, 
  BarChart3, 
  Settings 
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import WalletHeader from "@/components/WalletHeader";
import TokenCard from "@/components/TokenCard";
import TransactionItem, { TransactionType } from "@/components/TransactionItem";
import StakingCard from "@/components/StakingCard";
import TabButton from "@/components/TabButton";
import TradingViewWidget from "@/components/TradingViewWidget";

// Token data
const tokens = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.375,
    usdValue: 16500,
    iconColor: "#F7931A",
    icon: <Bitcoin />,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: 7.23,
    usdValue: 27900,
    iconColor: "#627EEA",
    icon: <Coins />,
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    balance: 36.5,
    usdValue: 13690,
    iconColor: "#F0B90B",
    icon: <Coins />,
  },
  {
    name: "Tron",
    symbol: "TRX",
    balance: 45000,
    usdValue: 14600,
    iconColor: "#FF060A",
    icon: <Coins />,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    balance: 10500,
    usdValue: 8750,
    iconColor: "#0033AD",
    icon: <Coins />,
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: 180,
    usdValue: 7760,
    iconColor: "#9945FF",
    icon: <Coins />,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    balance: 1200,
    usdValue: 6540,
    iconColor: "#E6007A",
    icon: <Coins />,
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    balance: 15000,
    usdValue: 4820,
    iconColor: "#C2A633",
    icon: <Coins />,
  },
];

// Staking data
const stakingOptions = [
  {
    token: "Ethereum",
    symbol: "ETH",
    stakedAmount: 2.5,
    apy: 4.5,
    rewards: 0.0348,
    rewardToken: "ETH",
  },
  {
    token: "Binance Coin",
    symbol: "BNB",
    stakedAmount: 12.8,
    apy: 5.2,
    rewards: 0.205,
    rewardToken: "BNB",
  },
  {
    token: "Tron",
    symbol: "TRX",
    stakedAmount: 15000,
    apy: 6.8,
    rewards: 312.5,
    rewardToken: "TRX",
  },
];

// Initial transactions
const initialTransactions = [
  {
    type: 'receive' as TransactionType,
    amount: 0.125,
    token: 'BTC',
    date: '2023-10-15 14:23',
    address: '0x3a54f6c2a7812f95e25c45b53d31f3c43e472d30',
    usdValue: 5500,
  },
  {
    type: 'send' as TransactionType,
    amount: 1.2,
    token: 'ETH',
    date: '2023-10-12 09:15',
    address: '0x8f26b42f5d945052383c29071a15e3abf7f1b5d6',
    usdValue: 4620,
  },
  {
    type: 'receive' as TransactionType,
    amount: 10.5,
    token: 'BNB',
    date: '2023-10-08 17:41',
    address: '0x7f4e52b532f5cd9a23f0b6eb36f4c237f15eb21a',
    usdValue: 3930,
  },
  {
    type: 'receive' as TransactionType,
    amount: 12000,
    token: 'TRX',
    date: '2023-10-05 11:30',
    address: '0x2d6e21c8f5e25c9d9f4b53b4b9c9b62e8f15a82b',
    usdValue: 3890,
  },
  {
    type: 'send' as TransactionType,
    amount: 800,
    token: 'ADA',
    date: '2023-09-28 13:24',
    address: '0x9a1b3c5d7e9f1d3b5f7a9b1d3f5e7a9b1d3f5e7a',
    usdValue: 665,
  },
];

type Tab = 'assets' | 'transactions' | 'staking';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assets');
  const [transactions, setTransactions] = useState(initialTransactions);
  const totalBalance = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  // Simulate receiving funds at regular intervals
  useEffect(() => {
    const fundingInterval = setInterval(() => {
      const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
      const randomAmount = parseFloat((Math.random() * 0.1).toFixed(6));
      const randomUsdValue = parseFloat((randomAmount * (randomToken.usdValue / randomToken.balance)).toFixed(2));
      
      const newTransaction = {
        type: 'receive' as TransactionType,
        amount: randomAmount,
        token: randomToken.symbol,
        date: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        address: `0x${Math.random().toString(16).slice(2).padStart(40, '0')}`,
        usdValue: randomUsdValue,
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast.success(`Received ${randomAmount.toFixed(6)} ${randomToken.symbol}`, {
        description: `$${randomUsdValue.toFixed(2)} has been added to your wallet`,
        position: 'top-right',
      });
    }, 40000); // Every 40 seconds
    
    return () => clearInterval(fundingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="sticky top-8 glassmorphism p-4 rounded-xl soft-shadow">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="bg-crypto-blue p-2 rounded-lg">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold">CryptoWallet</h2>
              </div>
              
              <nav className="space-y-1.5">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground">
                  <Wallet className="h-5 w-5" />
                  <span className="font-medium">Wallet</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Market</span>
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                  <BarChart3 className="h-5 w-5" />
                  <span className="font-medium">Analytics</span>
                </button>
                <Link to="/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Settings</span>
                </Link>
              </nav>
              
              <div className="mt-8 p-4 rounded-lg bg-crypto-blue bg-opacity-10">
                <h3 className="font-medium mb-2">Start Earning</h3>
                <p className="text-sm text-muted-foreground mb-3">Earn rewards by staking your crypto assets</p>
                <button className="w-full flex items-center justify-center gap-2 bg-crypto-blue text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-opacity-90">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Wallet Header with actions integrated */}
            <WalletHeader totalBalance={totalBalance} />
            
            {/* Trading View Widget (slideshow) */}
            <TradingViewWidget />
            
            {/* Tab Navigation */}
            <div className="mb-6 flex flex-wrap gap-2">
              <TabButton 
                active={activeTab === 'assets'} 
                label="Assets" 
                onClick={() => setActiveTab('assets')}
              />
              <TabButton 
                active={activeTab === 'transactions'} 
                label="Transactions"
                icon={<History className="h-4 w-4" />} 
                onClick={() => setActiveTab('transactions')}
              />
              <TabButton 
                active={activeTab === 'staking'} 
                label="Staking" 
                onClick={() => setActiveTab('staking')}
              />
            </div>
            
            {/* Token Cards */}
            {activeTab === 'assets' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 fade-in mb-6">
                {tokens.map((token, index) => (
                  <TokenCard 
                    key={index}
                    name={token.name}
                    symbol={token.symbol}
                    balance={token.balance}
                    usdValue={token.usdValue}
                    iconColor={token.iconColor}
                    icon={token.icon}
                  />
                ))}
              </div>
            )}
            
            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border soft-shadow overflow-hidden fade-in">
                <div className="p-4 border-b border-border">
                  <h2 className="font-medium">Recent Transactions</h2>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto">
                  {transactions.map((transaction, index) => (
                    <TransactionItem 
                      key={index}
                      type={transaction.type}
                      amount={transaction.amount}
                      token={transaction.token}
                      date={transaction.date}
                      address={transaction.address}
                      usdValue={transaction.usdValue}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Staking Tab */}
            {activeTab === 'staking' && (
              <div className="space-y-6 fade-in">
                <h2 className="font-medium text-lg">Staking Options</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stakingOptions.map((option, index) => (
                    <StakingCard 
                      key={index}
                      token={option.token}
                      symbol={option.symbol}
                      stakedAmount={option.stakedAmount}
                      apy={option.apy}
                      rewards={option.rewards}
                      rewardToken={option.rewardToken}
                    />
                  ))}
                </div>
                
                <div className="p-5 rounded-xl border border-border bg-white dark:bg-gray-800">
                  <h3 className="font-medium mb-3">Learn About Staking</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Staking is a way to earn rewards by holding certain cryptocurrencies. 
                    When you stake your digital assets, you help support the security and 
                    operations of a blockchain network and earn rewards in return.
                  </p>
                  <button className="text-crypto-blue text-sm font-medium hover:underline flex items-center">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
