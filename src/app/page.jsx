"use client";

import { useConnection } from "arweave-wallet-kit";
import Header from "../components/Header";;
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { ConnectButton } from "@/components/Buttons";
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
          <Header />
        ) : (
          <>
            <div>
              <ConnectButton />
            </div>
          </>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
