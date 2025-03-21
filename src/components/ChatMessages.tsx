
import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Lock } from 'lucide-react';
import { ChatMessagesProps } from '@/types/chat';

const ChatMessages: React.FC<ChatMessagesProps> = ({ maxHeight = '400px', className = '', onReplySwipe }) => {
  const { messages, users, isLoading, adminBot } = useChatContext();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Current user ID (in a real app, this would come from authentication)
  const currentUserId = 'current-user';

  // Get user data by ID
  const getUserById = (userId: string) => {
    if (userId === 'current-user') {
      return {
        name: 'You',
        avatar: '',
        country: 'Your Location',
        isAdmin: false
      };
    }
    return users.find(user => user.id === userId) || {
      name: 'Unknown User',
      avatar: '',
      country: 'Unknown',
      isAdmin: false
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

  // Filter messages to show only those that are relevant to the current user
  const filteredMessages = messages.filter(message => {
    // Show all public messages
    if (!message.isPrivate) return true;
    
    // Show private messages only if the current user is involved
    return (
      (message.userId === currentUserId && message.recipientId === adminBot.id) ||
      (message.userId === adminBot.id && message.recipientId === currentUserId)
    );
  });

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
        {filteredMessages.map((message) => {
          const user = getUserById(message.userId);
          const isPrivate = message.isPrivate;
          const isCurrentUser = message.userId === currentUserId;
          
          return (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 ${
                isPrivate ? 'pl-2 border-l-2 border-[#F0B90B]' : ''
              }`}
              onClick={() => {
                if (!isCurrentUser && !isPrivate && onReplySwipe) {
                  onReplySwipe(message.id);
                }
              }}
            >
              <Avatar className={user.isAdmin ? 'ring-2 ring-[#F0B90B]' : ''}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium text-sm ${user.isAdmin ? 'text-[#F0B90B]' : ''}`}>
                    {user.name}
                    {user.isAdmin && ' (Admin)'}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{user.country}</span>
                  {isPrivate && (
                    <span className="text-xs bg-[#F0B90B]/10 text-[#F0B90B] px-1.5 py-0.5 rounded-full flex items-center">
                      <Lock className="h-3 w-3 mr-1" />
                      Private
                    </span>
                  )}
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
                <div className={`mt-1 p-3 rounded-lg border ${getMessageTypeClass(message.type)}`}>
                  {message.message}
                  
                  {/* Media content */}
                  {message.media && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                      {message.media.type === 'image' && (
                        <img 
                          src={message.media.url} 
                          alt="Shared image" 
                          className="max-w-full h-auto max-h-[300px] object-contain"
                        />
                      )}
                      {message.media.type === 'video' && (
                        <video 
                          src={message.media.url} 
                          controls 
                          className="max-w-full h-auto max-h-[300px]"
                        />
                      )}
                    </div>
                  )}
                </div>
                
                {/* Private message option for admin */}
                {user.isAdmin && !isPrivate && !isCurrentUser && (
                  <button 
                    className="mt-1 text-xs text-[#F0B90B] hover:underline flex items-center"
                    onClick={() => {
                      // This would open a private chat in a real implementation
                      console.log('Open private chat with admin');
                    }}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Message privately
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
