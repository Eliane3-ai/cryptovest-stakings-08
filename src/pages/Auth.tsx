
import React, { useEffect } from 'react';
import { useAuthPage } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Import components
import AuthCard from '@/components/auth/AuthCard';
import VerificationSent from '@/components/auth/VerificationSent';
import AuthHeader from '@/components/auth/AuthHeader';

const Auth: React.FC = () => {
  const { toast } = useToast();
  const {
    // User and auth data
    user,
    isEmailVerified,
    // Form state
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    username, setUsername,
    fullName, setFullName,
    mobileNumber, setMobileNumber,
    country, setCountry,
    // UI state
    loading,
    verificationSent, setVerificationSent,
    activeTab, setActiveTab,
    isButtonPressed, setIsButtonPressed,
    resendLoading,
    // 2FA state
    showTwoFactor,
    twoFactorError,
    // URL params
    referralCode,
    verified,
    from,
    // Navigation
    navigate,
    // Handlers
    handleLogin,
    handleSignup,
    handleResendVerification,
    handle2FAVerify,
    cancelTwoFactor
  } = useAuthPage();
  
  // Show toast when redirected from verification link
  useEffect(() => {
    if (verified) {
      toast({
        title: "Email Verified",
        description: "Your email has been verified. You can now log in.",
        variant: "default"
      });
      
      // Clear the verified parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [verified, toast]);
  
  // Force redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log("Auth: User already logged in, redirecting to", from || '/wallet');
      navigate(from || '/wallet', { replace: true });
    }
  }, [user, navigate, from]);

  // TypeScript helper function to bridge the return type differences
  const handleLoginWrapper = async (e: React.FormEvent) => {
    await handleLogin(e);
  };

  const handleSignupWrapper = async (e: React.FormEvent) => {
    await handleSignup(e);
  };

  const handleResendVerificationWrapper = async () => {
    await handleResendVerification();
  };

  const handle2FAVerifyWrapper = async (code: string) => {
    await handle2FAVerify(code);
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AuthHeader onBackClick={() => navigate('/')} />
        
        {verificationSent ? (
          <VerificationSent
            email={email}
            handleResendVerification={handleResendVerificationWrapper}
            resendLoading={resendLoading}
            setVerificationSent={setVerificationSent}
            setActiveTab={setActiveTab}
            isButtonPressed={isButtonPressed}
            setIsButtonPressed={setIsButtonPressed}
          />
        ) : (
          <AuthCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            username={username}
            setUsername={setUsername}
            fullName={fullName}
            setFullName={setFullName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            country={country}
            setCountry={setCountry}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            loading={loading}
            isEmailVerified={isEmailVerified}
            handleLogin={handleLoginWrapper}
            handleSignup={handleSignupWrapper}
            handleResendVerification={handleResendVerificationWrapper}
            handle2FAVerify={handle2FAVerifyWrapper}
            showTwoFactor={showTwoFactor}
            twoFactorError={twoFactorError}
            cancelTwoFactor={cancelTwoFactor}
            referralCode={referralCode}
            isButtonPressed={isButtonPressed}
            setIsButtonPressed={setIsButtonPressed}
          />
        )}
      </div>
    </div>
  );
};

export default Auth;
