
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AuthGuard: React.FC = () => {
  const { user, isLoading, isEmailVerified } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("AuthGuard mounted", { 
      isLoading, 
      userExists: !!user,
      emailVerified: isEmailVerified,
      currentRoute: location.pathname 
    });
    
    // Debugging auth state
    if (!user && !isLoading) {
      console.warn("User not authenticated for protected route:", location.pathname);
    }
    
    // If user is logged in but email is not verified
    if (user && isEmailVerified === false) {
      console.warn("User email not verified for protected route:", location.pathname);
      toast({
        title: "Email Not Verified",
        description: "Please check your email and verify your account to access all features.",
        variant: "destructive",
      });
    }
    
    return () => {
      console.log("AuthGuard unmounted");
    };
  }, [user, isLoading, isEmailVerified, location.pathname, toast]);
  
  // If still loading auth state, we could show a spinner here
  if (isLoading) {
    console.log("Auth state loading...");
    return <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F0B90B]"></div>
    </div>;
  }
  
  // If user is not authenticated, redirect to auth page
  if (!user) {
    console.log("Redirecting unauthenticated user to auth page");
    // Show toast notification
    toast({
      title: "Authentication Required",
      description: "Please sign in to access this feature",
      variant: "destructive",
    });
    
    // Redirect to auth page with return URL
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // If user is authenticated but email not verified, still allow access but warn them
  if (user && isEmailVerified === false) {
    console.log("User authenticated but email not verified, allowing access with warning");
  }
  
  console.log("User authenticated, rendering protected route:", location.pathname);
  // User is authenticated, render the protected route
  return <Outlet />;
};

export default AuthGuard;
