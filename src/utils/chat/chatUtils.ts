
import { ChatUser, ChatMessage } from '@/types/chat';
import { countries } from './chatData';
import { getRandomInt, getRandomAvatar, getCountrySpecificName } from './nameUtils';
import { 
  generatePriceMessage, 
  generateNewsMessage, 
  generateWithdrawalMessage, 
  generateDepositMessage, 
  generateGeneralMessage 
} from './messageGenerators';

// Generate message based on type
export const generateMessage = (type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general'): string => {
  switch (type) {
    case 'withdrawal':
      return generateWithdrawalMessage();
    case 'deposit':
      return generateDepositMessage();
    case 'price':
      return generatePriceMessage();
    case 'news':
      return generateNewsMessage();
    case 'general':
    default:
      return generateGeneralMessage();
  }
};

// Generate unique users with country-specific names
export const generateUsers = (count: number = 500): ChatUser[] => {
  const users: ChatUser[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const country = countries[getRandomInt(0, countries.length - 1)];
    const { firstName, lastName } = getCountrySpecificName(country, gender as 'male' | 'female');
    
    users.push({
      id: `user-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: getRandomAvatar(gender, country, i),
      country,
      gender: gender as 'male' | 'female'
    });
  }
  
  return users;
};

// Generate chat message with a specific user
export const createChatMessage = (
  userId: string, 
  type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general' = 'general'
): ChatMessage => {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    message: generateMessage(type),
    timestamp: new Date(),
    type
  };
};
