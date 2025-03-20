
import React, { createContext, useState, useContext, useEffect } from 'react';

export type Language = 
  | 'en' // English
  | 'fr' // French
  | 'es' // Spanish
  | 'ru' // Russian
  | 'ar' // Arabic
  | 'pt' // Portuguese
  | 'tr' // Turkish
  | 'id' // Indonesian
  | 'th' // Thai
  | 'ne'; // Nepali

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  languageNames: Record<Language, string>;
}

const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  ar: 'العربية',
  pt: 'Português',
  tr: 'Türkçe',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
  ne: 'नेपाली'
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
