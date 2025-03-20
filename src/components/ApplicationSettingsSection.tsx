
import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ApplicationSettingsSection: React.FC = () => {
  const { language, setLanguage, languageNames } = useLanguage();
  
  // Extended language options
  const extendedLanguageNames: Record<string, string> = {
    ...languageNames,
    fr: "French",
    es: "Spanish",
    ru: "Russian",
    ar: "Arabic",
    pt: "Portuguese",
    tr: "Turkish",
    id: "Indonesian",
    th: "Thai",
    ne: "Nepali"
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{getTranslation('applicationSettings', language)}</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            {getTranslation('language', language)}
          </h3>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder={getTranslation('selectLanguage', language)} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(extendedLanguageNames).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            {getTranslation('chooseLanguage', language)}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">{getTranslation('theme', language)}</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-border rounded-lg text-sm">{getTranslation('light', language)}</button>
            <button className="px-4 py-2 border border-border rounded-lg text-sm">{getTranslation('dark', language)}</button>
            <button className="px-4 py-2 border border-border rounded-lg text-sm">{getTranslation('system', language)}</button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">{getTranslation('notifications', language)}</h3>
          <div className="flex items-center">
            <input type="checkbox" id="notifications" className="mr-2" />
            <label htmlFor="notifications" className="text-sm">{getTranslation('enableNotifications', language)}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSettingsSection;
