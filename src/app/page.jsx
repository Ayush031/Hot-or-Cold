// App component
"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { useEffect, useState } from "react";
import { dryrun } from "@permaweb/aoconnect/browser";
import { processId } from "@/data";

export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [TokenScore, setTokenScore] = useState({});

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
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={original}>
      <div className="w-full h-screen">
        <Header tokenScore={TokenScore} />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
