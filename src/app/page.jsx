"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ConnectButton } from "@/components/Buttons";
import { ThemeProvider } from "styled-components";
import { useConnection } from "arweave-wallet-kit";
import original from "react95/dist/themes/original";

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
        <Header />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
