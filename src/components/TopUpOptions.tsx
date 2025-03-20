
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  Link as LinkIcon, 
  CreditCard, 
  ArrowLeft 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import { useNavigate } from 'react-router-dom';

interface TopUpOptionsProps {
  onClose: () => void;
}

const TopUpOptions: React.FC<TopUpOptionsProps> = ({ onClose }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const handleWalletConnect = () => {
    window.open('/wallet-connect', '_self');
    onClose();
  };
  
  const handleOnchainDeposit = () => {
    window.open('/deposit', '_self');
    onClose();
  };
  
  const handleExchange = () => {
    navigate('/exchange');
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <Button 
          className="w-full justify-start h-auto py-4 px-4" 
          onClick={handleWalletConnect}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">{getTranslation('walletConnect', language)}</h3>
              <p className="text-xs text-muted-foreground">{getTranslation('walletConnectDesc', language)}</p>
            </div>
          </div>
        </Button>
        
        <Button 
          className="w-full justify-start h-auto py-4 px-4" 
          variant="outline"
          onClick={handleOnchainDeposit}
        >
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <LinkIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">{getTranslation('onchainDeposit', language)}</h3>
              <p className="text-xs text-muted-foreground">{getTranslation('onchainDepositDesc', language)}</p>
            </div>
          </div>
        </Button>
        
        <Button 
          className="w-full justify-start h-auto py-4 px-4" 
          variant="outline"
          onClick={handleExchange}
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">{getTranslation('exchangeFiat', language)}</h3>
              <p className="text-xs text-muted-foreground">{getTranslation('exchangeFiatDesc', language)}</p>
            </div>
          </div>
        </Button>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('goBack', language)}
        </Button>
      </div>
    </div>
  );
};

export default TopUpOptions;
