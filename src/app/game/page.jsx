"use client";

import { useEffect, useState } from "react";
import { useConnection } from "arweave-wallet-kit";
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { DisconnectButton, ConnectButton } from "@/components/Buttons";
import { Main } from "@/hooks/fetch";
import { useToast } from "@/hooks/use-toast";
import { ScrollView, Window, WindowContent, WindowHeader } from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { ProgressBar } from "react95";
import { Toolbar, Button, Separator } from "react95";
import { BazarIcon } from "@/components/icons";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const processId = "eCsIkWTiukzY23MBFi4t3V34ZvyMHC1rZcX18vsmwvg";

export default function Page() {
  const { toast } = useToast();
  const { connected } = useConnection();
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTokenPair, setCurrentTokenPair] = useState([null, null]);
  const [percent, setPercent] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await Main();
      setTokens(tokenList);
      if (tokenList.length > 1) {
        setCurrentTokenPair([tokenList[0], tokenList[1]]);
      }

      const loadTime = tokenList.length > 5 ? 2000 : 1000;
      setTimeout(() => {
        setIsLoading(false);
      }, loadTime);

      const progressInterval = setInterval(() => {
        setPercent((prevPercent) => {
          if (prevPercent >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prevPercent + 10;
        });
      }, 100);

      return () => clearInterval(progressInterval);
    };

    fetchTokens();
  }, []);

  const updateVote = async (selectedToken) => {
    if (isLoading) return;
    setIsLoading(true);

    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);

    try {
      await message({
        process: processId,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "Smash" }],
        data: `Send({Target=${processId},Action="Smash",Token=${selectedToken}})`,
      });
      toast({
        title: "Smash Success",
        description: "You successfully smashed the NFT.",
      });

      const newPair = tokens.slice(2);
      setTokens(newPair);
      if (newPair.length >= 2) {
        setCurrentTokenPair([newPair[0], newPair[1]]);
      } else {
        setCurrentTokenPair([null, null]); // No more tokens
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      toast({
        title: "Smash Error",
        description: "There was an error processing your smash.",
      });
      setIsLoading(false);
    }
  };

  const handleVisitWebsite = () => {
    window.open("https://example.com", "_blank");
  };

  return (
    <ThemeProvider theme={original}>
      <Window className="h-screen w-screen">
        <WindowHeader className="w-full">
          <span role="img" aria-label="Kiwi">
            🥝
          </span>
          BazARmash
        </WindowHeader>

        <Toolbar noPadding className="flex flex-wrap">
            <Link href={'https://bazar.arweave.dev'} target="_blank" >
          <Button variant="raised" className="flex items-center gap-3">
              <BazarIcon height={22} width={22} />
              <span>Bazar</span>
          </Button>
            </Link>
          {connected ? (
            <>
              <DisconnectButton variant={"raised"} />
              <Button
                variant="raised"
                onClick={() => setOpen(!open)}
                active={open}
              >
                Share
              </Button>
            </>
          ) : (
            <ConnectButton />
          )}
        </Toolbar>

        <WindowContent>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <ProgressBar value={percent} />
              <p className="text-black text-lg">Loading NFTs...</p>
            </div>
          ) : currentTokenPair[0] && currentTokenPair[1] ? (
            <div className="flex items-center gap-8">
              <Window>
                <WindowHeader className="flex justify-between items-center">
                  <span>NFT Name</span>
                  <ExternalLink />
                </WindowHeader>
                <div
                  className="w-80 h-80 bg-center bg-cover cursor-pointer"
                  style={{
                    backgroundImage: `url(https://arweave.net/${currentTokenPair[0]})`,
                  }}
                  onClick={() => updateVote(currentTokenPair[0])}
                />
              </Window>
              <ScrollView className="text-center">
                <div className="flex justify-center items-center gap-4">
                  <Button onClick={() => updateVote(currentTokenPair[0])}>
                    <ArrowBigLeftDash />
                  </Button>
                  <span>Smash</span>
                  <Button onClick={()=> updateVote(currentTokenPair[1])}>
                    <ArrowBigRightDash />
                  </Button>
                </div>
              </ScrollView>

              <Window>
                <WindowHeader className="flex justify-between items-center">
                  <span>NFT Name</span>
                  <ExternalLink />
                </WindowHeader>
                <ScrollView>
                  <div
                    className="w-80 h-80 bg-center bg-cover cursor-pointer"
                    style={{
                      backgroundImage: `url(https://arweave.net/${currentTokenPair[1]})`,
                    }}
                    onClick={() => updateVote(currentTokenPair[1])}
                  />
                </ScrollView>
              </Window>
            </div>
          ) : (
            <div className="text-white">No more NFTs to smash!</div>
          )}
        </WindowContent>
      </Window>
    </ThemeProvider>
  );
}
