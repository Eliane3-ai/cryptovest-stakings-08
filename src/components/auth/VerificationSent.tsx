
import React from 'react';
import { Mail, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationSentProps {
  email: string;
  handleResendVerification: () => Promise<void>;
  resendLoading: boolean;
  setVerificationSent: (sent: boolean) => void;
  setActiveTab: (tab: string) => void;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const VerificationSent: React.FC<VerificationSentProps> = ({
  email,
  handleResendVerification,
  resendLoading,
  setVerificationSent,
  setActiveTab,
  isButtonPressed,
  setIsButtonPressed
}) => {
  // Button interactive style
  const buttonStyle = isButtonPressed 
    ? "w-full bg-yellow-400 hover:bg-yellow-500 text-black transform scale-95 transition-all duration-200" 
    : "w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black transition-all duration-200";

  return (
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
  );
};

export default VerificationSent;
