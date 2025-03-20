
import React from 'react';
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';

interface ActionButtonsProps {
  onWithdraw: () => void;
  onDeposit: () => void;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onWithdraw, 
  onDeposit,
  className 
}) => {
  const { language } = useLanguage();

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      <button 
        className="flex items-center justify-center gap-2 bg-[#F0B90B] text-black py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-[#F0B90B] focus:ring-opacity-50"
        onClick={onWithdraw}
      >
        <ArrowDownToLine className="h-4 w-4" />
        <span>{getTranslation('withdraw', language)}</span>
      </button>
      <button 
        className="flex items-center justify-center gap-2 bg-[#2B3139] border border-[#474D57] text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-[#2B3139]/80 focus:ring-2 focus:ring-[#F0B90B] focus:ring-opacity-50"
        onClick={onDeposit}
      >
        <ArrowUpFromLine className="h-4 w-4" />
        <span>{getTranslation('deposit', language)}</span>
      </button>
    </div>
  );
};

export default ActionButtons;
