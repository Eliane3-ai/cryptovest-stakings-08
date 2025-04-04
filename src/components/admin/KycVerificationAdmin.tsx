
import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useKycAdmin } from '@/hooks/useKycAdmin';
import KycVerificationTable from './KycVerificationTable';
import KycVerificationDetailsDialog from './KycVerificationDetailsDialog';

const KycVerificationAdmin: React.FC = () => {
  const { language } = useLanguage();
  const {
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
  } = useKycAdmin();

  if (!isAdmin) {
    return <div className="p-6 text-center text-[#F0B90B]">You don't have permission to view this page.</div>;
  }

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#F0B90B]" />
        <span className="ml-2 text-[#F0B90B]">{getTranslation('loading', language)}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#F0B90B]">KYC VERIFICATION Admin</h1>
      
      {verifications.length === 0 ? (
        <div className="text-center p-10 bg-[#2B3139] rounded-lg text-white">
          <p>{getTranslation('noKycVerifications', language)}</p>
        </div>
      ) : (
        <KycVerificationTable 
          verifications={verifications} 
          onViewDetails={handleViewDetails} 
        />
      )}
      
      <KycVerificationDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        verification={selectedVerification}
        adminNotes={adminNotes}
        onAdminNotesChange={setAdminNotes}
        onApprove={handleApprove}
        onReject={handleReject}
        processingAction={processingAction}
      />
    </div>
  );
};

export default KycVerificationAdmin;
