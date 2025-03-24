
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook for user sign-in related authentication methods
 */
export function useSignInMethods() {
  const { toast } = useToast();

  /**
   * Sign in a user with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in user:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
        // Check if the error is due to email not being confirmed
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and verify your account before logging in.",
            variant: "destructive"
          });
        }
        return { error };
      } else {
        console.log("Login successful:", data);
        
        // Check for 2FA on the user
        const user = data.user;
        if (user?.user_metadata?.two_factor_enabled === true) {
          toast({
            title: "2FA Required",
            description: "Please enter your two-factor authentication code.",
          });
        } else {
          toast({
            title: "Login Successful",
            description: "Welcome back to Crypto Vest!",
          });
        }
        
        return { error: null, data };
      }
    } catch (error) {
      console.error("Login exception:", error);
      return { error: error as Error };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    console.log("Signing out user");
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return {
    signIn,
    signOut
  };
}
