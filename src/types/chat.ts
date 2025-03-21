
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  gender: 'male' | 'female';
  isAdmin?: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general';
  media?: { 
    type: 'image' | 'video';
    url: string;
  };
  isPrivate?: boolean;
  recipientId?: string;
  replyToId?: string | null;
}

export interface ChatNotification {
  count: number;
  lastSeen: Date;
}

export interface ChatMessagesProps {
  maxHeight: string;
  className: string;
  onReplySwipe: (messageId: string) => void;
}

export interface WalletAddress {
  id: string;
  name: string;
  address: string;
  network: string;
  coin: string;
  isDefault: boolean;
}
