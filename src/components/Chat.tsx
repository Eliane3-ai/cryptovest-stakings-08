
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
  
  const [isExpanded, setIsExpanded] = useState(true); // Default to expanded
  const [showPrivateChat, setShowPrivateChat] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleReplySwipe = (messageId: string) => {
    setReplyingTo(messageId);
  };

  // Reset notification when chat is opened
  React.useEffect(() => {
    if (chatOpen && notification.count > 0) {
      resetNotification();
    }
  }, [chatOpen, notification.count, resetNotification]);

  return (
    <>
      {/* Floating notification badge */}
      {notification.count > 0 && !chatOpen && (
        <div 
          className="fixed top-4 right-4 z-50 animate-bounce cursor-pointer" 
          onClick={() => setChatOpen(true)}
        >
          <Badge variant="outline" className="bg-[#F0B90B] text-black px-3 py-2 flex items-center gap-1">
            <BellDot className="h-4 w-4" />
            {notification.count} new messages
          </Badge>
        </div>
      )}
      
      {chatOpen && (
        <Card className={`shadow-xl transition-all duration-300 ${className} flex flex-col`}>
          <CardHeader className="p-0 flex-shrink-0">
            <ChatHeader 
              messageCount={messages.length}
              adminBot={adminBot}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              setShowPrivateChat={setShowPrivateChat}
              setChatOpen={setChatOpen}
            />
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-hidden">
            <ChatMessages 
              maxHeight="100%" 
              className="rounded-none h-full"
              onReplySwipe={handleReplySwipe}
            />
          </CardContent>
          <CardFooter className="p-3 border-t flex-col items-stretch flex-shrink-0">
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
