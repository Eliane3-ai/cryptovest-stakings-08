
import { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
  }) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  getProfile: (id: string) => Promise<UserProfile | null>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
