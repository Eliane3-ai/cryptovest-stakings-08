
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Minimize, Maximize, Bot, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: { text: string, url: string }[];
};

const AiAssistant: React.FC = () => {
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
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
    setInput('');
    
    // Generate bot response
    setTimeout(() => {
      const botResponse = generateResponse(input, location.pathname);
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  const generateResponse = (userInput: string, currentPath: string): Message => {
    const input = userInput.toLowerCase();
    
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
      } else {
        return {
          id: Date.now().toString(),
          content: "I can help you navigate our platform. Here are some main sections you might be interested in:",
          sender: 'bot',
          timestamp: new Date(),
          links: [
            { text: 'Wallet & Staking', url: '/wallet' },
            { text: 'Market Data', url: '/market' },
            { text: 'Referral Program', url: '/referral' }
          ]
        };
      }
    }
    
    // General response for other queries
    return {
      id: Date.now().toString(),
      content: "Thank you for your question. I'm here to help with any information about Crypto Vest's staking platform. You can ask about staking options, security, withdrawals, or navigate to different sections of our platform.",
      sender: 'bot',
      timestamp: new Date(),
      links: [
        { text: 'Explore Platform', url: '/wallet' },
        { text: 'Contact Support', url: '/chat' }
      ]
    };
  };

  const handleLinkClick = (url: string) => {
    navigate(url);
    setIsMinimized(true);
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 shadow-lg bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed z-50 shadow-xl transition-all duration-300 border-[#474D57] bg-[#1E2026] text-white overflow-hidden",
            isMinimized 
              ? "bottom-4 right-4 w-60 h-12" 
              : "bottom-4 right-4 w-80 sm:w-96 h-[500px] max-h-[80vh]"
          )}
        >
          {/* Chat header */}
          <CardHeader className="p-3 border-b border-[#474D57] flex flex-row items-center space-y-0">
            <div className="flex items-center flex-1">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/lovable-uploads/fdfa4ddb-54e8-48dc-8be6-359269b81d21.png" />
                <AvatarFallback className="bg-[#F0B90B] text-black">CV</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Crypto Vest Assistant</h3>
                {!isMinimized && <p className="text-xs text-gray-400">Always here to help</p>}
              </div>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMinimize}
                className="h-8 w-8 hover:bg-[#474D57]/50 text-gray-300"
              >
                {isMinimized ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="h-8 w-8 hover:bg-[#474D57]/50 text-gray-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Chat content */}
          {!isMinimized && (
            <>
              <CardContent className="p-0 h-[380px]">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-4 py-2",
                            message.sender === 'user'
                              ? "bg-[#F0B90B] text-black"
                              : "bg-[#2B3139] text-white"
                          )}
                        >
                          <p>{message.content}</p>
                          {message.links && (
                            <div className="mt-2 flex flex-col gap-1">
                              {message.links.map((link, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleLinkClick(link.url)}
                                  className={cn(
                                    "text-xs justify-start",
                                    message.sender === 'user'
                                      ? "border-black/20 hover:bg-black/10"
                                      : "border-white/20 hover:bg-white/10"
                                  )}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  {link.text}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="p-3 border-t border-[#474D57]">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 bg-[#2B3139] border-[#474D57]"
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AiAssistant;
