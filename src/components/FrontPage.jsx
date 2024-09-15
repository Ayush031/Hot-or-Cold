import React from "react";
import Footer from "./Footer";
import { ConnectButton, DisconnectButton } from "./Buttons";

function FrontPage() {
  return (
    <div className="h-screen w-full">

      <div className="ml-[100%] -translate-x-[110%] -translate-y-[-2%] h-screen w-fit ">
        <ConnectButton />
        {/* <DisconnectButton/> */}
      </div>

      <Footer />
    </div>
  );
}

export default FrontPage;
