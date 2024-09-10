"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useConnection } from "arweave-wallet-kit";
import LandingPage, { RatingButton } from "@/components/landing-page";
import {
  result,
  dryrun,
  connect,
  message,
  createDataItemSigner,
} from "@permaweb/aoconnect";

export default ()=> {
  const processId = "eCsIkWTiukzY23MBFi4t3V34ZvyMHC1rZcX18vsmwvg";
  const { connect, connected, disconnect } = useConnection();

  const handleConnectWallet = async () => {
    try {
      if (!window.arweaveWallet) return;
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
      ]);
      await message({
        process: processId,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [{ name: "Action", value: "Connect" }],
        data: `Send({Target=${processId},Action="Connect"})`,
      });
      // const res1 = await result({
      //   message: messageId,
      //   process: AoSmashProcess,
      // });
      // console.log(res1);
    } catch (e) {
      console.error(e);
    }
  };
  const handleDisconnectWallet = async () => {
    try {
      if (!window.arweaveWallet) return;
      await disconnect();
      // await message({
      //   process: processId,
      //   signer: aoSigner,
      //   tags: [{ name: "Action", value: "Disconnect" }],
      //   data: `Send({Target=${AoSmashProcess},Action="Disconnect"})`,
      // });
    } catch (e) {
      console.error("Error disconnecting wallet", e);
    }
  };

  const { toast } = useToast();
  const [voted, setVoted] = useState(null);
  const [hotCount, setHotCount] = useState(0);
  const [coldCount, setColdCount] = useState(0);

  /// AO Code

  const handleAoCold = async () => {
    if(!connected) return;
    try {
      const res = await dryrun({
        process: processId,
        tags: [{ name: "Action", value: "Vote" }],
        data: `Send({Target=${processId},Action="Vote",Vote=${hotCount}})`,
      });
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  ///

  const handleVoteCount = (vote) => {
    if (voted === vote) {
      toast({
        title: `Already Voted ${vote.charAt(0).toUpperCase() + vote.slice(1)}`,
        description: "You have already cast your vote.",
      });
      return;
    }

    if (voted === "hot") {
      setHotCount((prev) => prev - 1);
      handleAoCold(hotCount);
    } else if (voted === "cold") {
      handleAoCold((prev) => prev - 1);
      handleAoCold(coldCount);
    }

    if (vote === "hot") {
      handleAoCold((prev) => prev + 1);
      handleAoCold(hotCount);
    } else {
      handleAoCold((prev) => prev + 1);
      handleAoCold(coldCount);
    }
    setVoted(vote);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-screen bg-slate-900">
      {connected ? (
        <>
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-white text-3xl font-bold my-8">
              Hot or Cold NFT Rating Game
            </h1>
            <Button
              className="bg-black ring-4"
              onClick={handleDisconnectWallet}
            >
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
        <h1 className="text-white text-3xl font-bold my-8 flex gap-10">
          <span>Hot or Cold NFT Rating Game</span>
          <Button className="bg-black ring-4" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        </h1>
      )}
    </div>
  );
}
