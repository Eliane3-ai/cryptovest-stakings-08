
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import useAssistantChat from './ai-assistant/useAssistantChat';
import ChatHeader from './ai-assistant/ChatHeader';
import MessageList from './ai-assistant/MessageList';
import ChatForm from './ai-assistant/ChatForm';

const AiAssistant: React.FC = () => {
  const {
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
  } = useAssistantChat();

  // Handle when a user selects an option button
  const handleOptionSelect = (value: string) => {
    setInput(value);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  // Get options from the last message if it has any
  const lastMessage = messages[messages.length - 1];
  const options = lastMessage && lastMessage.sender === 'bot' ? lastMessage.options : undefined;

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
          <ChatHeader 
            isMinimized={isMinimized} 
            toggleMinimize={toggleMinimize} 
            toggleChat={toggleChat} 
          />
          
          {/* Chat content */}
          {!isMinimized && (
            <>
              <CardContent className="p-0 h-[380px]">
                <MessageList 
                  messages={messages} 
                  handleLinkClick={handleLinkClick}
                  handleOptionSelect={handleOptionSelect}
                />
              </CardContent>
              
              <CardFooter className="p-3 border-t border-[#474D57]">
                <ChatForm 
                  input={input} 
                  setInput={setInput} 
                  handleSendMessage={handleSendMessage} 
                  inputRef={inputRef} 
                  options={options}
                  onOptionSelect={handleOptionSelect}
                />
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default AiAssistant;
