
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Message, FingerPrint } from './types';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

export const useAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your Crypto Vest AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Check for new location/browser/IP
  useEffect(() => {
    // Get the stored fingerprint
    const storedFingerprint = localStorage.getItem('browser_fingerprint');
    
    // Generate a simple fingerprint based on userAgent and screen size
    const currentFingerprint = JSON.stringify({
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      path: location.pathname
    } as FingerPrint);
    
    if (!storedFingerprint || storedFingerprint !== currentFingerprint) {
      // New fingerprint detected, open the assistant
      localStorage.setItem('browser_fingerprint', currentFingerprint);
      
      // Add a welcome message based on whether this is a new user or returning from a different location
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: storedFingerprint 
          ? "Welcome back! I notice you're accessing from a new location or browser. How can I assist you today?"
          : "Welcome to Crypto Vest! I'm your AI assistant and I'm here to help you navigate our platform. Feel free to ask me any questions about our staking options, security, or how to get started!",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      // After a small delay to make it less jarring
      setTimeout(() => {
        setMessages(prev => [...prev, welcomeMessage]);
        setIsOpen(true);
        setIsMinimized(false);
      }, 1000);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    
    // Set typing indicator
    const typingMessage: Message = {
      id: 'typing',
      content: '...',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, typingMessage]);
    
    // Check if the message contains any translation requests
    const translationRegex = /translate\s+to\s+(\w+):\s*(.+)/i;
    const translationMatch = userInput.match(translationRegex);
    
    if (translationMatch) {
      try {
        const targetLanguage = translationMatch[1].toLowerCase();
        const textToTranslate = translationMatch[2];
        
        // Try to map user input language to our supported languages
        let mappedLanguage: string = 'en';
        if (['french', 'français', 'francais'].includes(targetLanguage)) mappedLanguage = 'fr';
        else if (['spanish', 'español', 'espanol'].includes(targetLanguage)) mappedLanguage = 'es';
        else if (['russian', 'русский'].includes(targetLanguage)) mappedLanguage = 'ru';
        else if (['arabic', 'العربية'].includes(targetLanguage)) mappedLanguage = 'ar';
        else if (['portuguese', 'português'].includes(targetLanguage)) mappedLanguage = 'pt';
        else if (['turkish', 'türkçe'].includes(targetLanguage)) mappedLanguage = 'tr';
        else if (['indonesian', 'bahasa'].includes(targetLanguage)) mappedLanguage = 'id';
        else if (['thai', 'ไทย'].includes(targetLanguage)) mappedLanguage = 'th';
        else if (['nepali', 'नेपाली'].includes(targetLanguage)) mappedLanguage = 'ne';
        else mappedLanguage = targetLanguage;
        
        // Call translation edge function
        const { data, error } = await supabase.functions.invoke('translate-text', {
          body: { text: textToTranslate, targetLanguage: mappedLanguage }
        });
        
        if (error) throw error;
        
        // Remove typing indicator and add translation response
        setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat({
          id: Date.now().toString(),
          content: `Translation: ${data.translatedText}`,
          sender: 'bot',
          timestamp: new Date()
        }));
      } catch (error) {
        console.error('Translation error:', error);
        // Remove typing indicator and add error message
        setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat({
          id: Date.now().toString(),
          content: getTranslation('translationFailed', language),
          sender: 'bot',
          timestamp: new Date()
        }));
      }
    } else {
      // Generate standard bot response
      setTimeout(() => {
        // Remove typing indicator
        setMessages(prev => {
          const withoutTyping = prev.filter(msg => msg.id !== 'typing');
          const botResponse = generateResponse(userInput, location.pathname, language);
          return [...withoutTyping, botResponse];
        });
      }, 1000);
    }
  };

  const handleLinkClick = (url: string) => {
    navigate(url);
    setIsMinimized(true);
  };

  return {
    isOpen,
    isMinimized,
    input,
    messages,
    inputRef,
    setInput,
    toggleChat,
    toggleMinimize,
    handleSendMessage,
    handleLinkClick
  };
};

