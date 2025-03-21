
import { useEffect } from 'react';
import { ChatMessage } from '@/types/chat';
import { createChatMessage } from '@/utils/chatUtils';
import { adminBot } from './constants';

export const useChatInitialization = (
  isLoading: boolean,
  activeUserIds: string[],
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  getAdminResponse: (messageType: string, isNewUser?: boolean) => string
) => {
  // Initialize messages
  useEffect(() => {
    if (isLoading) return;
    
    const initializeMessages = () => {
      // Generate initial messages
      const initialMessages: ChatMessage[] = [];
      const messageTypes: ('withdrawal' | 'deposit' | 'price' | 'news' | 'general')[] = 
        ['withdrawal', 'deposit', 'price', 'news', 'general'];
      
      // Add welcome message from admin
      initialMessages.push({
        id: `msg-welcome-${Date.now()}`,
        userId: adminBot.id,
        message: "Welcome to Crypto Vest's staking platform! I'm Richard Teng, your admin assistant. I'll help you navigate our platform and answer any questions you might have. Check out the success stories from our users who have already made withdrawals and are earning significant income through our staking services!",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        type: 'general'
      });
      
      // Add 30 initial messages with random types
      for (let i = 0; i < 30; i++) {
        const randomUserId = activeUserIds[Math.floor(Math.random() * activeUserIds.length)];
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        
        // Create message with timestamp spread over the last hour
        const message = createChatMessage(randomUserId, randomType);
        message.timestamp = new Date(Date.now() - Math.random() * 60 * 60 * 1000);
        
        initialMessages.push(message);
        
        // Add admin response for withdrawal messages
        if (randomType === 'withdrawal') {
          const adminResponse = getAdminResponse('withdrawal');
          
          initialMessages.push({
            id: `msg-admin-${Date.now()}-${Math.random()}`,
            userId: adminBot.id,
            message: adminResponse,
            timestamp: new Date(message.timestamp.getTime() + 30000), // 30 seconds after user message
            type: 'general'
          });
        }
      }
      
      // Sort messages by timestamp
      initialMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      setMessages(initialMessages);
    };
    
    initializeMessages();
  }, [isLoading, activeUserIds, setMessages, getAdminResponse]);
};

export default useChatInitialization;
