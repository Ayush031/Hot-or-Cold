"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useConnection } from "arweave-wallet-kit";
import VoteButton from "@/components/LoadingButton";
import { message, createDataItemSigner } from "@permaweb/aoconnect";
import { DisconnectButton, ConnectButton } from "@/components/Buttons";
import { Main } from "@/hooks/fetch";

const processId = "eCsIkWTiukzY23MBFi4t3V34ZvyMHC1rZcX18vsmwvg";

export default function Page() {
  const { toast } = useToast();
  const { connected } = useConnection();

  const [popularityIndex, setPopularityIndex] = useState(0);
  const [voted, setVoted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [currentTokenIndex, setCurrentTokenIndex] = useState(0);

  useEffect(() => {
    const fetchTokens = async () => {
      const tokenList = await Main();
      setTokens(tokenList);
      if (tokenList.length > 0) {
        setCurrentTokenIndex(0);
      }
    };

    fetchTokens();
  }, []);

  const updateVote = async (voteType, popularityChange) => {
    if (isLoading) return;
    setIsLoading(true);
    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION"]);

    try {
      await message({
        process: processId,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "Vote" }],
        data: `Send({Target=${processId},Action="Vote",Vote={${voteType},PopularityIndex=${popularityIndex}}})`,
      });
      toast({
        title: `Voted ${voteType.charAt(0).toUpperCase() + voteType.slice(1)}`,
        description: "Your vote has been cast.",
      });

      setIsLoading(false);
    } catch (e) {
      console.error(e);
      toast({
        title: "Vote Error",
        description: "There was an error casting your vote.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoteCount = async (vote) => {
    if (isLoading) return;

    if (voted === vote) {
      toast({
        title: `Already Voted ${vote.charAt(0).toUpperCase() + vote.slice(1)}`,
        description: "You have already cast your vote.",
      });
      return;
    }

    let newPopularityIndex = popularityIndex;
    if (voted) {
      // User has already voted, so adjust the popularity index back
      newPopularityIndex =
        vote === "hot" ? popularityIndex - 1 : popularityIndex + 1;
      await updateVote(voted, newPopularityIndex);
    }

    // Adjust popularity index for the new vote
    newPopularityIndex =
      vote === "hot" ? popularityIndex + 1 : popularityIndex - 1;
    setPopularityIndex(newPopularityIndex);
    await updateVote(vote, newPopularityIndex);

    setVoted(vote);
  };

  const handleNextToken = () => {
    if (tokens.length === 0) return;
    setCurrentTokenIndex((prevIndex) => (prevIndex + 1) % tokens.length);
  };

  const currentToken = tokens[currentTokenIndex] || "";

  return (
    <div className="flex flex-col items-center justify-center gap-16">
      {connected ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <h1 className="my-8 text-3xl font-bold text-white">
              Hot or Cold NFT Rating Game
            </h1>
            <DisconnectButton />
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-10">
            <div className="relative flex items-center justify-center gap-10 w-80 mx-xd h-80">
              <div
                className="w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: `url(https://arweave.net/${currentToken})`,
                }}
              />
              
              <button
                onClick={handleNextToken}
                className="p-2 mt-4 text-white bg-blue-500 rounded"
              >
                Next Image
              </button>
              
            </div>
            <div className="relative flex items-center justify-center w-full gap-10 mt-4">
              <VoteButton
                label="Hot"
                isLoading={isLoading && voted === "hot"}
                onClick={() => handleVoteCount("hot")}
              />
              <VoteButton
                label="Cold"
                isLoading={isLoading && voted === "cold"}
                onClick={() => handleVoteCount("cold")}
              />
            </div>
            <div className="mt-4 text-white">
              Popularity Index: {popularityIndex}
            </div>
          </div>
        </>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}
