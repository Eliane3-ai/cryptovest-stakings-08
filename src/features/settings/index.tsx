
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
        
        {/* Admin link - visible to all but only works for admins */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">{capitalize(getTranslation('adminAccess', language))}</h2>
          <p className="text-sm text-muted-foreground mb-4">
            {capitalize(getTranslation('adminAccessDescription', language))}
          </p>
          <Link to="/admin">
            <Button>
              {capitalize(getTranslation('adminPanel', language))}
            </Button>
          </Link>
        </div>
        
        {/* Payment Methods Section */}
        <PaymentMethodsSection />
        
        {/* Deposit Addresses */}
        <DepositAddresses className="mb-6" />
      </div>
    </div>
  );
};

export default Settings;
