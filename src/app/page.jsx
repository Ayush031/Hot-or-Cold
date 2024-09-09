"use client";
import LandingPage, { RatingButton } from "@/components/landing-page";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const [voted, setVoted] = useState(null); // null, "hot", or "cold"
  const [hotCount, setHotCount] = useState(0);
  const [coldCount, setColdCount] = useState(0);

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
    } else if (voted === "cold") {
      setColdCount((prev) => prev - 1);
    }

    if (vote === "hot") {
      setHotCount((prev) => prev + 1);
    } else {
      setColdCount((prev) => prev + 1);
    }
    setVoted(vote);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 w-full h-full">
      <h1 className="text-3xl font-bold my-8">Hot or Cold NFT Rating Game</h1>
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
    </div>
  );
};

export default Page;
