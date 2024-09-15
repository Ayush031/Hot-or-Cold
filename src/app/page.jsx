"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ConnectButton } from "@/components/Buttons";
import { ThemeProvider } from "styled-components";
import { useConnection } from "arweave-wallet-kit";
import original from "react95/dist/themes/original";
import AppSelector from "@/components/AppSelector";
import DesktopApp from "@/components/DesktopApp";
import BrowserWindow from "@/components/BrowserWindow";
import { Monitor } from "react95";

export default function App() {
  const { connected } = useConnection();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (connected) {
      setIsConnected(true);
    }
  }, [connected]);

  return (
    <ThemeProvider theme={original}>
      <div className="w-full h-screen">
        {isConnected ? (
          <div>
            <Header />
            <Footer />
          </div>
        ) : (
          <>
            <div className="bg-black/50 flex items-center justify-center h-full w-full">
              <Monitor>
                <div className="flex flex-col items-center justify-center h-full" >                  
                  <ConnectButton />
                </div>
              </Monitor>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
