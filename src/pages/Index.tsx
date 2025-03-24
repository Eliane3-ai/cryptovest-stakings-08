
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CtaSection from '@/components/landing/CtaSection';
import FooterSection from '@/components/landing/FooterSection';
import { useToast } from '@/hooks/use-toast';

const Index: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Ensure redirection happens properly after authentication
  useEffect(() => {
    if (user) {
      // Log navigation attempt
      console.log("User authenticated, redirecting to wallet");
      navigate('/wallet');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    if (user) {
      // Log navigation attempt
      console.log("handleGetStarted called, user authenticated, navigating to wallet");
      navigate('/wallet');
    } else {
      // Log navigation attempt
      console.log("handleGetStarted called, user not authenticated, navigating to auth");
      navigate('/auth');
    }
  };

  // Handle wallet navigation specifically
  const handleWalletNavigation = () => {
    if (user) {
      // Log navigation attempt
      console.log("handleWalletNavigation called, navigating to wallet");
      navigate('/wallet');
      // Add toast notification for feedback
      toast({
        title: "Accessing Wallet",
        description: "Welcome to your Crypto Vest wallet",
      });
    } else {
      // Log navigation attempt
      console.log("handleWalletNavigation called but user not authenticated, navigating to auth");
      navigate('/auth', { state: { from: '/wallet' } });
      // Add toast for feedback
      toast({
        title: "Authentication Required",
        description: "Please sign in to access your wallet",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Crypto Vest</span>
          </div>
          <div className="ml-auto flex gap-4">
            {user ? (
              <Button 
                variant="default" 
                onClick={handleWalletNavigation}
                className="group"
              >
                My Wallet
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
                <Button onClick={() => navigate('/auth?tab=signup')}>
                  Create Account
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        <HeroSection handleGetStarted={handleGetStarted} />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>

      <FooterSection />
    </div>
  );
};

export default Index;
