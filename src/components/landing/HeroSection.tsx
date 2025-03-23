
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Users, DollarSign, Award } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0B90B]/10 to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#F0B90B]/10 border border-[#F0B90B]/20 text-[#F0B90B] text-sm font-medium mb-2">
                Industry Leading Returns
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Earn Up To <span className="text-[#F0B90B]">365% APY</span> With Crypto Staking
              </h1>
              
              <p className="text-lg text-gray-300">
                Join thousands of investors earning passive income with our secure, high-yield staking platform. Start earning today!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black font-bold py-6 px-8 text-lg">
                  <Link to="/auth" className="flex items-center gap-2">
                    Start Earning Now <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                
                <Button variant="outline" className="border-[#F0B90B] text-[#F0B90B] hover:bg-[#F0B90B]/10 py-6 px-8 text-lg">
                  <Link to="/referral" className="flex items-center gap-2">
                    Referral Program <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div className="flex items-center">
                  <div className="bg-[#F0B90B]/10 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-[#F0B90B]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Active Users</p>
                    <p className="font-bold">50,000+</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-[#F0B90B]/10 p-2 rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-[#F0B90B]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Staked</p>
                    <p className="font-bold">$125M+</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-[#F0B90B]/10 p-2 rounded-full mr-3">
                    <Award className="h-5 w-5 text-[#F0B90B]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Rewards Paid</p>
                    <p className="font-bold">$47M+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[#474D57] w-full max-w-md">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80" 
                alt="Crypto staking dashboard" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E11] to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-xl font-semibold">Start with as little as $100</p>
                <p className="text-sm text-gray-300">Withdraw anytime • No lock-up periods</p>
              </div>
            </div>
            
            {/* Floating payment method images */}
            <div className="absolute -top-4 -right-4 bg-[#1E2026] rounded-lg p-2 border border-[#474D57] shadow-lg">
              <img 
                src="https://cryptologos.cc/logos/bitcoin-btc-logo.png" 
                alt="Bitcoin" 
                className="h-10 w-10"
              />
            </div>
            <div className="absolute top-1/4 -left-6 bg-[#1E2026] rounded-lg p-2 border border-[#474D57] shadow-lg">
              <img 
                src="https://cryptologos.cc/logos/ethereum-eth-logo.png" 
                alt="Ethereum" 
                className="h-10 w-10"
              />
            </div>
            <div className="absolute bottom-1/4 -right-6 bg-[#1E2026] rounded-lg p-2 border border-[#474D57] shadow-lg">
              <img 
                src="https://cryptologos.cc/logos/binance-usd-busd-logo.png" 
                alt="BUSD" 
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
