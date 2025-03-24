
import React, { useState } from 'react';
import { getTranslation } from '@/utils/translations';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Key, LockKeyhole } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SecuritySettingsSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

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
    </div>
  );
};

export default SecuritySettingsSection;
