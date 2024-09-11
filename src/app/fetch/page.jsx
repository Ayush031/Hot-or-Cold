"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
// import asset from "@/data"
import {Main} from "@/hooks/fetch"

// import { dryrun } from "@permaweb/aoconnect";
export default function Page() {

  const[token, setToken] = useState([])
  const [imageUrls, setImageUrls] = useState([]);


  useEffect(() => {
    const fetchData = async () =>{
      const result = await Main();
      setToken(result);
    }

    fetchData()
  },[])


console.log(token)



  useEffect(() => {
    // Function to fetch image URLs for each NFT token
    const fetchImageUrls = async () => {
      const urls = token.map((nft) => `https://arweave.net/${nft}`);
      
      setImageUrls(urls);
    };

    if(token.length > 0) {
    fetchImageUrls();
      
    }

  }, [token]);

  console.log(imageUrls[2])

  return (
    <div className="text-white w-full  flex flex-wrap gap-3">
      {token.map((nft, index) => (
        <div key={index} className="mb-4 size-12">
          {imageUrls[index] && (
            <Image
              src={imageUrls[index]} // Use the image URL from the state
              alt={`NFT Image ${index}`} // Alt text for the image
              unoptimized={true}
              width={500} // Example width, adjust as needed
              height={500} // Example height, adjust as needed
            />
          )}
          {/* <p>Token: {nft}</p> */}
          {/* <p>Creator: {nft.Creator}</p>
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
          </p> */}
        </div>
      ))}
    </div>
  );
}
