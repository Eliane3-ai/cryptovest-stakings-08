import { User } from "@supabase/supabase-js";

export type StakingKnowledgeLevel = 'beginner' | 'intermediate' | 'expert';

export interface UserProfile {
  id: string;
  created_at?: string;
  updated_at?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  is_funded?: boolean;
  staking_knowledge?: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isFirstLogin: boolean;
  isEmailVerified: boolean | null;
  isTwoFactorEnabled: () => boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: Error | null; data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null; data: any }>;
  signOut: () => Promise<{ error: Error | null; data: any }>;
  getProfile: (userId: string) => Promise<UserProfile | null>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null; data: any }>;
  verify2FA: (token: string) => Promise<{ error: Error | null; data: any }>;
  setup2FA: () => Promise<{ error: Error | null; data: any }>;
  verify2FASetup: (code: string) => Promise<{ error: Error | null; data: any }>;
  disable2FA: () => Promise<{ error: Error | null; data: any }>;
  fundUserWallet: (userId: string, stakingKnowledge: string) => Promise<number>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
