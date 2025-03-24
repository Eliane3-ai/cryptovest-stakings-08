
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';

interface HeroSectionProps {
  handleGetStarted?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleGetStarted }) => {
  const navigate = useNavigate();
  
  // Use the passed handler if available, otherwise define a default one
  const onGetStarted = handleGetStarted || (() => {
    navigate('/auth');
  });

  return (
    <div className="relative bg-[#0B0E11] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/background-pattern.svg')] bg-center opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="h-14 w-14 rounded-full bg-[#F0B90B]/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-[#F0B90B]" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Secure Your Future with</span>
            <span className="block text-[#F0B90B]">Crypto Vest</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto lg:mx-0 text-xl text-gray-300">
            Experience the next generation of cryptocurrency investment and staking. 
            Earn rewards while helping secure blockchain networks.
          </p>
          <div className="mt-10 flex justify-center lg:justify-start gap-4">
            <Button 
              size="lg" 
              className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black text-lg px-8 py-6"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10 text-lg px-8 py-6"
              onClick={() => navigate('/market')}
            >
              View Market
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
