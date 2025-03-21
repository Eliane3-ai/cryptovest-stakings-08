
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
          className="w-full justify-start h-auto py-4 px-4 bg-[#2B3139] border border-[#474D57] text-white hover:bg-[#2B3139]/80" 
          onClick={handleWalletConnect}
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#F0B90B]/10 p-2 rounded-full">
              <Wallet className="h-5 w-5 text-[#F0B90B]" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">{getTranslation('walletConnect', language)}</h3>
              <p className="text-xs text-[#848E9C]">{getTranslation('walletConnectDesc', language)}</p>
            </div>
          </div>
        </Button>
        
        <Button 
          className="w-full justify-start h-auto py-4 px-4 bg-[#2B3139] border border-[#474D57] text-white hover:bg-[#2B3139]/80" 
          variant="outline"
          onClick={handleOnchainDeposit}
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#F0B90B]/10 p-2 rounded-full">
              <LinkIcon className="h-5 w-5 text-[#F0B90B]" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">{getTranslation('onchainDeposit', language)}</h3>
              <p className="text-xs text-[#848E9C]">{getTranslation('onchainDepositDesc', language)}</p>
            </div>
          </div>
        </Button>
        
        <Button 
          className="w-full justify-start h-auto py-4 px-4 bg-[#2B3139] border border-[#474D57] text-white hover:bg-[#2B3139]/80" 
          variant="outline"
          onClick={handleExchange}
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#F0B90B]/10 p-2 rounded-full">
              <CreditCard className="h-5 w-5 text-[#F0B90B]" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-white">{getTranslation('exchangeFiat', language)}</h3>
              <p className="text-xs text-[#848E9C]">{getTranslation('exchangeFiatDesc', language)}</p>
            </div>
          </div>
        </Button>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          variant="ghost" 
          onClick={onClose} 
          className="gap-2 text-[#848E9C] hover:text-white hover:bg-[#2B3139]"
        >
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('goBack', language)}
        </Button>
      </div>
    </div>
  );
};

export default TopUpOptions;
