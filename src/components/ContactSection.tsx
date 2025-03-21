
import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';

const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState(() => {
    // Generate a random token for CSRF protection
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  });

  // Store CSRF token in localStorage when component mounts
  React.useEffect(() => {
    localStorage.setItem('csrf_token', csrfToken);
  }, [csrfToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.message) {
      toast.error(getTranslation('fillAllRequiredFields', language));
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(getTranslation('invalidEmail', language));
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Verify the CSRF token
      const storedToken = localStorage.getItem('csrf_token');
      if (storedToken !== csrfToken) {
        throw new Error('CSRF token validation failed');
      }

      // Call the Supabase Edge Function to send the contact form
      const { error } = await supabase.functions.invoke('send-contact-form', {
        body: {
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message,
          csrf_token: csrfToken
        }
      });

      if (error) {
        throw error;
      }

      // Show success message
      toast.success(getTranslation('messageSentSuccessfully', language));
      
      // Reset the form
      setFormData({
        fullName: '',
        email: '',
        message: ''
      });
      
      // Generate a new CSRF token for next submission
      const newToken = Math.random().toString(36).substring(2, 15) + 
                       Math.random().toString(36).substring(2, 15);
      setCsrfToken(newToken);
      localStorage.setItem('csrf_token', newToken);
      
    } catch (error) {
      console.error('Error sending contact form:', error);
      toast.error(getTranslation('errorSendingMessage', language));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{getTranslation('contactUs', language)}</CardTitle>
        <CardDescription>{getTranslation('contactDescription', language)}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center">
              <User className="h-4 w-4 mr-2 text-gray-500" />
              {getTranslation('fullName', language)}
            </Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder={getTranslation('enterFullName', language)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-gray-500" />
              {getTranslation('emailAddress', language)}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={getTranslation('enterEmail', language)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
              {getTranslation('message', language)}
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={getTranslation('enterMessage', language)}
              rows={5}
              required
            />
          </div>
          
          {/* Hidden CSRF token field */}
          <input type="hidden" name="csrf_token" value={csrfToken} />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {getTranslation('sending', language)}
              </span>
            ) : (
              <span className="flex items-center">
                <Send className="h-4 w-4 mr-2" />
                {getTranslation('sendMessage', language)}
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
