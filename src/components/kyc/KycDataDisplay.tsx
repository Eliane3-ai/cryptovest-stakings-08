
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
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <User className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('fullName', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.full_name || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <Globe className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('emailAddress', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.email || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <Phone className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('mobileNumber', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.mobile || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <Globe className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('country', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.country || getTranslation('notProvided', language)}
        </p>
      </div>
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <MapPin className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('address', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.address || getTranslation('notProvided', language)}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2 flex items-center text-[#E6E8EA]">
          <CreditCard className="h-4 w-4 mr-2 text-[#F0B90B]" />
          {getTranslation('idCard', language)}
        </h3>
        <p className="text-sm text-[#848E9C] border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
          {kycData?.id_card_url ? (
            <a 
              href={kycData.id_card_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#F0B90B] hover:underline"
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
          <h3 className="text-sm font-medium mb-2 flex items-center text-[#F6465D]">
            <X className="h-4 w-4 mr-2" />
            {getTranslation('rejectionReason', language)}
          </h3>
          <p className="text-sm text-[#F6465D] border border-[#F6465D]/20 p-2 rounded-md bg-[#F6465D]/10">
            {kycData?.admin_notes || getTranslation('noReasonProvided', language)}
          </p>
        </div>
      )}
    </div>
  );
};

export default KycDataDisplay;
