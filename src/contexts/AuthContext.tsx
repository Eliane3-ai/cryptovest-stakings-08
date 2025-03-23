
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
    resendVerificationEmail
  } = useAuthMethods();

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      isFirstLogin,
      isEmailVerified,
      signUp,
      signIn,
      signOut,
      getProfile,
      resendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};
