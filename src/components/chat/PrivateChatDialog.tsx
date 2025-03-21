
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { ChatUser, ChatMessage } from '@/types/chat';

interface PrivateChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adminBot: ChatUser;
  messages: ChatMessage[];
  onSendPrivateMessage: (message: string, recipientId: string) => void;
}

const PrivateChatDialog: React.FC<PrivateChatDialogProps> = ({
  open,
  onOpenChange,
  adminBot,
  messages,
  onSendPrivateMessage
}) => {
  const [privateMessage, setPrivateMessage] = useState('');

  const handleSendPrivateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (privateMessage.trim() === '') return;
    
    onSendPrivateMessage(privateMessage, adminBot.id);
    setPrivateMessage('');
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return format(date, 'MMM dd');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border border-[#F0B90B]">
              <AvatarImage src={adminBot.avatar} alt={adminBot.name} />
              <AvatarFallback>RT</AvatarFallback>
            </Avatar>
            Private chat with {adminBot.name}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 border rounded-md p-4 h-[300px] overflow-y-auto">
          {messages
            .filter(m => m.isPrivate && (
              (m.userId === 'current-user' && m.recipientId === adminBot.id) || 
              (m.userId === adminBot.id && m.recipientId === 'current-user')
            ))
            .map(message => {
              const isFromAdmin = message.userId === adminBot.id;
              return (
                <div 
                  key={message.id} 
                  className={`mb-3 ${isFromAdmin ? 'text-left' : 'text-right'}`}
                >
                  <div className={`inline-block p-2 rounded-lg ${
                    isFromAdmin 
                      ? 'bg-gray-100 dark:bg-gray-800' 
                      : 'bg-[#F0B90B] text-black'
                  }`}>
                    {message.message}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTimeAgo(message.timestamp)}
                  </div>
                </div>
              );
            })}
        </div>
        <form onSubmit={handleSendPrivateMessage} className="mt-4 flex gap-2">
          <Input
            value={privateMessage}
            onChange={(e) => setPrivateMessage(e.target.value)}
            placeholder="Type a private message..."
            className="flex-1"
          />
          <Button type="submit" className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateChatDialog;
