
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Hook that handles two-factor authentication functionality
 */
export function useTwoFactorAuth(auth: {
  verify2FA: (code: string) => Promise<{ error: Error | null, data: any, success: boolean }>;
}) {
  const { verify2FA } = auth;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Two-Factor Authentication state
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  
  /**
   * Handle 2FA verification
   */
  const handle2FAVerify = async (code: string, redirectTo: string = '/wallet') => {
    setTwoFactorLoading(true);
    setTwoFactorError(null);
    
    try {
      const { error, success } = await verify2FA(code);
      
      if (error || !success) {
        setTwoFactorError(error?.message || "Invalid verification code");
        return false;
      }
      
      // Successful verification
      toast({
        title: "Login Successful",
        description: "Welcome back to Crypto Vest!",
      });
      
      // Redirect to the dashboard or requested page
      navigate(redirectTo, { replace: true });
      return true;
    } catch (error) {
      console.error('2FA verification error:', error);
      setTwoFactorError("An error occurred during verification");
      return false;
    } finally {
      setTwoFactorLoading(false);
    }
  };
  
  /**
   * Cancel 2FA verification process
   */
  const cancelTwoFactor = () => {
    setShowTwoFactor(false);
    setTwoFactorError(null);
  };
  
  return {
    showTwoFactor, setShowTwoFactor,
    twoFactorError, setTwoFactorError,
    twoFactorLoading,
    handle2FAVerify,
    cancelTwoFactor
  };
}
