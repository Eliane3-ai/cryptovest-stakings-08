
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthHeaderProps {
  onBackClick: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ onBackClick }) => {
  return (
    <div className="mb-6 flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onBackClick}
        className="text-white hover:bg-white/10"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-bold text-white">Crypto Vest</h1>
    </div>
  );
};

export default AuthHeader;
