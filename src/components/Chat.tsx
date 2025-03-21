
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BellDot } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import ChatMessages from '@/components/ChatMessages';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatInput from '@/components/chat/ChatInput';
import PrivateChatDialog from '@/components/chat/PrivateChatDialog';

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className = '' }) => {
  const { 
    messages, 
    sendMessage, 
    sendPrivateMessage, 
    adminBot, 
    chatOpen, 
    setChatOpen,
    notification,
    resetNotification
  } = useChatContext();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPrivateChat, setShowPrivateChat] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReplySwipe = (messageId: string) => {
    setReplyingTo(messageId);
  };

  return (
    <>
      {/* Floating notification badge */}
      {notification.count > 0 && !chatOpen && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Badge variant="outline" className="bg-[#F0B90B] text-black px-3 py-2 flex items-center gap-1">
            <BellDot className="h-4 w-4" />
            {notification.count} new messages
          </Badge>
        </div>
      )}
      
      {chatOpen && (
        <Card className={`shadow-xl transition-all duration-300 ${className} ${isExpanded ? 'h-[550px]' : 'h-[400px]'}`}>
          <CardHeader className="p-0">
            <ChatHeader 
              messageCount={messages.length}
              adminBot={adminBot}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              setShowPrivateChat={setShowPrivateChat}
              setChatOpen={setChatOpen}
            />
          </CardHeader>
          <CardContent className="p-0">
            <ChatMessages 
              maxHeight={isExpanded ? '420px' : '280px'} 
              className="rounded-none"
              onReplySwipe={handleReplySwipe}
            />
          </CardContent>
          <CardFooter className="p-3 border-t flex-col items-stretch">
            <ChatInput 
              onSendMessage={sendMessage}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          </CardFooter>
        </Card>
      )}

      <PrivateChatDialog 
        open={showPrivateChat}
        onOpenChange={setShowPrivateChat}
        adminBot={adminBot}
        messages={messages}
        onSendPrivateMessage={sendPrivateMessage}
      />
    </>
  );
};

export default Chat;
