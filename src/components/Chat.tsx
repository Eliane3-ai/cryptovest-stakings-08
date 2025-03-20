import React, { useState, useRef } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Users, Image, X, BellDot, Smile, Reply } from 'lucide-react';
import { useChatContext } from '@/contexts/ChatContext';
import ChatMessages from '@/components/ChatMessages';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ChatProps {
  className?: string;
}

const commonEmojis = [
  '😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😘', '👍', '🙌', 
  '👏', '🔥', '💯', '✅', '⭐', '🎉', '🚀', '💰', '💎', '🤑',
  '👑', '🌟', '💪', '🙏', '❤️', '💙', '💚', '💛', '🧡', '💜'
];

const Chat: React.FC<ChatProps> = ({ className = '' }) => {
  const { 
    messages, 
    sendMessage, 
    sendPrivateMessage, 
    adminBot, 
    chatOpen, 
    setChatOpen,
    notification,
    resetNotification
  } = useChatContext();
  
  const [inputValue, setInputValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showPrivateChat, setShowPrivateChat] = useState(false);
  const [privateMessage, setPrivateMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' && !selectedImage && !selectedVideo) return;
    
    let media = undefined;
    
    if (selectedImage) {
      media = { type: 'image' as const, url: selectedImage };
    } else if (selectedVideo) {
      media = { type: 'video' as const, url: selectedVideo };
    }
    
    sendMessage(inputValue, media, replyingTo);
    setInputValue('');
    setSelectedImage(null);
    setSelectedVideo(null);
    setReplyingTo(null);
  };

  const handleSendPrivateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (privateMessage.trim() === '') return;
    
    sendPrivateMessage(privateMessage, adminBot.id);
    setPrivateMessage('');
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEmojiClick = (emoji: string) => {
    setInputValue(prev => prev + emoji);
    // Focus back on input after selecting emoji
    inputRef.current?.focus();
  };

  const handleReplySwipe = (messageId: string) => {
    setReplyingTo(messageId);
    // Focus on input field after setting reply
    inputRef.current?.focus();
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const getReplyingToMessage = () => {
    if (!replyingTo) return null;
    return messages.find(m => m.id === replyingTo);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return format(date, 'MMM dd');
  };

  const replyMessage = getReplyingToMessage();

  return (
    <>
      {/* Floating notification badge */}
      {notification.count > 0 && !chatOpen && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <Badge variant="outline" className="bg-[#F0B90B] text-black px-3 py-2 flex items-center gap-1">
            <BellDot className="h-4 w-4" />
            {notification.count} new messages
          </Badge>
        </div>
      )}
      
      {chatOpen && (
        <Card className={`shadow-xl transition-all duration-300 ${className} ${isExpanded ? 'h-[550px]' : 'h-[400px]'}`}>
          <CardHeader className="px-4 py-3 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-[#F0B90B]" />
              <CardTitle className="text-lg font-medium">Live Chat</CardTitle>
              <Badge variant="outline" className="bg-[#F0B90B1A] border-[#F0B90B33] text-[#F0B90B]">
                <Users className="h-3 w-3 mr-1" />
                {messages.length > 0 ? `${Math.min(500, messages.length)} online` : 'Connecting...'}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={showPrivateChat} onOpenChange={setShowPrivateChat}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Avatar className="h-5 w-5 mr-1 border border-[#F0B90B]">
                      <AvatarImage src={adminBot.avatar} alt={adminBot.name} />
                      <AvatarFallback>RT</AvatarFallback>
                    </Avatar>
                    Message Admin
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Avatar className="h-6 w-6 border border-[#F0B90B]">
                        <AvatarImage src={adminBot.avatar} alt={adminBot.name} />
                        <AvatarFallback>RT</AvatarFallback>
                      </Avatar>
                      Private chat with {adminBot.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 border rounded-md p-4 h-[300px] overflow-y-auto">
                    {messages
                      .filter(m => m.isPrivate && (
                        (m.userId === 'current-user' && m.recipientId === adminBot.id) || 
                        (m.userId === adminBot.id && m.recipientId === 'current-user')
                      ))
                      .map(message => {
                        const isFromAdmin = message.userId === adminBot.id;
                        return (
                          <div 
                            key={message.id} 
                            className={`mb-3 ${isFromAdmin ? 'text-left' : 'text-right'}`}
                          >
                            <div className={`inline-block p-2 rounded-lg ${
                              isFromAdmin 
                                ? 'bg-gray-100 dark:bg-gray-800' 
                                : 'bg-[#F0B90B] text-black'
                            }`}>
                              {message.message}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {formatTimeAgo(message.timestamp)}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <form onSubmit={handleSendPrivateMessage} className="mt-4 flex gap-2">
                    <Input
                      value={privateMessage}
                      onChange={(e) => setPrivateMessage(e.target.value)}
                      placeholder="Type a private message..."
                      className="flex-1"
                    />
                    <Button type="submit" className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleExpand}
                className="text-xs"
              >
                {isExpanded ? 'Minimize' : 'Expand'}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setChatOpen(false)}
                className="text-xs"
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChatMessages 
              maxHeight={isExpanded ? '420px' : '280px'} 
              className="rounded-none"
              onReplySwipe={handleReplySwipe}
            />
          </CardContent>
          <CardFooter className="p-3 border-t flex-col items-stretch">
            {replyMessage && (
              <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md flex items-start">
                <div className="flex-1 text-xs text-gray-600 dark:text-gray-400 border-l-2 border-[#F0B90B] pl-2">
                  <div className="font-semibold">
                    Replying to {replyMessage.userId === adminBot.id ? adminBot.name : 
                    replyMessage.userId === 'current-user' ? 'yourself' : 
                    users.find(u => u.id === replyMessage.userId)?.name || 'User'}
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
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chat;
