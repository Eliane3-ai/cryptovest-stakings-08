
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
            <p className="text-sm border p-2 rounded-md">{verification.full_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">{getTranslation('emailAddress', language)}</h3>
            <p className="text-sm border p-2 rounded-md">{verification.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">{getTranslation('mobileNumber', language)}</h3>
            <p className="text-sm border p-2 rounded-md">{verification.mobile}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-1">{getTranslation('country', language)}</h3>
            <p className="text-sm border p-2 rounded-md">{verification.country}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-1">{getTranslation('address', language)}</h3>
            <p className="text-sm border p-2 rounded-md">{verification.address}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium mb-1">{getTranslation('idCard', language)}</h3>
            {verification.id_card_url ? (
              <div className="border rounded-md p-2">
                <a 
                  href={verification.id_card_url} 
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
              onChange={(e) => onAdminNotesChange(e.target.value)}
              placeholder={getTranslation('enterAdminNotes', language)}
              rows={3}
              className="w-full"
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
                className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200"
              >
                <X className="h-4 w-4 mr-2" />
                {processingAction ? getTranslation('processing', language) : getTranslation('reject', language)}
              </Button>
              <Button
                onClick={onApprove}
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
            onClick={() => onOpenChange(false)}
            disabled={processingAction}
          >
            {getTranslation('close', language)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KycVerificationDetailsDialog;
