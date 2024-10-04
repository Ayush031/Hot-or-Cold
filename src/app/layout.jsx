import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "BazARmash",
  description: "Tinder of Atomic Assets (NFT's) on AO",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BazARmash</title>
      </head>
      <body
        className="overflow-hidden tracking-widest"
        style={{
          backgroundImage: "url('/assets/99.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      >
        <ArweaveWalletKit>
          <main>{children}</main>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ArweaveWalletKit>
      </body>
    </html>
  );
}
