
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides sign-up related methods
 */
export function useSignUpMethods() {
  /**
   * Sign up a new user with email and password
   */
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Resend verification email to a user
   */
  const resendVerificationEmail = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error resending verification email:", error);
      return { error: error as Error, data: null };
    }
  };

  return {
    signUp,
    resendVerificationEmail
  };
}
