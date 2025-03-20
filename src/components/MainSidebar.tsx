
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Wallet, TrendingUp, BarChart3, Settings, MessageCircle, Trophy, ArrowRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useChatContext } from '@/contexts/ChatContext';
import { Badge } from '@/components/ui/badge';

const MainSidebar: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { notification } = useChatContext();
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
        <div className="bg-[#F0B90B] p-2 rounded-lg">
          <Wallet className="h-5 w-5 text-black" />
        </div>
        <h2 className="text-xl font-bold text-white">CryptoWallet</h2>
      </div>
      
      <nav className="space-y-1.5">
        <Link 
          to="/"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
            location.pathname === '/' 
              ? 'bg-[#F0B90B] text-black' 
              : 'text-white/80 hover:bg-[#2B3139] transition-colors'
          }`}
        >
          <Wallet className="h-5 w-5" />
          <span className="font-medium">{getTranslation('wallet', language)}</span>
        </Link>
        
        <Link 
          to="/market"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
            location.pathname === '/market' 
              ? 'bg-[#F0B90B] text-black' 
              : 'text-white/80 hover:bg-[#2B3139] transition-colors'
          }`}
        >
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">{getTranslation('market', language)}</span>
        </Link>
        
        <Link 
          to="/analytics"
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
            location.pathname === '/analytics' 
              ? 'bg-[#F0B90B] text-black' 
              : 'text-white/80 hover:bg-[#2B3139] transition-colors'
          }`}
        >
          <BarChart3 className="h-5 w-5" />
          <span className="font-medium">{getTranslation('analytics', language)}</span>
        </Link>
        
        <Link 
          to="/settings" 
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
            location.pathname === '/settings' 
              ? 'bg-[#F0B90B] text-black' 
              : 'text-white/80 hover:bg-[#2B3139] transition-colors'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium">{getTranslation('settings', language)}</span>
        </Link>
        
        <div className="pt-2 border-t border-[#474D57] mt-2">
          <Link 
            to="/chat"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              location.pathname === '/chat' 
                ? 'bg-[#F0B90B] text-black' 
                : 'text-white/80 hover:bg-[#2B3139] transition-colors'
            }`}
          >
            <div className="relative">
              <MessageCircle className="h-5 w-5" />
              {notification.count > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                  {notification.count > 99 ? '99+' : notification.count}
                </Badge>
              )}
            </div>
            <span className="font-medium">Live Chat</span>
          </Link>
          
          <Link 
            to="/winners"
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
              location.pathname === '/winners' 
                ? 'bg-[#F0B90B] text-black' 
                : 'text-white/80 hover:bg-[#2B3139] transition-colors'
            }`}
          >
            <Trophy className="h-5 w-5" />
            <span className="font-medium">{getTranslation('winners', language)}</span>
          </Link>
        </div>
      </nav>
      
      <div className="mt-8 p-4 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/20">
        <h3 className="font-medium mb-2 text-[#F0B90B]">{getTranslation('startEarning', language)}</h3>
        <p className="text-sm text-white/70 mb-3">
          {getTranslation('earnRewards', language)}
        </p>
        <Link to="/staking" className="w-full flex items-center justify-center gap-2 bg-[#F0B90B] text-black py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-[#F0B90B]/90">
          <span>{getTranslation('explore', language)}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default MainSidebar;
