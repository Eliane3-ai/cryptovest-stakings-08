
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuthMethods() {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    mobile_number?: string;
    country?: string;
  }) => {
    try {
      console.log("Signing up user:", email);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: window.location.origin + '/auth?verified=true'
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
        return { error };
      } else {
        console.log("Signup successful, email verification sent:", data);
        // Show toast for email verification
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
        return { error: null, data };
      }
    } catch (error) {
      console.error("Signup exception:", error);
      return { error: error as Error };
    }
  };

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
        toast({
          title: "Login Successful",
          description: "Welcome back to Crypto Vest!",
        });
        return { error: null, data };
      }
    } catch (error) {
      console.error("Login exception:", error);
      return { error: error as Error };
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      console.log("Resending verification email to:", email);
      const { error, data } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: window.location.origin + '/auth?verified=true'
        }
      });
      
      if (error) {
        console.error("Error resending verification email:", error);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      } else {
        console.log("Verification email resent successfully");
        toast({
          title: "Email Sent",
          description: "Verification email has been resent. Please check your inbox.",
        });
        return { error: null, data };
      }
    } catch (error) {
      console.error("Resend verification email exception:", error);
      return { error: error as Error };
    }
  };

  const verify2FA = async (code: string) => {
    try {
      console.log("Verifying 2FA code:", code);
      // In a real implementation, we would verify the 2FA code against the user's secret
      // This is just a mock implementation for demonstration purposes
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (code.length === 6) {
        toast({
          title: "2FA Verified",
          description: "Your two-factor authentication code has been verified.",
        });
        return { error: null, success: true };
      } else {
        const error = new Error("Invalid 2FA code. Please try again.");
        toast({
          title: "Verification Failed",
          description: "Invalid 2FA code. Please try again.",
          variant: "destructive"
        });
        return { error, success: false };
      }
    } catch (error) {
      console.error("2FA verification exception:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred during 2FA verification.",
        variant: "destructive"
      });
      return { error: error as Error, success: false };
    }
  };

  const signOut = async () => {
    console.log("Signing out user");
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return {
    signUp,
    signIn,
    signOut,
    resendVerificationEmail,
    verify2FA
  };
}
