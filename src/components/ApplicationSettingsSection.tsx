
import React, { useState } from 'react';
import { Globe, Moon, Sun, Bell, Palette } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ApplicationSettingsSection: React.FC = () => {
  const { language, setLanguage, languageNames } = useLanguage();
  const { toast } = useToast();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState(true);
  
  // Extended language options
  const extendedLanguageNames: Record<string, string> = {
    ...languageNames,
    fr: "French",
    es: "Spanish",
    ru: "Russian",
    ar: "Arabic",
    pt: "Portuguese",
    tr: "Turkish",
    id: "Indonesian",
    th: "Thai",
    ne: "Nepali"
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    
    // In a real implementation, we would store the theme preference
    toast({
      title: "Theme Updated",
      description: `Theme has been changed to ${newTheme}`,
    });
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    
    toast({
      title: notifications ? "Notifications Disabled" : "Notifications Enabled",
      description: notifications 
        ? "You will no longer receive notifications" 
        : "You will now receive notifications for important updates",
    });
  };

  return (
    <div className="bg-white dark:bg-[#2B3139] rounded-xl border border-[#E6E8EA] dark:border-[#474D57] p-6 mb-6 shadow-sm">
      <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
        <Palette className="h-5 w-5 text-[#F0B90B]" />
        {getTranslation('applicationSettings', language)}
      </h2>
      
      <div className="space-y-8">
        <div className="border-b border-[#E6E8EA] dark:border-[#474D57] pb-6">
          <h3 className="text-sm font-medium mb-4 flex items-center">
            <Globe className="h-4 w-4 mr-2 text-[#F0B90B]" />
            {getTranslation('language', language)}
          </h3>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger className="w-full md:w-[250px] bg-[#F8FAFD] dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]">
              <SelectValue placeholder={getTranslation('selectLanguage', language)} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]">
              {Object.entries(extendedLanguageNames).map(([code, name]) => (
                <SelectItem key={code} value={code}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            {getTranslation('chooseLanguage', language)}
          </p>
        </div>

        <div className="border-b border-[#E6E8EA] dark:border-[#474D57] pb-6">
          <h3 className="text-sm font-medium mb-4 flex items-center">
            {theme === 'dark' ? 
              <Moon className="h-4 w-4 mr-2 text-[#F0B90B]" /> : 
              <Sun className="h-4 w-4 mr-2 text-[#F0B90B]" />
            }
            {getTranslation('theme', language)}
          </h3>
          <div className="flex flex-wrap gap-3">
            <Button 
              className={`px-4 py-2 ${theme === 'light' ? 'bg-[#F0B90B] text-black' : 'bg-transparent border border-[#E6E8EA] dark:border-[#474D57]'}`}
              onClick={() => handleThemeChange('light')}
            >
              <Sun className="h-4 w-4 mr-2" />
              {getTranslation('light', language)}
            </Button>
            <Button 
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-[#F0B90B] text-black' : 'bg-transparent border border-[#E6E8EA] dark:border-[#474D57]'}`}
              onClick={() => handleThemeChange('dark')}
            >
              <Moon className="h-4 w-4 mr-2" />
              {getTranslation('dark', language)}
            </Button>
            <Button 
              className={`px-4 py-2 ${theme === 'system' ? 'bg-[#F0B90B] text-black' : 'bg-transparent border border-[#E6E8EA] dark:border-[#474D57]'}`}
              onClick={() => handleThemeChange('system')}
            >
              <Palette className="h-4 w-4 mr-2" />
              {getTranslation('system', language)}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-4 flex items-center">
            <Bell className="h-4 w-4 mr-2 text-[#F0B90B]" />
            {getTranslation('notifications', language)}
          </h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-sm font-medium">
                {getTranslation('enableNotifications', language)}
              </Label>
              <p className="text-xs text-muted-foreground">
                Receive alerts about security updates and account activity
              </p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={handleNotificationToggle}
              className="data-[state=checked]:bg-[#F0B90B]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSettingsSection;
