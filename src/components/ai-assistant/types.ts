
export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: { text: string, url: string }[];
};

export type FingerPrint = {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  path: string;
};
