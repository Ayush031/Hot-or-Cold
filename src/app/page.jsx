"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { useEffect, useState } from "react";
import { dryrun } from "@permaweb/aoconnect/browser";
import { processId } from "@/data";
import { useConnection } from "arweave-wallet-kit";
import { Window, WindowContent, WindowHeader } from "react95";
import { ConnectButton } from "@/components/Buttons";
import { Frown } from "lucide-react";

export default function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [TokenScore, setTokenScore] = useState({});
  const { connected } = useConnection();

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
        {connected ? (
          <Header tokenScore={TokenScore} />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-black/35">
            <Window>
              <WindowHeader
                className="
              flex items-center justify-between gap-7 "
              >
                <span>Access Denied</span>
                <Frown />
              </WindowHeader>
              <div className="py-2 flex items-center justify-center">
                <WindowContent>
                  <ConnectButton />
                </WindowContent>
              </div>
            </Window>
          </div>
        )}
        <Footer />
      </div>
    </ThemeProvider>
  );
}
