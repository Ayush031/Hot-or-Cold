import { Button } from "./ui/button";
import { ConnectButton as Connect, useConnection } from "arweave-wallet-kit";

export const ConnectButton = () => {
  return (
    <Connect
      profileModal={true}
      showBalance={false}
      showAddress={false}
      showProfilePicture={true}
    />
  );
};

export const DisconnectButton = () => {
  const { disconnect } = useConnection();

  const handleDisconnectWallet = async () => {
    try {
      if (!window.arweaveWallet) return;
      await disconnect();
    } catch (e) {
      console.error("Error disconnecting wallet", e);
    }
  };

  return (
    <Button className="bg-black ring-4" onClick={handleDisconnectWallet}>
      Disconnect Wallet
    </Button>
  );
};
