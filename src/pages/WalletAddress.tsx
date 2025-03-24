import React from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from "@/components/AppHeader";
import { Wallet, Copy, Check, QrCode } from "lucide-react";
import { Button } from '@/components/ui/button';

const WalletAddress: React.FC = () => {
  const { address } = useParams<{ address?: string }>();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    if (!address) return;
    
    navigator.clipboard.writeText(address);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppHeader />
        
        <div className="mt-8 flex flex-col">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-medium">Wallet Address</h2>
                  <p className="text-sm text-muted-foreground">View and share your wallet address</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="p-4 bg-background rounded-md border border-border flex items-center justify-between overflow-hidden">
                <div className="font-mono text-sm truncate">
                  {address || '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t'}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={copied ? "text-green-500" : ""}
                  onClick={handleCopy}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="p-4 bg-white rounded-lg">
                  <QrCode className="h-40 w-40 text-black" />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                Scan this QR code to receive payments to your wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAddress;
