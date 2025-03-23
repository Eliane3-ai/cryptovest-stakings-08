
import React from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  isEmailVerified: boolean | null;
  handleLogin: (e: React.FormEvent) => Promise<void>;
  handleResendVerification: () => Promise<void>;
  setActiveTab: (tab: string) => void;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  isEmailVerified,
  handleLogin,
  handleResendVerification,
  setActiveTab,
  isButtonPressed,
  setIsButtonPressed
}) => {
  // Button interactive style
  const buttonStyle = isButtonPressed 
    ? "w-full bg-yellow-400 hover:bg-yellow-500 text-black transform scale-95 transition-all duration-200" 
    : "w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black transition-all duration-200";

  return (
    <form onSubmit={handleLogin} className="px-6 py-4">
      <div className="space-y-4">
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
              className="pl-10 bg-[#2B3139] border-[#474D57] text-white h-12"
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
              className="pl-10 bg-[#2B3139] border-[#474D57] text-white h-12"
              required
            />
          </div>
        </div>

        {isEmailVerified === false && (
          <Alert variant="destructive" className="bg-red-900/30 border-red-800 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Email Not Verified</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <span>Please verify your email before logging in.</span> 
              <Button 
                variant="outline" 
                className="p-0 h-auto text-white underline border-none hover:bg-transparent hover:text-[#F0B90B]" 
                onClick={handleResendVerification}
              >
                Resend verification email
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="flex flex-col mt-6">
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
      </div>
    </form>
  );
};

export default LoginForm;
