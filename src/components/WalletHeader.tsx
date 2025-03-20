import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Wallet, ChevronDown, AlertTriangle, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGasFee } from '@/contexts/GasFeeContext';
import { getTranslation } from '@/utils/translations';
import ActionButtons from './wallet/ActionButtons';

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
  },
  gasFeeBalance: {
    en: 'Gas Fee Balance',
    fr: 'Solde des Frais de Gaz',
    es: 'Saldo de Tarifa de Gas',
    ru: 'Баланс Комиссии за Газ',
    ar: 'رصيد رسوم الغاز',
    pt: 'Saldo de Taxa de Gás',
    tr: 'Gas Ücreti Bakiyesi',
    id: 'Saldo Biaya Gas',
    th: 'ยอดค่าธรรมเนียม Gas',
    ne: 'ग्यास शुल्क ब्यालेन्स'
  },
  hideBalance: {
    en: 'Hide Balance',
    fr: 'Masquer le Solde',
    es: 'Ocultar Saldo',
    ru: 'Скрыть Баланс',
    ar: 'إخفاء الرصيد',
    pt: 'Esconder Saldo',
    tr: 'Bakiyeyi Gizle',
    id: 'Sembunyikan Saldo',
    th: 'ซ่อนยอดเงิน',
    ne: 'ब्यालेन्स लुकाउनुहोस्'
  },
  showBalance: {
    en: 'Show Balance',
    fr: 'Afficher le Solde',
    es: 'Mostrar Saldo',
    ru: 'Показать Баланс',
    ar: 'إظهار الرصيد',
    pt: 'Mostrar Saldo',
    tr: 'Bakiyeyi Göster',
    id: 'Tampilkan Saldo',
    th: 'แสดงยอดเงิน',
    ne: 'ब्यालेन्स देखाउनुहोस्'
  }
};

const WalletHeader: React.FC<WalletHeaderProps> = ({ totalBalance, className }) => {
  const { language } = useLanguage();
  const { gasFeeBalance } = useGasFee();
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };
  
  return (
    <div className={cn("p-6 rounded-2xl glassmorphism soft-shadow mb-6 w-full", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-crypto-blue bg-opacity-10 p-2 rounded-lg">
            <Wallet className="h-5 w-5 text-crypto-blue" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{translations.mainWallet[language]}</p>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <button 
          onClick={toggleBalanceVisibility}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {balanceVisible ? (
            <>
              <EyeOff className="h-4 w-4" />
              <span>{translations.hideBalance[language]}</span>
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>{translations.showBalance[language]}</span>
            </>
          )}
        </button>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground mb-1">{translations.totalBalance[language]}</p>
        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800/30">
          {balanceVisible ? (
            <h1 className="text-4xl font-bold tracking-tight">${totalBalance.toLocaleString()}</h1>
          ) : (
            <h1 className="text-4xl font-bold tracking-tight">••••••</h1>
          )}
        </div>
        
        {/* Gas Fee Balance */}
        <div className="mt-2 flex items-center">
          <h5 className="text-sm font-medium text-red-600 flex items-center">
            {gasFeeBalance <= 0 && <AlertTriangle className="h-3 w-3 mr-1" />}
            {translations.gasFeeBalance[language]}: {balanceVisible ? `$${gasFeeBalance.toFixed(2)}` : "••••••"}
          </h5>
          {gasFeeBalance <= 0 && (
            <span className="ml-2 text-xs text-red-500 font-medium">
              {getTranslation('lowGasFee', language)}
            </span>
          )}
        </div>
      </div>
      
      {/* Action Buttons (Withdraw/Deposit) */}
      <div className="mt-6">
        <ActionButtons 
          onWithdraw={() => document.getElementById('withdraw-dialog-trigger')?.click()}
          onDeposit={() => document.getElementById('deposit-dialog-trigger')?.click()}
        />
      </div>
    </div>
  );
};

export default WalletHeader;
