
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import KYCVerificationSection from '@/components/KYCVerificationSection';
import ApplicationSettingsSection from '@/components/ApplicationSettingsSection';
import SecuritySettingsSection from '@/components/SecuritySettingsSection';
import DepositAddresses from '@/components/DepositAddresses';

const Settings: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>{getTranslation('backToWallet', language)}</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">{getTranslation('settings', language)}</h1>

        {/* KYC Verification Section */}
        <KYCVerificationSection />
        
        {/* Deposit Addresses */}
        <DepositAddresses className="mb-6" />
        
        {/* Application Settings Section */}
        <ApplicationSettingsSection />
        
        {/* Security Settings Section */}
        <SecuritySettingsSection />
      </div>
    </div>
  );
};

export default Settings;
