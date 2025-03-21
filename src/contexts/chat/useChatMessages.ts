
import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ChatNotification } from '@/types/chat';
import { adminResponses } from './constants';

export const useChatMessages = (
  adminBotId: string, 
  activeUserIds: string[], 
  chatOpen: boolean,
  createChatMessage: (userId: string, type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general') => ChatMessage
) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [notification, setNotification] = useState<ChatNotification>({
    count: 0,
    lastSeen: new Date()
  });

  // Reset notification counter
  const resetNotification = useCallback(() => {
    setNotification({
      count: 0,
      lastSeen: new Date()
    });
  }, []);

  // Handle admin bot responses
  const getAdminResponse = useCallback((messageType: string, isNewUser = false): string => {
    if (isNewUser) {
      const responses = adminResponses.new_user;
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    switch (messageType) {
      case 'withdrawal':
        return adminResponses.withdrawal[Math.floor(Math.random() * adminResponses.withdrawal.length)];
      case 'deposit':
        return adminResponses.deposit[Math.floor(Math.random() * adminResponses.deposit.length)];
      default:
        return adminResponses.general[Math.floor(Math.random() * adminResponses.general.length)];
    }
  }, []);

  // Update notification counter when new messages arrive
  useEffect(() => {
    if (messages.length > 0 && !chatOpen) {
      const latestMessageTime = new Date(Math.max(...messages.map(m => m.timestamp.getTime())));
      
      if (latestMessageTime > notification.lastSeen) {
        setNotification(prev => ({
          ...prev,
          count: prev.count + 1
        }));
      }
    }
  }, [messages, chatOpen, notification.lastSeen]);

  // Send message to the chat (public)
  const sendMessage = useCallback((messageText: string, media?: { type: 'image' | 'video'; url: string }, replyToId?: string | null) => {
    // Create a unique ID for current user (in a real app, this would be the actual user ID)
    const mockCurrentUserId = 'current-user';
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: mockCurrentUserId,
      message: messageText,
      timestamp: new Date(),
      type: 'general',
      media,
      replyToId
    };
    
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage]
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      // Add admin response after a small delay
      setTimeout(() => {
        const adminResponse: ChatMessage = {
          id: `msg-admin-${Date.now()}-${Math.random()}`,
          userId: adminBotId,
          message: getAdminResponse('general'),
          timestamp: new Date(newMessage.timestamp.getTime() + 2000), // 2 seconds after
          type: 'general'
        };
        
        setMessages(prev => [...prev, adminResponse]
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
      }, 2000);
      
      return updatedMessages;
    });
  }, [getAdminResponse, adminBotId]);

  // Send private message to admin
  const sendPrivateMessage = useCallback((messageText: string, recipientId: string) => {
    if (recipientId !== adminBotId) {
      console.warn('Private messages can only be sent to admin');
      return;
    }
    
    const mockCurrentUserId = 'current-user';
    
    const newMessage: ChatMessage = {
      id: `msg-private-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: mockCurrentUserId,
      message: messageText,
      timestamp: new Date(),
      type: 'general',
      isPrivate: true,
      recipientId
    };
    
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages, newMessage]
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      // Add admin response after a small delay
      setTimeout(() => {
        const adminResponse: ChatMessage = {
          id: `msg-admin-private-${Date.now()}-${Math.random()}`,
          userId: adminBotId,
          message: getAdminResponse('general', true),
          timestamp: new Date(newMessage.timestamp.getTime() + 2000), // 2 seconds after
          type: 'general',
          isPrivate: true,
          recipientId: mockCurrentUserId
        };
        
        setMessages(prev => [...prev, adminResponse]
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
      }, 2000);
      
      return updatedMessages;
    });
  }, [getAdminResponse, adminBotId]);

  return {
    messages,
    setMessages,
    notification,
    setNotification,
    resetNotification,
    sendMessage,
    sendPrivateMessage,
    getAdminResponse
  };
};

export default useChatMessages;
