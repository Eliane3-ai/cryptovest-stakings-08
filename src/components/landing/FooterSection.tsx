
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
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
            <Link to="/auth" className="text-gray-400 hover:text-[#F0B90B] transition-colors">Sign Up</Link>
            <Link to="/market" className="text-gray-400 hover:text-[#F0B90B] transition-colors">Market</Link>
            <Link to="/referral" className="text-gray-400 hover:text-[#F0B90B] transition-colors">Referral</Link>
            <Link to="/chat" className="text-gray-400 hover:text-[#F0B90B] transition-colors">Live Chat</Link>
          </div>
        </div>
        
        <div className="border-t border-[#474D57] mt-6 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Crypto Vest. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-[#F0B90B] transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-[#F0B90B] transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
