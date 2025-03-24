import React, { useState, useEffect } from 'react';
import { User, Globe, Phone, MapPin, CreditCard, Upload, Edit2, Loader2, CheckCircle, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { KycVerification, KycFormData } from '@/types/kyc';

const KYCVerificationSection: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const [kycData, setKycData] = useState<KycVerification | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<KycFormData>({
    full_name: '',
    email: '',
    mobile: '',
    country: '',
    address: '',
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const fetchKycData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kyc_verifications')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching KYC data:', error);
        toast.error(getTranslation('errorFetchingKYC', language));
        return;
      }
      
      setKycData(data as KycVerification);
      
      if (data) {
        setFormData({
          full_name: data.full_name,
          email: data.email,
          mobile: data.mobile,
          country: data.country,
          address: data.address,
        });
      }
    } catch (error) {
      console.error('Error in fetchKycData:', error);
      toast.error(getTranslation('errorFetchingKYC', language));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, [user]);

  const uploadIdCard = async (file: File): Promise<string | null> => {
    if (!user || !file) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-kyc-document.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('kyc_documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading KYC document:', error);
        throw error;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('kyc_documents')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Error in uploadIdCard:', error);
      throw error;
    }
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error(getTranslation('pleaseLogin', language));
      return;
    }
    
    if (!formData.full_name || !formData.email || !formData.mobile || 
        !formData.country || !formData.address) {
      toast.error(getTranslation('fillAllFields', language));
      return;
    }
    
    if (!kycData && !formData.id_card_file) {
      toast.error(getTranslation('pleaseUploadID', language));
      return;
    }
    
    setUploading(true);
    
    try {
      let idCardUrl = kycData?.id_card_url;
      
      if (formData.id_card_file) {
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 5;
          });
        }, 200);
        
        idCardUrl = await uploadIdCard(formData.id_card_file);
        
        clearInterval(progressInterval);
        setUploadProgress(100);
      }
      
      if (kycData) {
        const { error } = await supabase
          .from('kyc_verifications')
          .update({
            full_name: formData.full_name,
            email: formData.email,
            mobile: formData.mobile,
            country: formData.country,
            address: formData.address,
            id_card_url: idCardUrl,
            status: 'pending',
            updated_at: new Date().toISOString()
          })
          .eq('id', kycData.id);
        
        if (error) {
          console.error('Error updating KYC data:', error);
          toast.error(getTranslation('errorUpdatingKYC', language));
          return;
        }
      } else {
        const { error } = await supabase
          .from('kyc_verifications')
          .insert({
            user_id: user.id,
            full_name: formData.full_name,
            email: formData.email,
            mobile: formData.mobile,
            country: formData.country,
            address: formData.address,
            id_card_url: idCardUrl,
            status: 'pending'
          });
        
        if (error) {
          console.error('Error inserting KYC data:', error);
          toast.error(getTranslation('errorSubmittingKYC', language));
          return;
        }
      }
      
      await fetchKycData();
      
      setKycDialogOpen(false);
      setSuccessDialogOpen(true);
      setUploadProgress(0);
    } catch (error) {
      console.error('Error in handleKYCSubmit:', error);
      toast.error(getTranslation('errorProcessingKYC', language));
    } finally {
      setUploading(false);
    }
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        id_card_file: e.target.files[0]
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSuccessDialogClose = () => {
    setSuccessDialogOpen(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="ml-2">{getTranslation('loading', language)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{getTranslation('kycVerification', language)}</h2>
      
      {kycData?.status === 'approved' ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">{getTranslation('verificationComplete', language)}</h3>
              <p className="text-sm text-green-700 dark:text-green-500 mt-1">{getTranslation('verificationCompleteDesc', language)}</p>
            </div>
          </div>
        </div>
      ) : kycData?.status === 'rejected' ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
              <X className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-red-800 dark:text-red-400">{getTranslation('verificationRejected', language)}</h3>
              <p className="text-sm text-red-700 dark:text-red-500 mt-1">
                {getTranslation('verificationRejectedDesc', language)}
                {kycData.admin_notes && (
                  <span className="block mt-2 font-semibold">
                    {getTranslation('rejectionReason', language)}: {kycData.admin_notes}
                  </span>
                )}
              </p>
              <p className="text-sm text-red-700 dark:text-red-500 mt-3">
                {getTranslation('pleaseUpdateAndResubmit', language)}
              </p>
            </div>
          </div>
        </div>
      ) : kycData?.status === 'pending' ? (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800 dark:text-blue-400">{getTranslation('verificationPending', language)}</h3>
              <p className="text-sm text-blue-700 dark:text-blue-500 mt-1">
                {getTranslation('verificationPendingDesc', language)}
                {kycData.created_at && (
                  <span className="block mt-1">
                    {getTranslation('submittedOn', language)}: {new Date(kycData.created_at).toLocaleDateString()}
                  </span>
                )}
              </p>
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
              {kycData?.full_name || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {getTranslation('emailAddress', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData?.email || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              {getTranslation('mobileNumber', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData?.mobile || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Globe className="h-4 w-4 mr-2" />
              {getTranslation('country', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData?.country || getTranslation('notProvided', language)}
            </p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              {getTranslation('address', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData?.address || getTranslation('notProvided', language)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              {getTranslation('idCard', language)}
            </h3>
            <p className="text-sm text-muted-foreground border p-2 rounded-md">
              {kycData?.id_card_url ? (
                <a 
                  href={kycData.id_card_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {getTranslation('viewDocument', language)}
                </a>
              ) : (
                getTranslation('notUploaded', language)
              )}
            </p>
          </div>
          {kycData?.status === 'rejected' && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium mb-2 flex items-center text-red-600">
                <X className="h-4 w-4 mr-2" />
                {getTranslation('rejectionReason', language)}
              </h3>
              <p className="text-sm text-red-600 border border-red-200 p-2 rounded-md bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                {kycData.admin_notes || getTranslation('noReasonProvided', language)}
              </p>
            </div>
          )}
        </div>
        
        {kycData?.status !== 'approved' && (
          <Button 
            className="mt-4" 
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
                <label htmlFor="full_name" className="text-sm font-medium">{getTranslation('fullName', language)}</label>
                <Input
                  id="full_name"
                  name="full_name"
                  placeholder={getTranslation('enterFullName', language)}
                  value={formData.full_name}
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
                  value={formData.email}
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
                  value={formData.mobile}
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
                  value={formData.country}
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
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="id_card_file" className="text-sm font-medium">
                  {getTranslation('idCard', language)}
                  {!kycData && <span className="text-red-500">*</span>}
                  {kycData && <span className="text-muted-foreground text-xs ml-2">({getTranslation('optionalIfAlreadyUploaded', language)})</span>}
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="id_card_file"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleIdCardUpload}
                    disabled={uploading}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-primary file:text-white hover:file:bg-primary/90"
                    required={!kycData}
                  />
                </div>
                {formData.id_card_file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {getTranslation('selectedFile', language)}: {formData.id_card_file.name}
                  </p>
                )}
                {kycData?.id_card_url && !formData.id_card_file && (
                  <p className="text-xs text-primary mt-1">
                    <a href={kycData.id_card_url} target="_blank" rel="noopener noreferrer">
                      {getTranslation('viewCurrentDocument', language)}
                    </a>
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
      
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('kycSubmitted', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('kycSubmittedDesc', language)}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex justify-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="text-center mb-4">
            <p>{getTranslation('kycReviewProcess', language)}</p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleSuccessDialogClose}>
              {getTranslation('backToWallet', language)}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCVerificationSection;
