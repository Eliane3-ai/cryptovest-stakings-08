
import { Bitcoin, Coins } from "lucide-react";
import React from 'react';

export interface Token {
  name: string;
  symbol: string;
  balance: number;
  usdValue: number;
  iconColor: string;
  iconComponent: string; // Changed from icon: JSX.Element to iconComponent: string
}

// Initial tokens data
export const initialTokens: Token[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    balance: 0.375,
    usdValue: 16500,
    iconColor: "#F7931A",
    iconComponent: "Bitcoin",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    balance: 7.23,
    usdValue: 27900,
    iconColor: "#627EEA",
    iconComponent: "Coins",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    balance: 36.5,
    usdValue: 13690,
    iconColor: "#F0B90B",
    iconComponent: "Coins",
  },
  {
    name: "Tron",
    symbol: "TRX",
    balance: 45000,
    usdValue: 14600,
    iconColor: "#FF060A",
    iconComponent: "Coins",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    balance: 10500,
    usdValue: 8750,
    iconColor: "#0033AD",
    iconComponent: "Coins",
  },
  {
    name: "Solana",
    symbol: "SOL",
    balance: 180,
    usdValue: 7760,
    iconColor: "#9945FF",
    iconComponent: "Coins",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    balance: 1200,
    usdValue: 6540,
    iconColor: "#E6007A",
    iconComponent: "Coins",
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    balance: 15000,
    usdValue: 4820,
    iconColor: "#C2A633",
    iconComponent: "Coins",
  },
];
