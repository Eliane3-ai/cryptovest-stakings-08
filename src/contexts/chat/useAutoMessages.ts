
import { useRegularMessages } from './hooks/useRegularMessages';
import { useMarketChartMessages } from './hooks/useMarketChartMessages';
import { ChatMessage, ChatNotification } from '@/types/chat';

/**
 * Combined hook that manages both regular and market chart messages
 */
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
  // Use hooks for different message types
  useRegularMessages(
    isLoading,
    users,
    activeUserIds,
    chatOpen,
    adminBotId,
    setMessages,
    getAdminResponse,
    setNotification
  );
  
  useMarketChartMessages(
    isLoading,
    chatOpen,
    adminBotId,
    setMessages,
    setNotification
  );
};

export default useAutoMessages;
