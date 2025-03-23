
import { supabase } from '@/integrations/supabase/client';
import { StakingKnowledgeLevel } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuthMethods() {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    staking_knowledge?: StakingKnowledgeLevel;
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

  const signOut = async () => {
    console.log("Signing out user");
    await supabase.auth.signOut();
  };

  const fundUserWallet = async (userId: string, knowledgeLevel: StakingKnowledgeLevel) => {
    try {
      console.log("Funding user wallet:", userId, knowledgeLevel);
      // Mark user as funded in the database
      await supabase
        .from('profiles')
        .update({ 
          is_funded: true,
          staking_knowledge: knowledgeLevel
        })
        .eq('id', userId);
      
      // Return the funding amount based on knowledge level
      let fundingAmount = 15790;
      switch (knowledgeLevel) {
        case 'beginner':
          fundingAmount = 15790;
          break;
        case 'intermediate':
          fundingAmount = 75670;
          break;
        case 'expert':
          fundingAmount = 350900;
          break;
      }
      
      console.log("User funded with amount:", fundingAmount);
      return fundingAmount;
    } catch (error) {
      console.error('Error funding user:', error);
      return 0;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    resendVerificationEmail,
    fundUserWallet
  };
}
