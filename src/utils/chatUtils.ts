
import { ChatUser, ChatMessage } from '@/types/chat';

// Country list for diversity
const countries = [
  'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 
  'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Russia', 'South Africa', 
  'Nigeria', 'Kenya', 'Egypt', 'UAE', 'Saudi Arabia', 'Singapore', 'Malaysia',
  'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'South Korea', 'Turkey',
  'Argentina', 'Chile', 'Colombia', 'Peru', 'New Zealand', 'Netherlands',
  'Belgium', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria'
];

// Popular crypto exchanges
const exchanges = ['Binance', 'OKX', 'BITGET', 'Trust Wallet', 'Kraken', 'Coinbase', 'Huobi', 'KuCoin', 'Gate.io', 'Bybit'];

// Popular cryptocurrencies
const cryptocurrencies = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'DOT', 'AVAX', 'MATIC', 'LINK', 'UNI', 'ATOM'];

// First names for diversity
const maleNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Mohammed', 'Ali', 'Omar', 'Wei', 'Chen', 'Raj', 'Vikram', 'Juan', 'Carlos', 'Miguel',
  'Hiroshi', 'Takashi', 'Dmitri', 'Sergei', 'Ivan', 'Pierre', 'Jean', 'Klaus', 'Hans', 'Lars',
  'Sven', 'Giovanni', 'Marco', 'Ahmed', 'Jamal', 'Kofi', 'Nelson', 'Samuel', 'Daniel', 'Antoine'
];

const femaleNames = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Fatima', 'Aisha', 'Mei', 'Lin', 'Priya', 'Sonia', 'Maria', 'Sofia', 'Yui', 'Sakura',
  'Olga', 'Natasha', 'Marie', 'Sophie', 'Ingrid', 'Astrid', 'Francesca', 'Valentina', 'Amara', 'Zara',
  'Leilani', 'Jasmine', 'Emma', 'Olivia', 'Kim', 'Ji-Young', 'Isabella', 'Camila', 'Anya', 'Layla'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Khan', 'Ali', 'Zhang', 'Wang', 'Li', 'Patel', 'Singh', 'Lopez', 'Gonzalez', 'Suzuki',
  'Tanaka', 'Ivanov', 'Petrov', 'Dubois', 'Martin', 'Muller', 'Schmidt', 'Rossi', 'Ricci', 'Ahmed',
  'Ibrahim', 'Okafor', 'Mandela', 'Nkosi', 'Kim', 'Park', 'Silva', 'Santos', 'Nguyen', 'Tran'
];

// Generate random number between min and max (inclusive)
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random avatar URL
const getRandomAvatar = (gender: string, index: number) => {
  return `https://randomuser.me/api/portraits/${gender === 'male' ? 'men' : 'women'}/${index % 100}.jpg`;
};

// Generate cryptocurrency price message
const generatePriceMessage = () => {
  const crypto = cryptocurrencies[getRandomInt(0, cryptocurrencies.length - 1)];
  const action = Math.random() > 0.5 ? 'up' : 'down';
  const percentage = (Math.random() * 10).toFixed(2);
  
  const messages = [
    `${crypto} just went ${action} by ${percentage}%! What do you guys think?`,
    `Wow, ${crypto} is ${action === 'up' ? 'pumping' : 'dumping'} right now. ${percentage}% ${action}!`,
    `Anyone watching ${crypto}? It's ${action} ${percentage}% in the last hour.`,
    `${crypto} ${action === 'up' ? 'to the moon! 🚀' : 'taking a dive. 📉'} ${percentage}% change.`,
    `Market update: ${crypto} ${action === 'up' ? 'rising' : 'falling'} ${percentage}%. Thoughts?`
  ];
  
  return messages[getRandomInt(0, messages.length - 1)];
};

// Generate crypto news message
const generateNewsMessage = () => {
  const crypto = cryptocurrencies[getRandomInt(0, cryptocurrencies.length - 1)];
  
  const news = [
    `Just read that ${crypto} is partnering with a major tech company. Bullish!`,
    `Breaking: New regulations for ${crypto} in the EU look positive for adoption.`,
    `${crypto} just released their roadmap for 2024. Lots of exciting updates coming!`,
    `Did you hear about the ${crypto} hack? Over $10M stolen. Be careful with your holdings.`,
    `${crypto} foundation just announced a $100M developer grant program. Amazing for the ecosystem!`,
    `New ${crypto} update will improve transaction speeds by 10x. Game changer!`,
    `Central banks are experimenting with ${crypto} technology for CBDCs.`,
    `Major retailer now accepting ${crypto} as payment in over 2000 locations!`,
    `${crypto} mining difficulty just hit an all-time high. What does this mean for prices?`,
    `NFT platform on ${crypto} just broke sales records. The space is heating up again!`
  ];
  
  return news[getRandomInt(0, news.length - 1)];
};

