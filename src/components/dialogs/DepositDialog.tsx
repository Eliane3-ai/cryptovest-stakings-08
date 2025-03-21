
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import { toast } from "sonner";
import TopUpOptions from '@/components/TopUpOptions';

interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DepositDialog: React.FC<DepositDialogProps> = ({ open, onOpenChange }) => {
  const { language } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#1E2026] border-[#474D57] text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{getTranslation('depositFunds', language)}</DialogTitle>
          <DialogDescription className="text-[#848E9C]">
            {getTranslation('selectDepositMethod', language)}
          </DialogDescription>
        </DialogHeader>
        
        <TopUpOptions onClose={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;
