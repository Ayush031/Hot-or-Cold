import { ConnectButton as Connect, useConnection } from "arweave-wallet-kit";
import { Button } from "react95";

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

export const DisconnectButton = ({ variant }) => {
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
      Disconnet Button
    </Button>
  );
};
