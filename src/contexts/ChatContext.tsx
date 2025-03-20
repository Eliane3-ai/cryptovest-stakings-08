import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChatUser, ChatMessage } from '@/types/chat';
import { generateUsers, createChatMessage } from '@/utils/chatUtils';

interface ChatContextType {
  users: ChatUser[];
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);

  // Initialize users and messages
  useEffect(() => {
    const initializeChat = () => {
      setIsLoading(true);
      
      // Generate 500 users
      const generatedUsers = generateUsers(500);
      setUsers(generatedUsers);
      
      // Set initial active users (50 random users)
      const initialActiveUsers = [...generatedUsers]
        .sort(() => 0.5 - Math.random())
        .slice(0, 50)
        .map(user => user.id);
      
      setActiveUserIds(initialActiveUsers);
      
      // Generate initial messages
      const initialMessages: ChatMessage[] = [];
      const messageTypes: ('withdrawal' | 'deposit' | 'price' | 'news' | 'general')[] = 
        ['withdrawal', 'deposit', 'price', 'news', 'general'];
      
      // Add 30 initial messages with random types
      for (let i = 0; i < 30; i++) {
        const randomUserId = initialActiveUsers[Math.floor(Math.random() * initialActiveUsers.length)];
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        
        // Create message with timestamp spread over the last hour
        const message = createChatMessage(randomUserId, randomType);
        message.timestamp = new Date(Date.now() - Math.random() * 60 * 60 * 1000);
        
        initialMessages.push(message);
      }
      
      // Sort messages by timestamp
      initialMessages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      setMessages(initialMessages);
      
      setIsLoading(false);
    };
    
    initializeChat();
  }, []);

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
        
        if (updatedMessages.length > 100) {
          return updatedMessages.slice(updatedMessages.length - 100);
        }
        
        return updatedMessages;
      });
    }, 3000); // New message every 3 seconds
    
    // Rotate active users every 5 minutes
    const userRotationInterval = setInterval(() => {
      setActiveUserIds(prevActiveIds => {
        // Remove 5 users and add 5 new ones
        const remainingUsers = prevActiveIds.slice(5);
        
        // Get all user IDs not currently active
        const inactiveUserIds = users
          .map(user => user.id)
          .filter(id => !prevActiveIds.includes(id));
        
        // Randomly select 5 new users
        const newActiveUsers = [...inactiveUserIds]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        
        return [...remainingUsers, ...newActiveUsers];
      });
    }, 5 * 60 * 1000); // Every 5 minutes
    
    return () => {
      clearInterval(messageInterval);
      clearInterval(userRotationInterval);
    };
  }, [isLoading, users, activeUserIds]);

  const sendMessage = useCallback((messageText: string) => {
    // Simulate a user sending a message
    // In a real app, this would be the current user's ID
    const mockCurrentUserId = 'current-user';
    
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: mockCurrentUserId,
      message: messageText,
      timestamp: new Date(),
      type: 'general'
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
  }, []);

  return (
    <ChatContext.Provider value={{
      users,
      messages,
      isLoading,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
};
