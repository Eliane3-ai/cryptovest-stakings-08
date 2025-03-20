
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatMessagesProps {
  maxHeight?: string;
  className?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ maxHeight = '400px', className = '' }) => {
  const { messages, users, isLoading } = useChatContext();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Get user data by ID
  const getUserById = (userId: string) => {
    return users.find(user => user.id === userId) || {
      name: 'Unknown User',
      avatar: '',
      country: 'Unknown'
    };
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Format message timestamp
  const formatMessageTime = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Get message style based on type
  const getMessageTypeClass = (type: string) => {
    switch (type) {
      case 'withdrawal':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'deposit':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'price':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'news':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700';
    }
  };

  // Skeleton loading for chat messages
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 mb-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-12 w-[250px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ScrollArea 
      ref={scrollAreaRef} 
      className={`w-full ${className}`} 
      style={{ height: maxHeight }}>
      <div className="flex flex-col gap-3 p-3">
        {messages.map((message) => {
          const user = getUserById(message.userId);
          return (
            <div key={message.id} className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user.country}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
                <div className={`mt-1 p-3 rounded-lg border ${getMessageTypeClass(message.type)}`}>
                  {message.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
