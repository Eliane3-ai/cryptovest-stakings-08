
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';
import DepositAddresses from '@/components/DepositAddresses';

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
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('backToDashboard', language)}
        </Button>
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-white">
            {getTranslation('depositFunds', language)}
          </h1>
          
          <DepositAddresses />
        </div>
      </div>
    </div>
  );
};

export default Deposit;
