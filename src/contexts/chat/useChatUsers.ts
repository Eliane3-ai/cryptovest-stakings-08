
import { useState, useEffect, useCallback } from 'react';
import { ChatUser } from '@/types/chat';
import { generateUsers } from '@/utils/chatUtils';
import { adminBot } from './constants';

export const useChatUsers = () => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [activeUserIds, setActiveUserIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users
  useEffect(() => {
    const initializeUsers = () => {
      // Generate 500 users
      const generatedUsers = generateUsers(500);
      setUsers([adminBot, ...generatedUsers]);
      
      // Set initial active users (50 random users)
      const initialActiveUsers = [...generatedUsers]
        .sort(() => 0.5 - Math.random())
        .slice(0, 50)
        .map(user => user.id);
      
      setActiveUserIds(initialActiveUsers);
      setIsLoading(false);
    };
    
    initializeUsers();
  }, []);

  // Rotate active users every 5 minutes
  useEffect(() => {
    if (isLoading || users.length === 0) return;
    
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
      clearInterval(userRotationInterval);
    };
  }, [isLoading, users]);

  return {
    users,
    activeUserIds,
    isLoading
  };
};

export default useChatUsers;
