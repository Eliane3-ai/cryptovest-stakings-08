
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useChatContext } from "@/contexts/ChatContext";
import WalletActions from "@/components/WalletActions";

interface WalletHeaderProps {
  totalBalance: number;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ totalBalance }) => {
  const { setChatOpen } = useChatContext();
  const { toast } = useToast();
  
  const handleAssistClick = () => {
    toast({
      title: "AI Assistant",
      description: "How can I help you with your wallet today?",
    });
    setChatOpen(true);
  };
  
  return (
    <div className="mb-6">
      {/* Balance card */}
      <div className="flex flex-col p-6 rounded-xl mb-4 bg-[#F0B90B]"> {/* Changed to Binance yellow */}
        <div className="text-sm font-medium mb-1 text-black">Total Balance</div> {/* Changed to black text */}
        <div className="text-3xl font-bold text-black">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div> {/* Changed to black text */}
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-black/10 text-black border-black/20">Personal Wallet</Badge> {/* Adjusted for visibility */}
          <Badge variant="outline" className="bg-black/10 text-black border-black/20">
            <span className="animate-pulse w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
            Active
          </Badge>
        </div>
      </div>
      
      {/* Action buttons */}
      <WalletActions />
    </div>
  );
};

export default WalletHeader;
