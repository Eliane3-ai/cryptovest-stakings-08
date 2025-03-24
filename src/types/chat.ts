
// Chat user type
export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  gender: 'male' | 'female';
  isAdmin?: boolean;
}

// Chat media type
export interface ChatMedia {
  type: 'image' | 'video';
  url: string;
}

// Chat message type
export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  timestamp: Date;
  type?: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general';
  isPrivate?: boolean;
  recipientId?: string;
  media?: ChatMedia;
}

// Chat notification type
export interface ChatNotification {
  count: number;
  lastMessage?: string;
}

// Chat messages component props
export interface ChatMessagesProps {
  maxHeight?: string;
  className?: string;
  onReplySwipe?: (messageId: string) => void;
}

// Chat context type
export interface ChatContextType {
  users: ChatUser[];
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
  sendPrivateMessage: (message: string, recipientId: string) => void;
  adminBot: ChatUser;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  notification: ChatNotification;
  resetNotification: () => void;
}

// Chat provider props
export interface ChatProviderProps {
  children: React.ReactNode;
}
