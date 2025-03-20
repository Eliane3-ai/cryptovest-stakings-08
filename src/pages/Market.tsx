
import React, { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import LiveMarketView from '@/components/LiveMarketView';

declare global {
  interface Window {
    TradingView: any;
  }
}

const Market: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load TradingView Widget
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "light",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          withdateranges: true,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: "tradingview_widget"
        });
      }
    };
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>{getTranslation('backToWallet', language)}</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">{getTranslation('market', language)}</h1>
        
        {/* TradingView Widget */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-border p-4 mb-6">
          <h2 className="font-medium mb-4">{getTranslation('tradingView', language)}</h2>
          <div 
            ref={containerRef}
            id="tradingview_widget" 
            className="w-full"
            style={{ height: '500px' }}
          ></div>
        </div>
        
        {/* Live Market Data */}
        <LiveMarketView />
      </div>
    </div>
  );
};

export default Market;
