
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/auth';

/**
 * Hook that manages user profile data
 */
export function useUserProfile() {
  const [isFirstLogin, setIsFirstLogin] = useState(false);

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
      
      // Check if this is the first login for the user
      if (data && data.is_funded === false) {
        setIsFirstLogin(true);
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  return {
    getProfile,
    isFirstLogin,
    setIsFirstLogin
  };
}
