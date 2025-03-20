
import React from 'react';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/contexts/LanguageContext';

const SecuritySettingsSection: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
      <h2 className="text-lg font-medium mb-4">{getTranslation('securitySettings', language)}</h2>
      
      <div className="space-y-4">
        <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
          {getTranslation('changePassword', language)}
        </button>
        
        <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
          {getTranslation('enable2FA', language)}
        </button>
        
        <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
          {getTranslation('manageAPIKeys', language)}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettingsSection;
