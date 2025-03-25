
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface KycStatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

const KycStatusBadge: React.FC<KycStatusBadgeProps> = ({ status }) => {
  const { language } = useLanguage();
  
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
        {getTranslation('pending', language)}
      </span>
    );
  }
  
  if (status === 'approved') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
        {getTranslation('approved', language)}
      </span>
    );
  }
  
  if (status === 'rejected') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
        {getTranslation('rejected', language)}
      </span>
    );
  }
  
  return null;
};

export default KycStatusBadge;
