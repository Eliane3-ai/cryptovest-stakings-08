
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

/**
 * ProtectedRoute component - ensures users are authenticated
 * Redirects unauthenticated users to login page
 */
const ProtectedRoute: React.FC = () => {
  const { user, isLoading, isEmailVerified } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("ProtectedRoute mounted", { 
      isLoading, 
      userExists: !!user,
      emailVerified: isEmailVerified,
      currentRoute: location.pathname 
    });
    
    // If user is logged in but email is not verified
    if (user && isEmailVerified === false) {
      console.warn("User email not verified for protected route:", location.pathname);
      toast({
        title: "Email Not Verified",
        description: "Please check your email and verify your account to access all features.",
        variant: "destructive",
      });
    }
  }, [user, isLoading, isEmailVerified, location.pathname, toast]);
  
  // If still loading auth state, show a spinner
  if (isLoading) {
    return <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
      <div className="text-[#F0B90B] font-semibold text-xl">Authenticating...</div>
    </div>;
  }
  
  // If user is not authenticated, redirect to auth page
  if (!user) {
    // Show toast notification
    toast({
      title: "Authentication Required",
      description: "Please sign in to access this feature",
      variant: "destructive",
    });
    
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // User is authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
