
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Image, Smile, X, Reply } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChatMessage } from '@/types/chat';
import { useChatContext } from '@/contexts/ChatContext';

interface ChatInputProps {
  onSendMessage: (message: string, media?: { type: 'image' | 'video'; url: string }, replyToId?: string | null) => void;
  replyingTo: string | null;
  setReplyingTo: (messageId: string | null) => void;
}

const commonEmojis = [
  '😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😘', '👍', '🙌', 
  '👏', '🔥', '💯', '✅', '⭐', '🎉', '🚀', '💰', '💎', '🤑',
  '👑', '🌟', '💪', '🙏', '❤️', '💙', '💚', '💛', '🧡', '💜'
];

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, replyingTo, setReplyingTo }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages } = useChatContext();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' && !selectedImage && !selectedVideo) return;
    
    let media = undefined;
    
    if (selectedImage) {
      media = { type: 'image' as const, url: selectedImage };
    } else if (selectedVideo) {
      media = { type: 'video' as const, url: selectedVideo };
    }
    
    onSendMessage(inputValue, media, replyingTo);
    setInputValue('');
    setSelectedImage(null);
    setSelectedVideo(null);
    setReplyingTo(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    
    // Check if it's an image or video
    if (file.type.startsWith('image/')) {
      setSelectedImage(fileUrl);
      setSelectedVideo(null);
    } else if (file.type.startsWith('video/')) {
      setSelectedVideo(fileUrl);
      setSelectedImage(null);
    }
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearSelectedMedia = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
    if (selectedVideo) {
      URL.revokeObjectURL(selectedVideo);
      setSelectedVideo(null);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setInputValue(prev => prev + emoji);
    // Focus back on input after selecting emoji
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const getReplyingToMessage = () => {
    if (!replyingTo) return null;
    return messages.find(m => m.id === replyingTo);
  };

  const replyMessage = getReplyingToMessage();

  return (
    <>
      {replyMessage && (
        <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-start">
          <div className="flex-1 text-xs text-gray-600 dark:text-gray-400 border-l-2 border-[#F0B90B] pl-2">
            <div className="font-semibold">
              Replying to {replyMessage.userId === 'admin-bot' ? 'Richard Teng' : 
                replyMessage.userId === 'current-user' ? 'yourself' : 
                'User'}
            </div>
            <div className="truncate">{replyMessage.message}</div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1 h-auto"
            onClick={cancelReply}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {(selectedImage || selectedVideo) && (
        <div className="relative mb-2 border rounded p-2">
          <button 
            onClick={clearSelectedMedia}
            className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="max-h-[100px] max-w-full object-contain mx-auto"
            />
          )}
          {selectedVideo && (
            <video 
              src={selectedVideo} 
              className="max-h-[100px] max-w-full object-contain mx-auto"
              controls
            />
          )}
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="flex w-full gap-2">
        <Input
          ref={inputRef}
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*,video/*"
          className="hidden"
        />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="text-[#F0B90B]"
            >
              <Smile className="h-4 w-4" />
              <span className="sr-only">Add emoji</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-6 gap-1">
              {commonEmojis.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-xl p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          className="text-[#F0B90B]"
        >
          <Image className="h-4 w-4" />
          <span className="sr-only">Attach media</span>
        </Button>
        
        <Button type="submit" size="sm" className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </>
  );
};

export default ChatInput;
