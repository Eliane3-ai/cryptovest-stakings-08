
import React from 'react';
import { Mail, Lock, User, Link, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { StakingKnowledgeLevel } from '@/types/auth';

interface KnowledgeLevelDetail {
  title: string;
  description: string;
}

interface KnowledgeLevelDetails {
  [key: string]: KnowledgeLevelDetail;
}

interface SignupFormProps {
  email: string;
  setEmail: (email: string) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  stakingKnowledge: StakingKnowledgeLevel;
  setStakingKnowledge: (level: StakingKnowledgeLevel) => void;
  loading: boolean;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  setActiveTab: (tab: string) => void;
  referralCode: string | null;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  stakingKnowledge,
  setStakingKnowledge,
  loading,
  handleSignup,
  setActiveTab,
  referralCode,
  isButtonPressed,
  setIsButtonPressed
}) => {
  // Knowledge level descriptions
  const knowledgeLevelDetails: KnowledgeLevelDetails = {
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
    <form onSubmit={handleSignup}>
      <div className="space-y-4">
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
      </div>
    </form>
  );
};

export default SignupForm;
