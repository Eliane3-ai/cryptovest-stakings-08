
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthProviderProps, UserProfile, StakingKnowledgeLevel } from '@/types/auth';
import { initialTokens } from '@/data/initialTokens';

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

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
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
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
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
    
    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    staking_knowledge?: StakingKnowledgeLevel;
  }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const getProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        throw error;
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Fund user based on their staking knowledge level
  const fundUserWallet = async (userId: string, knowledgeLevel: StakingKnowledgeLevel) => {
    try {
      // Mark user as funded in the database
      await supabase
        .from('profiles')
        .update({ 
          is_funded: true,
          staking_knowledge: knowledgeLevel
        })
        .eq('id', userId);
      
      // Return the funding amount based on knowledge level
      switch (knowledgeLevel) {
        case 'beginner':
          return 15790;
        case 'intermediate':
          return 75670;
        case 'expert':
          return 350900;
        default:
          return 15790;
      }
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
