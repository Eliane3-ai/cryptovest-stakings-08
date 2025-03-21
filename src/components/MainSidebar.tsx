
import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Wallet, TrendingUp, BarChart3, Settings, MessageCircle, Trophy, ArrowRight, Users, LogOut, User } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useChatContext } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MainSidebar: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const { notification } = useChatContext();
  const { user, profile, signOut } = useAuth();
  const [expanded, setExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  return (
    <div 
      className={`relative h-full transition-all duration-300 bg-[#0B0E11] border-r border-[#474D57] flex flex-col ${
        expanded ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle Button */}
      <button 
        className="absolute -right-3 top-20 bg-[#F0B90B] text-black rounded-full p-1 shadow-lg z-10"
        onClick={toggleSidebar}
      >
        <ArrowRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      
      <div className={`p-4 ${expanded ? '' : 'items-center'} flex flex-col h-full`}>
        <div className={`flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 mb-6`}>
          <div className="bg-[#F0B90B] p-2 rounded-lg">
            <Wallet className="h-5 w-5 text-black" />
          </div>
          {expanded && <h2 className="text-xl font-bold text-white">CryptoVest</h2>}
        </div>
        
        {/* User Profile Section */}
        {user && (
          <div className={`mb-6 pb-4 border-b border-[#474D57] ${expanded ? 'w-full' : 'items-center'} flex flex-col`}>
            <Avatar className={`h-10 w-10 ${expanded ? 'mb-2' : ''}`}>
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback className="bg-[#F0B90B] text-black">
                {profile?.username?.substring(0, 2) || user.email?.substring(0, 2) || 'CV'}
              </AvatarFallback>
            </Avatar>
            
            {expanded && (
              <>
                <p className="text-white font-medium truncate w-full text-center">
                  {profile?.username || user.email?.split('@')[0] || 'User'}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white mt-1 text-xs"
                  onClick={signOut}
                >
                  <LogOut className="h-3 w-3 mr-1" /> Sign Out
                </Button>
              </>
            )}
          </div>
        )}
        
        <nav className={`space-y-1.5 ${expanded ? '' : 'items-center flex flex-col'} flex-grow`}>
          {/* Main Navigation */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/wallet"
                  className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                    location.pathname === '/wallet' 
                      ? 'bg-[#F0B90B] text-black' 
                      : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                  }`}
                >
                  <Wallet className="h-5 w-5" />
                  {expanded && <span className="font-medium">{getTranslation('wallet', language)}</span>}
                </Link>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">{getTranslation('wallet', language)}</TooltipContent>}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/market"
                  className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                    location.pathname === '/market' 
                      ? 'bg-[#F0B90B] text-black' 
                      : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                  }`}
                >
                  <TrendingUp className="h-5 w-5" />
                  {expanded && <span className="font-medium">{getTranslation('market', language)}</span>}
                </Link>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">{getTranslation('market', language)}</TooltipContent>}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/analytics"
                  className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                    location.pathname === '/analytics' 
                      ? 'bg-[#F0B90B] text-black' 
                      : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  {expanded && <span className="font-medium">{getTranslation('analytics', language)}</span>}
                </Link>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">{getTranslation('analytics', language)}</TooltipContent>}
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/settings" 
                  className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                    location.pathname === '/settings' 
                      ? 'bg-[#F0B90B] text-black' 
                      : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                  }`}
                >
                  <Settings className="h-5 w-5" />
                  {expanded && <span className="font-medium">{getTranslation('settings', language)}</span>}
                </Link>
              </TooltipTrigger>
              {!expanded && <TooltipContent side="right">{getTranslation('settings', language)}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
          
          <div className={`pt-2 border-t border-[#474D57] mt-2 ${expanded ? '' : 'w-full flex justify-center'}`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/referral"
                    className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                      location.pathname === '/referral' 
                        ? 'bg-[#F0B90B] text-black' 
                        : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    {expanded && <span className="font-medium">Referral Program</span>}
                  </Link>
                </TooltipTrigger>
                {!expanded && <TooltipContent side="right">Referral Program</TooltipContent>}
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/chat"
                    className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
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
                    {expanded && <span className="font-medium">Live Chat</span>}
                  </Link>
                </TooltipTrigger>
                {!expanded && <TooltipContent side="right">Live Chat</TooltipContent>}
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/winners"
                    className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                      location.pathname === '/winners' 
                        ? 'bg-[#F0B90B] text-black' 
                        : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                    }`}
                  >
                    <Trophy className="h-5 w-5" />
                    {expanded && <span className="font-medium">{getTranslation('winners', language)}</span>}
                  </Link>
                </TooltipTrigger>
                {!expanded && <TooltipContent side="right">{getTranslation('winners', language)}</TooltipContent>}
              </Tooltip>
              
              {!user && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to="/auth"
                      className={`w-full flex items-center ${expanded ? 'justify-start' : 'justify-center'} gap-3 px-3 py-2.5 rounded-lg ${
                        location.pathname === '/auth' 
                          ? 'bg-[#F0B90B] text-black' 
                          : 'text-white/80 hover:bg-[#2B3139] transition-colors'
                      }`}
                    >
                      <User className="h-5 w-5" />
                      {expanded && <span className="font-medium">Sign In</span>}
                    </Link>
                  </TooltipTrigger>
                  {!expanded && <TooltipContent side="right">Sign In</TooltipContent>}
                </Tooltip>
              )}
            </TooltipProvider>
          </div>
        </nav>
        
        {expanded && (
          <div className="mt-auto p-4 rounded-lg bg-[#F0B90B]/10 border border-[#F0B90B]/20">
            <h3 className="font-medium mb-2 text-[#F0B90B]">{getTranslation('startEarning', language)}</h3>
            <p className="text-sm text-white/70 mb-3">
              {getTranslation('earnRewards', language)}
            </p>
            <Link 
              to="/wallet" 
              className="w-full flex items-center justify-center gap-2 bg-[#F0B90B] text-black py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-[#F0B90B]/90"
            >
              <span>{getTranslation('explore', language)}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSidebar;
