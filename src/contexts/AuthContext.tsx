
import React, { createContext, useContext } from 'react';
import { AuthContextType, AuthProviderProps } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { useAuthMethods } from '@/hooks/useAuthMethods';

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
    verify2FA,
    setup2FA,
    verify2FASetup,
    disable2FA,
    isTwoFactorEnabled
  } = useAuthMethods();

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      isFirstLogin,
      isEmailVerified,
      isTwoFactorEnabled,
      signUp,
      signIn,
      signOut,
      getProfile,
      resendVerificationEmail,
      verify2FA,
      setup2FA,
      verify2FASetup,
      disable2FA
    }}>
      {children}
    </AuthContext.Provider>
  );
};
