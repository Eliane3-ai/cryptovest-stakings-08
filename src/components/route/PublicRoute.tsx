
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  redirectPath?: string;
}

/**
 * PublicRoute component - redirects authenticated users to the specified redirectPath
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ redirectPath = '/wallet' }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Don't redirect during loading
  if (isLoading) {
    return <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center">
      <div className="text-[#F0B90B] font-semibold text-xl">Loading...</div>
    </div>;
  }

  // If user is authenticated, redirect to redirectPath
  if (user) {
    console.log("PublicRoute: User is authenticated, redirecting to", redirectPath);
    return <Navigate to={redirectPath} replace state={{ from: location.pathname }} />;
  }

  // Render children if user is not authenticated
  return <Outlet />;
};

export default PublicRoute;
