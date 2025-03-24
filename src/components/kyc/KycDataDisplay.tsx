
import React from 'react';
import { User, Globe, Phone, MapPin, CreditCard, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycVerification } from '@/types/kyc';

interface KycDataDisplayProps {
  kycData: KycVerification | null;
}

const KycDataDisplay: React.FC<KycDataDisplayProps> = ({ kycData }) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <User className="h-4 w-4 mr-2" />
          {getTranslation('fullName', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.full_name || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          {getTranslation('emailAddress', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.email || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Phone className="h-4 w-4 mr-2" />
          {getTranslation('mobileNumber', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.mobile || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          {getTranslation('country', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.country || getTranslation('notProvided', language)}
        </p>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {getTranslation('address', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.address || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          {getTranslation('idCard', language)}
        </h3>
        <p className="text-sm text-muted-foreground border p-2 rounded-md">
          {kycData?.id_card_url ? (
            <a 
              href={kycData.id_card_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {getTranslation('viewDocument', language)}
            </a>
          ) : (
            getTranslation('notUploaded', language)
          )}
        </p>
      </div>
      {kycData?.status === 'rejected' && (
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium mb-2 flex items-center text-red-600">
            <X className="h-4 w-4 mr-2" />
            {getTranslation('rejectionReason', language)}
          </h3>
          <p className="text-sm text-red-600 border border-red-200 p-2 rounded-md bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
            {kycData?.admin_notes || getTranslation('noReasonProvided', language)}
          </p>
        </div>
      )}
    </div>
  );
};

export default KycDataDisplay;
