
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ChatUser, ChatMessage, ChatNotification } from '@/types/chat';
import { generateUsers, createChatMessage } from '@/utils/chatUtils';

interface ChatContextType {
  users: ChatUser[];
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string, media?: { type: 'image' | 'video'; url: string }, replyToId?: string | null) => void;
  sendPrivateMessage: (message: string, recipientId: string) => void;
  adminBot: ChatUser;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  notification: ChatNotification;
  resetNotification: () => void;
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

// Admin bot responses for different message types
const adminResponses = {
  withdrawal: [
    "Congratulations on your successful withdrawal! 🎉 Mr. Richard Teng and the Crypto Vest automated Bot ensure fast and secure transactions for all our users.",
    "Amazing! Your funds have been successfully withdrawn. Mr. Richard Teng's leadership at Crypto Vest provides this seamless experience for all our stakers.",
    "Great job on completing your withdrawal! This is why our Crypto Vest staking platform, under Mr. Richard Teng's guidance, is trusted by thousands.",
    "Thank you for sharing your successful withdrawal! Our Crypto Vest community appreciates the transparency that Mr. Richard Teng has established."
  ],
  deposit: [
    "Thank you for your deposit! Your funds are now being staked and will start generating rewards with Crypto Vest's industry-leading algorithms approved by Mr. Richard Teng.",
    "Deposit received! You've made a great decision to grow your crypto assets with Crypto Vest, the platform personally endorsed by Mr. Richard Teng.",
    "Welcome to our Crypto Vest staking community! Your deposit has been successfully processed through our secure system developed under Mr. Richard Teng's vision."
  ],
  new_user: [
    "Welcome to our Crypto Vest staking platform! I'm Richard Teng, your admin assistant. Feel free to ask me any questions about how our platform works and how you can maximize your earnings.",
    "Hello and welcome to Crypto Vest! Our platform offers industry-leading staking rewards with secure withdrawals. I'm Richard Teng, here to help you get started and achieve financial growth.",
    "Welcome aboard Crypto Vest! Our platform specializes in high-yield staking with guaranteed withdrawals. I'm Richard Teng, and I'm dedicated to guiding you through your staking journey."
  ],
  general: [
    "Thanks for your message! Crypto Vest offers secure staking with competitive APYs and guaranteed withdrawals, all overseen by Mr. Richard Teng's expert team.",
    "Our Crypto Vest platform is trusted by thousands of users worldwide. Mr. Richard Teng personally ensures all testimonials from users who've successfully withdrawn their rewards are authentic.",
    "We're committed to providing the best staking experience in the market. Mr. Richard Teng and the Crypto Vest team work tirelessly to ensure maximum returns for all our users.",
    "Our team at Crypto Vest works 24/7 under Mr. Richard Teng's leadership to ensure the platform runs smoothly and all withdrawals are processed quickly and securely."
  ]
};

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [notification, setNotification] = useState<ChatNotification>({
    count: 0,
    lastSeen: new Date()
  });

  // Admin bot user
  const adminBot: ChatUser = {
    id: 'admin-bot',
    name: 'Richard Teng',
    avatar: '/lovable-uploads/fdfa4ddb-54e8-48dc-8be6-359269b81d21.png',
    country: 'Global',
    gender: 'male',
    isAdmin: true
  };

  // Reset notification counter
  const resetNotification = useCallback(() => {
    setNotification({
      count: 0,
      lastSeen: new Date()
    });
  }, []);

  // Initialize users and messages
  useEffect(() => {
    const initializeChat = () => {
      setIsLoading(true);
      
      // Generate 500 users
      const generatedUsers = generateUsers(500);
      setUsers([adminBot, ...generatedUsers]);
      
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
        const randomUserId = initialActiveUsers[Math.floor(Math.random() * initialActiveUsers.length)];
        const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        
        // Create message with timestamp spread over the last hour
        const message = createChatMessage(randomUserId, randomType);
        message.timestamp = new Date(Date.now() - Math.random() * 60 * 60 * 1000);
        
        initialMessages.push(message);
        
        // Add admin response for withdrawal messages
        if (randomType === 'withdrawal') {
          const adminResponse = adminResponses.withdrawal[Math.floor(Math.random() * adminResponses.withdrawal.length)];
          
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
      
      setIsLoading(false);
    };
    
    initializeChat();
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
            userId: adminBot.id,
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
    
    // Rotate active users every 5 minutes
    const userRotationInterval = setInterval(() => {
      setActiveUserIds(prevActiveIds => {
        // Remove 5 users and add 5 new ones
        const remainingUsers = prevActiveIds.slice(5);
        
        // Get all user IDs not currently active
        const inactiveUserIds = users
          .filter(user => !user.isAdmin) // Exclude admin bot
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
  }, [isLoading, users, activeUserIds, chatOpen, getAdminResponse]);

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
          userId: adminBot.id,
          message: getAdminResponse('general'),
          timestamp: new Date(newMessage.timestamp.getTime() + 2000), // 2 seconds after
          type: 'general'
        };
        
        setMessages(prev => [...prev, adminResponse]
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
      }, 2000);
      
      return updatedMessages;
    });
  }, [getAdminResponse]);

  // Send private message to admin
  const sendPrivateMessage = useCallback((messageText: string, recipientId: string) => {
    if (recipientId !== adminBot.id) {
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
          userId: adminBot.id,
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
  }, [getAdminResponse, adminBot.id]);

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
