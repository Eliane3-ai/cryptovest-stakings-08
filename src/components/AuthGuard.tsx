
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AuthGuard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    console.log("AuthGuard mounted", { 
      isLoading, 
      userExists: !!user, 
      currentRoute: location.pathname 
    });
    
    // Debugging auth state
    if (!user && !isLoading) {
      console.warn("User not authenticated for protected route:", location.pathname);
    }
    
    return () => {
      console.log("AuthGuard unmounted");
    };
  }, [user, isLoading, location.pathname]);
  
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
  
  console.log("User authenticated, rendering protected route:", location.pathname);
  // User is authenticated, render the protected route
  return <Outlet />;
};

export default AuthGuard;
