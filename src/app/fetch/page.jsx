"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import asset from "@/data"

export default function Page() {
  // const nfts = [
  //   {
  //     Token: "FfwCUcfrXGIgwFvoocLH2TGlqy3oZuwq9LhFeFDkP4o",
  //     OriginalQuantity: "2",
  //     Price: "1000000000000",
  //     Id: "MW6uASOq8JquGoG2QqD6Xi2Y03KExLSARbVRDjSQz0s",
  //     Creator: "xCuJwYWBUnZcrsZwKSrxu3cthWEjwxLkY-N6q_-Sr9s",
  //     DateCreated: 1725098527817,
  //     Quantity: "2",
  //   },
  //   {
  //     Token: "FfwCUcfrXGIgwFvoocLH2TGlqy3oZuwq9LhFeFDkP4o",
  //     OriginalQuantity: "3",
  //     Price: "1000000000000",
  //     Id: "0uUsX0gNbXCX52MxAruXLOpC4-UOYLt2Sjrlj1qxulA",
  //     Creator: "fPC1LwA56ulfle_joad3FKrCFP4yCiLtGzwUjUzGBB8",
  //     DateCreated: 1724853537561,
  //     Quantity: "3",
  //   },
  //   // More NFT objects...
  // ];

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // Function to fetch image URLs for each NFT token
    const fetchImageUrls = async () => {
      const urls = asset.map((nft) => `https://arweave.net/${nft.Token}`);
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [asset]);

  return (
    <div className="text-white">
      {asset.map((nft, index) => (
        <div key={index} className="mb-4">
          {imageUrls[index] && (
            <Image
              src={imageUrls[index]} // Use the image URL from the state
              alt={`NFT Image ${index}`} // Alt text for the image
              width={500} // Example width, adjust as needed
              height={500} // Example height, adjust as needed
            />
          )}
          <p>ID: {nft.Id}</p>
          <p>Creator: {nft.Creator}</p>
          <p>Quantity: {nft.Quantity}</p>
          <p>Price: {nft.Price}</p>
          <p>
            Token URL:{" "}
            <a
              href={imageUrls[index]}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Token
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
