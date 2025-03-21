import { useEffect } from 'react';
import { ChatMessage, ChatNotification } from '@/types/chat';
import { createChatMessage } from '@/utils/chatUtils';

export const useAutoMessages = (
  isLoading: boolean,
  users: any[],
  activeUserIds: string[],
  chatOpen: boolean,
  adminBotId: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  getAdminResponse: (messageType: string, isNewUser?: boolean) => string,
  setNotification: React.Dispatch<React.SetStateAction<ChatNotification>>
) => {
  // Auto-generate new messages periodically
  useEffect(() => {
    if (isLoading || users.length === 0 || activeUserIds.length === 0) return;
    
    const messageInterval = setInterval(() => {
      // Randomly choose user from active users
      const randomUserId = activeUserIds[Math.floor(Math.random() * activeUserIds.length)];
      
      // Randomly choose message type with weighted probabilities
      const rand = Math.random();
      let messageType: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general' = 'general';
      
      if (rand < 0.15) {
        messageType = 'withdrawal';
      } else if (rand < 0.3) {
        messageType = 'deposit';
      } else if (rand < 0.5) {
        messageType = 'price';
      } else if (rand < 0.65) {
        messageType = 'news';
      }
      
      const newMessage = createChatMessage(randomUserId, messageType);
      
      setMessages(prevMessages => {
        // Keep only the latest 100 messages to prevent excessive memory usage
        const updatedMessages = [...prevMessages, newMessage]
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        
        // Add admin response for withdrawal messages
        if (messageType === 'withdrawal' && Math.random() > 0.3) { // 70% chance to respond
          const adminResponse: ChatMessage = {
            id: `msg-admin-${Date.now()}-${Math.random()}`,
            userId: adminBotId,
            message: getAdminResponse('withdrawal'),
            timestamp: new Date(newMessage.timestamp.getTime() + 5000), // 5 seconds after
            type: 'general'
          };
          
          updatedMessages.push(adminResponse);
        }
        
        if (updatedMessages.length > 100) {
          return updatedMessages.slice(updatedMessages.length - 100);
        }
        
        return updatedMessages;
      });
      
      // Update notification if chat is not open
      if (!chatOpen) {
        setNotification(prev => ({
          ...prev,
          count: prev.count + 1
        }));
      }
    }, 5000); // New message every 5 seconds
    
    return () => {
      clearInterval(messageInterval);
    };
  }, [
    isLoading, 
    users, 
    activeUserIds, 
    chatOpen, 
    adminBotId,
    setMessages, 
    getAdminResponse,
    setNotification
  ]);
};

export default useAutoMessages;
