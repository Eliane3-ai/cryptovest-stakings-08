
import React from 'react';
import { ArrowLeft, TrendingUp, BarChart2, PieChart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
         LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { initialTokens } from '@/data/initialTokens';

const Analytics: React.FC = () => {
  const { language } = useLanguage();
  
  // Portfolio distribution data
  const portfolioData = initialTokens.map(token => ({
    name: token.symbol,
    value: token.usdValue
  }));

  // Price history mock data
  const priceHistoryData = [
    { name: 'Jan', BTC: 42000, ETH: 3200, BNB: 380 },
    { name: 'Feb', BTC: 44500, ETH: 3100, BNB: 400 },
    { name: 'Mar', BTC: 40000, ETH: 2800, BNB: 360 },
    { name: 'Apr', BTC: 41200, ETH: 3000, BNB: 375 },
    { name: 'May', BTC: 39000, ETH: 2600, BNB: 350 },
    { name: 'Jun', BTC: 36000, ETH: 2400, BNB: 320 },
    { name: 'Jul', BTC: 42000, ETH: 2900, BNB: 390 },
    { name: 'Aug', BTC: 47000, ETH: 3300, BNB: 410 },
    { name: 'Sep', BTC: 43500, ETH: 3050, BNB: 380 },
  ];

  // Trading volume data
  const volumeData = [
    { name: 'Jan', volume: 12400 },
    { name: 'Feb', volume: 14800 },
    { name: 'Mar', volume: 9600 },
    { name: 'Apr', volume: 8700 },
    { name: 'May', volume: 11300 },
    { name: 'Jun', volume: 10500 },
    { name: 'Jul', volume: 15700 },
    { name: 'Aug', volume: 16900 },
    { name: 'Sep', volume: 13200 },
  ];

  // Portfolio value over time
  const portfolioHistory = [
    { name: 'Jan', value: 78000 },
    { name: 'Feb', value: 84000 },
    { name: 'Mar', value: 76000 },
    { name: 'Apr', value: 79000 },
    { name: 'May', value: 74000 },
    { name: 'Jun', value: 68000 },
    { name: 'Jul', value: 81000 },
    { name: 'Aug', value: 92000 },
    { name: 'Sep', value: 96000 },
  ];

  // Colors for pie chart
  const COLORS = ['#F7931A', '#627EEA', '#F0B90B', '#FF060A', '#0033AD', '#9945FF', '#E6007A', '#C2A633'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>{getTranslation('backToWallet', language)}</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">{getTranslation('analytics', language)}</h1>

        {/* Portfolio Value Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-crypto-blue" />
            <h2 className="font-medium">Portfolio Value Over Time</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E40AF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Portfolio Value']} />
              <Area type="monotone" dataKey="value" stroke="#1E40AF" fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Portfolio Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="h-5 w-5 text-crypto-blue" />
              <h2 className="font-medium">Portfolio Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Value']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Trading Volume */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="h-5 w-5 text-crypto-blue" />
              <h2 className="font-medium">Trading Volume</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Volume']} />
                <Bar dataKey="volume" fill="#1E40AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-crypto-blue" />
            <h2 className="font-medium">Price History</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="BTC" stroke="#F7931A" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="ETH" stroke="#627EEA" />
              <Line type="monotone" dataKey="BNB" stroke="#F0B90B" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
