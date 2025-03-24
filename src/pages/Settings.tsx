import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useAuth } from '@/contexts/AuthContext';
import KYCVerificationSection from '@/components/KYCVerificationSection';
import ApplicationSettingsSection from '@/components/ApplicationSettingsSection';
import SecuritySettingsSection from '@/components/SecuritySettingsSection';
import DepositAddresses from '@/components/DepositAddresses';
import PaymentMethodsSection from '@/components/PaymentMethodsSection';
import KycVerificationAdmin from '@/components/admin/KycVerificationAdmin';
import KycMigration from '@/components/KycMigration';

const Settings: React.FC = () => {
  const { language } = useLanguage();
  const { profile } = useAuth();
  
  // Check if user is admin (has expert staking knowledge)
  const isAdmin = profile?.staking_knowledge === 'expert';

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

        {/* Migration component - will only show if migration is needed */}
        <KycMigration />

        {/* Security Settings Section - Moved to top for emphasis */}
        <SecuritySettingsSection />
        
        {/* KYC Verification Section */}
        <KYCVerificationSection />
        
        {/* Admin KYC Verification Section - only visible for admins */}
        {isAdmin && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Admin: KYC Verification Management</h2>
            <KycVerificationAdmin />
          </div>
        )}
        
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
