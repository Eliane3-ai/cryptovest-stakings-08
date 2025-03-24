
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import TestimonialsSection from '../../components/landing/TestimonialsSection';
import CtaSection from '../../components/landing/CtaSection';
import FooterSection from '../../components/landing/FooterSection';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="bg-[#0B0E11] text-white min-h-screen">
      <HeroSection handleGetStarted={handleGetStarted} />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
};

export default LandingPage;
