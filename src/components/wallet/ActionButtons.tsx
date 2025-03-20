
import React from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Trophy, MessageCircle, BellDot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import { useChatContext } from "@/contexts/ChatContext";
import { Badge } from "@/components/ui/badge";

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
  const { chatOpen, setChatOpen, notification, resetNotification } = useChatContext();

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen) {
      resetNotification();
    }
  };

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 ${className}`}>
      <button 
        className="flex items-center justify-center gap-2 bg-crypto-blue text-white py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50"
        onClick={onWithdraw}
      >
        <ArrowDownToLine className="h-4 w-4" />
        <span>{getTranslation('withdraw', language)}</span>
      </button>
      <button 
        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50"
        onClick={onDeposit}
      >
        <ArrowUpFromLine className="h-4 w-4" />
        <span>{getTranslation('deposit', language)}</span>
      </button>
      <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-border py-2.5 px-4 rounded-lg font-medium transition-all hover:bg-opacity-90 focus:ring-2 focus:ring-crypto-blue focus:ring-opacity-50">
        <Trophy className="h-4 w-4" />
        <span>{getTranslation('winners', language)}</span>
      </button>
      <button 
        onClick={handleChatToggle}
        className={`relative flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium transition-all focus:ring-2 focus:ring-opacity-50 ${
          chatOpen 
            ? 'bg-[#F0B90B] text-black' 
            : 'bg-white dark:bg-gray-800 border border-border'
        }`}
      >
        <MessageCircle className="h-4 w-4" />
        <span>{getTranslation('chat', language)}</span>
        
        {notification.count > 0 && !chatOpen && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white flex items-center justify-center h-5 min-w-5 p-0">
            {notification.count > 99 ? '99+' : notification.count}
          </Badge>
        )}
      </button>
    </div>
  );
};

export default ActionButtons;
