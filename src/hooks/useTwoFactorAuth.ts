import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

/**
 * Hook that handles simplified authentication functionality (2FA removed)
 */
export function useTwoFactorAuth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Simplified state - these are maintained for API compatibility
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  
  /**
   * Simplified login success handler (2FA functionality removed)
   */
  const handle2FAVerify = async (code: string, redirectTo: string = '/wallet') => {
    // Simplified: Just redirect to the wallet page
    toast({
      title: "Login Successful",
      description: "Welcome back to Crypto Vest!",
    });
    
    // Redirect to the dashboard or requested page
    navigate(redirectTo, { replace: true });
    return true;
  };
  
  /**
   * Cancel authentication process
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
