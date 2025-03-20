
import React from 'react';
import TransactionItem, { TransactionType } from "@/components/TransactionItem";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface Transaction {
  type: TransactionType;
  amount: number;
  token: string;
  date: string;
  address: string;
  usdValue: number;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({ transactions }) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border soft-shadow overflow-hidden fade-in">
      <div className="p-4 border-b border-border">
        <h2 className="font-medium">{getTranslation('recentTransactions', language)}</h2>
      </div>
      
      <div className="max-h-[600px] overflow-y-auto">
        {transactions.map((transaction, index) => (
          <TransactionItem 
            key={index}
            type={transaction.type}
            amount={transaction.amount}
            token={transaction.token}
            date={transaction.date}
            address={transaction.address}
            usdValue={transaction.usdValue}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionsList;
