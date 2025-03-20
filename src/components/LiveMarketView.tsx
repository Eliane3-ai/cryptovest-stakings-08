
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
}

const LiveMarketView: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { language } = useLanguage();
  
  // Fetch market data function
  const fetchMarketData = async () => {
    setRefreshing(true);
    
    try {
      // In a real app, you would fetch from a crypto API
      // Mock data with randomized prices to simulate live updates
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
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error("Error fetching market data:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchMarketData();
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchMarketData();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border soft-shadow overflow-hidden mb-6 fade-in">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="font-medium">{getTranslation('liveMarket', language)}</h2>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={refreshing}
            className="flex items-center gap-1 h-8"
          >
            <RefreshCw className={`h-3 w-3 ${refreshing ? 'animate-spin' : ''}`} />
            {getTranslation('refresh', language)}
          </Button>
          <Link to="/market" className="text-crypto-blue text-sm font-medium hover:underline flex items-center">
            <span>{getTranslation('viewAllMarkets', language)}</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr className="text-xs text-muted-foreground">
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
                    <div className="animate-spin h-5 w-5 border-2 border-crypto-blue border-opacity-50 border-t-crypto-blue rounded-full"></div>
                  </div>
                </td>
              </tr>
            ) : (
              marketData.map((coin, index) => (
                <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center">
                      <div className="p-1.5 rounded-md mr-2 bg-muted">
                        <div className="h-5 w-5 flex items-center justify-center text-white font-medium" style={{ backgroundColor: coin.symbol === 'BTC' ? '#F7931A' : 
                                                              coin.symbol === 'ETH' ? '#627EEA' : 
                                                              coin.symbol === 'BNB' ? '#F0B90B' : 
                                                              coin.symbol === 'TRX' ? '#FF060A' : 
                                                              coin.symbol === 'ADA' ? '#0033AD' : 
                                                              coin.symbol === 'SOL' ? '#9945FF' : '#333' }}>
                          {coin.symbol[0]}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{coin.name}</p>
                        <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-right font-medium">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`p-3 text-right font-medium ${coin.change24h >= 0 ? 'text-crypto-green' : 'text-red-500'}`}>
                    <div className="flex items-center justify-end">
                      {coin.change24h >= 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1" />
                      )}
                      {Math.abs(coin.change24h).toFixed(2)}%
                    </div>
                  </td>
                  <td className="p-3 text-right hidden md:table-cell">
                    ${(coin.volume24h / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-right hidden lg:table-cell">
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
