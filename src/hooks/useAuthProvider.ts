
import { useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { useUserProfile } from './useUserProfile';

/**
 * Main hook that combines auth state and profile management
 */
export function useAuthProvider() {
  const { 
    user, 
    profile, 
    setProfile, 
    session, 
    isLoading, 
    isEmailVerified 
  } = useAuthState();
  
  const { 
    getProfile, 
    isFirstLogin, 
    setIsFirstLogin 
  } = useUserProfile();

  // Fetch user profile when user changes
  useEffect(() => {
    if (user) {
      getProfile(user.id).then(profileData => {
        setProfile(profileData);
      });
    }
  }, [user]);

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
