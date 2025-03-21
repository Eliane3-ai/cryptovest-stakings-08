
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WalletAddress } from '@/types/chat';
import AppHeader from '@/components/AppHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { toast } from 'sonner';

// Sample initial data - in a real app, this would come from a database or API
const initialAddresses: WalletAddress[] = [
  {
    id: '1',
    name: 'Main USDT Wallet',
    address: 'TPy4csxqvQGvygSBFGqDUvJXfYGCcpdVxL',
    network: 'TRC20',
    coin: 'USDT',
    isDefault: true
  },
  {
    id: '2',
    name: 'BTC Withdrawal',
    address: '19hjRhd7pYKdGvqDA9S6SPYbz6gfN5potm',
    network: 'BTC',
    coin: 'BTC',
    isDefault: false
  }
];

const WalletAddress: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [addresses, setAddresses] = useState<WalletAddress[]>(initialAddresses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newNetwork, setNewNetwork] = useState('TRC20');
  const [newCoin, setNewCoin] = useState('USDT');

  const handleAddNew = () => {
    setNewName('');
    setNewAddress('');
    setNewNetwork('TRC20');
    setNewCoin('USDT');
    setShowAddForm(true);
    setEditingId(null);
  };

  const handleEdit = (address: WalletAddress) => {
    setNewName(address.name);
    setNewAddress(address.address);
    setNewNetwork(address.network);
    setNewCoin(address.coin);
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success('Wallet address deleted');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success('Default wallet updated');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newWalletAddress: WalletAddress = {
      id: editingId || `${Date.now()}`,
      name: newName,
      address: newAddress,
      network: newNetwork,
      coin: newCoin,
      isDefault: addresses.length === 0 // Make first address default
    };
    
    if (editingId) {
      // Update existing
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? 
          {...newWalletAddress, isDefault: addr.isDefault} : 
          addr
      ));
      toast.success('Wallet address updated');
    } else {
      // Add new
      setAddresses([...addresses, newWalletAddress]);
      toast.success('New wallet address added');
    }
    
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success('Address copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppHeader />
        
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Wallet Addresses</h1>
        </div>
        
        <Card className="border-[#474D57] bg-[#1E2026] shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium text-white">Your Saved Addresses</CardTitle>
            <Button 
              onClick={handleAddNew}
              className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </CardHeader>
          
          <CardContent>
            {showAddForm ? (
              <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-[#474D57] rounded-lg bg-[#2B3139]/50 mb-4">
                <h3 className="font-medium text-white">{editingId ? 'Edit Address' : 'Add New Wallet Address'}</h3>
                
                <div className="space-y-2">
                  <label className="text-sm text-[#848E9C]">Name</label>
                  <Input 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Main USDT Wallet"
                    required
                    className="bg-[#2B3139] border-[#474D57] text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-[#848E9C]">Wallet Address</label>
                  <Input 
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Enter wallet address"
                    required
                    className="bg-[#2B3139] border-[#474D57] text-white font-mono"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-[#848E9C]">Network</label>
                    <Select 
                      value={newNetwork} 
                      onValueChange={setNewNetwork}
                    >
                      <SelectTrigger className="bg-[#2B3139] border-[#474D57] text-white">
                        <SelectValue placeholder="Select Network" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2B3139] border-[#474D57] text-white">
                        <SelectItem value="TRC20">TRC20</SelectItem>
                        <SelectItem value="ERC20">ERC20</SelectItem>
                        <SelectItem value="BEP20">BEP20</SelectItem>
                        <SelectItem value="BTC">Bitcoin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-[#848E9C]">Coin</label>
                    <Select 
                      value={newCoin} 
                      onValueChange={setNewCoin}
                    >
                      <SelectTrigger className="bg-[#2B3139] border-[#474D57] text-white">
                        <SelectValue placeholder="Select Coin" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#2B3139] border-[#474D57] text-white">
                        <SelectItem value="USDT">USDT</SelectItem>
                        <SelectItem value="BTC">BTC</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="BNB">BNB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className="bg-transparent border-[#474D57] text-white hover:bg-[#474D57]/20"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90"
                  >
                    {editingId ? 'Update' : 'Save'} Address
                  </Button>
                </div>
              </form>
            ) : null}
            
            {addresses.length === 0 && !showAddForm ? (
              <div className="py-10 text-center">
                <p className="text-[#848E9C]">No wallet addresses saved yet.</p>
                <Button 
                  onClick={handleAddNew}
                  className="mt-4 bg-[#F0B90B] text-black hover:bg-[#F0B90B]/90"
                >
                  Add Your First Address
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div 
                    key={address.id} 
                    className={`p-4 border ${address.isDefault ? 'border-[#F0B90B]/50' : 'border-[#474D57]'} rounded-lg bg-[#2B3139] transition-all hover:bg-[#2B3139]/80`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-white flex items-center">
                          {address.name}
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-[#F0B90B]/10 text-[#F0B90B] px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-[#848E9C]">{address.coin} • {address.network}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEdit(address)}
                          className="h-8 w-8 p-0 text-[#848E9C] hover:text-white hover:bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDelete(address.id)}
                          className="h-8 w-8 p-0 text-[#848E9C] hover:text-red-500 hover:bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-[#1E2026] p-2 rounded text-sm font-mono break-all flex justify-between items-center">
                      <span className="text-white">{address.address}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleCopy(address.address)}
                        className="h-6 w-6 p-0 text-[#F0B90B] hover:text-[#F0B90B]/80 hover:bg-transparent ml-2"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {!address.isDefault && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleSetDefault(address.id)}
                        className="mt-2 text-xs text-[#F0B90B] hover:text-[#F0B90B]/80 hover:bg-transparent p-0 h-auto"
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Set as Default
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletAddress;
