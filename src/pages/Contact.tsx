
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactSection from '@/components/ContactSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="px-4 py-4 flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">{getTranslation('contactUs', language)}</h1>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactPage;
