
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ChatUser } from '@/types/chat';

interface ChatHeaderProps {
  messageCount: number;
  adminBot: ChatUser;
  isExpanded: boolean;
  toggleExpand: () => void;
  setShowPrivateChat: (show: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  messageCount,
  adminBot,
  isExpanded,
  toggleExpand,
  setShowPrivateChat,
  setChatOpen
}) => {
  return (
    <div className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-[#F0B90B]" />
        <CardTitle className="text-lg font-medium">Live Chat</CardTitle>
        <Badge variant="outline" className="bg-[#F0B90B1A] border-[#F0B90B33] text-[#F0B90B]">
          <Users className="h-3 w-3 mr-1" />
          {messageCount > 0 ? `${Math.min(500, messageCount)} online` : 'Connecting...'}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={() => setShowPrivateChat(true)}
            >
              <Avatar className="h-5 w-5 mr-1 border border-[#F0B90B]">
                <AvatarImage src={adminBot.avatar} alt={adminBot.name} />
                <AvatarFallback>RT</AvatarFallback>
              </Avatar>
              Message Admin
            </Button>
          </DialogTrigger>
        </Dialog>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
          className="text-xs"
        >
          {isExpanded ? 'Minimize' : 'Expand'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setChatOpen(false)}
          className="text-xs"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
