
import React from 'react';
import { Menu } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import MainSidebar from "@/components/MainSidebar";

const AppHeader: React.FC = () => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-muted">
              <Menu className="h-6 w-6" />
            </button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <MainSidebar />
          </DrawerContent>
        </Drawer>
        <h1 className="text-xl font-bold">CryptoWallet</h1>
      </div>
    </div>
  );
};

export default AppHeader;
