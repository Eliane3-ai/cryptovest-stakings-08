
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginPrompt: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#0B0E11] text-white flex items-center justify-center">
      <Card className="border-[#474D57] bg-[#1E2026] max-w-md w-full mx-4">
        <CardHeader>
          <CardTitle>Referral Program</CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to access the referral program
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-16 w-16 text-[#F0B90B] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Join Our Referral Program</h3>
          <p className="text-gray-400 mb-6">Sign in or create an account to start earning rewards by inviting friends.</p>
          <Button 
            className="bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
            onClick={() => navigate('/auth')}
          >
            Sign In / Sign Up
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPrompt;