// Generate withdrawal success message
const generateWithdrawalMessage = () => {
  const crypto = cryptocurrencies[getRandomInt(0, cryptocurrencies.length - 1)];
  const amount = (Math.random() * 5 + 0.1).toFixed(3);
  const exchange = exchanges[getRandomInt(0, exchanges.length - 1)];
  
  const messages = [
    `Just withdrew ${amount} ${crypto} from staking to my ${exchange} account. The transaction was super fast!`,
    `Withdrawal of ${amount} ${crypto} to ${exchange} successful. Loving these quick processing times!`,
    `Finally moved my ${amount} ${crypto} to ${exchange}. Took less than 2 minutes!`,
    `Staking rewards day! Withdrew ${amount} ${crypto} to ${exchange} and it's already there. 💰`,
    `Just sent ${amount} ${crypto} to my ${exchange} wallet. The gas fees were really low today!`
  ];
  
  return messages[getRandomInt(0, messages.length - 1)];
};

// Generate deposit message
const generateDepositMessage = () => {
  const crypto = cryptocurrencies[getRandomInt(0, cryptocurrencies.length - 1)];
  const amount = (Math.random() * 10 + 0.5).toFixed(3);
  const daysToStake = getRandomInt(30, 365);
  
  const messages = [
    `Just staked ${amount} ${crypto} for ${daysToStake} days. Looking forward to those sweet rewards!`,
    `Added ${amount} ${crypto} to my staking portfolio. Aiming for that ${daysToStake}-day lock-in bonus.`,
    `Staking ${amount} more ${crypto}. The APY is too good to pass up!`,
    `Just deposited ${amount} ${crypto} for staking. This platform makes it so easy!`,
    `Increased my staking position with ${amount} ${crypto}. The ${daysToStake}-day terms are perfect.`
  ];
  
  return messages[getRandomInt(0, messages.length - 1)];
};

// Generate general chat message
const generateGeneralMessage = () => {
  const messages = [
    "How's everyone's portfolio doing today?",
    "Who's buying the dip?",
    "Best staking rewards I've seen in months!",
    "Any recommendations for stable yield farming?",
    "DCA is the way to go in this market.",
    "I'm so glad I found this platform. Way better than what I was using before.",
    "Anyone here staking ETH?",
    "What's your crypto allocation looking like these days?",
    "This bear market can't last forever, right?",
    "Holding strong through the volatility!",
    "Love the new UI updates to the platform.",
    "The mobile app is really convenient for checking my stakes.",
    "Has anyone tried the new auto-compound feature?",
    "What are your price predictions for the next 6 months?",
    "I'm going full HODL mode right now.",
    "The customer service here is stellar! Helped me recover my account so quickly.",
    "Been staking for 6 months now and the returns are consistently good.",
    "Do you guys reinvest your staking rewards or withdraw them?",
    "Just converted some of my staking rewards to BTC. Diversification is key!",
    "Any thoughts on the upcoming protocol upgrade?"
  ];
  
  return messages[getRandomInt(0, messages.length - 1)];
};

// Generate message based on type
export const generateMessage = (type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general'): string => {
  switch (type) {
    case 'withdrawal':
      return generateWithdrawalMessage();
    case 'deposit':
      return generateDepositMessage();
    case 'price':
      return generatePriceMessage();
    case 'news':
      return generateNewsMessage();
    case 'general':
    default:
      return generateGeneralMessage();
  }
};

// Generate 500 unique users
export const generateUsers = (count: number = 500): ChatUser[] => {
  const users: ChatUser[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    const firstName = gender === 'male' 
      ? maleNames[getRandomInt(0, maleNames.length - 1)] 
      : femaleNames[getRandomInt(0, femaleNames.length - 1)];
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    const country = countries[getRandomInt(0, countries.length - 1)];
    
    users.push({
      id: `user-${i}`,
      name: `${firstName} ${lastName}`,
      avatar: getRandomAvatar(gender, i),
      country,
      gender: gender as 'male' | 'female'
    });
  }
  
  return users;
};

// Generate chat message with a specific user
export const createChatMessage = (
  userId: string, 
  type: 'withdrawal' | 'deposit' | 'price' | 'news' | 'general' = 'general'
): ChatMessage => {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    message: generateMessage(type),
    timestamp: new Date(),
    type
  };
};
