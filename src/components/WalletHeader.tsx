
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useChatContext } from "@/contexts/ChatContext";
import WalletActions from "@/components/WalletActions";
import { BellDot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WalletHeaderProps {
  totalBalance: number;
}

const WalletHeader: React.FC<WalletHeaderProps> = ({ totalBalance }) => {
  const { setChatOpen, notification } = useChatContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAssistClick = () => {
    toast({
      title: "AI Assistant",
      description: "How can I help you with your wallet today?",
    });
    setChatOpen(true);
  };

  const handleNotificationClick = () => {
    navigate('/chat');
  };
  
  return (
    <div className="mb-6">
      {/* Notification bell */}
      <div className="flex justify-end mb-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1 text-white hover:bg-white/10"
          onClick={handleNotificationClick}
        >
          {notification.count > 0 ? (
            <>
              <BellDot className="h-5 w-5 text-[#F0B90B]" />
              <Badge variant="outline" className="bg-[#F0B90B] text-black px-1.5 py-0 text-xs">
                {notification.count}
              </Badge>
            </>
          ) : (
            <BellDot className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Balance card */}
      <div className="flex flex-col p-6 rounded-xl mb-4 bg-[#F0B90B]">
        <div className="text-sm font-medium mb-1 text-black">Total Balance</div>
        <div className="text-3xl font-bold text-black">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="bg-black/10 text-black border-black/20">Personal Wallet</Badge>
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
