
import { TransactionType } from "@/components/TransactionItem";

export interface Transaction {
  type: TransactionType;
  amount: number;
  token: string;
  date: string;
  address: string;
  usdValue: number;
}

// Initial transactions
export const initialTransactions: Transaction[] = [
  {
    type: 'receive' as TransactionType,
    amount: 0.125,
    token: 'BTC',
    date: '2023-10-15 14:23',
    address: '0x3a54f6c2a7812f95e25c45b53d31f3c43e472d30',
    usdValue: 5500,
  },
  {
    type: 'send' as TransactionType,
    amount: 1.2,
    token: 'ETH',
    date: '2023-10-12 09:15',
    address: '0x8f26b42f5d945052383c29071a15e3abf7f1b5d6',
    usdValue: 4620,
  },
  {
    type: 'receive' as TransactionType,
    amount: 10.5,
    token: 'BNB',
    date: '2023-10-08 17:41',
    address: '0x7f4e52b532f5cd9a23f0b6eb36f4c237f15eb21a',
    usdValue: 3930,
  },
  {
    type: 'receive' as TransactionType,
    amount: 12000,
    token: 'TRX',
    date: '2023-10-05 11:30',
    address: '0x2d6e21c8f5e25c9d9f4b53b4b9c9b62e8f15a82b',
    usdValue: 3890,
  },
  {
    type: 'send' as TransactionType,
    amount: 800,
    token: 'ADA',
    date: '2023-09-28 13:24',
    address: '0x9a1b3c5d7e9f1d3b5f7a9b1d3f5e7a9b1d3f5e7a',
    usdValue: 665,
  },
];
