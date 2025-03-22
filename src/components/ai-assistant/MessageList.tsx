
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageItem from './MessageItem';
import { Message } from './types';

interface MessageListProps {
  messages: Message[];
  handleLinkClick: (url: string) => void;
  handleOptionSelect?: (value: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  handleLinkClick,
  handleOptionSelect 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <ScrollArea className="h-full p-4">
      <div className="flex flex-col">
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            handleLinkClick={handleLinkClick}
            handleOptionSelect={handleOptionSelect}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessageList;
