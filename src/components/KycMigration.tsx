
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

// This component is temporary and will migrate localStorage KYC data to Supabase
const KycMigration: React.FC = () => {
  const { user } = useAuth();
  const [needsMigration, setNeedsMigration] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [migrated, setMigrated] = useState(false);
  
  const KYC_KEY = 'crypto_wallet_kyc_data';
  
  // Check if there's data in localStorage that needs to be migrated
  useEffect(() => {
    if (!user) return;
    
    const localKycData = localStorage.getItem(KYC_KEY);
    if (localKycData) {
      try {
        const parsedData = JSON.parse(localKycData);
        // Check if the data is valid
        if (parsedData && parsedData.fullName && parsedData.email) {
          // Check if data already exists in Supabase
          const checkExistingData = async () => {
            const { data, error } = await supabase
              .from('kyc_verifications')
              .select('*')
              .eq('user_id', user.id)
              .maybeSingle();
              
            if (error) {
              console.error('Error checking existing KYC data:', error);
              return;
            }
            
            // If no data exists in Supabase, we need to migrate
            if (!data) {
              setNeedsMigration(true);
            }
          };
          
          checkExistingData();
        }
      } catch (error) {
        console.error('Error parsing local KYC data:', error);
      }
    }
  }, [user]);
  
  const handleMigration = async () => {
    if (!user) return;
    
    try {
      setMigrating(true);
      
      const localKycData = localStorage.getItem(KYC_KEY);
      if (!localKycData) {
        toast.error('No KYC data found in local storage');
        return;
      }
      
      const parsedData = JSON.parse(localKycData);
      
      // Insert data into Supabase
      const { error } = await supabase
        .from('kyc_verifications')
        .insert({
          user_id: user.id,
          full_name: parsedData.fullName || '',
          email: parsedData.email || '',
          mobile: parsedData.mobile || '',
          country: parsedData.country || '',
          address: parsedData.address || '',
          // If there was an idCardFile in localStorage, it would have been
          // just the filename, not the actual file, so we can't migrate it
          id_card_url: null,
          status: parsedData.isVerified ? 'approved' : (parsedData.isPending ? 'pending' : 'pending')
        });
      
      if (error) {
        console.error('Error migrating KYC data:', error);
        toast.error('Failed to migrate KYC data. Please try again later.');
        return;
      }
      
      // Clear localStorage data after successful migration
      localStorage.removeItem(KYC_KEY);
      
      toast.success('KYC data successfully migrated to Supabase!');
      setMigrated(true);
      setNeedsMigration(false);
      
      // Reload page after successful migration
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error in KYC migration:', error);
      toast.error('Error migrating KYC data');
    } finally {
      setMigrating(false);
    }
  };
  
  if (!needsMigration || migrated) {
    return null;
  }
  
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4 dark:bg-orange-900/20 dark:border-orange-900/30">
      <h3 className="text-orange-800 dark:text-orange-400 font-medium mb-2">KYC Data Migration Required</h3>
      <p className="text-orange-700 dark:text-orange-300 mb-4 text-sm">
        We've detected KYC data stored locally in your browser. For better security and management, we need to migrate this data to our secure database.
      </p>
      <div className="flex justify-end">
        <Button 
          variant="default" 
          onClick={handleMigration}
          disabled={migrating}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {migrating ? 'Migrating...' : 'Migrate KYC Data'}
        </Button>
      </div>
    </div>
  );
};

export default KycMigration;
