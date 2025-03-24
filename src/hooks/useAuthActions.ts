
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthActionsParams {
  signIn: (email: string, password: string) => Promise<{ error: Error | null, data?: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: Error | null, data?: any }>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null, data?: any }>;
  setShowTwoFactor: (show: boolean) => void;
  setTwoFactorError: (error: string | null) => void;
}

/**
 * Hook that provides authentication action handlers
 */
export function useAuthActions({
  signIn, 
  signUp, 
  resendVerificationEmail,
  setShowTwoFactor,
  setTwoFactorError
}: AuthActionsParams) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  /**
   * Handle user login
   */
  const handleLogin = async (
    e: React.FormEvent, 
    email: string, 
    password: string, 
    setIsButtonPressed: (pressed: boolean) => void,
    redirectTo: string = '/wallet'
  ) => {
    e.preventDefault();
    setLoading(true);
    setTwoFactorError(null);
    
    try {
      const { error, data } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      // Check if 2FA is enabled for this user
      if (data?.user?.user_metadata?.two_factor_enabled === true) {
        // Show 2FA verification form
        setShowTwoFactor(true);
        return false;
      }
      
      // Successful login will redirect via the useEffect
      toast({
        title: "Login Successful",
        description: "Welcome to your Crypto Vest account!",
      });
      
      // Explicit navigation to ensure redirect happens
      navigate(redirectTo, { replace: true });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
      setIsButtonPressed(false);
    }
  };
  
  /**
   * Handle user signup
   */
  const handleSignup = async (
    e: React.FormEvent,
    email: string,
    password: string,
    confirmPassword: string,
    userData: any,
    setVerificationSent: (sent: boolean) => void,
    setIsButtonPressed: (pressed: boolean) => void
  ) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return false;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(email, password, userData);
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      setVerificationSent(true);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
      setIsButtonPressed(false);
    }
  };
  
  /**
   * Handle resending verification email
   */
  const handleResendVerification = async (email: string) => {
    setResendLoading(true);
    try {
      const { error } = await resendVerificationEmail(email);
      return !error;
    } catch (error) {
      console.error('Error resending verification:', error);
      return false;
    } finally {
      setResendLoading(false);
    }
  };
  
  return {
    loading,
    resendLoading,
    handleLogin,
    handleSignup,
    handleResendVerification
  };
}
