
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import TwoFactorForm from './TwoFactorForm';

interface AuthCardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username: string;
  setUsername: (username: string) => void;
  fullName: string;
  setFullName: (fullName: string) => void;
  mobileNumber: string;
  setMobileNumber: (mobileNumber: string) => void;
  country: string;
  setCountry: (country: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  loading: boolean;
  isEmailVerified: boolean | null;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  handleResendVerification: () => Promise<void>;
  handle2FAVerify?: (code: string) => Promise<void>;
  showTwoFactor?: boolean;
  twoFactorError?: string | null;
  cancelTwoFactor?: () => void;
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
  fullName,
  setFullName,
  mobileNumber,
  setMobileNumber,
  country,
  setCountry,
  confirmPassword,
  setConfirmPassword,
  loading,
  isEmailVerified,
  handleLogin,
  handleSignup,
  handleResendVerification,
  handle2FAVerify,
  showTwoFactor,
  twoFactorError,
  cancelTwoFactor,
  referralCode,
  isButtonPressed,
  setIsButtonPressed
}) => {
  // Handle 2FA verification scenario
  if (showTwoFactor && handle2FAVerify && cancelTwoFactor) {
    return (
      <Card className="border-[#474D57] bg-[#1E2026]">
        <TwoFactorForm
          verifying={loading}
          onVerify={handle2FAVerify}
          onCancel={cancelTwoFactor}
          error={twoFactorError || null}
          isButtonPressed={isButtonPressed}
          setIsButtonPressed={setIsButtonPressed}
        />
      </Card>
    );
  }

  return (
    <Card className="border-[#474D57] bg-[#1E2026]">
      <CardHeader>
        <CardTitle className="text-white">Welcome to Crypto Vest</CardTitle>
        <CardDescription className="text-gray-400">
          {activeTab === 'login' 
            ? 'Sign in to access your account' 
            : 'Create a new account to get started'}
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
            fullName={fullName}
            setFullName={setFullName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            country={country}
            setCountry={setCountry}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
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
