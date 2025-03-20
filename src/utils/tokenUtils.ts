
import { Token } from "@/data/initialTokens";
import { Transaction } from "@/data/initialTransactions";
import { StakingOption } from "@/data/stakingOptions";

// Function to update token balance and value
export const updateTokenBalance = (
  tokens: Token[], 
  symbol: string, 
  amount: number, 
  usdValue: number
): Token[] => {
  return tokens.map(token => 
    token.symbol === symbol 
      ? { 
          ...token, 
          balance: token.balance + amount,
          usdValue: token.usdValue + usdValue
        } 
      : token
  );
};

// Function to generate a random transaction
export const generateRandomTransaction = (
  tokens: Token[]
): { updatedTokens: Token[], newTransaction: Transaction } => {
  const randomToken = tokens[Math.floor(Math.random() * tokens.length)];
  const randomAmount = parseFloat((Math.random() * 0.1).toFixed(6));
  const randomUsdValue = parseFloat((randomAmount * (randomToken.usdValue / randomToken.balance)).toFixed(2));
  
  // Update token balance
  const updatedTokens = updateTokenBalance(tokens, randomToken.symbol, randomAmount, randomUsdValue);
  
  const newTransaction = {
    type: 'receive' as const,
    amount: randomAmount,
    token: randomToken.symbol,
    date: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    address: `0x${Math.random().toString(16).slice(2).padStart(40, '0')}`,
    usdValue: randomUsdValue,
  };
  
  return { updatedTokens, newTransaction };
};

// Function to update staking rewards
export const updateStakingRewards = (
  tokens: Token[],
  stakingOptions: StakingOption[]
): Token[] => {
  let updatedTokens = [...tokens];
  
  stakingOptions.forEach(option => {
    const matchingToken = tokens.find(token => token.symbol === option.symbol);
    if (matchingToken && option.stakedAmount > 0) {
      // Calculate daily reward based on APY
      const dailyRewardPercent = option.apy / 365;
      const dailyRewardAmount = option.stakedAmount * (dailyRewardPercent / 100);
      
      // A small fraction of the daily reward every minute for real-time effect
      const rewardIncrement = dailyRewardAmount / (24 * 60) * 10; // 10 minutes worth
      
      updatedTokens = updateTokenBalance(updatedTokens, option.symbol, rewardIncrement, 0);
    }
  });
  
  return updatedTokens;
};
