
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';

const CtaSection: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B0E11] to-[#1E2026]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Earning Passive Income?</h2>
        <p className="text-xl text-gray-300 mb-8">Join thousands of satisfied users who are already earning daily returns on their crypto assets.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className={isPressed 
              ? "bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 px-8 text-lg transform scale-95 transition-all duration-200" 
              : "bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black font-bold py-6 px-8 text-lg transition-all duration-200"
            }
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onTouchStart={() => setIsPressed(true)}
            onTouchEnd={() => setIsPressed(false)}
          >
            <Link to="/auth" className="flex items-center gap-2">
              Create Account <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 text-lg">
            <Link to="/market" className="flex items-center gap-2">
              Explore Market <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
