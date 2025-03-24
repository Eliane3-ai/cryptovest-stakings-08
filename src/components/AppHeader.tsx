
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Menu, User, Settings, BarChart, DollarSign, RefreshCcw, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './common/LogoutButton';

/**
 * AppHeader component - Top navigation and menu for the application
 */
const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  
  const username = profile?.username || user?.email?.split('@')[0] || 'User';

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-[#F0B90B]" />
        <span className="text-xl font-bold text-white">Crypto Vest</span>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-[#1E2026] border-[#474D57] text-white">
            <DropdownMenuLabel className="text-gray-400">
              Hello, {username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#474D57]" />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                className="hover:bg-[#2B3139] cursor-pointer"
                onClick={() => handleNavigation('/wallet')}
              >
                <DollarSign className="h-4 w-4 mr-2 text-[#F0B90B]" />
                <span>Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#2B3139] cursor-pointer"
                onClick={() => handleNavigation('/market')}
              >
                <RefreshCcw className="h-4 w-4 mr-2 text-[#F0B90B]" />
                <span>Market</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#2B3139] cursor-pointer"
                onClick={() => handleNavigation('/analytics')}
              >
                <BarChart className="h-4 w-4 mr-2 text-[#F0B90B]" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#2B3139] cursor-pointer"
                onClick={() => handleNavigation('/settings')}
              >
                <Settings className="h-4 w-4 mr-2 text-[#F0B90B]" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#2B3139] cursor-pointer"
                onClick={() => handleNavigation('/referral')}
              >
                <Link className="h-4 w-4 mr-2 text-[#F0B90B]" />
                <span>Referral</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#474D57]" />
            <DropdownMenuItem className="hover:bg-[#2B3139] cursor-pointer focus:bg-red-900/20" asChild>
              <LogoutButton 
                variant="ghost" 
                className="w-full justify-start text-red-400 hover:text-red-300" 
                size="sm"
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0"
          onClick={() => handleNavigation('/settings')}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AppHeader;
