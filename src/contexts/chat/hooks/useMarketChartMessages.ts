
import { useEffect } from 'react';
import { ChatMessage, ChatNotification } from '@/types/chat';

/**
 * Hook to periodically share market chart images in the chat
 */
export const useMarketChartMessages = (
  isLoading: boolean,
  chatOpen: boolean,
  adminBotId: string,
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>,
  setNotification: React.Dispatch<React.SetStateAction<ChatNotification>>
) => {
  // Add market chart image sharing periodically
  useEffect(() => {
    if (isLoading) return;
    
    const marketChartInterval = setInterval(() => {
      const chartImages = [
        '/lovable-uploads/575e92d2-0760-4ee0-94a4-c7e2709c6bd4.png'
      ];
      
      const adminMessage: ChatMessage = {
        id: `msg-admin-chart-${Date.now()}`,
        userId: adminBotId,
        message: "Here's the latest market update from our trading desk. The chart shows significant momentum in the market. Our staking platform offers protection against volatility while maintaining high yields. Contact me privately if you need help interpreting this data.",
        timestamp: new Date(),
        type: 'news',
        media: {
          type: 'image',
          url: chartImages[0]
        }
      };
      
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, adminMessage]
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        
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
    }, 60000 * 60 * 3); // Every 3 hours
    
    return () => {
      clearInterval(marketChartInterval);
    };
  }, [isLoading, chatOpen, adminBotId, setMessages, setNotification]);
};
