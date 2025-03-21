
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatFormProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ChatForm: React.FC<ChatFormProps> = ({ input, setInput, handleSendMessage, inputRef }) => {
  return (
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
  );
};

export default ChatForm;
