
import React from 'react';
import { Menu, MessageCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MainSidebar from "@/components/MainSidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useChatContext } from "@/contexts/ChatContext";

const AppHeader: React.FC = () => {
  const { notification } = useChatContext();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="p-2 rounded-lg bg-[#2B3139] hover:bg-[#2B3139]/80 text-white">
              <Menu className="h-6 w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh] bg-[#0B0E11] border-t border-[#474D57] text-white">
            <MainSidebar />
            
            <div className="px-4 mt-4 space-y-2">
              <h3 className="text-sm font-medium text-white/60 px-3">Communication</h3>
              
              <Link to="/chat" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-[#2B3139] transition-colors">
                <div className="relative">
                  <MessageCircle className="h-5 w-5 text-[#F0B90B]" />
                  {notification.count > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {notification.count > 99 ? '99+' : notification.count}
                    </Badge>
                  )}
                </div>
                <span className="font-medium">Live Chat</span>
              </Link>
              
              <Link to="/winners" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/80 hover:bg-[#2B3139] transition-colors">
                <Trophy className="h-5 w-5 text-[#F0B90B]" />
                <span className="font-medium">Winners</span>
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
        <h1 className="text-xl font-bold">CryptoWallet</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Link to="/chat">
          <Button variant="outline" size="sm" className="relative hidden sm:flex items-center gap-1 border-[#474D57] bg-[#2B3139] text-white hover:bg-[#2B3139]/80">
            <MessageCircle className="h-4 w-4 text-[#F0B90B]" />
            <span>Chat</span>
            {notification.count > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                {notification.count > 9 ? '9+' : notification.count}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AppHeader;
