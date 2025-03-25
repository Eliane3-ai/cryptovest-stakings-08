
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { GasFeeProvider } from "./contexts/GasFeeContext";
import { ChatProvider } from "./contexts/ChatContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

// Route wrappers
import PublicRoute from "./components/route/PublicRoute";
import ProtectedRoute from "./components/route/ProtectedRoute";
import AdminRoute from "./components/route/AdminRoute";

// Public Pages
import LandingPage from "./features/landing";
import Auth from "./features/auth";
import Contact from "./features/contact";

// Protected Pages
import Wallet from "./features/wallet";
import Settings from "./features/settings";

// Admin Pages
import Admin from "./features/admin";
import AdminLogin from "./components/admin/AdminLogin";

// Legacy pages (to be moved to feature folders later)
import Market from "./pages/Market";
import Analytics from "./pages/Analytics";
import Exchange from "./pages/Exchange";
import Deposit from "./pages/Deposit";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import Winners from "./pages/Winners";
import WalletAddress from "./pages/WalletAddress";
import Referral from "./pages/Referral";
import Diagnostics from "./pages/Diagnostics";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <LanguageProvider>
          <GasFeeProvider>
            <ChatProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    {/* Public Routes - accessible without authentication */}
                    <Route element={<PublicRoute />}>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                    </Route>
                    
                    {/* Protected Routes - require authentication */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/wallet" element={<Wallet />} />
                      <Route path="/market" element={<Market />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/exchange" element={<Exchange />} />
                      <Route path="/deposit" element={<Deposit />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/referral" element={<Referral />} />
                      <Route path="/winners" element={<Winners />} />
                      <Route path="/wallet-address" element={<WalletAddress />} />
                      <Route path="/diagnostics" element={<Diagnostics />} />
                    </Route>

                    {/* Admin Routes - require admin authentication */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<Admin />} />
                    </Route>

                    {/* Redirect to auth if not matched */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </ChatProvider>
          </GasFeeProvider>
        </LanguageProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
