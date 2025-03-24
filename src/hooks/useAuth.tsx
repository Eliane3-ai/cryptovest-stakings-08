
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function useAuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { 
    user, 
    signIn, 
    signUp, 
    isEmailVerified, 
    resendVerificationEmail, 
    verify2FA, 
    isTwoFactorEnabled 
  } = useAuth();
  
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
      toast({
        title: "Login Successful",
        description: "Welcome to your Crypto Vest account!",
      });
      
      // Explicit navigation to ensure redirect happens
      navigate(from || '/wallet', { replace: true });
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
      navigate(from || '/wallet', { replace: true });
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

  return {
    // User and auth context data
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
  };
}
