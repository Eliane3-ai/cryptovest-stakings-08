
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GasFeeProvider } from "./contexts/GasFeeContext";
import { ChatProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import Wallet from "./pages/Index";
import Market from "./pages/Market";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import WalletConnect from "./pages/WalletConnect";
import Exchange from "./pages/Exchange";
import Deposit from "./pages/Deposit";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Winners from "./pages/Winners";
import WalletAddress from "./pages/WalletAddress";
import Referral from "./pages/Referral";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import AiAssistant from "./components/AiAssistant";
import AuthGuard from "./components/AuthGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <GasFeeProvider>
          <ChatProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes - accessible without authentication */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/market" element={<Market />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/referral" element={<Referral />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Protected Routes - require authentication */}
                  <Route element={<AuthGuard />}>
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/wallet-connect" element={<WalletConnect />} />
                    <Route path="/exchange" element={<Exchange />} />
                    <Route path="/deposit" element={<Deposit />} />
                    <Route path="/winners" element={<Winners />} />
                    <Route path="/wallet-address" element={<WalletAddress />} />
                  </Route>

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                {/* AI Assistant is globally available */}
                <AiAssistant />
              </BrowserRouter>
            </TooltipProvider>
          </ChatProvider>
        </GasFeeProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
