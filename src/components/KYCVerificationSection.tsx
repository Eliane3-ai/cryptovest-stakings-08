
import React from 'react';
import { Edit2, Upload, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useKycVerification } from '@/hooks/useKycVerification';
import KycStatusDisplay from './kyc/KycStatusDisplay';
import KycDataDisplay from './kyc/KycDataDisplay';
import KycSubmissionForm from './kyc/KycSubmissionForm';
import KycSuccessDialog from './kyc/KycSuccessDialog';

const KYCVerificationSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    kycData,
    loading,
    formData,
    uploading,
    uploadProgress,
    kycDialogOpen,
    successDialogOpen,
    setKycDialogOpen,
    setSuccessDialogOpen,
    handleKycSubmit,
    handleInputChange,
    handleIdCardUpload
  } = useKycVerification(user?.id);

  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="bg-[#1E2026] border-[#2B3139] rounded-xl p-6 mb-6 text-white">
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-[#F0B90B]" />
          <span className="ml-2 text-[#F0B90B]">{getTranslation('loading', language)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E2026] border-[#2B3139] rounded-xl p-6 mb-6 text-white">
      <h2 className="text-lg font-medium mb-4 text-[#F0B90B]">{getTranslation('kycVerification', language)}</h2>
      
      <KycStatusDisplay kycData={kycData} />
      
      <div className="space-y-4">
        <KycDataDisplay kycData={kycData} />
        
        {kycData?.status !== 'approved' && (
          <Button 
            className="mt-4 bg-[#F0B90B] text-[#0B0E11] hover:bg-[#F0B90B]/90" 
            onClick={() => setKycDialogOpen(true)}
          >
            {kycData ? (
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
        )}
      </div>

      <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#1E2026] border-[#2B3139] text-white">
          <DialogHeader>
            <DialogTitle className="text-[#F0B90B]">{getTranslation('kycVerification', language)}</DialogTitle>
            <DialogDescription className="text-[#848E9C]">
              {getTranslation('kycDescription', language)}
            </DialogDescription>
          </DialogHeader>
          <KycSubmissionForm
            formData={formData}
            kycData={kycData}
            uploading={uploading}
            uploadProgress={uploadProgress}
            onInputChange={handleInputChange}
            onIdCardUpload={handleIdCardUpload}
            onSubmit={handleKycSubmit}
            onCancel={() => setKycDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      <KycSuccessDialog
        open={successDialogOpen}
        onOpenChange={setSuccessDialogOpen}
        onClose={handleSuccessDialogClose}
      />
    </div>
  );
};

export default KYCVerificationSection;
