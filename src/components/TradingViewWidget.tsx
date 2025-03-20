
import React, { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronRight } from "lucide-react";

const tradingPairs = [
  {
    symbol: "BTCUSDT",
    name: "Bitcoin",
    change: "+2.34%",
    price: "$43,251.67",
    isPositive: true
  },
  {
    symbol: "ETHUSDT",
    name: "Ethereum",
    change: "+1.87%",
    price: "$3,254.42",
    isPositive: true
  },
  {
    symbol: "BNBUSDT",
    name: "Binance Coin",
    change: "-0.54%",
    price: "$375.21",
    isPositive: false
  },
  {
    symbol: "TRXUSDT",
    name: "Tron",
    change: "+3.12%",
    price: "$0.1234",
    isPositive: true
  },
  {
    symbol: "ADAUSDT",
    name: "Cardano",
    change: "-1.23%",
    price: "$0.8472",
    isPositive: false
  }
];

const TradingViewWidget: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
        <h2 className="font-medium">Live Market</h2>
        <button className="text-crypto-blue text-sm font-medium hover:underline flex items-center">
          <span>View all markets</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {tradingPairs.map((pair, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="p-4 rounded-xl border border-border bg-white dark:bg-gray-800 h-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{pair.symbol}</h3>
                    <p className="text-xs text-muted-foreground">{pair.name}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium ${pair.isPositive ? 'bg-crypto-green/10 text-crypto-green' : 'bg-red-500/10 text-red-500'}`}>
                    {pair.change}
                  </div>
                </div>
                <p className="text-lg font-medium mt-2">{pair.price}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default TradingViewWidget;
