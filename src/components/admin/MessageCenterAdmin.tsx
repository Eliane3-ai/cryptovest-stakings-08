
import React, { useState, useEffect } from 'react';
import { Loader2, MessageSquare, RefreshCw, Mail, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
  responded: boolean;
}

const MessageCenterAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [sendingResponse, setSendingResponse] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Note: This is for demonstration. In a real implementation, 
      // there would be a contact_messages table
      
      // Simulate data from supabase for now
      const mockMessages: ContactMessage[] = Array(5).fill(null).map((_, index) => ({
        id: `msg-${index + 1}`,
        full_name: `User ${index + 1}`,
        email: `user${index + 1}@example.com`,
        message: `This is a sample contact message ${index + 1} from a user asking about staking rewards.`,
        created_at: new Date(Date.now() - (index * 86400000)).toISOString(),
        responded: index % 2 === 0
      }));
      
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error in fetchMessages:', error);
      toast.error("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchMessages();
    toast.success("Messages refreshed");
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setResponseDialogOpen(true);
    setResponseText(`Dear ${message.full_name},\n\nThank you for contacting us. `);
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMessage || !responseText) {
      toast.error("Response text is required");
      return;
    }
    
    setSendingResponse(true);
    
    try {
      // This would call a Supabase edge function to send email in real implementation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
      
      toast.success(`Response sent to ${selectedMessage.email}`);
      setResponseDialogOpen(false);
      
      // Update the message as responded
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === selectedMessage.id ? { ...msg, responded: true } : msg
        )
      );
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error("Failed to send response");
    } finally {
      setSendingResponse(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2">{getTranslation('loading', language)}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Message Center</h2>
        <Button variant="outline" onClick={handleRefresh} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center p-10 bg-muted rounded-lg">
          <p>No contact messages to display</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`${message.responded ? 'bg-muted/30' : 'bg-white dark:bg-gray-800'}`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{message.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{message.email}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">
                      {new Date(message.created_at).toLocaleString()}
                    </span>
                    {message.responded ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
                        Responded
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full dark:bg-yellow-900 dark:text-yellow-200">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="border-l-4 pl-3 py-2 mb-4">{message.message}</p>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewMessage(message)} 
                    className="flex items-center gap-2"
                  >
                    {message.responded ? (
                      <>
                        <MessageSquare className="h-4 w-4" />
                        <span>View Correspondence</span>
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        <span>Respond</span>
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={responseDialogOpen} onOpenChange={setResponseDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedMessage?.responded ? 'Message Correspondence' : 'Respond to Message'}
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">From</h3>
                <div className="text-sm p-2 rounded-md border">
                  {selectedMessage.full_name} ({selectedMessage.email})
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-1">Original Message</h3>
                <div className="text-sm p-2 rounded-md border whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
              
              <form onSubmit={handleSendResponse}>
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-1">Your Response</h3>
                  <Textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Type your response here..."
                    rows={6}
                    className="w-full"
                    required
                    disabled={selectedMessage.responded}
                  />
                </div>
                
                {!selectedMessage.responded && (
                  <div className="flex justify-end">
                    <Button 
                      type="submit"
                      disabled={sendingResponse}
                      className="flex items-center gap-2"
                    >
                      {sendingResponse ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Response</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageCenterAdmin;
