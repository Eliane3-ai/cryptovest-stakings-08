
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GasFeeProvider } from "./contexts/GasFeeContext";
import { ChatProvider } from "./contexts/ChatContext";
import Index from "./pages/Index";
import Market from "./pages/Market";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import WalletConnect from "./pages/WalletConnect";
import Exchange from "./pages/Exchange";
import Deposit from "./pages/Deposit";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Winners from "./pages/Winners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <GasFeeProvider>
        <ChatProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/market" element={<Market />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/wallet-connect" element={<WalletConnect />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/winners" element={<Winners />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ChatProvider>
      </GasFeeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
