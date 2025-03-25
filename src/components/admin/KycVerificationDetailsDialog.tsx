
import React from 'react';
import { CheckCircle, X, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { KycVerification } from '@/types/kyc';

interface KycVerificationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verification: KycVerification | null;
  adminNotes: string;
  onAdminNotesChange: (notes: string) => void;
  onApprove: () => void;
  onReject: () => void;
  processingAction: boolean;
}

const KycVerificationDetailsDialog: React.FC<KycVerificationDetailsDialogProps> = ({
  open,
  onOpenChange,
  verification,
  adminNotes,
  onAdminNotesChange,
  onApprove,
  onReject,
  processingAction
}) => {
  const { language } = useLanguage();

  if (!verification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-[#1E2026] border-[#2B3139] text-white">
        <DialogHeader>
          <DialogTitle className="text-[#F0B90B]">{getTranslation('kycVerificationDetails', language).toUpperCase()}</DialogTitle>
          <DialogDescription className="text-[#848E9C]">
            {getTranslation('reviewKycDetails', language)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('fullName', language).toUpperCase()}</h3>
            <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-[#848E9C]">{verification.full_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('emailAddress', language).toUpperCase()}</h3>
            <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-[#848E9C]">{verification.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('mobileNumber', language).toUpperCase()}</h3>
            <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-[#848E9C]">{verification.mobile}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('country', language).toUpperCase()}</h3>
            <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-[#848E9C]">{verification.country}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('address', language).toUpperCase()}</h3>
            <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-[#848E9C]">{verification.address}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('idCard', language).toUpperCase()}</h3>
            {verification.id_card_url ? (
              <div className="border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md">
                <a 
                  href={verification.id_card_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#F0B90B] hover:underline flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {getTranslation('viewDocument', language)}
                </a>
              </div>
            ) : (
              <p className="text-sm border border-[#2B3139] bg-[#2B3139]/50 p-2 rounded-md text-red-500">
                {getTranslation('noDocumentUploaded', language)}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-1 text-[#E6E8EA]">{getTranslation('adminNotes', language).toUpperCase()}</h3>
            <Textarea
              value={adminNotes}
              onChange={(e) => onAdminNotesChange(e.target.value)}
              placeholder={getTranslation('enterAdminNotes', language)}
              rows={3}
              className="w-full bg-[#2B3139] border-[#474D57] text-white"
              disabled={processingAction}
            />
          </div>
        </div>
        
        <div className="flex space-x-3 justify-end">
          {verification.status === 'pending' && (
            <>
              <Button
                variant="outline"
                onClick={onReject}
                disabled={processingAction}
                className="bg-[#2B3139] hover:bg-[#F6465D]/10 text-[#F6465D] border-[#F6465D]/30"
              >
                <X className="h-4 w-4 mr-2" />
                {processingAction ? getTranslation('processing', language) : getTranslation('reject', language).toUpperCase()}
              </Button>
              <Button
                onClick={onApprove}
                disabled={processingAction}
                className="bg-[#0ECB81] hover:bg-[#0ECB81]/90 text-black"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {processingAction ? getTranslation('processing', language) : getTranslation('approve', language).toUpperCase()}
              </Button>
            </>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={processingAction}
            className="border-[#474D57] text-white hover:bg-[#2B3139]"
          >
            {getTranslation('close', language).toUpperCase()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KycVerificationDetailsDialog;
