
import React from 'react';
import StakingCard from "@/components/StakingCard";
import { ArrowRight } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface StakingOption {
  token: string;
  symbol: string;
  stakedAmount: number;
  apy: number;
  rewards: number;
  rewardToken: string;
}

interface StakingSectionProps {
  stakingOptions: StakingOption[];
}

const StakingSection: React.FC<StakingSectionProps> = ({ stakingOptions }) => {
  const { language } = useLanguage();
  
  const getStakingDescription = (lang: string) => {
    const descriptions: Record<string, string> = {
      en: 'Staking is a way to earn rewards by holding certain cryptocurrencies. When you stake your digital assets, you help support the security and operations of a blockchain network and earn rewards in return.',
      fr: 'Le staking est un moyen de gagner des récompenses en détenant certaines crypto-monnaies. Lorsque vous stakez vos actifs numériques, vous contribuez à la sécurité et aux opérations d\'un réseau blockchain et recevez des récompenses en retour.',
      es: 'El staking es una forma de ganar recompensas al mantener ciertas criptomonedas. Cuando haces staking de tus activos digitales, ayudas a mantener la seguridad y las operaciones de una red blockchain y recibes recompensas a cambio.',
      ru: 'Стейкинг - это способ получения вознаграждений путем удержания определенных криптовалют. Когда вы делаете стейкинг ваших цифровых активов, вы помогаете поддерживать безопасность и работу блокчейн-сети и получаете вознаграждение в ответ.',
      ar: 'الرهان هو وسيلة لكسب المكافآت من خلال الاحتفاظ بعملات رقمية معينة. عندما ترهن أصولك الرقمية، فإنك تساعد في دعم أمن وعمليات شبكة البلوكتشين وتكسب مكافآت في المقابل.',
      pt: 'Staking é uma maneira de ganhar recompensas ao manter certas criptomoedas. Quando você faz staking de seus ativos digitais, você ajuda a suportar a segurança e as operações de uma rede blockchain e ganha recompensas em troca.',
      tr: 'Stake etmek, belirli kripto paraları tutarak ödüller kazanmanın bir yoludur. Dijital varlıklarınızı stake ettiğinizde, bir blok zinciri ağının güvenliğini ve işlemlerini desteklemeye yardımcı olursunuz ve karşılığında ödüller kazanırsınız.',
      id: 'Staking adalah cara untuk mendapatkan hadiah dengan memegang cryptocurrency tertentu. Ketika Anda melakukan staking aset digital Anda, Anda membantu mendukung keamanan dan operasi jaringan blockchain dan mendapatkan hadiah sebagai imbalannya.',
      th: 'การสเตกกิ้งเป็นวิธีหนึ่งในการรับรางวัลโดยการถือครองคริปโตเคอร์เรนซีบางประเภท เมื่อคุณสเตกสินทรัพย์ดิจิทัลของคุณ คุณช่วยสนับสนุนความปลอดภัยและการดำเนินงานของเครือข่ายบล็อกเชนและได้รับรางวัลเป็นการตอบแทน',
      ne: 'स्टेकिंग निश्चित क्रिप्टोकरेन्सीहरू राखेर पुरस्कारहरू प्राप्त गर्ने एक तरिका हो। जब तपाईं आफ्नो डिजिटल सम्पत्तिहरू स्टेक गर्नुहुन्छ, तपाईंले ब्लकचेन नेटवर्कको सुरक्षा र संचालनमा मद्दत गर्नुहुन्छ र बदलामा पुरस्कारहरू प्राप्त गर्नुहुन्छ।'
    };
    
    return descriptions[lang] || descriptions.en;
  };
  
  return (
    <div className="space-y-6 fade-in">
      <h2 className="font-medium text-lg">{getTranslation('stakingOptions', language)}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stakingOptions.map((option, index) => (
          <StakingCard 
            key={index}
            token={option.token}
            symbol={option.symbol}
            stakedAmount={option.stakedAmount}
            apy={option.apy}
            rewards={option.rewards}
            rewardToken={option.rewardToken}
          />
        ))}
      </div>
      
      <div className="p-5 rounded-xl border border-border bg-white dark:bg-gray-800">
        <h3 className="font-medium mb-3">{getTranslation('learnAboutStaking', language)}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {getStakingDescription(language)}
        </p>
        <button className="text-crypto-blue text-sm font-medium hover:underline flex items-center">
          <span>{getTranslation('learnMore', language)}</span>
          <ArrowRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default StakingSection;
