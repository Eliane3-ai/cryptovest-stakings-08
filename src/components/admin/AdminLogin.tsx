
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Loader2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { adminLogin, isAdmin } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error: loginError } = await adminLogin(email, password);
      if (loginError) {
        setError(loginError.message);
        toast.error("Admin login failed: " + loginError.message);
      } else {
        toast.success("Admin login successful");
        navigate('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error("Admin login error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center p-4">
      <div className="bg-[#1E2329] rounded-xl border border-[#2B3139] p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Shield className="h-10 w-10 text-[#F0B90B] mr-2" />
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
        </div>
        
        <p className="text-sm text-gray-400 mb-6 text-center">
          This area is restricted to authorized administrators only.
        </p>
        
        {error && (
          <Alert variant="destructive" className="mb-4 bg-red-900/30 border-red-800 text-white">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin email"
              required
              className="w-full bg-[#2B3139] border-[#474D57] text-white"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
              className="w-full bg-[#2B3139] border-[#474D57] text-white"
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-[#F0B90B] hover:bg-[#F0B90B]/90 text-black"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login as Admin'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
