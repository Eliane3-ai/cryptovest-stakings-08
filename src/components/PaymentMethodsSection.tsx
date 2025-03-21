
import React, { useState } from 'react';
import { CreditCard, Building, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

const PAYMENT_METHODS_KEY = 'crypto_wallet_payment_methods';

interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

interface CardDetails {
  id: string;
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  type: string;
}

interface PaymentMethods {
  bankAccounts: BankAccount[];
  cards: CardDetails[];
}

const PaymentMethodsSection: React.FC = () => {
  const { language } = useLanguage();
  const [bankDialogOpen, setBankDialogOpen] = useState(false);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  
  // Load payment methods from localStorage if they exist
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>(() => {
    const savedData = localStorage.getItem(PAYMENT_METHODS_KEY);
    return savedData ? JSON.parse(savedData) : {
      bankAccounts: [],
      cards: []
    };
  });

  const [bankForm, setBankForm] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    routingNumber: '',
  });

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    type: 'visa',
  });

  const handleBankInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankForm({
      ...bankForm,
      [name]: value
    });
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardForm({
      ...cardForm,
      [name]: value
    });
  };

  const handleCardTypeChange = (value: string) => {
    setCardForm({
      ...cardForm,
      type: value
    });
  };

  const saveBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bankForm.accountName || !bankForm.accountNumber || !bankForm.bankName) {
      toast.error(getTranslation('fillAllRequiredFields', language));
      return;
    }
    
    const newBankAccount: BankAccount = {
      id: Date.now().toString(),
      ...bankForm
    };
    
    const updatedMethods = {
      ...paymentMethods,
      bankAccounts: [...paymentMethods.bankAccounts, newBankAccount]
    };
    
    setPaymentMethods(updatedMethods);
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(updatedMethods));
    
    // Reset form and close dialog
    setBankForm({
      accountName: '',
      accountNumber: '',
      bankName: '',
      routingNumber: '',
    });
    setBankDialogOpen(false);
    
    toast.success(getTranslation('bankAccountAdded', language));
  };

  const saveCardDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardForm.cardNumber || !cardForm.cardholderName || !cardForm.expiryDate) {
      toast.error(getTranslation('fillAllRequiredFields', language));
      return;
    }
    
    // Simple card validation
    if (cardForm.cardNumber.replace(/\s/g, '').length < 15) {
      toast.error(getTranslation('invalidCardNumber', language));
      return;
    }
    
    const newCard: CardDetails = {
      id: Date.now().toString(),
      ...cardForm
    };
    
    const updatedMethods = {
      ...paymentMethods,
      cards: [...paymentMethods.cards, newCard]
    };
    
    setPaymentMethods(updatedMethods);
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(updatedMethods));
    
    // Reset form and close dialog
    setCardForm({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      type: 'visa',
    });
    setCardDialogOpen(false);
    
    toast.success(getTranslation('cardDetailsAdded', language));
  };

  const deleteBankAccount = (id: string) => {
    const updatedMethods = {
      ...paymentMethods,
      bankAccounts: paymentMethods.bankAccounts.filter(account => account.id !== id)
    };
    
    setPaymentMethods(updatedMethods);
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(updatedMethods));
    toast.success(getTranslation('bankAccountRemoved', language));
  };

  const deleteCard = (id: string) => {
    const updatedMethods = {
      ...paymentMethods,
      cards: paymentMethods.cards.filter(card => card.id !== id)
    };
    
    setPaymentMethods(updatedMethods);
    localStorage.setItem(PAYMENT_METHODS_KEY, JSON.stringify(updatedMethods));
    toast.success(getTranslation('cardRemoved', language));
  };

  // Function to mask card number for display
  const maskCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    const lastFour = cleaned.slice(-4);
    return `**** **** **** ${lastFour}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
      <h2 className="text-lg font-medium mb-4">{getTranslation('paymentMethods', language)}</h2>
      
      <div className="space-y-6">
        {/* Bank Accounts Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium flex items-center">
              <Building className="h-5 w-5 mr-2 text-gray-500" />
              {getTranslation('bankAccounts', language)}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setBankDialogOpen(true)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              {getTranslation('addNew', language)}
            </Button>
          </div>
          
          {paymentMethods.bankAccounts.length === 0 ? (
            <div className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
              {getTranslation('noBankAccounts', language)}
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.bankAccounts.map((account) => (
                <Card key={account.id} className="overflow-hidden">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{account.bankName}</div>
                      <div className="text-sm text-muted-foreground">{account.accountName}</div>
                      <div className="text-sm">
                        {getTranslation('accountNumber', language)}: {account.accountNumber}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteBankAccount(account.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {/* Cards Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
              {getTranslation('cards', language)}
            </h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCardDialogOpen(true)}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              {getTranslation('addNew', language)}
            </Button>
          </div>
          
          {paymentMethods.cards.length === 0 ? (
            <div className="text-sm text-muted-foreground p-4 border border-dashed rounded-md text-center">
              {getTranslation('noCards', language)}
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.cards.map((card) => (
                <Card key={card.id} className="overflow-hidden">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">
                        {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">{card.cardholderName}</div>
                      <div className="text-sm">{maskCardNumber(card.cardNumber)}</div>
                      <div className="text-xs text-muted-foreground">Expires: {card.expiryDate}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteCard(card.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Add Bank Account Dialog */}
      <Dialog open={bankDialogOpen} onOpenChange={setBankDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('addBankAccount', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('addBankAccountDescription', language)}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={saveBankAccount} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">{getTranslation('bankName', language)}</Label>
              <Input
                id="bankName"
                name="bankName"
                value={bankForm.bankName}
                onChange={handleBankInputChange}
                placeholder="Enter bank name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountName">{getTranslation('accountName', language)}</Label>
              <Input
                id="accountName"
                name="accountName"
                value={bankForm.accountName}
                onChange={handleBankInputChange}
                placeholder="Enter account holder name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accountNumber">{getTranslation('accountNumber', language)}</Label>
              <Input
                id="accountNumber"
                name="accountNumber"
                value={bankForm.accountNumber}
                onChange={handleBankInputChange}
                placeholder="Enter account number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="routingNumber">{getTranslation('routingNumber', language)} ({getTranslation('optional', language)})</Label>
              <Input
                id="routingNumber"
                name="routingNumber"
                value={bankForm.routingNumber}
                onChange={handleBankInputChange}
                placeholder="Enter routing number (if applicable)"
              />
            </div>
            
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setBankDialogOpen(false)}>
                {getTranslation('cancel', language)}
              </Button>
              <Button type="submit">
                {getTranslation('save', language)}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Add Card Dialog */}
      <Dialog open={cardDialogOpen} onOpenChange={setCardDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{getTranslation('addCard', language)}</DialogTitle>
            <DialogDescription>
              {getTranslation('addCardDescription', language)}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={saveCardDetails} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cardType">{getTranslation('cardType', language)}</Label>
              <Select value={cardForm.type} onValueChange={handleCardTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="amex">American Express</SelectItem>
                  <SelectItem value="discover">Discover</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardholderName">{getTranslation('cardholderName', language)}</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                value={cardForm.cardholderName}
                onChange={handleCardInputChange}
                placeholder="Enter cardholder name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">{getTranslation('cardNumber', language)}</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={cardForm.cardNumber}
                onChange={handleCardInputChange}
                placeholder="Enter card number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiryDate">{getTranslation('expiryDate', language)}</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={cardForm.expiryDate}
                onChange={handleCardInputChange}
                placeholder="MM/YY"
                required
              />
            </div>
            
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setCardDialogOpen(false)}>
                {getTranslation('cancel', language)}
              </Button>
              <Button type="submit">
                {getTranslation('save', language)}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodsSection;
