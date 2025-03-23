
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import KYCVerificationSection from '@/components/KYCVerificationSection';
import ApplicationSettingsSection from '@/components/ApplicationSettingsSection';
import SecuritySettingsSection from '@/components/SecuritySettingsSection';
import DepositAddresses from '@/components/DepositAddresses';
import PaymentMethodsSection from '@/components/PaymentMethodsSection';

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

        {/* Security Settings Section - Moved to top for emphasis */}
        <SecuritySettingsSection />
        
        {/* KYC Verification Section */}
        <KYCVerificationSection />
        
        {/* Payment Methods Section */}
        <PaymentMethodsSection />
        
        {/* Deposit Addresses */}
        <DepositAddresses className="mb-6" />
        
        {/* Application Settings Section */}
        <ApplicationSettingsSection />
      </div>
    </div>
  );
};

export default Settings;
