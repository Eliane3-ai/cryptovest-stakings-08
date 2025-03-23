
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Shield, DollarSign } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B0E11]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose <span className="text-[#F0B90B]">Crypto Vest</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Our staking platform offers industry-leading returns with unmatched security and transparency.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-[#474D57] bg-[#1E2026] hover:border-[#F0B90B]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-[#F0B90B]/10 p-3 rounded-full w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-[#F0B90B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Yield Returns</h3>
              <p className="text-gray-400">Earn up to 365% APY on your crypto assets with our optimized staking strategies.</p>
            </CardContent>
          </Card>
          
          <Card className="border-[#474D57] bg-[#1E2026] hover:border-[#F0B90B]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-[#F0B90B]/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-[#F0B90B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
              <p className="text-gray-400">Advanced security protocols and regular audits ensure your assets are always protected.</p>
            </CardContent>
          </Card>
          
          <Card className="border-[#474D57] bg-[#1E2026] hover:border-[#F0B90B]/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="bg-[#F0B90B]/10 p-3 rounded-full w-fit mb-4">
                <DollarSign className="h-6 w-6 text-[#F0B90B]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Withdrawals</h3>
              <p className="text-gray-400">Access your funds whenever you need them with our instant withdrawal system.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
