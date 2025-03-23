
import { User } from "@supabase/supabase-js";

export type StakingKnowledgeLevel = 'beginner' | 'intermediate' | 'expert';

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  staking_knowledge?: StakingKnowledgeLevel;
  is_funded?: boolean;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isFirstLogin: boolean;
  isEmailVerified: boolean | null;
  signUp: (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    staking_knowledge?: StakingKnowledgeLevel;
  }) => Promise<{ error: Error | null, data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null, data?: any }>;
  signOut: () => Promise<void>;
  getProfile: (id: string) => Promise<UserProfile | null>;
  fundUserWallet: (userId: string, knowledgeLevel: StakingKnowledgeLevel) => Promise<number>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null, data?: any }>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
