
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { getTranslation } from '@/utils/translations';

interface GasFeeContextType {
  gasFeeBalance: number;
  isKycVerified: boolean;
  increaseGasFee: (amount: number) => void;
  setKycVerified: (verified: boolean) => void;
  canWithdraw: () => boolean;
  withdrawalErrorReason: () => string | null;
}

const GasFeeContext = createContext<GasFeeContextType | undefined>(undefined);

export const GasFeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gasFeeBalance, setGasFeeBalance] = useState(0);
  const [isKycVerified, setIsKycVerified] = useState(false);
  const { language } = useLanguage();

  // Function to increase gas fee balance
  const increaseGasFee = (amount: number) => {
    setGasFeeBalance(prev => prev + amount);
  };

  // Check if withdrawal is possible
  const canWithdraw = () => {
    return gasFeeBalance > 0 && isKycVerified;
  };

  // Get the reason why withdrawal is not possible
  const withdrawalErrorReason = () => {
    if (!isKycVerified) {
      return getTranslation('kycRequired', language);
    }
    if (gasFeeBalance <= 0) {
      return getTranslation('noGasFee', language);
    }
    return null;
  };

  // Watch for deposits to automatically increase gas fee (simplified simulation)
  useEffect(() => {
    const depositListener = (event: CustomEvent<{ amount: number }>) => {
      // Add 1% of deposit amount to gas fee
      const gasFeeAmount = event.detail.amount * 0.01;
      increaseGasFee(gasFeeAmount);
    };

    // Add event listener for deposit events
    window.addEventListener('deposit' as any, depositListener as EventListener);

    return () => {
      window.removeEventListener('deposit' as any, depositListener as EventListener);
    };
  }, []);

  return (
    <GasFeeContext.Provider 
      value={{ 
        gasFeeBalance, 
        isKycVerified, 
        increaseGasFee, 
        setKycVerified: setIsKycVerified, 
        canWithdraw,
        withdrawalErrorReason
      }}
    >
      {children}
    </GasFeeContext.Provider>
  );
};

export const useGasFee = (): GasFeeContextType => {
  const context = useContext(GasFeeContext);
  if (context === undefined) {
    throw new Error('useGasFee must be used within a GasFeeProvider');
  }
  return context;
};
