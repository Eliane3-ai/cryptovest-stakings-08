
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Users } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import ChatMessages from '@/components/ChatMessages';
import { Badge } from '@/components/ui/badge';

interface ChatProps {
  className?: string;
}

const Chat: React.FC<ChatProps> = ({ className = '' }) => {
  const { messages, sendMessage } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    sendMessage(inputValue);
    setInputValue('');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={`shadow-xl transition-all duration-300 ${className} ${isExpanded ? 'h-[550px]' : 'h-[400px]'}`}>
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-[#F0B90B]" />
          <CardTitle className="text-lg font-medium">Live Chat</CardTitle>
          <Badge variant="outline" className="bg-[#F0B90B1A] border-[#F0B90B33] text-[#F0B90B]">
            <Users className="h-3 w-3 mr-1" />
            {messages.length > 0 ? `${Math.min(500, messages.length)} online` : 'Connecting...'}
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleExpand}
          className="text-xs"
        >
          {isExpanded ? 'Minimize' : 'Expand'}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ChatMessages 
          maxHeight={isExpanded ? '420px' : '280px'} 
          className="rounded-none"
        />
      </CardContent>
      <CardFooter className="p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm" className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default Chat;
