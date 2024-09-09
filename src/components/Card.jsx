"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Card() {
  const [votes, setVotes] = useState(0);
  const handleUpvote = () => {
    setVotes(votes + 1);
  };
  const handleDownvote = () => {
    setVotes(votes - 1);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleViewDetails = () => {
    setIsModalOpen(!isModalOpen);
  };
//   const handleCloseModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };
  return (
    <div className="bg-background rounded-lg border p-6 w-full max-w-md flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`https://arweave.net/G8X-5ONebHu9lOo7q9Wx1wLpkIuHimf85oNXRBIdfz4`}
            width={64}
            height={64}
            alt="NFT Image"
            className="rounded-md"
            style={{ aspectRatio: "64/64", objectFit: "cover" }}
          />
          <div>
            <h3 className="text-lg font-semibold">Acme NFT</h3>
            <p className="text-muted-foreground text-sm">Acme Corporation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleUpvote}>
            <ThumbsUpIcon className="w-5 h-5 text-primary" />
            <span className="sr-only">Upvote</span>
          </Button>
          <div className="text-primary font-medium">{votes}</div>
          <Button variant="ghost" size="icon" onClick={handleDownvote}>
            <ThumbsDownIcon className="w-5 h-5 text-primary" />
            <span className="sr-only">Downvote</span>
          </Button>
        </div>
      </div>
      <Button variant="outline" onClick={handleViewDetails}>
        <EyeIcon className="w-4 h-4 mr-2" />
        View Details
      </Button>
      {isModalOpen && (
        <div>
          <div className="w[80vh] h-[70vh]">
            <iframe
              src={`https://bazar.arweave.dev/#/collection/${"LlNGeigpKQUO1eZ5Xn5t18VEyHjXYB7IniaQLTXTu1A"}/assets/`}
              frameBorder="0"
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ThumbsDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
