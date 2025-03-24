
import React from 'react';
import { CheckCircle, X, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycVerification } from '@/types/kyc';

interface KycStatusDisplayProps {
  kycData: KycVerification | null;
}

const KycStatusDisplay: React.FC<KycStatusDisplayProps> = ({ kycData }) => {
  const { language } = useLanguage();

  if (!kycData) {
    return (
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30 mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-400">{getTranslation('verificationRequired', language)}</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">{getTranslation('verificationRequiredDesc', language)}</p>
          </div>
        </div>
      </div>
    );
  }

  switch (kycData.status) {
    case 'approved':
      return (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">{getTranslation('verificationComplete', language)}</h3>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1">{getTranslation('verificationCompleteDesc', language)}</p>
            </div>
          </div>
        </div>
      );
    case 'rejected':
      return (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
              <X className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-400">{getTranslation('verificationRejected', language)}</h3>
              <p className="text-sm text-red-700 dark:text-red-500 mt-1">
                {getTranslation('verificationRejectedDesc', language)}
                {kycData.admin_notes && (
                  <span className="block mt-2 font-semibold">
                    {getTranslation('rejectionReason', language)}: {kycData.admin_notes}
                  </span>
                )}
              </p>
              <p className="text-sm text-red-700 dark:text-red-500 mt-3">
                {getTranslation('pleaseUpdateAndResubmit', language)}
              </p>
            </div>
          </div>
        </div>
      );
    case 'pending':
      return (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-400">{getTranslation('verificationPending', language)}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-500 mt-1">
                {getTranslation('verificationPendingDesc', language)}
                {kycData.created_at && (
                  <span className="block mt-1">
                    {getTranslation('submittedOn', language)}: {new Date(kycData.created_at).toLocaleDateString()}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default KycStatusDisplay;
