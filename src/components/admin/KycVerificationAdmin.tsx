
import React, { useState, useEffect } from 'react';
import { User, CheckCircle, X, Eye, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';
import { KycVerification } from '@/types/kyc';
import { useAuth } from '@/contexts/AuthContext';

const KycVerificationAdmin: React.FC = () => {
  const { language } = useLanguage();
  const { profile } = useAuth();
  const [verifications, setVerifications] = useState<KycVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVerification, setSelectedVerification] = useState<KycVerification | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [processingAction, setProcessingAction] = useState(false);

  // Check if user is admin
  const isAdmin = profile?.staking_knowledge === 'expert';

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

  const handleViewDetails = (verification: KycVerification) => {
    setSelectedVerification(verification);
    setAdminNotes(verification.admin_notes || '');
    setDetailsDialogOpen(true);
  };

  const handleApprove = async () => {
    if (!selectedVerification) return;
    
    try {
      setProcessingAction(true);
      const { error } = await supabase
        .from('kyc_verifications')
        .update({
          status: 'approved',
          admin_notes: adminNotes,
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

  if (!isAdmin) {
    return <div className="p-6 text-center">You don't have permission to view this page.</div>;
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2">{getTranslation('loading', language)}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">KYC Verification Admin</h1>
      
      {verifications.length === 0 ? (
        <div className="text-center p-10 bg-muted rounded-lg">
          <p>{getTranslation('noKycVerifications', language)}</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getTranslation('user', language)}</TableHead>
                <TableHead>{getTranslation('fullName', language)}</TableHead>
                <TableHead>{getTranslation('status', language)}</TableHead>
                <TableHead>{getTranslation('submittedDate', language)}</TableHead>
                <TableHead>{getTranslation('actions', language)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.user_id.substring(0, 8)}...</TableCell>
                  <TableCell>{verification.full_name}</TableCell>
                  <TableCell>
                    {verification.status === 'pending' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        {getTranslation('pending', language)}
                      </span>
                    )}
                    {verification.status === 'approved' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {getTranslation('approved', language)}
                      </span>
                    )}
                    {verification.status === 'rejected' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        {getTranslation('rejected', language)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(verification.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewDetails(verification)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {getTranslation('view', language)}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Details Dialog */}
      {selectedVerification && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>{getTranslation('kycVerificationDetails', language)}</DialogTitle>
              <DialogDescription>
                {getTranslation('reviewKycDetails', language)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-1">{getTranslation('fullName', language)}</h3>
                <p className="text-sm border p-2 rounded-md">{selectedVerification.full_name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">{getTranslation('emailAddress', language)}</h3>
                <p className="text-sm border p-2 rounded-md">{selectedVerification.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">{getTranslation('mobileNumber', language)}</h3>
                <p className="text-sm border p-2 rounded-md">{selectedVerification.mobile}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">{getTranslation('country', language)}</h3>
                <p className="text-sm border p-2 rounded-md">{selectedVerification.country}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-1">{getTranslation('address', language)}</h3>
                <p className="text-sm border p-2 rounded-md">{selectedVerification.address}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-1">{getTranslation('idCard', language)}</h3>
                {selectedVerification.id_card_url ? (
                  <div className="border rounded-md p-2">
                    <a 
                      href={selectedVerification.id_card_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {getTranslation('viewDocument', language)}
                    </a>
                  </div>
                ) : (
                  <p className="text-sm border p-2 rounded-md text-red-500">
                    {getTranslation('noDocumentUploaded', language)}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-1">{getTranslation('adminNotes', language)}</h3>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder={getTranslation('enterAdminNotes', language)}
                  rows={3}
                  className="w-full"
                  disabled={processingAction}
                />
              </div>
            </div>
            
            <div className="flex space-x-3 justify-end">
              {selectedVerification.status === 'pending' && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleReject}
                    disabled={processingAction}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
                  >
                    <X className="h-4 w-4 mr-2" />
                    {processingAction ? getTranslation('processing', language) : getTranslation('reject', language)}
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={processingAction}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {processingAction ? getTranslation('processing', language) : getTranslation('approve', language)}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setDetailsDialogOpen(false)}
                disabled={processingAction}
              >
                {getTranslation('close', language)}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default KycVerificationAdmin;
