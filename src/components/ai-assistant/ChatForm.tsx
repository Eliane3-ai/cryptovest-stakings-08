
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatFormProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  options?: { text: string; value: string }[];
  onOptionSelect?: (value: string) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  inputRef,
  options,
  onOptionSelect 
}) => {
  const handleOptionClick = (value: string) => {
    if (onOptionSelect) {
      onOptionSelect(value);
    } else {
      setInput(value);
      setTimeout(() => {
        handleSendMessage();
      }, 100);
    }
  };

  return (
    <>
      {options && options.length > 0 && (
        <div className="mb-3 flex flex-col space-y-2">
          {options.map((option) => (
            <Button
              key={option.value}
              variant="outline" 
              className="bg-[#2B3139] border-[#474D57] text-white hover:bg-[#373D47] justify-start"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      )}
      
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
    </>
  );
};

export default ChatForm;
