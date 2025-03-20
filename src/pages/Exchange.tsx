
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from '@/utils/translations';

const Exchange: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("transak");

  // Function to open exchange in a new window
  const openExchangeInNewWindow = (type: string) => {
    let url = '';
    
    switch (type) {
      case 'transak':
        url = 'https://global.transak.com/';
        break;
      case 'guardarian':
        url = 'https://guardarian.com/';
        break;
      case 'onramp':
        url = 'https://onramp.money/';
        break;
      default:
        url = 'https://global.transak.com/';
    }
    
    // Open in a new window with specific dimensions
    window.open(
      url, 
      'exchangeWindow', 
      'width=450,height=600,left=200,top=200'
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppHeader />
        
        <Button
          variant="outline"
          size="sm"
          className="mb-6 gap-2"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
          {getTranslation('backToDashboard', language)}
        </Button>
        
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{getTranslation('exchangeFiat', language)}</CardTitle>
            <CardDescription>
              {getTranslation('exchangeFiatDesc', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="transak" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transak">Transak</TabsTrigger>
                <TabsTrigger value="guardarian">Guardarian</TabsTrigger>
                <TabsTrigger value="onramp">Onramp Money</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transak" className="pt-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300">Transak Exchange</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    {getTranslation('transakDesc', language)}
                  </p>
                  <Button className="mt-4" onClick={() => openExchangeInNewWindow('transak')}>
                    {getTranslation('openTransak', language)}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">{getTranslation('widgetPlaceholder', language)}</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => openExchangeInNewWindow('transak')}
                    >
                      {getTranslation('launchExchange', language)}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="guardarian" className="pt-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                  <h3 className="font-medium text-purple-800 dark:text-purple-300">Guardarian Exchange</h3>
                  <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
                    {getTranslation('guardarianDesc', language)}
                  </p>
                  <Button className="mt-4" onClick={() => openExchangeInNewWindow('guardarian')}>
                    {getTranslation('openGuardarian', language)}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">{getTranslation('widgetPlaceholder', language)}</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => openExchangeInNewWindow('guardarian')}
                    >
                      {getTranslation('launchExchange', language)}
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="onramp" className="pt-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
                  <h3 className="font-medium text-green-800 dark:text-green-300">Onramp Money</h3>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    {getTranslation('onrampDesc', language)}
                  </p>
                  <Button className="mt-4" onClick={() => openExchangeInNewWindow('onramp')}>
                    {getTranslation('openOnramp', language)}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">{getTranslation('widgetPlaceholder', language)}</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => openExchangeInNewWindow('onramp')}
                    >
                      {getTranslation('launchExchange', language)}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Exchange;
