
// Initial staking data
export interface StakingOption {
  token: string;
  symbol: string;
  stakedAmount: number;
  apy: number;
  rewards: number;
  rewardToken: string;
}

export const stakingOptions: StakingOption[] = [
  {
    token: "Ethereum",
    symbol: "ETH",
    stakedAmount: 2.5,
    apy: 4.5,
    rewards: 0.0348,
    rewardToken: "ETH",
  },
  {
    token: "Binance Coin",
    symbol: "BNB",
    stakedAmount: 12.8,
    apy: 5.2,
    rewards: 0.205,
    rewardToken: "BNB",
  },
  {
    token: "Tron",
    symbol: "TRX",
    stakedAmount: 15000,
    apy: 6.8,
    rewards: 312.5,
    rewardToken: "TRX",
  },
];
