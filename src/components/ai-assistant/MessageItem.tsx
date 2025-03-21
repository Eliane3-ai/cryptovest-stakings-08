
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from './types';

interface MessageItemProps {
  message: Message;
  handleLinkClick: (url: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, handleLinkClick }) => {
  return (
    <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          message.sender === 'user'
            ? "bg-[#F0B90B] text-black"
            : "bg-[#2B3139] text-white",
          message.id === 'typing' && "animate-pulse"
        )}
      >
        <p>{message.content}</p>
        {message.links && (
          <div className="mt-2 flex flex-col gap-1">
            {message.links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleLinkClick(link.url)}
                className={cn(
                  "text-xs justify-start",
                  message.sender === 'user'
                    ? "border-black/20 hover:bg-black/10"
                    : "border-white/20 hover:bg-white/10"
                )}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {link.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
