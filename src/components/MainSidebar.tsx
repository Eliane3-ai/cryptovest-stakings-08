
import React from 'react';
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, BarChart3, Settings, ArrowRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

const MainSidebar: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="p-4">
      <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
        <div className="bg-crypto-blue p-2 rounded-lg">
          <Wallet className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold">CryptoWallet</h2>
      </div>
      
      <nav className="space-y-1.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-primary-foreground">
          <Wallet className="h-5 w-5" />
          <span className="font-medium">{getTranslation('wallet', language)}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <TrendingUp className="h-5 w-5" />
          <span className="font-medium">{getTranslation('market', language)}</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <BarChart3 className="h-5 w-5" />
          <span className="font-medium">{getTranslation('analytics', language)}</span>
        </button>
        <Link to="/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
          <Settings className="h-5 w-5" />
          <span className="font-medium">{getTranslation('settings', language)}</span>
        </Link>
      </nav>
      
      <div className="mt-8 p-4 rounded-lg bg-crypto-blue bg-opacity-10">
        <h3 className="font-medium mb-2">{getTranslation('startEarning', language)}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {language === 'en' ? 'Earn rewards by staking your crypto assets' : 
           language === 'fr' ? 'Gagnez des récompenses en stakant vos actifs crypto' :
           language === 'es' ? 'Gana recompensas haciendo staking de tus activos cripto' :
           language === 'ru' ? 'Получайте вознаграждения, делая стейкинг криптоактивов' :
           language === 'ar' ? 'اكسب مكافآت عن طريق رهن أصولك المشفرة' :
           language === 'pt' ? 'Ganhe recompensas fazendo staking dos seus ativos cripto' :
           language === 'tr' ? 'Kripto varlıklarınızı stake ederek ödüller kazanın' :
           language === 'id' ? 'Dapatkan hadiah dengan staking aset kripto Anda' :
           language === 'th' ? 'รับรางวัลโดยการสเตกสินทรัพย์คริปโตของคุณ' :
           'क्रिप्टो सम्पत्तिहरू स्टेक गरेर पुरस्कारहरू कमाउनुहोस्'}
        </p>
        <button className="w-full flex items-center justify-center gap-2 bg-crypto-blue text-white py-2 px-3 rounded-lg text-sm font-medium transition-all hover:bg-opacity-90">
          <span>{getTranslation('explore', language)}</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MainSidebar;
