
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function useAuthMethods() {
  const { toast } = useToast();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

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
        
        // Check for 2FA on the user
        const user = data.user;
        if (user?.user_metadata?.two_factor_enabled === true) {
          setIsTwoFactorEnabled(true);
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

  // Setup 2FA for a user
  const setup2FA = async () => {
    try {
      console.log("Setting up 2FA");
      
      // In a real implementation, we would:
      // 1. Generate a secret key (typically using a library like otplib)
      // 2. Generate a QR code URL for the authenticator app
      
      // For this example, we'll simulate the process
      const secret = generateRandomSecret();
      const qrCodeUrl = `/placeholder.svg`; // In reality, this would be a proper QR code URL
      
      toast({
        title: "2FA Setup",
        description: "Scan the QR code with your authenticator app.",
      });
      
      return { 
        error: null, 
        secret: secret, 
        qrCodeUrl: qrCodeUrl 
      };
    } catch (error) {
      console.error("2FA setup exception:", error);
      toast({
        title: "Setup Error",
        description: "An error occurred during 2FA setup.",
        variant: "destructive"
      });
      return { error: error as Error };
    }
  };

  // Verify 2FA setup with a code from the authenticator app
  const verify2FASetup = async (code: string) => {
    try {
      console.log("Verifying 2FA setup code:", code);
      
      if (code.length !== 6) {
        const error = new Error("Invalid code format. Please enter a 6-digit code.");
        toast({
          title: "Verification Failed",
          description: "Invalid code format. Please enter a 6-digit code.",
          variant: "destructive"
        });
        return { error, success: false };
      }
      
      // In a real implementation, we would:
      // 1. Verify the code against the user's secret
      // 2. Update the user metadata to store the 2FA status
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { two_factor_enabled: true }
      });
      
      if (updateError) {
        toast({
          title: "Setup Failed",
          description: "Could not enable 2FA on your account.",
          variant: "destructive"
        });
        return { error: updateError, success: false };
      }
      
      setIsTwoFactorEnabled(true);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled for your account.",
      });
      
      return { error: null, success: true };
    } catch (error) {
      console.error("2FA setup verification exception:", error);
      toast({
        title: "Verification Error",
        description: "An error occurred during 2FA verification.",
        variant: "destructive"
      });
      return { error: error as Error, success: false };
    }
  };

  // Disable 2FA for a user
  const disable2FA = async () => {
    try {
      console.log("Disabling 2FA");
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { two_factor_enabled: false }
      });
      
      if (updateError) {
        toast({
          title: "Operation Failed",
          description: "Could not disable 2FA on your account.",
          variant: "destructive"
        });
        return { error: updateError, success: false };
      }
      
      setIsTwoFactorEnabled(false);
      toast({
        title: "2FA Disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
      
      return { error: null, success: true };
    } catch (error) {
      console.error("2FA disable exception:", error);
      toast({
        title: "Operation Error",
        description: "An error occurred while disabling 2FA.",
        variant: "destructive"
      });
      return { error: error as Error, success: false };
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

  // Helper function to generate a random secret for 2FA (in a real app, use a proper library like otplib)
  const generateRandomSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 16; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  return {
    signUp,
    signIn,
    signOut,
    resendVerificationEmail,
    verify2FA,
    setup2FA,
    verify2FASetup,
    disable2FA,
    isTwoFactorEnabled
  };
}
