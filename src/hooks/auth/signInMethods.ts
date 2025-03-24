
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook that provides sign-in related methods
 */
export function useSignInMethods() {
  /**
   * Sign in a user with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error: error as Error | null, data: data || null };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error: error as Error, data: null };
    }
  };

  /**
   * Sign out the current user
   */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error as Error | null, data: null };
    } catch (error) {
      console.error("Error signing out:", error);
      return { error: error as Error, data: null };
    }
  };

  return {
    signIn,
    signOut
  };
}
