
import { ChatUser, ChatMessage, ChatNotification } from '@/types/chat';

export interface ChatContextType {
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

export interface ChatProviderProps {
  children: React.ReactNode;
}
