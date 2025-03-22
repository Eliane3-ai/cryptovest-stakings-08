
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: { text: string; url: string }[];
  options?: { text: string; value: string }[];
}

export interface FingerPrint {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  path: string;
}
