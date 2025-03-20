
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";

const COIN_GECKO_API_URL = 'https://api.coingecko.com/api/v3';

interface TradingPair {
  symbol: string;
  name: string;
  change: string;
  price: string;
  isPositive: boolean;
  image?: string;
}

const TradingViewWidget: React.FC = () => {
  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTradingPairs = async () => {
      try {
        const response = await fetch(
          `${COIN_GECKO_API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`
        );
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        const formattedData: TradingPair[] = data.map((coin: any) => ({
          symbol: `${coin.symbol.toUpperCase()}/USDT`,
          name: coin.name,
          price: `$${coin.current_price.toLocaleString()}`,
          change: `${coin.price_change_percentage_24h >= 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`,
          isPositive: coin.price_change_percentage_24h >= 0,
          image: coin.image
        }));
        
        setTradingPairs(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trading pairs:", error);
        // Fallback to mock data
        setTradingPairs([
          {
            symbol: "BTC/USDT",
            name: "Bitcoin",
            change: "+2.34%",
            price: "$43,251.67",
            isPositive: true
          },
          {
            symbol: "ETH/USDT",
            name: "Ethereum",
            change: "+1.87%",
            price: "$3,254.42",
            isPositive: true
          },
          {
            symbol: "BNB/USDT",
            name: "Binance Coin",
            change: "-0.54%",
            price: "$375.21",
            isPositive: false
          },
          {
            symbol: "TRX/USDT",
            name: "Tron",
            change: "+3.12%",
            price: "$0.1234",
            isPositive: true
          },
          {
            symbol: "ADA/USDT",
            name: "Cardano",
            change: "-1.23%",
            price: "$0.8472",
            isPositive: false
          }
        ]);
        setLoading(false);
      }
    };

    fetchTradingPairs();

    // Auto-rotate the carousel
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tradingPairs.length);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium text-[#0B0E11] dark:text-[#F0B90B]">Live Market</h2>
        <button className="text-[#F0B90B] text-sm font-medium hover:underline flex items-center">
          <span>View all markets</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-3 border-[#F0B90B] border-opacity-30 border-t-[#F0B90B] rounded-full"></div>
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent>
            {tradingPairs.map((pair, index) => (
              <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                <div className="p-4 rounded-xl border border-[#E6E8EA] dark:border-[#474D57] bg-white dark:bg-[#1E2026] h-full hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-[#0B0E11] dark:text-white">{pair.symbol}</h3>
                      <p className="text-xs text-[#707A8A] dark:text-[#848E9C]">{pair.name}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-medium ${pair.isPositive ? 'bg-[#0ECB8126] text-[#0ECB81]' : 'bg-[#F6465D26] text-[#F6465D]'}`}>
                      {pair.change}
                    </div>
                  </div>
                  <p className="text-lg font-medium mt-2 text-[#0B0E11] dark:text-white">{pair.price}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]" />
          <CarouselNext className="right-0 bg-white dark:bg-[#2B3139] border-[#E6E8EA] dark:border-[#474D57]" />
        </Carousel>
      )}
    </div>
  );
};

export default TradingViewWidget;
