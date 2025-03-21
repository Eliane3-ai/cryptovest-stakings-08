
import { useState, useEffect } from 'react';
import { initialTokens, Token } from '@/data/initialTokens';
import { initialTransactions, Transaction } from '@/data/initialTransactions';
import { stakingOptions, StakingOption } from '@/data/stakingOptions';
import { updateTokenBalance, generateRandomTransaction, updateStakingRewards } from '@/utils/tokenUtils';
import { showTransactionToast } from '@/utils/toastUtils';
import { useLanguage } from '@/contexts/LanguageContext';

export type Tab = 'assets' | 'transactions' | 'staking';

export const useWalletData = () => {
  const [activeTab, setActiveTab] = useState<Tab>('assets');
  const [transactions, setTransactions] = useState(initialTransactions);
  const [tokens, setTokens] = useState(initialTokens);
  const [isInitialFunded, setIsInitialFunded] = useState(false);
  const { language } = useLanguage();
  
  const totalBalance = tokens.reduce((sum, token) => sum + token.usdValue, 0);

  // Function to handle custom initial funding based on staking knowledge
  const setCustomInitialFunding = (fundAmount: number) => {
    if (isInitialFunded) return; // Prevent multiple funding

    // Scale each token's value proportionally to reach the target fundAmount
    const currentTotal = tokens.reduce((sum, token) => sum + token.usdValue, 0);
    const scaleFactor = fundAmount / currentTotal;

    const updatedTokens = tokens.map(token => ({
      ...token,
      balance: token.balance * scaleFactor,
      usdValue: token.usdValue * scaleFactor
    }));

    // Create a funding transaction
    const fundingTransaction: Transaction = {
      type: 'receive',
      amount: 0, // This is a special funding transaction
      token: 'FUND',
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      address: 'Initial Funding',
      usdValue: fundAmount,
    };

    setTokens(updatedTokens);
    setTransactions(prev => [fundingTransaction, ...prev]);
    setIsInitialFunded(true);
  };

  // Simulate receiving funds at regular intervals
  useEffect(() => {
    const fundingInterval = setInterval(() => {
      const { updatedTokens, newTransaction } = generateRandomTransaction(tokens);
      
      // Update state
      setTokens(updatedTokens);
      setTransactions(prev => [newTransaction, ...prev]);
      
      // Show toast notification
      showTransactionToast(
        newTransaction.amount, 
        newTransaction.token, 
        newTransaction.usdValue, 
        language
      );
      
    }, 40000); // Every 40 seconds
    
    return () => clearInterval(fundingInterval);
  }, [language, tokens]);

  // Update staking rewards periodically
  useEffect(() => {
    const stakingRewardsInterval = setInterval(() => {
      setTokens(prevTokens => updateStakingRewards(prevTokens, stakingOptions));
    }, 60000); // Update rewards every minute
    
    return () => clearInterval(stakingRewardsInterval);
  }, [tokens]);

  return {
    activeTab,
    setActiveTab,
    transactions,
    tokens,
    totalBalance,
    stakingOptions,
    setCustomInitialFunding
  };
};
