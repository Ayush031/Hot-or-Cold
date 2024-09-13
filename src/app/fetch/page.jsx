// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Main } from "@/hooks/fetch";

export default function Page() {
  // const [token, setToken] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await Main();
  //     setToken(result);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchImageUrls = async () => {
  //     const urls = token.map((nft) => `https://arweave.net/${nft}`);
  //     setImageUrls(urls);
  //   };
  //   if (token.length > 0) {
  //     fetchImageUrls();
  //   }
  // }, [token]);

  return (
    <div className="text-white w-full flex flex-wrap gap-3">
      {/* {token.map((nft, index) => (
        <div key={index} className="mb-4 size-12">
          {imageUrls[index] && (
            <Image
              src={imageUrls[index]}
              alt={`NFT Image ${index}`}
              unoptimized={true}
              width={500}
              height={500}
            />
          )}
        </div>
      ))} */}
    </div>
  );
}
