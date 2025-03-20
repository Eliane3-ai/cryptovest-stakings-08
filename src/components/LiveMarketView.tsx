
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ChevronRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Button } from "./ui/button";

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
}

const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3';

const LiveMarketView: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  
  // Fetch market data function
  const fetchMarketData = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      // Real API call to CoinGecko
      const response = await fetch(
        `${COIN_GECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.ok) {
        // If we hit API rate limits or other issues, fall back to mock data
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      const formattedData: MarketData[] = data.map((coin: any) => ({
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        volume24h: coin.total_volume,
        marketCap: coin.market_cap,
        image: coin.image
      }));
      
      setMarketData(formattedData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      
      // Fall back to mock data with randomized prices to simulate live updates
      const mockData: MarketData[] = [
        { 
          symbol: "BTC", 
          name: "Bitcoin", 
          price: 43200 + Math.random() * 1000 - 500, 
          change24h: 2.1 + (Math.random() * 1.6 - 0.8), 
          volume24h: 28500000000, 
          marketCap: 842000000000 
        },
        { 
          symbol: "ETH", 
          name: "Ethereum", 
          price: 3140 + Math.random() * 150 - 75, 
          change24h: 1.5 + (Math.random() * 1.2 - 0.6), 
          volume24h: 14300000000, 
          marketCap: 376000000000 
        },
        { 
          symbol: "BNB", 
          name: "Binance Coin", 
          price: 374 + Math.random() * 20 - 10, 
          change24h: -0.8 + (Math.random() * 1.4 - 0.7), 
          volume24h: 1250000000, 
          marketCap: 62000000000 
        },
        { 
          symbol: "TRX", 
          name: "Tron", 
          price: 0.124 + Math.random() * 0.01 - 0.005, 
          change24h: 4.1 + (Math.random() * 1.4 - 0.7), 
          volume24h: 980000000, 
          marketCap: 11200000000 
        },
        { 
          symbol: "ADA", 
          name: "Cardano", 
          price: 0.84 + Math.random() * 0.06 - 0.03, 
          change24h: -1.4 + (Math.random() * 1.2 - 0.6), 
          volume24h: 650000000, 
          marketCap: 29500000000 
        },
        { 
          symbol: "SOL", 
          name: "Solana", 
          price: 139 + Math.random() * 12 - 6, 
          change24h: 3.2 + (Math.random() * 1.6 - 0.8), 
          volume24h: 2140000000, 
          marketCap: 59800000000 
        },
      ];

      setMarketData(mockData);
      setError('Using mock data - CoinGecko API limit may have been reached');
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      fetchMarketData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchMarketData();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border soft-shadow overflow-hidden mb-6 fade-in">
      <div className="p-4 border-b border-border flex justify-between items-center bg-[#F8FAFD] dark:bg-[#1E2026]">
        <h2 className="font-medium text-[#0B0E11] dark:text-[#F0B90B]">{getTranslation('liveMarket', language)}</h2>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="flex items-center gap-1 h-8 bg-transparent border border-[#E6E8EA] dark:border-[#474D57] hover:bg-[#F5F5F5] dark:hover:bg-[#2B3139]"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            {getTranslation('refresh', language)}
          </Button>
          <Link to="/market" className="text-[#F0B90B] dark:text-[#F0B90B] text-sm font-medium hover:underline flex items-center">
            <span>{getTranslation('viewAllMarkets', language)}</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      {error && (
        <div className="bg-amber-50 dark:bg-amber-900/20 p-2 border-b border-amber-100 dark:border-amber-800/30 text-sm text-amber-800 dark:text-amber-200">
          {error}
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFD] dark:bg-[#1E2026]">
            <tr className="text-xs text-[#707A8A] dark:text-[#848E9C]">
              <th className="p-3 text-left">{getTranslation('asset', language)}</th>
              <th className="p-3 text-right">{getTranslation('price', language)}</th>
              <th className="p-3 text-right">{getTranslation('change24h', language)}</th>
              <th className="p-3 text-right hidden md:table-cell">{getTranslation('volume24h', language)}</th>
              <th className="p-3 text-right hidden lg:table-cell">{getTranslation('marketCap', language)}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  <div className="flex justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-[#F0B90B] border-opacity-50 border-t-[#F0B90B] rounded-full"></div>
                  </div>
                </td>
              </tr>
            ) : (
              marketData.map((coin, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-[#F8FAFD] dark:hover:bg-[#2B3139] transition-colors">
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-md mr-2 bg-white dark:bg-[#2B3139] border border-[#E6E8EA] dark:border-[#474D57]">
                        {coin.image ? (
                          <img src={coin.image} alt={coin.name} className="h-5 w-5 rounded-full" />
                        ) : (
                          <div className="h-5 w-5 flex items-center justify-center text-white font-medium" style={{ backgroundColor: coin.symbol === 'BTC' ? '#F7931A' : 
                                                                  coin.symbol === 'ETH' ? '#627EEA' : 
                                                                  coin.symbol === 'BNB' ? '#F0B90B' : 
                                                                  coin.symbol === 'TRX' ? '#FF060A' : 
                                                                  coin.symbol === 'ADA' ? '#0033AD' : 
                                                                  coin.symbol === 'SOL' ? '#9945FF' : '#333' }}>
                            {coin.symbol[0]}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#0B0E11] dark:text-white">{coin.name}</p>
                        <p className="text-xs text-[#707A8A] dark:text-[#848E9C]">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-medium text-[#0B0E11] dark:text-white">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`p-3 text-right font-medium ${coin.change24h >= 0 ? 'text-[#03A66D] dark:text-[#0ECB81]' : 'text-[#CF304A] dark:text-[#F6465D]'}`}>
                    <div className="flex items-center justify-end">
                      {coin.change24h >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(coin.change24h).toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-3 text-right hidden md:table-cell text-[#707A8A] dark:text-[#848E9C]">
                    ${(coin.volume24h / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-right hidden lg:table-cell text-[#707A8A] dark:text-[#848E9C]">
                    ${(coin.marketCap / 1000000000).toFixed(1)}B
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveMarketView;
