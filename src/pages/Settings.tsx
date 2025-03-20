
import React from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { language, setLanguage, languageNames } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Wallet</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Settings</h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Application Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Language
              </h3>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(languageNames).map(([code, name]) => (
                    <SelectItem key={code} value={code}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Choose your preferred language for the application interface
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Theme</h3>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-border rounded-lg text-sm">Light</button>
                <button className="px-4 py-2 border border-border rounded-lg text-sm">Dark</button>
                <button className="px-4 py-2 border border-border rounded-lg text-sm">System</button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Notifications</h3>
              <div className="flex items-center">
                <input type="checkbox" id="notifications" className="mr-2" />
                <label htmlFor="notifications" className="text-sm">Enable push notifications</label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
          <h2 className="text-lg font-medium mb-4">Security Settings</h2>
          
          <div className="space-y-4">
            <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
              Change Password
            </button>
            
            <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
              Enable Two-Factor Authentication
            </button>
            
            <button className="w-full md:w-auto px-4 py-2 border border-border rounded-lg text-sm">
              Manage API Keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
