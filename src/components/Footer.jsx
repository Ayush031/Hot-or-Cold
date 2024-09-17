"use client"

import { useState } from "react";
import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Toolbar,
} from "react95";
import OverlayWindow from "./OverlayWindow";
import Image from "next/image";

const profile = [
  {
    name: "Ayush",
    Image: "/assets/Satyansh.png"
  },
  {
    name: "Satyansh",
    Image: "/assets/Ayush.png"
  },
  {
    name: "Rahul",
    Image: "/assets/Rahul.png"
  },
  {
    name: "Anukul",
    Image: "/assets/Anukul.png"
  },
]

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar className="-translate-y-[100%] mt-[100vh]">
      {open && (
        <OverlayWindow >
        
        
        </OverlayWindow>
      )}

      <Toolbar style={{ justifyContent: "space-between" }}>
        <div
          style={{ position: "relative", display: "flex" }}
          className="w-full"
        >
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src={"/assets/images.png"}
              alt="react95 logo"
              style={{ height: "20px", marginRight: 4 }}
            />
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "-6px",
                top: "-120%",
                transform: "translateY(-80%)",
              }}
              onClick={() => setOpen(false)}
            >
              {/* <MenuListItem onClick={() => setOpen(false)}>
                <span className="mr-[1vw]" role="img" aria-label="👨‍💻">
                  👨‍💻
                </span>
                About us
              </MenuListItem> */}
              {profile.map((item, idx) => (
                <MenuListItem key={idx}>
                <span role="img" aria-label="📁">
                  <Image src={item.Image} alt="pussy" width={300} height={300}  className="size-8 mix-blend-color-burn mr-2"/>
                </span>
                <p>{item.name}</p>
              </MenuListItem>
              ))}
              
              <Separator />
              {/* <MenuListItem>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                <DisconnectButton variant={"thin"} />
              </MenuListItem> */}
            </MenuList>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
