
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  gender: 'male' | 'female';
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general';
}
