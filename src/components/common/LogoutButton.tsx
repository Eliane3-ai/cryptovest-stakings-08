
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  showIcon?: boolean;
  label?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  variant = 'outline',
  size = 'default',
  showIcon = true,
  label = 'Logout'
}) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Logout Failed",
          description: error.message || "An error occurred during logout",
          variant: "destructive",
        });
        return;
      }
      
      // Successful logout
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      
      // Navigate to login page
      navigate('/auth', { replace: true });
    } catch (error) {
      console.error("Logout exception:", error);
      toast({
        title: "Logout Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      {showIcon && <LogOut className="h-4 w-4 mr-2" />}
      {label}
    </Button>
  );
};

export default LogoutButton;
