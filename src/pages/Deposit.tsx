
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import DepositAddresses from '@/components/DepositAddresses';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Deposit: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0E11]">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppHeader />
        
        <Button
          variant="outline"
          size="sm"
          className="mb-6 gap-2 border-[#2B3139] text-[#848E9C] hover:text-white hover:bg-[#2B3139]"
          onClick={() => navigate('/wallet')}
        >
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('backToDashboard', language).toUpperCase()}
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-white">
            {getTranslation('depositFunds', language).toUpperCase()}
          </h1>

          <Alert className="mb-6 bg-[#F0B90B]/10 border-[#F0B90B]/30 text-white">
            <AlertTriangle className="h-5 w-5 text-[#F0B90B]" />
            <AlertTitle className="text-[#F0B90B] font-bold">IMPORTANT DEPOSIT WARNING</AlertTitle>
            <AlertDescription className="text-[#E6E8EA]">
              Always verify the deposit address before sending funds. Send only the specified cryptocurrency to its corresponding address. Sending the wrong cryptocurrency may result in permanent loss of funds.
            </AlertDescription>
          </Alert>
          
          <DepositAddresses 
            showWarnings={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Deposit;
