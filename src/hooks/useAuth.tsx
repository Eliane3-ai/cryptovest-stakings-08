
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAuthForm } from './useAuthForm';
import { useTwoFactorAuth } from './useTwoFactorAuth';
import { useAuthParams } from './useAuthParams';
import { useAuthActions } from './useAuthActions';

/**
 * Main hook for the authentication page
 */
export function useAuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get authentication context
  const { 
    user, 
    signIn, 
    signUp, 
    isEmailVerified, 
    resendVerificationEmail, 
    verify2FA,
    isTwoFactorEnabled 
  } = useAuth();
  
  // Get form state management
  const formState = useAuthForm();
  
  // Get URL parameters
  const { referralCode, verified, from } = useAuthParams();
  
  // Initialize 2FA state
  const twoFactorState = useTwoFactorAuth();
  
  // Initialize authentication actions
  const authActions = useAuthActions({
    signIn,
    signUp,
    resendVerificationEmail,
    setShowTwoFactor: twoFactorState.setShowTwoFactor,
    setTwoFactorError: twoFactorState.setTwoFactorError
  });

  // Wrapper functions to pass down the right parameters
  const handleLogin = async (e: React.FormEvent) => {
    return authActions.handleLogin(
      e, 
      formState.email, 
      formState.password, 
      formState.setIsButtonPressed,
      from
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    const userData = {
      username: formState.username,
      full_name: formState.fullName,
      mobile_number: formState.mobileNumber,
      country: formState.country,
      ...(referralCode && { referral_code: referralCode })
    };
    
    return authActions.handleSignup(
      e,
      formState.email,
      formState.password,
      formState.confirmPassword,
      userData,
      formState.setVerificationSent,
      formState.setIsButtonPressed
    );
  };

  const handleResendVerification = async () => {
    return authActions.handleResendVerification(formState.email);
  };

  return {
    // User and auth data
    user,
    isEmailVerified,
    
    // Form state from useAuthForm
    ...formState,
    
    // UI state
    loading: authActions.loading,
    resendLoading: authActions.resendLoading,
    
    // 2FA state from useTwoFactorAuth
    ...twoFactorState,
    
    // URL params
    referralCode,
    verified,
    from,
    
    // Navigation
    navigate,
    
    // Handlers
    handleLogin,
    handleSignup,
    handleResendVerification
  };
}
