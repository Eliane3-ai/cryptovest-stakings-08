
// Country list for diversity
export const countries = [
  'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 
  'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Russia', 'South Africa', 
  'Nigeria', 'Kenya', 'Egypt', 'UAE', 'Saudi Arabia', 'Singapore', 'Malaysia',
  'Indonesia', 'Thailand', 'Vietnam', 'Philippines', 'South Korea', 'Turkey',
  'Argentina', 'Chile', 'Colombia', 'Peru', 'New Zealand', 'Netherlands',
  'Belgium', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Switzerland', 'Austria'
];

// Popular crypto exchanges
export const exchanges = ['Binance', 'OKX', 'BITGET', 'Trust Wallet', 'Kraken', 'Coinbase', 'Huobi', 'KuCoin', 'Gate.io', 'Bybit'];

// Popular cryptocurrencies
export const cryptocurrencies = ['BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'ADA', 'DOGE', 'DOT', 'AVAX', 'MATIC', 'LINK', 'UNI', 'ATOM'];

// Country-specific names for more authenticity
export const countrySpecificNames: Record<string, { male: string[], female: string[], lastNames: string[] }> = {
  'USA': {
    male: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas'],
    female: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah'],
    lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson', 'Taylor']
  },
  'UK': {
    male: ['Oliver', 'Harry', 'George', 'Noah', 'Jack', 'Jacob', 'Leo', 'Oscar', 'Charlie'],
    female: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Isabella', 'Mia', 'Poppy', 'Ella'],
    lastNames: ['Smith', 'Jones', 'Williams', 'Taylor', 'Brown', 'Davies', 'Evans', 'Wilson', 'Thomas']
  },
  'Brazil': {
    male: ['Miguel', 'Arthur', 'Bernardo', 'Heitor', 'Davi', 'Lorenzo', 'Théo', 'Pedro', 'Gabriel'],
    female: ['Maria', 'Alice', 'Sophia', 'Laura', 'Isabella', 'Manuela', 'Júlia', 'Helena', 'Valentina'],
    lastNames: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Lima', 'Pereira', 'Costa', 'Rodrigues', 'Almeida']
  },
  'Russia': {
    male: ['Alexander', 'Dmitri', 'Maxim', 'Sergei', 'Ivan', 'Andrei', 'Nikita', 'Mikhail', 'Artem'],
    female: ['Anastasia', 'Maria', 'Daria', 'Anna', 'Olga', 'Tatiana', 'Ekaterina', 'Natalia', 'Polina'],
    lastNames: ['Ivanov', 'Smirnov', 'Kuznetsov', 'Popov', 'Vasiliev', 'Petrov', 'Sokolov', 'Mikhailov', 'Novikov']
  },
  'Japan': {
    male: ['Haruto', 'Yuto', 'Sota', 'Yuki', 'Hayato', 'Haruki', 'Ryusei', 'Koki', 'Sora'],
    female: ['Yui', 'Aoi', 'Hina', 'Sakura', 'Rio', 'Koharu', 'Akari', 'Nanami', 'Honoka'],
    lastNames: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi']
  },
  'China': {
    male: ['Wei', 'Jian', 'Ming', 'Hao', 'Fang', 'Lei', 'Cheng', 'Jun', 'Yi'],
    female: ['Mei', 'Lin', 'Xiu', 'Ying', 'Na', 'Zhen', 'Yan', 'Qing', 'Yue'],
    lastNames: ['Wang', 'Li', 'Zhang', 'Liu', 'Chen', 'Yang', 'Huang', 'Zhao', 'Wu']
  },
  'Indonesia': {
    male: ['Budi', 'Agus', 'Hadi', 'Bambang', 'Dedi', 'Wawan', 'Yusuf', 'Arief', 'Dian'],
    female: ['Siti', 'Ani', 'Yuli', 'Dewi', 'Rina', 'Lina', 'Wati', 'Yanti', 'Lia'],
    lastNames: ['Wijaya', 'Suryanto', 'Hartono', 'Santoso', 'Tanoto', 'Wibowo', 'Gunawan', 'Hakim', 'Halim']
  }
};

// Fallback names for countries not specifically mapped
export const maleNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
  'Mohammed', 'Ali', 'Omar', 'Wei', 'Chen', 'Raj', 'Vikram', 'Juan', 'Carlos', 'Miguel',
  'Hiroshi', 'Takashi', 'Dmitri', 'Sergei', 'Ivan', 'Pierre', 'Jean', 'Klaus', 'Hans', 'Lars',
  'Sven', 'Giovanni', 'Marco', 'Ahmed', 'Jamal', 'Kofi', 'Nelson', 'Samuel', 'Daniel', 'Antoine'
];

export const femaleNames = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
  'Fatima', 'Aisha', 'Mei', 'Lin', 'Priya', 'Sonia', 'Maria', 'Sofia', 'Yui', 'Sakura',
  'Olga', 'Natasha', 'Marie', 'Sophie', 'Ingrid', 'Astrid', 'Francesca', 'Valentina', 'Amara', 'Zara',
  'Leilani', 'Jasmine', 'Emma', 'Olivia', 'Kim', 'Ji-Young', 'Isabella', 'Camila', 'Anya', 'Layla'
];

export const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Khan', 'Ali', 'Zhang', 'Wang', 'Li', 'Patel', 'Singh', 'Lopez', 'Gonzalez', 'Suzuki',
  'Tanaka', 'Ivanov', 'Petrov', 'Dubois', 'Martin', 'Muller', 'Schmidt', 'Rossi', 'Ricci', 'Ahmed',
  'Ibrahim', 'Okafor', 'Mandela', 'Nkosi', 'Kim', 'Park', 'Silva', 'Santos', 'Nguyen', 'Tran'
];
