
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

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
  const { language } = useLanguage();
  
  // Mock data for development - in a real app, this would come from an API
  useEffect(() => {
    const fetchMarketData = () => {
      // Simulate API call with mock data
      const mockData: MarketData[] = [
        { 
          symbol: "BTC", 
          name: "Bitcoin", 
          price: 43200 + Math.random() * 400, 
          change24h: 2.1 + (Math.random() * 0.8 - 0.4), 
          volume24h: 28500000000, 
          marketCap: 842000000000 
        },
        { 
          symbol: "ETH", 
          name: "Ethereum", 
          price: 3140 + Math.random() * 60, 
          change24h: 1.5 + (Math.random() * 0.6 - 0.3), 
          volume24h: 14300000000, 
          marketCap: 376000000000 
        },
        { 
          symbol: "BNB", 
          name: "Binance Coin", 
          price: 374 + Math.random() * 10, 
          change24h: -0.8 + (Math.random() * 0.6 - 0.3), 
          volume24h: 1250000000, 
          marketCap: 62000000000 
        },
        { 
          symbol: "TRX", 
          name: "Tron", 
          price: 0.124 + Math.random() * 0.005, 
          change24h: 4.1 + (Math.random() * 0.8 - 0.4), 
          volume24h: 980000000, 
          marketCap: 11200000000 
        },
        { 
          symbol: "ADA", 
          name: "Cardano", 
          price: 0.84 + Math.random() * 0.03, 
          change24h: -1.4 + (Math.random() * 0.6 - 0.3), 
          volume24h: 650000000, 
          marketCap: 29500000000 
        },
        { 
          symbol: "SOL", 
          name: "Solana", 
          price: 139 + Math.random() * 5, 
          change24h: 3.2 + (Math.random() * 0.8 - 0.4), 
          volume24h: 2140000000, 
          marketCap: 59800000000 
        },
      ];

      setMarketData(mockData);
      setLoading(false);
    };

    fetchMarketData();
    
    // Set up real-time updates
    const interval = setInterval(() => {
      fetchMarketData();
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-border soft-shadow overflow-hidden mb-6 fade-in">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="font-medium">{getTranslation('liveMarket', language)}</h2>
        <Link to="/market" className="text-crypto-blue text-sm font-medium hover:underline flex items-center">
          <span>{getTranslation('viewAllMarkets', language)}</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
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
                      <div className={`p-1.5 rounded-md mr-2 bg-${coin.symbol.toLowerCase()}-bg`}>
                        <div className="h-5 w-5 flex items-center justify-center text-white">
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
