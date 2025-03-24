
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

/**
 * Hook that provides authentication action handlers
 */
export function useAuthActions(auth: {
  signIn: (email: string, password: string) => Promise<{ error: Error | null; data: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: Error | null; data: any }>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null; data: any }>;
  setShowTwoFactor: (show: boolean) => void;
  setTwoFactorError: (error: string | null) => void;
}) {
  const { signIn, signUp, resendVerificationEmail, setShowTwoFactor, setTwoFactorError } = auth;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  /**
   * Handle login form submission
   */
  const handleLogin = async (
    e: React.FormEvent,
    email: string,
    password: string,
    setIsButtonPressed: (pressed: boolean) => void,
    redirectPath: string
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setIsButtonPressed(true);
    
    try {
      console.log("Attempting login for:", email);
      const { error, data } = await signIn(email, password);
      
      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Check if 2FA is required
      const user = data?.user;
      if (user?.user_metadata?.two_factor_enabled === true) {
        console.log("2FA required");
        setShowTwoFactor(true);
        return;
      }
      
      // Successful login without 2FA
      console.log("Login successful, redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Login exception:", error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setIsButtonPressed(false), 200);
    }
  };

  /**
   * Handle signup form submission
   */
  const handleSignup = async (
    e: React.FormEvent,
    email: string,
    password: string,
    confirmPassword: string,
    userData: any,
    setVerificationSent: (sent: boolean) => void,
    setIsButtonPressed: (pressed: boolean) => void
  ): Promise<void> => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "The passwords you entered do not match",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setIsButtonPressed(true);
    
    try {
      console.log("Attempting signup for:", email);
      const { error, data } = await signUp(email, password, userData);
      
      if (error) {
        console.error("Signup error:", error);
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Successful signup
      console.log("Signup successful:", data);
      setVerificationSent(true);
    } catch (error) {
      console.error("Signup exception:", error);
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setIsButtonPressed(false), 200);
    }
  };

  /**
   * Handle resend verification email
   */
  const handleResendVerification = async (email: string): Promise<void> => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setResendLoading(true);
    
    try {
      console.log("Resending verification email to:", email);
      const { error } = await resendVerificationEmail(email);
      
      if (error) {
        console.error("Resend verification error:", error);
        toast({
          title: "Failed to Resend",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Successfully resent
      toast({
        title: "Verification Email Sent",
        description: "Please check your email inbox",
      });
    } catch (error) {
      console.error("Resend verification exception:", error);
      toast({
        title: "Resend Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
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
