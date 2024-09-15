import React from "react";
import Footer from "./Footer";
import { ConnectButton, DisconnectButton } from "./Buttons";
import { Anchor } from "react95";
import WindowAfter from "./WindowAfter"
// import myIcon from "../../public/assets/images.png"




function FrontPage() {
  return (
    <div className="h-screen w-full">

      {/* <div className="ml-[100%] -translate-x-[110%] -translate-y-[-2%] h-screen w-fit ">
        <ConnectButton />
      </div> */}
      <div className="">

      <WindowAfter />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default FrontPage;
