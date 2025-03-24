
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface KycSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const KycSuccessDialog: React.FC<KycSuccessDialogProps> = ({ 
  open, 
  onOpenChange,
  onClose 
}) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <Button onClick={onClose}>
            {getTranslation('backToWallet', language)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KycSuccessDialog;
