
import { useSignInMethods } from './auth/signInMethods';
import { useSignUpMethods } from './auth/signUpMethods';
import { useTwoFactorMethods } from './auth/twoFactorMethods';

/**
 * Hook that combines all authentication methods
 */
export function useAuthMethods() {
  // Get sign-in related methods
  const { 
    signIn, 
    signOut 
  } = useSignInMethods();
  
  // Get sign-up related methods
  const { 
    signUp, 
    resendVerificationEmail 
  } = useSignUpMethods();
  
  // Get two-factor authentication methods
  const { 
    verify2FA, 
    setup2FA, 
    verify2FASetup, 
    disable2FA, 
    isTwoFactorEnabled 
  } = useTwoFactorMethods();

  return {
    // Sign-in methods
    signIn,
    signOut,
    
    // Sign-up methods
    signUp,
    resendVerificationEmail,
    
    // Two-factor methods
    verify2FA,
    setup2FA,
    verify2FASetup,
    disable2FA,
    isTwoFactorEnabled
  };
}
