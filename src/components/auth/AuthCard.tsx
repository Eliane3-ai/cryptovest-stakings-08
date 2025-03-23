
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { StakingKnowledgeLevel } from '@/types/auth';

interface AuthCardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  stakingKnowledge: StakingKnowledgeLevel;
  setStakingKnowledge: (level: StakingKnowledgeLevel) => void;
  loading: boolean;
  isEmailVerified: boolean | null;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  handleResendVerification: () => Promise<void>;
  referralCode: string | null;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  activeTab,
  setActiveTab,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  confirmPassword,
  setConfirmPassword,
  stakingKnowledge,
  setStakingKnowledge,
  loading,
  isEmailVerified,
  handleLogin,
  handleSignup,
  handleResendVerification,
  referralCode,
  isButtonPressed,
  setIsButtonPressed
}) => {
  return (
    <Card className="border-[#474D57] bg-[#1E2026]">
      <CardHeader>
        <CardTitle className="text-white">Welcome to Crypto Vest</CardTitle>
        <CardDescription className="text-gray-400">
          {activeTab === 'login' 
            ? 'Sign in to access your account' 
            : 'Create a new account to start earning'}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mx-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            loading={loading}
            isEmailVerified={isEmailVerified}
            handleLogin={handleLogin}
            handleResendVerification={handleResendVerification}
            setActiveTab={setActiveTab}
            isButtonPressed={isButtonPressed}
            setIsButtonPressed={setIsButtonPressed}
          />
        </TabsContent>
        
        <TabsContent value="signup">
          <SignupForm
            email={email}
            setEmail={setEmail}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            stakingKnowledge={stakingKnowledge}
            setStakingKnowledge={setStakingKnowledge}
            loading={loading}
            handleSignup={handleSignup}
            setActiveTab={setActiveTab}
            referralCode={referralCode}
            isButtonPressed={isButtonPressed}
            setIsButtonPressed={setIsButtonPressed}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthCard;
