
import React, { useState } from 'react';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Key, LockKeyhole, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const SecuritySettingsSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  // 2FA States
  const [twoFAOpen, setTwoFAOpen] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [twoFAQRCode, setTwoFAQRCode] = useState('');
  const [twoFASecret, setTwoFASecret] = useState('');
  const [twoFAVerifying, setTwoFAVerifying] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match",
        variant: "destructive",
      });
      return;
    }
    
    // In a real implementation, we would call the Supabase API here
    // This is just a mock for demonstration
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed",
    });
    
    setChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  const handle2FAEnable = () => {
    // In a real implementation, we would generate a QR code and secret key here
    // For this demo, we'll simulate the process
    setTwoFASecret('ABCDEFGHIJKLMNOP'); // This would be a real secret in production
    setTwoFAQRCode('/placeholder.svg'); // This would be a real QR code in production
    setTwoFAOpen(true);
  };

  const handle2FAVerify = () => {
    setTwoFAVerifying(true);
    
    // In a real implementation, we would verify the code against the secret
    // For this demo, we'll accept any 6-digit code
    setTimeout(() => {
      if (twoFACode.length === 6) {
        setTwoFAEnabled(true);
        setTwoFAOpen(false);
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication has been successfully enabled for your account",
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid 6-digit code",
          variant: "destructive",
        });
      }
      setTwoFAVerifying(false);
    }, 1500);
  };

  const handle2FADisable = () => {
    setTwoFAEnabled(false);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account",
    });
  };

  const handleAPIKeys = () => {
    toast({
      title: "API Keys Management",
      description: "API key management will be available for advanced users soon",
    });
  };

  return (
    <div className="bg-white dark:bg-[#2B3139] rounded-xl border border-[#E6E8EA] dark:border-[#474D57] p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-[#F0B90B]" />
        {getTranslation('securitySettings', language)}
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 border border-[#E6E8EA] dark:border-[#474D57] rounded-lg hover:border-[#F0B90B]/30 dark:hover:border-[#F0B90B]/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <LockKeyhole className="h-5 w-5 text-[#F0B90B]" />
              <div>
                <h3 className="font-medium">{getTranslation('changePassword', language)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly for better security</p>
              </div>
            </div>
            <Button
              onClick={() => setChangePasswordOpen(true)}
              className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
            >
              {getTranslation('change', language)}
            </Button>
          </div>
        </div>
        
        <div className="p-4 border border-[#E6E8EA] dark:border-[#474D57] rounded-lg hover:border-[#F0B90B]/30 dark:hover:border-[#F0B90B]/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-[#F0B90B]" />
              <div>
                <h3 className="font-medium">{getTranslation('enable2FA', language)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
              </div>
            </div>
            {!twoFAEnabled ? (
              <Button
                onClick={handle2FAEnable}
                variant="outline"
                className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10"
              >
                {getTranslation('enable', language)}
              </Button>
            ) : (
              <Button
                onClick={handle2FADisable}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                Disable
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4 border border-[#E6E8EA] dark:border-[#474D57] rounded-lg hover:border-[#F0B90B]/30 dark:hover:border-[#F0B90B]/30 transition-colors">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-[#F0B90B]" />
              <div>
                <h3 className="font-medium">{getTranslation('manageAPIKeys', language)}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generate and manage API keys for third-party integrations</p>
              </div>
            </div>
            <Button
              onClick={handleAPIKeys}
              variant="outline"
              className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10"
            >
              {getTranslation('manage', language)}
            </Button>
          </div>
        </div>
      </div>

      {/* Password Change Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="bg-white dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]">
          <DialogHeader>
            <DialogTitle>{getTranslation('changePassword', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('enterNewPassword', language)}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleChangePassword} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-[#F8FAFD] dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#F8FAFD] dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="bg-[#F8FAFD] dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]"
                required
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setChangePasswordOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black">
                Update Password
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2FA Setup Dialog */}
      <Dialog open={twoFAOpen} onOpenChange={setTwoFAOpen}>
        <DialogContent className="bg-white dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57] max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Scan the QR code with your authenticator app and enter the verification code to enable 2FA.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="text-center">
              <img src={twoFAQRCode} alt="QR Code" className="w-48 h-48 mx-auto border p-2 rounded" />
              <p className="mt-2 text-sm text-gray-500 break-all">Secret: {twoFASecret}</p>
            </div>
            
            <div className="w-full space-y-2">
              <Label htmlFor="verification-code">Enter 6-digit verification code</Label>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={twoFACode} onChange={setTwoFACode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setTwoFAOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handle2FAVerify}
              disabled={twoFACode.length !== 6 || twoFAVerifying}
              className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
            >
              {twoFAVerifying ? 'Verifying...' : 'Verify & Enable'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecuritySettingsSection;