// Helper function to generate responses based on user input
const generateResponse = (userInput: string, currentPath: string, currentLanguage: string): Message => {
  const input = userInput.toLowerCase();
  
  // Platform explanations
  if (input.includes('what is this platform') || 
      input.includes('how does this platform work') || 
      input.includes('explain more about this platform') ||
      input.includes('what is crypto vest') ||
      input.includes('tell me about this platform')) {
    return {
      id: Date.now().toString(),
      content: "This is Crypto Vest staking platform that is used by users both beginners and experts to generate passive income adequately by utilizing the Staking method or protocol. Would you like me to explain more about: \n\n A) Platform services \n\n B) Staking cryptocurrency",
      sender: 'bot',
      timestamp: new Date(),
      options: [
        { text: 'Platform services', value: 'A' },
        { text: 'Staking cryptocurrency', value: 'B' }
      ]
    };
  }
  
  // Option A - Platform services
  if (input === 'a' || input.includes('platform services') || input.includes('option a')) {
    return {
      id: Date.now().toString(),
      content: "This platform is used on daily basis by individuals around the world to enter stakes and make profits at the end of each day. We provide our first time users with certain amounts to carry out stakes (hold) until the said time expires. Then if properly managed, users automatically get credited with the amount or balance. Blockchain terms and conditions apply, and if met by users, then luck will smile on you! 😀 😊 👍",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Start Staking Now', url: '/wallet' }
      ]
    };
  }
  
  // Option B - Staking explanation
  if (input === 'b' || input.includes('staking cryptocurrency') || input.includes('option b')) {
    return {
      id: Date.now().toString(),
      content: "Cryptocurrency staking is a process where you lock up your digital assets to support a blockchain network and earn rewards. When you stake your cryptocurrency, you're essentially putting it to work as part of the blockchain's consensus mechanism, helping to secure the network and verify transactions. In return for this contribution, you earn additional tokens as rewards. Unlike mining, staking requires minimal hardware and energy consumption, making it a more eco-friendly way to earn passive income in crypto. Staking periods can range from a few days to several months, with longer staking periods typically offering higher APY (Annual Percentage Yield).",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Explore Staking Options', url: '/wallet' },
        { text: 'View Current APYs', url: '/market' }
      ]
    };
  }
  
  // Common questions about staking
  if (input.includes('stake') || input.includes('earn') || input.includes('apy') || input.includes('return')) {
    return {
      id: Date.now().toString(),
      content: "Our staking platform offers industry-leading APYs up to 365%. You can start with as little as $100 and withdraw anytime with no lock-up periods. Would you like to see our staking options?",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'View Staking Options', url: '/wallet' }
      ]
    };
  }
  
  // Questions about referrals
  if (input.includes('referral') || input.includes('invite') || input.includes('friend')) {
    return {
      id: Date.now().toString(),
      content: "Our referral program allows you to earn 3 USDT for each friend who joins and deposits. Your friends also get a bonus! Would you like to check out the referral program?",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Referral Program', url: '/referral' }
      ]
    };
  }
  
  // Questions about security
  if (input.includes('secure') || input.includes('safe') || input.includes('trust')) {
    return {
      id: Date.now().toString(),
      content: "Security is our top priority. We use advanced encryption, regular security audits, and cold storage for funds. Our platform has been trusted by over 50,000 users worldwide.",
      sender: 'bot',
      timestamp: new Date()
    };
  }
  
  // Questions about withdrawals
  if (input.includes('withdraw') || input.includes('cash out') || input.includes('payment')) {
    return {
      id: Date.now().toString(),
      content: "Withdrawals on Crypto Vest are processed instantly once confirmed. There are no minimum withdrawal amounts, and you can withdraw to any compatible wallet or exchange.",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Go to Wallet', url: '/wallet' }
      ]
    };
  }
  
  // Questions about translations or language
  if (input.includes('translate') || input.includes('language') || input.includes('speak')) {
    return {
      id: Date.now().toString(),
      content: "I can help with translations! Try typing something like 'translate to French: Hello, how are you?' You can also change the app language in Settings.",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Language Settings', url: '/settings' }
      ]
    };
  }
  
  // Questions about contact or support
  if (input.includes('contact') || input.includes('support') || input.includes('help desk')) {
    return {
      id: Date.now().toString(),
      content: "You can reach our support team through our contact form. Would you like to go to the contact page?",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Contact Us', url: '/contact' }
      ]
    };
  }
  
  // Questions about KYC or verification
  if (input.includes('kyc') || input.includes('verify') || input.includes('verification') || input.includes('identity')) {
    return {
      id: Date.now().toString(),
      content: "We have a simple KYC verification process to ensure security for all users. You can complete your verification in the settings page.",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Go to Settings', url: '/settings' }
      ]
    };
  }
  
  // Help with navigation based on current path
  if (input.includes('help') || input.includes('navigate') || input.includes('find')) {
    if (currentPath === '/wallet') {
      return {
        id: Date.now().toString(),
        content: "In the wallet section, you can see your balance, deposit funds, withdraw, and check transaction history. What specific help do you need?",
        sender: 'bot',
        timestamp: new Date(),
        links: [
          { text: 'Deposit Funds', url: '/deposit' },
          { text: 'Check Analytics', url: '/analytics' }
        ]
      };
    } else if (currentPath === '/referral') {
      return {
        id: Date.now().toString(),
        content: "In the referral section, you can find your unique referral link to share with friends. You'll earn rewards when they sign up and make a deposit.",
        sender: 'bot',
        timestamp: new Date()
      };
    } else if (currentPath === '/settings') {
      return {
        id: Date.now().toString(),
        content: "On the settings page, you can update your profile, complete KYC verification, manage payment methods, and change application settings like language and theme.",
        sender: 'bot',
        timestamp: new Date()
      };
    } else {
      return {
        id: Date.now().toString(),
        content: "I can help you navigate our platform. Here are some main sections you might be interested in:",
        sender: 'bot',
        timestamp: new Date(),
        links: [
          { text: 'Wallet & Staking', url: '/wallet' },
          { text: 'Market Data', url: '/market' },
          { text: 'Referral Program', url: '/referral' },
          { text: 'Settings', url: '/settings' },
          { text: 'Contact Us', url: '/contact' }
        ]
      };
    }
  }
  
  // General response for other queries
  return {
    id: Date.now().toString(),
    content: "Thank you for your question. I'm here to help with any information about Crypto Vest's staking platform. You can ask about staking options, security, withdrawals, translations, or navigate to different sections of our platform.",
    sender: 'bot',
    timestamp: new Date(),
    links: [
      { text: 'Explore Platform', url: '/wallet' },
      { text: 'Contact Support', url: '/contact' }
    ]
  };
};

export default useAssistantChat;
