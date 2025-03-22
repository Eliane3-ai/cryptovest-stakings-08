
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useWalletData } from '@/hooks/useWalletData';

// Define a custom interface for the performance.memory object
interface MemoryInfo {
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
  totalJSHeapSize?: number;
}

// Extend the Performance interface
interface ExtendedPerformance extends Performance {
  memory?: MemoryInfo;
}

const Diagnostics: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [systemInfo, setSystemInfo] = useState<Record<string, any>>({});
  const { user, isLoading: authLoading } = useAuth();
  const { tokens, transactions } = useWalletData();

  useEffect(() => {
    // Collect system information
    const info = {
      userAgent: navigator.userAgent,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      online: navigator.onLine,
      authState: {
        isAuthenticated: !!user,
        isLoading: authLoading
      },
      dataState: {
        hasTokens: !!tokens?.length,
        tokenCount: tokens?.length || 0,
        transactionCount: transactions?.length || 0
      }
    };
    
    setSystemInfo(info);
    
    // Add log entry
    addLog('Diagnostics page initialized');
    
    const handleError = (event: ErrorEvent) => {
      addLog(`ERROR: ${event.message} at ${event.filename}:${event.lineno}`);
    };
    
    window.addEventListener('error', handleError);
    
    // Test key components
    testComponents();
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [user, authLoading, tokens, transactions]);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `[${new Date().toISOString()}] ${message}`]);
  };
  
  const testComponents = () => {
    try {
      addLog('Testing auth context...');
      if (user) {
        addLog('✅ User authenticated');
      } else if (authLoading) {
        addLog('⏳ Auth state loading');
      } else {
        addLog('❌ User not authenticated');
      }
      
      addLog('Testing wallet data...');
      if (tokens && tokens.length > 0) {
        addLog(`✅ Wallet has ${tokens.length} tokens`);
      } else {
        addLog('❌ No tokens in wallet');
      }
      
      if (transactions && transactions.length > 0) {
        addLog(`✅ Wallet has ${transactions.length} transactions`);
      } else {
        addLog('❌ No transactions in wallet');
      }
    } catch (error) {
      if (error instanceof Error) {
        addLog(`❌ Component test error: ${error.message}`);
      } else {
        addLog('❌ Unknown component test error');
      }
    }
  };
  
  const runMemoryTest = () => {
    addLog('Running memory usage test...');
    // Type assertion for performance object
    const extendedPerformance = performance as ExtendedPerformance;
    
    if (extendedPerformance && extendedPerformance.memory) {
      const memory = extendedPerformance.memory;
      addLog(`Memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB / ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`);
    } else {
      addLog('Memory API not available in this browser');
    }
  };
  
  const clearLogs = () => {
    setLogs([]);
    addLog('Logs cleared');
  };

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">System Diagnostics</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="bg-[#1E2329] border-[#474D57] text-white">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription className="text-gray-400">Details about your browser and system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(systemInfo).map(([key, value]) => (
                  <div key={key}>
                    <div className="font-medium text-[#F0B90B]">{key}:</div>
                    <div className="text-sm text-gray-300">
                      {typeof value === 'object' 
                        ? JSON.stringify(value, null, 2) 
                        : String(value)}
                    </div>
                    <Separator className="my-2 bg-gray-700" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#1E2329] border-[#474D57] text-white">
            <CardHeader>
              <CardTitle>Diagnostic Logs</CardTitle>
              <CardDescription className="text-gray-400">Real-time application logs</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80 rounded-md border border-gray-700 p-2">
                <div className="space-y-1 font-mono text-xs">
                  {logs.map((log, i) => (
                    <div key={i} className={`
                      ${log.includes('ERROR') ? 'text-red-400' : ''}
                      ${log.includes('✅') ? 'text-green-400' : ''}
                      ${log.includes('❌') ? 'text-red-400' : ''}
                      ${log.includes('⏳') ? 'text-yellow-400' : ''}
                    `}>
                      {log}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="gap-2">
              <Button onClick={runMemoryTest} variant="outline" size="sm">
                Run Memory Test
              </Button>
              <Button onClick={testComponents} variant="outline" size="sm">
                Retest Components
              </Button>
              <Button onClick={clearLogs} variant="outline" size="sm">
                Clear Logs
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={() => {
              addLog('Forcing page reload...');
              window.location.reload();
            }}
            className="bg-[#F0B90B] text-black hover:bg-[#F0B90B]/80"
          >
            Force Reload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
