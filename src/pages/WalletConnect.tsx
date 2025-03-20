
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wallet, 
  ExternalLink, 
  Check,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import { useGasFee } from '@/contexts/GasFeeContext';
import { toast } from 'sonner';

const walletIcons = [
  '/wallets/metamask.svg',
  '/wallets/trustwallet.svg',
  '/wallets/coinbase.svg',
  '/wallets/rainbow.svg',
  '/wallets/phantom.svg',
  '/wallets/argent.svg',
];

const WalletConnect: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { increaseGasFee } = useGasFee();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<number | null>(null);

  const handleConnectWallet = (index: number) => {
    if (connecting) return;
    
    setSelectedWallet(index);
    setConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      
      // Add gas fee after successful connection
      increaseGasFee(0.015);
      
      toast.success(getTranslation('walletConnected', language), {
        description: getTranslation('gasFeeAdded', language)
      });
      
      // Return to home after connection
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppHeader />
        
        <Button
          variant="outline"
          size="sm"
          className="mb-6 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('backToDashboard', language)}
        </Button>
        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>{getTranslation('connectWallet', language)}</CardTitle>
            <CardDescription>
              {getTranslation('connectWalletDesc', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {walletIcons.map((icon, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 p-2"
                  disabled={connecting || connected}
                  onClick={() => handleConnectWallet(index)}
                >
                  {selectedWallet === index && connecting ? (
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  ) : selectedWallet === index && connected ? (
                    <div className="rounded-full bg-green-100 p-2">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                  <span className="text-xs">Wallet {index + 1}</span>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <p className="text-xs text-muted-foreground text-center">
                {getTranslation('walletConnectHelp', language)} {' '}
                <a href="#" className="text-blue-500 inline-flex items-center">
                  {getTranslation('learnMore', language)}
                  <ExternalLink className="h-3 w-3 ml-0.5" />
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletConnect;
