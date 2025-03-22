
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Message } from './types';
import { ExternalLink } from 'lucide-react';

interface MessageItemProps {
  message: Message;
  handleLinkClick: (url: string) => void;
  handleOptionSelect?: (value: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, handleLinkClick, handleOptionSelect }) => {
  const isUser = message.sender === 'user';
  const isTyping = message.id === 'typing';
  
  const renderContent = () => {
    if (isTyping) {
      return (
        <span className="inline-block">
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
          <span className="typing-dot">.</span>
        </span>
      );
    }
    
    // Handle multi-line content with line breaks
    const formattedContent = message.content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < message.content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
    
    return formattedContent;
  };

  return (
    <div
      className={`flex items-start ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } gap-2 mb-4`}
    >
      <Avatar className={`w-8 h-8 ${isUser ? 'ml-2' : 'mr-2'}`}>
        <AvatarImage
          src={isUser ? '/placeholder.svg' : '/placeholder.svg'}
          alt={isUser ? 'User' : 'AI Assistant'}
        />
        <AvatarFallback>
          {isUser ? 'U' : 'AI'}
        </AvatarFallback>
      </Avatar>
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-[#F0B90B] text-black rounded-tr-none'
              : 'bg-[#2B3139] text-white rounded-tl-none'
          }`}
        >
          {renderContent()}
        </div>
        
        {message.links && message.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.links.map((link, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="bg-[#2B3139] border-[#474D57] text-white hover:bg-[#373D47] flex items-center gap-1"
                onClick={() => handleLinkClick(link.url)}
              >
                {link.text}
                <ExternalLink className="h-3 w-3" />
              </Button>
            ))}
          </div>
        )}
        
        {message.options && message.options.length > 0 && handleOptionSelect && (
          <div className="mt-2 flex flex-col space-y-2 w-full">
            {message.options.map((option) => (
              <Button
                key={option.value}
                variant="outline" 
                className="bg-[#2B3139] border-[#474D57] text-white hover:bg-[#373D47] justify-start"
                onClick={() => handleOptionSelect(option.value)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
