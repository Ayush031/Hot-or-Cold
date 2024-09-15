import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ArweaveWalletKit } from "arweave-wallet-kit";

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
        className=" overflow-hidden"
        style={{
          backgroundImage: "url('/assets/99.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <ArweaveWalletKit>
          <main>{children}</main>
          <Toaster />
        </ArweaveWalletKit>
      </body>
    </html>
  );
}
