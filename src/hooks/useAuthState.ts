
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Hook that manages the authentication state with improved session persistence
 */
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);

  // Initialize auth state
  useEffect(() => {
    console.log("Initializing auth state...");
    
    // Set up auth state listener FIRST for proper session persistence
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log(`Auth state changed: ${event}`, !!currentSession);
        
        // Update the session and user state based on the auth state change
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          console.log("User authenticated in state change:", currentSession.user.email);
          setIsEmailVerified(currentSession.user.email_confirmed_at !== null);
        } else {
          setProfile(null);
          setIsEmailVerified(null);
        }

        // Set loading to false after processing
        setIsLoading(false);
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log("Existing session check:", !!existingSession);
      
      // Update state with the existing session data
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        console.log("User authenticated in initial check:", existingSession.user.email);
        setIsEmailVerified(existingSession.user.email_confirmed_at !== null);
      }
      
      // Set loading to false after initial check
      setIsLoading(false);
    });
    
    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    session,
    setProfile,
    isLoading,
    isEmailVerified
  };
}
