
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Minimize, Maximize } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  toggleChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ isMinimized, toggleMinimize, toggleChat }) => {
  return (
    <div className="p-3 border-b border-[#474D57] flex flex-row items-center space-y-0">
      <div className="flex items-center flex-1">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src="/lovable-uploads/fdfa4ddb-54e8-48dc-8be6-359269b81d21.png" />
          <AvatarFallback className="bg-[#F0B90B] text-black">CV</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">Crypto Vest Assistant</h3>
          {!isMinimized && <p className="text-xs text-gray-400">Always here to help</p>}
        </div>
      </div>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMinimize}
          className="h-8 w-8 hover:bg-[#474D57]/50 text-gray-300"
        >
          {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleChat}
          className="h-8 w-8 hover:bg-[#474D57]/50 text-gray-300"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
