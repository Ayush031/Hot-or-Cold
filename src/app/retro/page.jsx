"use client";

import { useState } from "react";
import {
  Window,
  WindowHeader,
  Toolbar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  WindowContent,
  ScrollView,
} from "react95";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import {
  AlignLeftIcon,
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRightDash,
} from "lucide-react";
import { Thin } from "@/components/retro/Button";

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={original}>
      <div className="p7 h-screen w-screen">
        <div className={"h-full w-full"}>
          <Window className="h-full  w-full">
            <WindowHeader>
              <span role="img" aria-label="Kiwi">
                🥝
              </span>
              BazARmash
            </WindowHeader>
            {/* <Toolbar noPadding>
              <Button variant="thin" disabled>
                Upload
              </Button>
              <Button variant="thin" disabled>
                Save
              </Button>
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <Button
                  variant="thin"
                  onClick={() => setOpen(!open)}
                  size="sm"
                  active={open}
                >
                  Share
                </Button>
                {open && (
                  <MenuList
                    style={{
                      position: "absolute",
                      right: "0",
                      top: "100%",
                      zIndex: 9999,
                    }}
                    onClick={() => setOpen(false)}
                  >
                    <MenuListItem size="sm">Copy link</MenuListItem>
                    <Separator />
                    <MenuListItem size="sm">Facebook</MenuListItem>
                    <MenuListItem size="sm">Twitter</MenuListItem>
                    <MenuListItem size="sm">Instagram</MenuListItem>
                    <Separator />
                    <MenuListItem size="sm" disabled>
                      MySpace
                    </MenuListItem>
                  </MenuList>
                )}
              </div>
            </Toolbar> */}
            <WindowContent className="flex justify-center items-center gap-5">
              <ScrollView className="basis-1/3">
                <img
                  style={{ width: "100%", height: "auto", display: "block" }}
                  src={
                    "https://imgs.search.brave.com/JhDYzZoF9Y1GAZ-yDtzFUXG94pLS9XXPzrjd77R3x2s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQLzEwNTg4/MzQ2MTYuanBn"
                  }
                  alt="kiwi"
                />
                Details
              </ScrollView>
              <ScrollView className="text-center">
                <div className="flex justify-center items-center gap-4">
                  <Button>
                    <ArrowBigLeftDash />
                  </Button>
                  <span>Smash</span>
                  <Button>
                    <ArrowBigRightDash />
                  </Button>
                </div>
              </ScrollView>
              <ScrollView className="basis-1/3">
                <img
                  style={{ width: "100%", height: "auto", display: "block" }}
                  src={
                    "https://imgs.search.brave.com/JhDYzZoF9Y1GAZ-yDtzFUXG94pLS9XXPzrjd77R3x2s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvUGhv/dG9GVExQLzEwNTg4/MzQ2MTYuanBn"
                  }
                  alt="kiwi"
                />
                Details
              </ScrollView>
            </WindowContent>
          </Window>
        </div>
      </div>
    </ThemeProvider>
  );
};
