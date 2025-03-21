
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Shield, TrendingUp, DollarSign, Users, Award, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  // Sample testimonials data
  const testimonials = [
    {
      name: "John Smith",
      location: "United States",
      text: "I've been staking with Crypto Vest for 6 months and already withdrawn over $15,000. Best platform I've used!",
      amount: "$15,000"
    },
    {
      name: "Maria Rodriguez",
      location: "Spain",
      text: "The returns are amazing and withdrawals are processed within minutes. Very trustworthy platform!",
      amount: "$8,500"
    },
    {
      name: "Wei Zhang",
      location: "Singapore",
      text: "Started with just $500 and now making passive income daily. Customer support is excellent too.",
      amount: "$4,200"
    }
  ];

  return (
    <div className="bg-[#0B0E11] text-white min-h-screen">
      {/* Hero Section */}
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
      
      {/* Features Section */}
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
      
      {/* Testimonials Section */}
      <section className="py-20 bg-[#0B0E11]/70">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Withdrawals from <span className="text-[#F0B90B]">Real Users</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. Here's what our users have to say about their experience.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-[#474D57] bg-[#1E2026] overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.location}</p>
                    </div>
                    <div className="bg-green-500/10 px-3 py-1 rounded-full flex items-center">
                      <span className="text-green-500 font-semibold">{testimonial.amount}</span>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#0B0E11] to-[#1E2026]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning Passive Income?</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of satisfied users who are already earning daily returns on their crypto assets.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black font-bold py-6 px-8 text-lg">
              <Link to="/auth" className="flex items-center gap-2">
                Create Account <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 text-lg">
              <Link to="/wallet" className="flex items-center gap-2">
                Explore Platform <ChevronRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#1E2026] border-t border-[#474D57]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="bg-[#F0B90B] p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-black" />
              </div>
              <h2 className="text-xl font-bold">Crypto Vest</h2>
            </div>
            
            <div className="flex flex-wrap gap-8">
              <Link to="/auth" className="text-gray-400 hover:text-white">Sign Up</Link>
              <Link to="/wallet" className="text-gray-400 hover:text-white">Wallet</Link>
              <Link to="/referral" className="text-gray-400 hover:text-white">Referral</Link>
              <Link to="/chat" className="text-gray-400 hover:text-white">Live Chat</Link>
            </div>
          </div>
          
          <div className="border-t border-[#474D57] mt-6 pt-6 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Crypto Vest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
