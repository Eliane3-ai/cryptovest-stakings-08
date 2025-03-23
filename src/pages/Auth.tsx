
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import AuthCard from '@/components/auth/AuthCard';
import VerificationSent from '@/components/auth/VerificationSent';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, signIn, signUp, isEmailVerified, resendVerificationEmail, verify2FA, isTwoFactorEnabled } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [country, setCountry] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
  // 2FA States
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState<string | null>(null);
  
  // Get referral code from URL if present
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get('ref');
  const verified = queryParams.get('verified') === 'true';
  
  // Get the redirect path from location state or default to wallet
  const from = location.state?.from || '/wallet';
  
  useEffect(() => {
    // Show toast when redirected from verification link
    if (verified) {
      toast({
        title: "Email Verified",
        description: "Your email has been verified. You can now log in.",
        variant: "default"
      });
      
      // Clear the verified parameter from URL to prevent showing the toast again on refresh
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [verified, toast]);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTwoFactorError(null);
    
    try {
      const { error, data } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      // Check if 2FA is enabled for this user
      if (data?.user?.user_metadata?.two_factor_enabled === true) {
        // Show 2FA verification form
        setShowTwoFactor(true);
        return;
      }
      
      // Successful login will redirect via the useEffect
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setIsButtonPressed(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        username,
        full_name: fullName,
        mobile_number: mobileNumber,
        country: country,
        ...(referralCode && { referral_code: referralCode })
      };
      
      const { error } = await signUp(email, password, userData);
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      setVerificationSent(true);
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setIsButtonPressed(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    try {
      await resendVerificationEmail(email);
    } finally {
      setResendLoading(false);
    }
  };
  
  const handle2FAVerify = async (code: string) => {
    setLoading(true);
    setTwoFactorError(null);
    
    try {
      const { error, success } = await verify2FA(code);
      
      if (error || !success) {
        setTwoFactorError(error?.message || "Invalid verification code");
        return;
      }
      
      // Successful verification - already logged in at this point
      toast({
        title: "Login Successful",
        description: "Welcome back to Crypto Vest!",
      });
      
      // Redirect to the dashboard or requested page
      navigate(from, { replace: true });
    } catch (error) {
      console.error('2FA verification error:', error);
      setTwoFactorError("An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };
  
  const cancelTwoFactor = () => {
    setShowTwoFactor(false);
    setTwoFactorError(null);
  };
  
  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-6 flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Crypto Vest</h1>
        </div>
        
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
            handle2FAVerify={handle2FAVerify}
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
