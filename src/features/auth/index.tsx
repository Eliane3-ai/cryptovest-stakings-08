
import React, { useEffect } from 'react';
import { useAuthPage } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

// Import components
import AuthCard from '@/components/auth/AuthCard';
import VerificationSent from '@/components/auth/VerificationSent';
import AuthHeader from '@/components/auth/AuthHeader';

const Auth: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse URL parameters for email verification
  const searchParams = new URLSearchParams(location.search);
  const isVerified = searchParams.get('verified') === 'true';
  const tab = searchParams.get('tab') || 'login'; // Get tab parameter if provided
  
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
    // URL params
    referralCode,
    verified,
    from,
    // Handlers
    handleLogin,
    handleSignup,
    handleResendVerification,
  } = useAuthPage();
  
  // Set active tab based on URL parameter
  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab, setActiveTab]);
  
  // Show toast when redirected from verification link
  useEffect(() => {
    if (isVerified || verified) {
      toast({
        title: "Email Verified",
        description: "Your email has been verified. You can now log in.",
        variant: "default"
      });
      
      // Set active tab to login if email is verified
      setActiveTab('login');
      
      // Clear the verified parameter from URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [isVerified, verified, toast, setActiveTab]);
  
  // Force redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log("Auth: User already logged in, redirecting to", from || '/wallet');
      navigate(from || '/wallet', { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <AuthHeader onBackClick={() => navigate('/')} />
        
        {verificationSent ? (
          <VerificationSent
            email={email}
            handleResendVerification={handleResendVerification}
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
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleResendVerification={handleResendVerification}
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
