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
    Image: "/assets/Satyansh.png",
    href: "https://x.com/aykansal"
  },
  {
    name: "Satyansh",
    Image: "/assets/Ayush.png",
    href: "https://x.com/satyansh_mittal"
  },
  {
    name: "Rahul",
    Image: "/assets/Rahul.png",
    href: "https://x.com/Rahulsainlll"


  },
  {
    name: "Anukul",
    Image: "/assets/Anukul.png",
    href: "https://x.com/anukulKun"

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
          
              {profile.map((item, idx) => (
                <MenuListItem key={idx}>
                <span role="img" aria-label="📁">
                  <Image src={item.Image} alt="pussy" width={300} height={300}  className="size-8 mix-blend-color-burn mr-2"/>
                </span>
                <a href={item.href}>{item.name}</a>
              </MenuListItem>
              ))}
              
              <Separator />
             
            </MenuList>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
