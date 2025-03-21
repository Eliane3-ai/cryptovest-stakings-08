import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import AppHeader from '@/components/AppHeader';
import { useChatContext } from '@/contexts/ChatContext';
import { WalletAddress as WalletAddressType } from '@/types/chat';

const WalletAddress: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Wallet Addresses</h1>
        </div>
        
        <Card className="border-[#474D57] bg-[#1E2026]">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-[#474D57]">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Manage Your Wallet Addresses</h2>
            </div>
          </CardHeader>
          
          <div className="p-4">
            {/* Wallet address management content goes here */}
            <div className="text-center py-8">
              <p className="text-gray-400">No saved wallet addresses yet.</p>
              <Button className="mt-4 bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
                Add New Address
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WalletAddress;
