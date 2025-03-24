
import { useLocation } from 'react-router-dom';

/**
 * Hook that extracts authentication-related URL parameters
 */
export function useAuthParams() {
  const location = useLocation();
  
  // Get URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const referralCode = queryParams.get('ref');
  const verified = queryParams.get('verified') === 'true';
  const tabParam = queryParams.get('tab');
  
  // Get the redirect path from location state or default to wallet
  const from = location.state?.from || '/wallet';
  
  return {
    referralCode,
    verified,
    tabParam,
    from
  };
}
