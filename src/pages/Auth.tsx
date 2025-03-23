
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, Mail, Lock, User, Link, AlertCircle, CheckCircle, RefreshCcw } from 'lucide-react';
import { StakingKnowledgeLevel } from '@/types/auth';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, signIn, signUp, isEmailVerified, resendVerificationEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [stakingKnowledge, setStakingKnowledge] = useState<StakingKnowledgeLevel>('beginner');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  
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
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
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
        full_name: username, // Using username as full_name for now
        staking_knowledge: stakingKnowledge,
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

  // Knowledge level descriptions
  const knowledgeLevelDetails = {
    beginner: {
      title: "Beginner",
      description: "New to cryptocurrency staking. Starting with $15,790 worth of crypto.",
    },
    intermediate: {
      title: "Intermediate",
      description: "Some experience with staking. Starting with $75,670 worth of crypto.",
    },
    expert: {
      title: "Expert",
      description: "Advanced knowledge of staking. Starting with $350,900 worth of crypto.",
    },
  };
  
  // Button interactive style
  const buttonStyle = isButtonPressed 
    ? "w-full bg-yellow-400 hover:bg-yellow-500 text-black transform scale-95 transition-all duration-200" 
    : "w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black transition-all duration-200";
  
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
          <Card className="border-[#474D57] bg-[#1E2026]">
            <CardHeader>
              <CardTitle className="text-white">Verify Your Email</CardTitle>
              <CardDescription className="text-gray-400">
                We've sent a verification link to your email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <Mail className="h-16 w-16 text-[#F0B90B] mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Check Your Inbox</h3>
                <p className="text-gray-400 mb-4">
                  We've sent a verification link to <span className="text-white font-medium">{email}</span>.
                  Please check your email and click the link to verify your account.
                </p>
                <div className="text-sm text-gray-500 max-w-xs">
                  If you don't see the email, check your spam folder or try resending the verification email.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className={buttonStyle}
                onClick={handleResendVerification}
                disabled={resendLoading}
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
                onMouseLeave={() => setIsButtonPressed(false)}
              >
                {resendLoading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-600 text-gray-400"
                onClick={() => {
                  setVerificationSent(false);
                  setActiveTab('login');
                }}
              >
                Return to Login
              </Button>
            </CardFooter>
          </Card>
        ) : (
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
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>

                    {isEmailVerified === false && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Email Not Verified</AlertTitle>
                        <AlertDescription>
                          Please verify your email before logging in. 
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-white underline" 
                            onClick={handleResendVerification}
                          >
                            Resend verification email
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex flex-col">
                    <Button 
                      type="submit" 
                      className={buttonStyle}
                      disabled={loading}
                      onMouseDown={() => setIsButtonPressed(true)}
                      onMouseUp={() => setIsButtonPressed(false)}
                      onMouseLeave={() => setIsButtonPressed(false)}
                      onTouchStart={() => setIsButtonPressed(true)}
                      onTouchEnd={() => setIsButtonPressed(false)}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    
                    <p className="mt-4 text-center text-sm text-gray-400">
                      Don't have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setActiveTab('signup')}
                        className="text-[#F0B90B] hover:text-[#F0B90B]/90"
                      >
                        Sign up
                      </button>
                    </p>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-white">Username</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="username"
                          type="text"
                          placeholder="johndoe"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="staking-knowledge" className="text-white">Staking Knowledge Level</Label>
                      <RadioGroup 
                        value={stakingKnowledge} 
                        onValueChange={(value) => setStakingKnowledge(value as StakingKnowledgeLevel)}
                        className="space-y-3"
                      >
                        {Object.entries(knowledgeLevelDetails).map(([level, details]) => (
                          <div key={level} className="flex items-start space-x-2 rounded-md border border-[#474D57] p-3 bg-[#2B3139]">
                            <RadioGroupItem 
                              value={level} 
                              id={`level-${level}`} 
                              className="mt-1 border-[#F0B90B]"
                            />
                            <div className="flex-1">
                              <Label htmlFor={`level-${level}`} className="text-white font-medium">
                                {details.title}
                              </Label>
                              <p className="text-sm text-gray-400 mt-1">{details.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 bg-[#2B3139] border-[#474D57]"
                          required
                        />
                      </div>
                    </div>
                    
                    {referralCode && (
                      <div className="p-3 bg-[#F0B90B]/10 border border-[#F0B90B]/20 rounded-lg flex items-center gap-2">
                        <Link className="h-4 w-4 text-[#F0B90B]" />
                        <span className="text-sm text-[#F0B90B]">
                          You were invited by a friend with code: {referralCode}
                        </span>
                      </div>
                    )}

                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertTitle>Email Verification Required</AlertTitle>
                      <AlertDescription>
                        After registration, you'll need to verify your email address before you can log in.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col">
                    <Button 
                      type="submit" 
                      className={buttonStyle}
                      disabled={loading}
                      onMouseDown={() => setIsButtonPressed(true)}
                      onMouseUp={() => setIsButtonPressed(false)}
                      onMouseLeave={() => setIsButtonPressed(false)}
                      onTouchStart={() => setIsButtonPressed(true)}
                      onTouchEnd={() => setIsButtonPressed(false)}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    
                    <p className="mt-4 text-center text-sm text-gray-400">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-[#F0B90B] hover:text-[#F0B90B]/90"
                      >
                        Sign in
                      </button>
                    </p>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
