"use client";
import React from "react";
import { ThemeProvider } from "styled-components";
import original from "react95/dist/themes/original";
import {
  Button,
  Frame,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import { X } from "lucide-react";

export default function Default() {
  return (
    <>
      <ThemeProvider theme={original}>
        <Window resizable className="w-full h-screen">
          <WindowHeader className="flex justify-between items-center">
            <span>game.exe</span>
            <Button>
              <X />
            </Button>
          </WindowHeader>

          <WindowContent className="">
            <div>code to bring game here</div>
          </WindowContent>
        </Window>
      </ThemeProvider>
    </>
  );
}
