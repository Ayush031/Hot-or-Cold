"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useConnection } from "arweave-wallet-kit";
import { ConnectButton } from "@/components/Buttons";
import FrontPage from "../components/FrontPage"
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";


export default function LandingPage() {
  const { connected } = useConnection();

  return (
    // <div className="flex items-center justify-center h-full text-center">
    //   <section className="text-center flex items-center justify-center flex-col">
    //     <h1 className="text-white text-3xl font-bold my-8">
    //       Tinder of NFTs on Arweave {"(AO)"}
    //     </h1>
    //     {connected ? (
    //       <Link href="/game">
    //         <Button className="bg-black ring-4">Explore AO-Smash</Button>
    //       </Link>
    //     ) : (
    //       <ConnectButton />
    //     )}
    //   </section>
    // </div>
    
      <ThemeProvider theme={original}>
        <div className="w-full h-screen">
      <FrontPage/>
      </div>
      </ThemeProvider>
  );
}
