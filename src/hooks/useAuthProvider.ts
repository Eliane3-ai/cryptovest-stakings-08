
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, StakingKnowledgeLevel } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Initialize auth state
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
          setIsEmailVerified(session.user.email_confirmed_at !== null);
          
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
          setIsEmailVerified(null);
        }
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Existing session check:", !!session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setIsEmailVerified(session.user.email_confirmed_at !== null);
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

  return {
    user,
    profile,
    session,
    isLoading,
    isFirstLogin,
    isEmailVerified,
    setProfile,
    getProfile,
    setIsFirstLogin
  };
}
