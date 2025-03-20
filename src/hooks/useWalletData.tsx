
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
  const { language } = useLanguage();
  
  const totalBalance = tokens.reduce((sum, token) => sum + token.usdValue, 0);

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
    stakingOptions
  };
};
