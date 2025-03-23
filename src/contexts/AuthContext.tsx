
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthProviderProps, UserProfile, StakingKnowledgeLevel } from '@/types/auth';
import { initialTokens } from '@/data/initialTokens';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("Initializing auth state...");
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log("User authenticated, fetching profile...");
          const profile = await getProfile(session.user.id);
          setProfile(profile);
          
          // Check if this is the first login for the user
          if (event === 'SIGNED_IN') {
            const { data } = await supabase
              .from('profiles')
              .select('is_funded')
              .eq('id', session.user.id)
              .single();
              
            if (data && data.is_funded === false) {
              setIsFirstLogin(true);
            }
          }
        } else {
          setProfile(null);
          setIsFirstLogin(false);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", !!session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        getProfile(session.user.id).then(profile => {
          setProfile(profile);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
    
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    staking_knowledge?: StakingKnowledgeLevel;
  }) => {
    try {
      console.log("Signing up user:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      
      if (error) {
        console.error("Signup error:", error);
      } else {
        console.log("Signup successful");
        // Show toast for email verification if needed
        toast({
          title: "Account Created",
          description: "Please check your email to verify your account.",
        });
      }
      
      return { error };
    } catch (error) {
      console.error("Signup exception:", error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in user:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error);
      } else {
        console.log("Login successful");
      }
      
      return { error };
    } catch (error) {
      console.error("Login exception:", error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    console.log("Signing out user");
    await supabase.auth.signOut();
  };

  const getProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      console.log("Fetching profile for user:", userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      console.log("Profile fetched successfully:", data);
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Fund user based on their staking knowledge level
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

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isLoading,
      isFirstLogin,
      signUp,
      signIn,
      signOut,
      getProfile,
      fundUserWallet
    }}>
      {children}
    </AuthContext.Provider>
  );
};
