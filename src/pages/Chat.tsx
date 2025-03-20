
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import AppHeader from '@/components/AppHeader';
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
          <h1 className="text-xl font-bold">Live Chat</h1>
        </div>
        
        <Card className="border-[#474D57] bg-[#1E2026]">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-[#474D57]">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Crypto Community Chat</h2>
            </div>
          </CardHeader>
          
          <div className="p-0">
            <ChatComponent className="border-none rounded-none shadow-none h-[70vh]" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;
