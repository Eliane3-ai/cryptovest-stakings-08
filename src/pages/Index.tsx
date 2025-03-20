
import React, { useState, useEffect } from 'react';
import { Bitcoin, Coins, Menu } from "lucide-react";
import { toast } from "sonner";
import WalletHeader from "@/components/WalletHeader";
import { TransactionType } from "@/components/TransactionItem";
import TradingViewWidget from "@/components/TradingViewWidget";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MainSidebar from "@/components/MainSidebar";
import TabsSection from "@/components/TabsSection";
import AssetsList from "@/components/AssetsList";
import TransactionsList from "@/components/TransactionsList";
import StakingSection from "@/components/StakingSection";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { language } = useLanguage();

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
      
      // Translate toast messages based on language
      const receivedText = language === 'en' ? 'Received' :
                          language === 'fr' ? 'Reçu' :
                          language === 'es' ? 'Recibido' :
                          language === 'ru' ? 'Получено' :
                          language === 'ar' ? 'تم استلام' :
                          language === 'pt' ? 'Recebido' :
                          language === 'tr' ? 'Alındı' :
                          language === 'id' ? 'Diterima' :
                          language === 'th' ? 'ได้รับ' : 'प्राप्त भयो';
                          
      const addedText = language === 'en' ? 'has been added to your wallet' :
                      language === 'fr' ? 'a été ajouté à votre portefeuille' :
                      language === 'es' ? 'ha sido añadido a tu cartera' :
                      language === 'ru' ? 'добавлено в ваш кошелек' :
                      language === 'ar' ? 'تمت إضافته إلى محفظتك' :
                      language === 'pt' ? 'foi adicionado à sua carteira' :
                      language === 'tr' ? 'cüzdanınıza eklendi' :
                      language === 'id' ? 'telah ditambahkan ke dompet Anda' :
                      language === 'th' ? 'ได้ถูกเพิ่มลงในกระเป๋าเงินของคุณแล้ว' : 'तपाईंको वालेटमा थपिएको छ';
      
      toast.success(`${receivedText} ${randomAmount.toFixed(6)} ${randomToken.symbol}`, {
        description: `$${randomUsdValue.toFixed(2)} ${addedText}`,
        position: 'top-right',
      });
    }, 40000); // Every 40 seconds
    
    return () => clearInterval(fundingInterval);
  }, [language]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Top App Bar with Menu */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-muted">
                  <Menu className="h-6 w-6" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="h-[85vh]">
                <MainSidebar />
              </DrawerContent>
            </Drawer>
            <h1 className="text-xl font-bold">CryptoWallet</h1>
          </div>
        </div>
          
        {/* Main Content */}
        <div>
          {/* Wallet Header with actions integrated */}
          <WalletHeader totalBalance={totalBalance} />
          
          {/* Trading View Widget (slideshow) */}
          <TradingViewWidget />
          
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
