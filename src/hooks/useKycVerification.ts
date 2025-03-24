
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycVerification, KycFormData } from '@/types/kyc';

export const useKycVerification = (userId: string | undefined) => {
  const { language } = useLanguage();
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
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const fetchKycData = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kyc_verifications')
        .select('*')
        .eq('user_id', userId)
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

  const uploadIdCard = async (file: File): Promise<string | null> => {
    if (!userId || !file) return null;
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/${Date.now()}-kyc-document.${fileExt}`;
      
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

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
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
            user_id: userId,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIdCardUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        id_card_file: e.target.files[0]
      });
    }
  };

  useEffect(() => {
    fetchKycData();
  }, [userId, language]);

  return {
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
    handleIdCardUpload,
    fetchKycData
  };
};
