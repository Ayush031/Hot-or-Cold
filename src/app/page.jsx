// App component
"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
<<<<<<< HEAD
import LoadingScreen from "../components/LoadingScreen";

export default function App() {
  const { connected } = useConnection();
  const [isConnected, setIsConnected] = useState(false);
  const [showLoading, setShowLoading] = useState(true); // State for managing LoadingScreen visibility
=======
import { useEffect, useState } from "react";
import { dryrun } from "@permaweb/aoconnect/browser";
import { processId } from "@/data";

export default function App() {
  const [TokenScore, setTokenScore] = useState({});
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c

  useEffect(() => {
    const GetScore = async () => {
      try {
        const result = await dryrun({
          process: processId,
          tags: [{ name: "Action", value: "Get" }],
        });

        if (result.Messages[0].Data) {
          const Scores = JSON.parse(result.Messages[0].Data);
          setTokenScore(Scores);
        } else {
          console.error("No data found in result.Messages");
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    GetScore();
  }, [TokenScore]);

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
<<<<<<< HEAD
        {showLoading && <LoadingScreen />} {/* Conditionally render LoadingScreen */}
        <Header />
=======
        <Header tokenScore={TokenScore} />
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c
        <Footer />
      </div>
    </ThemeProvider>
  );
}
