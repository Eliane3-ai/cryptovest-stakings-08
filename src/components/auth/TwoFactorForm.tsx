
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle } from 'lucide-react';

interface TwoFactorFormProps {
  verifying: boolean;
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
  error: string | null;
  isButtonPressed: boolean;
  setIsButtonPressed: (pressed: boolean) => void;
}

const TwoFactorForm: React.FC<TwoFactorFormProps> = ({
  verifying,
  onVerify,
  onCancel,
  error,
  isButtonPressed,
  setIsButtonPressed
}) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(code);
  };

  // Button interactive style
  const buttonStyle = isButtonPressed 
    ? "w-full bg-yellow-400 hover:bg-yellow-500 text-black transform scale-95 transition-all duration-200" 
    : "w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black transition-all duration-200";

  // These event handlers are memoized to prevent re-renders
  const handleMouseDown = () => setIsButtonPressed(true);
  const handleMouseUp = () => setIsButtonPressed(false);
  const handleMouseLeave = () => setIsButtonPressed(false);
  const handleTouchStart = () => setIsButtonPressed(true);
  const handleTouchEnd = () => setIsButtonPressed(false);

  return (
    <form onSubmit={handleSubmit} className="px-6 py-4">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-[#2B3139] rounded-full flex items-center justify-center">
          <Lock className="h-8 w-8 text-[#F0B90B]" />
        </div>
      </div>
      
      <h3 className="text-center text-white text-xl font-medium mb-2">Two-Factor Authentication</h3>
      <p className="text-center text-gray-400 mb-6">
        Enter the 6-digit code from your authenticator app
      </p>
      
      {error && (
        <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="mb-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} className="bg-[#2B3139] border-[#474D57] text-white" />
              <InputOTPSlot index={1} className="bg-[#2B3139] border-[#474D57] text-white" />
              <InputOTPSlot index={2} className="bg-[#2B3139] border-[#474D57] text-white" />
              <InputOTPSlot index={3} className="bg-[#2B3139] border-[#474D57] text-white" />
              <InputOTPSlot index={4} className="bg-[#2B3139] border-[#474D57] text-white" />
              <InputOTPSlot index={5} className="bg-[#2B3139] border-[#474D57] text-white" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <Button 
          type="submit" 
          className={buttonStyle}
          disabled={code.length !== 6 || verifying}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {verifying ? 'Verifying...' : 'Verify Code'}
        </Button>
        
        <Button 
          type="button" 
          variant="ghost" 
          className="text-gray-400 hover:text-white"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TwoFactorForm;
