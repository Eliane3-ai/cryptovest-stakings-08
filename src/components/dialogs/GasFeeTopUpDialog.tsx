
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import TopUpOptions from '@/components/TopUpOptions';

interface GasFeeTopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GasFeeTopUpDialog: React.FC<GasFeeTopUpDialogProps> = ({ open, onOpenChange }) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTranslation('topUpGasFee', language)}</DialogTitle>
          <DialogDescription>
            {getTranslation('topUpGasFeeDesc', language)}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <TopUpOptions onClose={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GasFeeTopUpDialog;
