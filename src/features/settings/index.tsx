
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useAuth } from '@/contexts/AuthContext';
import KYCVerificationSection from '@/components/KYCVerificationSection';
import SecuritySettingsSection from '@/components/SecuritySettingsSection';
import DepositAddresses from '@/components/DepositAddresses';
import PaymentMethodsSection from '@/components/PaymentMethodsSection';
import KycMigration from '@/components/KycMigration';
import LogoutButton from '@/components/common/LogoutButton';
import { Button } from '@/components/ui/button';

const Settings: React.FC = () => {
  const { language } = useLanguage();
  
  // Helper function to capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/wallet" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>{capitalize(getTranslation('backToWallet', language))}</span>
          </Link>
          
          <LogoutButton variant="destructive" />
        </div>

        <h1 className="text-2xl font-bold mb-6">{capitalize(getTranslation('settings', language))}</h1>

        {/* Migration component - will only show if migration is needed */}
        <KycMigration />

        {/* Security Settings Section - Moved to top for emphasis */}
        <SecuritySettingsSection />
        
        {/* KYC Verification Section */}
        <KYCVerificationSection />
        
        {/* Payment Methods Section */}
        <PaymentMethodsSection />
        
        {/* Deposit Addresses */}
        <DepositAddresses className="mb-6" />
      </div>
    </div>
  );
};

export default Settings;
