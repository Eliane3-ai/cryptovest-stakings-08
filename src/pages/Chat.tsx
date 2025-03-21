
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import ChatComponent from '@/components/Chat';
import { useChatContext } from '@/contexts/ChatContext';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { chatOpen, setChatOpen } = useChatContext();
  
  // Ensure chat is open when viewing this page
  React.useEffect(() => {
    setChatOpen(true);
    
    return () => {
      setChatOpen(false);
    };
  }, [setChatOpen]);

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="px-4 py-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Live Chat</h1>
      </div>
      
      <div className="h-[calc(100vh-80px)]">
        <ChatComponent className="border-none rounded-none shadow-none h-full" />
      </div>
    </div>
  );
};

export default ChatPage;
