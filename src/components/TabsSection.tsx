
import React from 'react';
import { History } from "lucide-react";
import TabButton from "@/components/TabButton";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

type Tab = 'assets' | 'transactions' | 'staking';

interface TabsSectionProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ activeTab, setActiveTab }) => {
  const { language } = useLanguage();
  
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <TabButton 
        active={activeTab === 'assets'} 
        label={getTranslation('assets', language)} 
        onClick={() => setActiveTab('assets')}
      />
      <TabButton 
        active={activeTab === 'transactions'} 
        label={getTranslation('transactions', language)}
        icon={<History className="h-4 w-4" />} 
        onClick={() => setActiveTab('transactions')}
      />
      <TabButton 
        active={activeTab === 'staking'} 
        label={getTranslation('staking', language)} 
        onClick={() => setActiveTab('staking')}
      />
    </div>
  );
};

export default TabsSection;
