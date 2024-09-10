"use client";

import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ConnectButton, useConnection } from "arweave-wallet-kit";
import LandingPage, { RatingButton } from "@/components/landing-page";
import { message, createDataItemSigner } from "@permaweb/aoconnect";

const processId = "eCsIkWTiukzY23MBFi4t3V34ZvyMHC1rZcX18vsmwvg";

export default function Game() {
  const { toast } = useToast();
  const [voted, setVoted] = useState(null);
  const [hotCount, setHotCount] = useState(0);
  const [coldCount, setColdCount] = useState(0);
  const { connected, disconnect } = useConnection();

  const handleDisconnectWallet = async () => {
    try {
      if (!window.arweaveWallet) return;
      await disconnect();
    } catch (e) {
      console.error("Error disconnecting wallet", e);
    }
  };

  const updateVote = async (voteType) => {
    try {
      const count = voteType === "hot" ? hotCount : coldCount;
      await message({
        process: processId,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "Vote" }],
        data: `Send({Target=${processId},Action="Vote",Vote={${voteType}, count=${count}}})`,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleVoteCount = async (vote) => {
    if (voted === vote) {
      toast({
        title: `Already Voted ${vote.charAt(0).toUpperCase() + vote.slice(1)}`,
        description: "You have already cast your vote.",
      });
      return;
    }

    if (voted) {
      const voteAction = voted === "hot" ? setHotCount : setColdCount;
      voteAction((prev) => prev - 1);
      await updateVote(voted);
    }

    const newVoteAction = vote === "hot" ? setHotCount : setColdCount;
    newVoteAction((prev) => prev + 1);
    await updateVote(vote);

    setVoted(vote);
  };

  return (
    <div className="flex items-center justify-center">
      {connected ? (
        <>
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-white text-3xl font-bold my-8">
              Hot or Cold NFT Rating Game
            </h1>
            <Button className="bg-black ring-4" onClick={handleDisconnectWallet}>
              Disconnect Wallet
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <LandingPage hotCount={hotCount} coldCount={coldCount} />
            <div className="relative flex justify-center items-center w-full">
              <RatingButton
                outerClassName="relative flex justify-center items-center w-full"
                btnClass="basis-1/5 h-16"
                iconClass="h-auto w-8"
                onClickHot={() => handleVoteCount("hot")}
                onClickCold={() => handleVoteCount("cold")}
                voted={voted}
              />
            </div>
          </div>
        </>
      ) : (
        <ConnectButton
          profileModal={true}
          showBalance={false}
          showAddress={false}
          showProfilePicture={true}
        />
      )}
    </div>
  );
}
