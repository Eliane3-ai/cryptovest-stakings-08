
import React, { createContext, useContext } from 'react';
import { AuthContextType, AuthProviderProps } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { useAuthMethods } from '@/hooks/useAuthMethods';
import { supabase } from '@/integrations/supabase/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const {
    user,
    profile,
    session,
    isLoading,
    isFirstLogin,
    isEmailVerified,
    getProfile
  } = useAuthProvider();

  const {
    signUp,
    signIn,
    signOut,
    resendVerificationEmail,
  } = useAuthMethods();

  // Function to fund user wallet based on their staking knowledge
  const fundUserWallet = async (userId: string, stakingKnowledge: string): Promise<number> => {
    try {
      console.log("Funding wallet for user:", userId, "with staking knowledge:", stakingKnowledge);
      
      // Calculate funding amount based on staking knowledge
      let fundAmount = 1000; // Default amount for beginners
      
      if (stakingKnowledge === 'intermediate') {
        fundAmount = 5000;
      } else if (stakingKnowledge === 'advanced') {
        fundAmount = 10000;
      }
      
      // Update the is_funded flag in the profile
      const { error } = await supabase
        .from('profiles')
        .update({ is_funded: true })
        .eq('id', userId);
        
      if (error) {
        console.error("Error updating profile funding status:", error);
        return 0;
      }
      
      console.log("Successfully funded wallet with amount:", fundAmount);
      return fundAmount;
    } catch (error) {
      console.error("Error funding wallet:", error);
      return 0;
    }
  };

  // Simplified 2FA methods (removed functionality)
  const isTwoFactorEnabled = () => false;

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      isLoading,
      isFirstLogin,
      isEmailVerified,
      isTwoFactorEnabled,
      signUp,
      signIn,
      signOut,
      getProfile,
      resendVerificationEmail,
      verify2FA: async () => ({ error: null, data: {}, success: true }),
      setup2FA: async () => ({ error: null, data: {} }),
      verify2FASetup: async () => ({ error: null, data: {}, success: true }),
      disable2FA: async () => ({ error: null, data: {}, success: true }),
      fundUserWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};
