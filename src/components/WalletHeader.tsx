
import React from 'react';
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown } from "lucide-react";
import WalletActions from "@/components/WalletActions";
import { useLanguage } from "@/contexts/LanguageContext";

interface WalletHeaderProps {
  totalBalance: number;
  className?: string;
}

// Translations for WalletHeader
const translations = {
  mainWallet: {
    en: 'Main Wallet',
    fr: 'Portefeuille Principal',
    es: 'Cartera Principal',
    ru: 'Основной Кошелек',
    ar: 'المحفظة الرئيسية',
    pt: 'Carteira Principal',
    tr: 'Ana Cüzdan',
    id: 'Dompet Utama',
    th: 'กระเป๋าเงินหลัก',
    ne: 'मुख्य वालेट'
  },
  totalBalance: {
    en: 'Total Balance',
    fr: 'Solde Total',
    es: 'Saldo Total',
    ru: 'Общий Баланс',
    ar: 'الرصيد الكلي',
    pt: 'Saldo Total',
    tr: 'Toplam Bakiye',
    id: 'Total Saldo',
    th: 'ยอดรวม',
    ne: 'कुल ब्यालेन्स'
  }
};

const WalletHeader: React.FC<WalletHeaderProps> = ({ totalBalance, className }) => {
  const { language } = useLanguage();
  
  return (
    <div className={cn("p-6 rounded-2xl glassmorphism soft-shadow mb-6 w-full", className)}>
      <div className="flex items-center gap-2">
        <div className="bg-crypto-blue bg-opacity-10 p-2 rounded-lg">
          <Wallet className="h-5 w-5 text-crypto-blue" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{translations.mainWallet[language]}</p>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground mb-1">{translations.totalBalance[language]}</p>
        <h1 className="text-4xl font-bold tracking-tight">${totalBalance.toLocaleString()}</h1>
      </div>
      
      {/* Wallet Action Buttons below total balance display */}
      <div className="mt-6">
        <WalletActions />
      </div>
    </div>
  );
};

export default WalletHeader;
