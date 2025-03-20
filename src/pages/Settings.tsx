
import React, { useState } from 'react';
import { ArrowLeft, Globe, User, Phone, MapPin, CreditCard, Upload, Edit2 } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

const KYC_KEY = 'crypto_wallet_kyc_data';

interface KYCData {
  fullName: string;
  email: string;
  mobile: string;
  country: string;
  address: string;
  idCardFile?: string;
  isVerified: boolean;
}

const Settings: React.FC = () => {
  const { language, setLanguage, languageNames } = useLanguage();
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  
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

  // Load KYC data from localStorage if it exists
  const [kycData, setKycData] = useState<KYCData>(() => {
    const savedData = localStorage.getItem(KYC_KEY);
    return savedData ? JSON.parse(savedData) : {
      fullName: '',
      email: '',
      mobile: '',
      country: '',
      address: '',
      idCardFile: '',
      isVerified: false
    };
  });

  const [kycFormData, setKycFormData] = useState<KYCData>(kycData);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleKYCSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show upload progress for ID card
    if (!kycFormData.idCardFile) {
      toast.error("Please upload your ID card");
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Save KYC data to localStorage
            const updatedData = {...kycFormData, isVerified: true};
            localStorage.setItem(KYC_KEY, JSON.stringify(updatedData));
            setKycData(updatedData);
            
            setUploading(false);
            setKycDialogOpen(false);
            
            toast.success("KYC verification complete!", {
              description: "Your account has been verified successfully."
            });
            
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Simulate file upload by just storing the file name
      setKycFormData({
        ...kycFormData, 
        idCardFile: e.target.files[0].name
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setKycFormData({
      ...kycFormData,
      [name]: value
    });
  };

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
          <h2 className="text-lg font-medium mb-4">KYC Verification</h2>
          
          {kycData.isVerified ? (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30 mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-400">Verification Complete</h3>
                  <p className="text-sm text-green-700 dark:text-green-500 mt-1">Your identity has been verified successfully</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30 mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Verification Required</h3>
                  <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">Complete your KYC to enable all platform features</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Full Name
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.fullName || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Email Address
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.email || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Mobile Number
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.mobile || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Country
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.country || "Not provided"}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Address
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.address || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  ID Card
                </h3>
                <p className="text-sm text-muted-foreground border p-2 rounded-md">
                  {kycData.idCardFile || "Not uploaded"}
                </p>
              </div>
            </div>
            
            <Button 
              className="mt-4" 
              onClick={() => setKycDialogOpen(true)}
            >
              {kycData.isVerified ? (
                <>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Update KYC Information
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Complete KYC Verification
                </>
              )}
            </Button>
          </div>
        </div>

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
                  {Object.entries(extendedLanguageNames).map(([code, name]) => (
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

      {/* KYC Dialog */}
      <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>KYC Verification</DialogTitle>
            <DialogDescription>
              Please provide your personal information for verification.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleKYCSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={kycFormData.fullName}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={kycFormData.email}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium">Mobile Number</label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="Enter your mobile number"
                  value={kycFormData.mobile}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">Country</label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={kycFormData.country}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  value={kycFormData.address}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="idCard" className="text-sm font-medium">ID Card</label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="idCard"
                    type="file"
                    accept="image/*"
                    onChange={handleIdCardUpload}
                    disabled={uploading}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
                  />
                </div>
                {kycFormData.idCardFile && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Selected file: {kycFormData.idCardFile}
                  </p>
                )}
              </div>
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing verification</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setKycDialogOpen(false)} disabled={uploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? 'Processing...' : 'Submit Verification'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
