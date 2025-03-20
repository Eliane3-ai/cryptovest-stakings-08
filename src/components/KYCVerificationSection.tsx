
import React, { useState } from 'react';
import { User, Globe, Phone, MapPin, CreditCard, Upload, Edit2, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

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

const KYCVerificationSection: React.FC = () => {
  const { language } = useLanguage();
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  
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
      toast.error(getTranslation('pleaseUploadID', language));
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
            
            toast.success(getTranslation('kycComplete', language), {
              description: getTranslation('kycCompleteDesc', language)
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{getTranslation('kycVerification', language)}</h2>
      
      {kycData.isVerified ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">{getTranslation('verificationComplete', language)}</h3>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1">{getTranslation('verificationCompleteDesc', language)}</p>
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
              <h3 className="font-medium text-yellow-800 dark:text-yellow-400">{getTranslation('verificationRequired', language)}</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-500 mt-1">{getTranslation('verificationRequiredDesc', language)}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <User className="h-4 w-4 mr-2" />
              {getTranslation('fullName', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.fullName || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {getTranslation('emailAddress', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.email || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {getTranslation('mobileNumber', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.mobile || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {getTranslation('country', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.country || getTranslation('notProvided', language)}
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {getTranslation('address', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.address || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              {getTranslation('idCard', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData.idCardFile || getTranslation('notUploaded', language)}
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
              {getTranslation('updateKYC', language)}
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {getTranslation('completeKYC', language)}
            </>
          )}
        </Button>
      </div>

      {/* KYC Dialog */}
      <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('kycVerification', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('kycDescription', language)}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleKYCSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">{getTranslation('fullName', language)}</label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={getTranslation('enterFullName', language)}
                  value={kycFormData.fullName}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">{getTranslation('emailAddress', language)}</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={getTranslation('enterEmail', language)}
                  value={kycFormData.email}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium">{getTranslation('mobileNumber', language)}</label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder={getTranslation('enterMobile', language)}
                  value={kycFormData.mobile}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium">{getTranslation('country', language)}</label>
                <Input
                  id="country"
                  name="country"
                  placeholder={getTranslation('enterCountry', language)}
                  value={kycFormData.country}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">{getTranslation('address', language)}</label>
                <Input
                  id="address"
                  name="address"
                  placeholder={getTranslation('enterAddress', language)}
                  value={kycFormData.address}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="idCard" className="text-sm font-medium">{getTranslation('idCard', language)}</label>
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
                    {getTranslation('selectedFile', language)}: {kycFormData.idCardFile}
                  </p>
                )}
              </div>
            </div>
            
            {uploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{getTranslation('processingVerification', language)}</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setKycDialogOpen(false)} disabled={uploading}>
                {getTranslation('cancel', language)}
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? getTranslation('processing', language) : getTranslation('submitVerification', language)}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCVerificationSection;
