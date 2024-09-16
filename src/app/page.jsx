"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "styled-components";
import { useConnection } from "arweave-wallet-kit";
import original from "react95/dist/themes/original";
import LoadingScreen from "../components/LoadingScreen";

export default function App() {
  const { connected } = useConnection();
  const [isConnected, setIsConnected] = useState(false);
  const [showLoading, setShowLoading] = useState(true); // State for managing LoadingScreen visibility

  useEffect(() => {
    if (connected) {
      setIsConnected(true);
    }
  }, [connected]);

  useEffect(() => {
    // Set timeout to hide the LoadingScreen after 10 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 10000); // 10 seconds

    // Clear the timeout if the component unmounts or if the effect re-runs
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={original}>
      <div className="w-full h-screen">
        {showLoading && <LoadingScreen />} {/* Conditionally render LoadingScreen */}
        <Header />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
