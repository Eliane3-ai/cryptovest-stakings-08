
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type AdminAuthContextType = {
  isAdmin: boolean;
  adminLogin: (email: string, password: string) => Promise<{ error: Error | null }>;
  adminLogout: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  adminLogin: async () => ({ error: null }),
  adminLogout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthContext);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check if admin is logged in on initialization
  useEffect(() => {
    const checkAdminSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.email === 'cryptovestbot@gmail.com') {
        setIsAdmin(true);
      }
    };
    
    checkAdminSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user?.email === 'cryptovestbot@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Admin login function - hardcoded for security
  const adminLogin = async (email: string, password: string) => {
    if (email !== 'cryptovestbot@gmail.com') {
      return { error: new Error('Access denied. Admin credentials required.') };
    }
    
    if (password !== 'STAKEadmin001') {
      return { error: new Error('Invalid password.') };
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!error) {
      setIsAdmin(true);
    }
    
    return { error };
  };

  // Admin logout function
  const adminLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
