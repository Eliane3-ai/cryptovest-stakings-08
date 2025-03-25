
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';
import { KycVerification } from '@/types/kyc';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

export const useKycAdmin = () => {
  const { language } = useLanguage();
  const { isAdmin } = useAdminAuth();
  const [verifications, setVerifications] = useState<KycVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<KycVerification | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [processingAction, setProcessingAction] = useState(false);

  // Fetch all KYC verifications
  const fetchVerifications = async () => {
    if (!isAdmin) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('kyc_verifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching KYC verifications:', error);
        toast.error(getTranslation('errorFetchingKYC', language));
        return;
      }
      
      setVerifications(data as KycVerification[]);
    } catch (error) {
      console.error('Error in fetchVerifications:', error);
      toast.error(getTranslation('errorFetchingKYC', language));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchVerifications();
    }
  }, [isAdmin]);

  // Copy ID card to Supabase storage
  const copyIdCardToStorage = async (verification: KycVerification) => {
    if (!verification.id_card_url) return null;
    
    try {
      // Fetch the original file
      const response = await fetch(verification.id_card_url);
      if (!response.ok) throw new Error('Failed to fetch ID card image');
      
      const blob = await response.blob();
      const fileExt = verification.id_card_url.split('.').pop() || 'jpg';
      const fileName = `${verification.user_id}/${verification.id}-verified.${fileExt}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('kyc_documents')
        .upload(fileName, blob, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error('Error copying ID card to storage:', error);
        throw error;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('kyc_documents')
        .getPublicUrl(fileName);
      
      return publicUrl;
    } catch (error) {
      console.error('Error in copyIdCardToStorage:', error);
      return null;
    }
  };

  const handleViewDetails = (verification: KycVerification) => {
    setSelectedVerification(verification);
    setAdminNotes(verification.admin_notes || '');
    setDetailsDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedVerification) return;
    
    try {
      setProcessingAction(true);
      
      // Copy ID card to storage if it exists
      let storageUrl = selectedVerification.id_card_url;
      if (selectedVerification.id_card_url) {
        const newUrl = await copyIdCardToStorage(selectedVerification);
        if (newUrl) storageUrl = newUrl;
      }
      
      const { error } = await supabase
        .from('kyc_verifications')
        .update({
          status: 'approved',
          admin_notes: adminNotes,
          id_card_url: storageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedVerification.id);
      
      if (error) {
        console.error('Error approving KYC verification:', error);
        toast.error(getTranslation('errorApprovingKYC', language));
        return;
      }
      
      toast.success(getTranslation('kycApproved', language));
      setDetailsDialogOpen(false);
      fetchVerifications();
    } catch (error) {
      console.error('Error in handleApprove:', error);
      toast.error(getTranslation('errorApprovingKYC', language));
    } finally {
      setProcessingAction(false);
    }
  };

  const handleReject = async () => {
    if (!selectedVerification || !adminNotes) {
      toast.error(getTranslation('rejectionReasonRequired', language));
      return;
    }
    
    try {
      setProcessingAction(true);
      const { error } = await supabase
        .from('kyc_verifications')
        .update({
          status: 'rejected',
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedVerification.id);
      
      if (error) {
        console.error('Error rejecting KYC verification:', error);
        toast.error(getTranslation('errorRejectingKYC', language));
        return;
      }
      
      toast.success(getTranslation('kycRejected', language));
      setDetailsDialogOpen(false);
      fetchVerifications();
    } catch (error) {
      console.error('Error in handleReject:', error);
      toast.error(getTranslation('errorRejectingKYC', language));
    } finally {
      setProcessingAction(false);
    }
  };

  return {
    isAdmin,
    loading,
    verifications,
    selectedVerification,
    detailsDialogOpen,
    adminNotes,
    processingAction,
    setDetailsDialogOpen,
    setAdminNotes,
    handleViewDetails,
    handleApprove,
    handleReject
  };
};
