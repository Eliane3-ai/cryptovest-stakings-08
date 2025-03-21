
import React, { createContext, useContext, useState } from 'react';
import { ChatContextType, ChatProviderProps } from './chat/types';
import { adminBot } from './chat/constants';
import useChatUsers from './chat/useChatUsers';
import useChatMessages from './chat/useChatMessages';
import useChatInitialization from './chat/useChatInitialization';
import useAutoMessages from './chat/useAutoMessages';
import { createChatMessage } from '@/utils/chatUtils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatOpen, setChatOpen] = useState(false);
  
  // Use our custom hooks
  const { users, activeUserIds, isLoading } = useChatUsers();
  
  const {
    messages,
    setMessages,
    notification,
    setNotification,
    resetNotification,
    sendMessage,
    sendPrivateMessage,
    getAdminResponse
  } = useChatMessages(adminBot.id, activeUserIds, chatOpen, createChatMessage);
  
  // Initialize messages
  useChatInitialization(isLoading, activeUserIds, setMessages, getAdminResponse);
  
  // Auto-generate messages
  useAutoMessages(
    isLoading,
    users,
    activeUserIds,
    chatOpen,
    adminBot.id,
    setMessages,
    getAdminResponse,
    setNotification
  );

  return (
    <ChatContext.Provider value={{
      users,
      messages,
      isLoading,
      sendMessage,
      sendPrivateMessage,
      adminBot,
      chatOpen,
      setChatOpen,
      notification,
      resetNotification
    }}>
      {children}
    </ChatContext.Provider>
  );
};
