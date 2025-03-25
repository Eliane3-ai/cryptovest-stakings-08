
import React, { useState, useEffect } from 'react';
import { Loader2, Search, Filter, Eye, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UserProfile } from '@/types/auth';

const UserManagementAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching users:', error);
        toast.error("Failed to load users");
        return;
      }
      
      setUsers(data as UserProfile[]);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user: UserProfile) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const handleContactUser = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2">{getTranslation('loading', language)}</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">User Management</h2>
      
      <div className="flex justify-between mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="text-center p-10 bg-muted rounded-lg">
          <p>{getTranslation('noUsersFound', language)}</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{getTranslation('id', language)}</TableHead>
                <TableHead>{getTranslation('username', language)}</TableHead>
                <TableHead>{getTranslation('fullName', language)}</TableHead>
                <TableHead>{getTranslation('stakingKnowledge', language)}</TableHead>
                <TableHead>{getTranslation('joinedDate', language)}</TableHead>
                <TableHead>{getTranslation('actions', language)}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id.substring(0, 8)}...</TableCell>
                  <TableCell>{user.username || 'N/A'}</TableCell>
                  <TableCell>{user.full_name || 'N/A'}</TableCell>
                  <TableCell className="capitalize">{user.staking_knowledge}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewDetails(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactUser(user.id)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-1">User ID</h3>
                <p className="text-sm border p-2 rounded-md">{selectedUser.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Username</h3>
                <p className="text-sm border p-2 rounded-md">{selectedUser.username || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Full Name</h3>
                <p className="text-sm border p-2 rounded-md">{selectedUser.full_name || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Staking Knowledge</h3>
                <p className="text-sm border p-2 rounded-md capitalize">{selectedUser.staking_knowledge}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Created At</h3>
                <p className="text-sm border p-2 rounded-md">{new Date(selectedUser.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Updated At</h3>
                <p className="text-sm border p-2 rounded-md">{new Date(selectedUser.updated_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Funded</h3>
                <p className="text-sm border p-2 rounded-md">{selectedUser.is_funded ? 'Yes' : 'No'}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagementAdmin;
