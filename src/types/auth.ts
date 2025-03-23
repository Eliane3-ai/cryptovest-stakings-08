
import { User } from "@supabase/supabase-js";

export type StakingKnowledgeLevel = 'beginner' | 'intermediate' | 'expert';

export interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  mobile_number?: string | null;
  country?: string | null;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isFirstLogin: boolean;
  isEmailVerified: boolean | null;
  isTwoFactorEnabled: boolean;
  signUp: (email: string, password: string, userData?: {
    username?: string;
    full_name?: string;
    referral_code?: string;
    mobile_number?: string;
    country?: string;
  }) => Promise<{ error: Error | null, data?: any }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null, data?: any }>;
  signOut: () => Promise<void>;
  getProfile: (id: string) => Promise<UserProfile | null>;
  resendVerificationEmail: (email: string) => Promise<{ error: Error | null, data?: any }>;
  verify2FA: (code: string) => Promise<{ error: Error | null, success: boolean }>;
  setup2FA: () => Promise<{ error: Error | null, secret?: string, qrCodeUrl?: string }>;
  verify2FASetup: (code: string) => Promise<{ error: Error | null, success: boolean }>;
  disable2FA: () => Promise<{ error: Error | null, success: boolean }>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
