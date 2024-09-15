"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Main } from "@/hooks/fetch";
import { useToast } from "@/hooks/use-toast";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import { ConnectButton } from "@/components/Buttons";
import { useConnection } from "arweave-wallet-kit";
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { dryrun } from "@permaweb/aoconnect";
import {
  ScrollView,
  Window,
  WindowContent,
  WindowHeader,
  Toolbar,
  Button,
  Separator,
  ProgressBar,
} from "react95";
import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const processId = "qXjKuUAqnzi9vXmGgZ-U3KExQv1J8UqQ-zZYDwfYCHQ";

export default function Page() {
  const { toast } = useToast();
  const { connected } = useConnection();
  const [tokens, setTokens] = useState([]);
  const [percent, setPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTokenPair, setCurrentTokenPair] = useState([null, null]);
  const [percent, setPercent] = useState(0);
  const [TokenScore, setTokenScore] = useState({});

  // Fetch tokens and manage progress bar
  useEffect(() => {
    const fetchTokens = async () => {
      // Pass current tokens to exclude them from the next fetch
      const tokenList = await Main(tokens);

      if (tokenList.length > 1) {
        const randomIndexes = [];
        while (randomIndexes.length < 2 && tokenList.length > 0) {
          const index = Math.floor(Math.random() * tokenList.length);
          if (!randomIndexes.includes(index)) {
            randomIndexes.push(index);
          }
        }
        setCurrentTokenPair([
          tokenList[randomIndexes[0]],
          tokenList[randomIndexes[1]],
        ]);
      } else {
        setCurrentTokenPair([null, null]);
      }

      const loadTime = tokenList.length > 5 ? 2000 : 1000;
      const totalDuration = 2000; // Total duration for the progress bar in ms

      // Set the interval for updating the progress bar
      const progressInterval = setInterval(() => {
        setPercent((prevPercent) => {
          if (prevPercent >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prevPercent + (100 * 100 / totalDuration / (loadTime / 100));
        });
      }, 100);

      // Simulate the loading process
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(progressInterval);
      }, loadTime);

      return () => clearInterval(progressInterval);
    };

    fetchTokens();
  }, []);

  // Fetch leaderboard scores
  useEffect(() => {
    const GetScore = async () => {
      try {
        const result = await dryrun({
          process: processId,
          tags: [{ name: "Action", value: "Get" }],
        });

        if (result.Messages[0].Data) {
          const Scores = JSON.parse(result.Messages[0].Data);
          console.log(Scores);
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
    console.log("TokenScore:", TokenScore);
  }, [TokenScore]);

  // Update vote when smashed
  const updateVote = async (selectedToken) => {
    if (isLoading) return;
    setIsLoading(true);

    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);

    try {
      await message({
        process: processId,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "smash" }],
        data: selectedToken,
      });
      toast({
        title: "Smash Success",
        description: "You successfully smashed the NFT.",
      });

      const response = await dryrun({
        process: processId,
        action: "GetSmashedTokens",
        tags: [{ name: "Query", value: "GetTokens" }],
      });

      console.log(response);

      const newPair = tokens.filter((token) => token !== selectedToken);
      setTokens(newPair);

      // Trigger new random token pair
      const newTokenList = await Main(newPair);
      if (newTokenList.length > 1) {
        const randomIndexes = [];
        while (randomIndexes.length < 2 && newTokenList.length > 0) {
          const index = Math.floor(Math.random() * newTokenList.length);
          if (!randomIndexes.includes(index)) {
            randomIndexes.push(index);
          }
        }
        setCurrentTokenPair([
          newTokenList[randomIndexes[0]],
          newTokenList[randomIndexes[1]],
        ]);
      } else {
        setCurrentTokenPair([null, null]);
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

  return (
    <ThemeProvider theme={original}>
      <Window className="h-screen w-screen">
        <WindowHeader className="w-full">
          <span role="img" aria-label="Kiwi">
            🥝
          </span>
          BazARmash
        </WindowHeader>
        <Toolbar
          noPadding
          className="flex flex-wrap justify-between items-center my-1 mx-10"
        >
          <Link href="https://bazar.arweave.dev" target="_blank">
            <Button variant="raised" className="flex items-center gap-3">
              <BazarIcon height={22} width={22} />
              <span>Bazar</span>
            </Button>
          </Link>
          <ConnectButton />
        </Toolbar>
        <Separator />
        <WindowContent className="flex justify-center">
          {isLoading ? (
            <div className="w-full text-center">
              <ProgressBar value={percent} width="100%" />
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
                  <Button onClick={() => updateVote(currentTokenPair[1])}>
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
        <Separator />
      </Window>
    </ThemeProvider>
  );
}
