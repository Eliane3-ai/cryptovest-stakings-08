
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides two-factor authentication methods
 */
export function useTwoFactorMethods() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  /**
   * Verify a two-factor authentication code
   */
  const verify2FA = async (token: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        type: 'totp',
        token
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Set up two-factor authentication for a user
   */
  const setup2FA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp'
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error setting up 2FA:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Verify the setup of two-factor authentication
   */
  const verify2FASetup = async (code: string) => {
    try {
      const { data, error } = await supabase.auth.mfa.challenge({
        factorId: 'totp',
        code
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error verifying 2FA setup:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Disable two-factor authentication for a user
   */
  const disable2FA = async () => {
    try {
      const { data, error } = await supabase.auth.mfa.unenroll({
        factorId: 'totp'
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error disabling 2FA:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Check if two-factor authentication is enabled for a user
   */
  const isTwoFactorEnabled = () => {
    return twoFactorEnabled;
  };

  return {
    verify2FA,
    setup2FA,
    verify2FASetup,
    disable2FA,
    isTwoFactorEnabled
  };
}
