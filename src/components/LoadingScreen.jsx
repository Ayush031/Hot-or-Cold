"use client";
import { useState, useEffect } from "react";

import { Frame, ProgressBar, Window } from "react95";

import React from "react";
import {
  Button,

  Toolbar,

  WindowContent,
  WindowHeader,
} from "react95";


export default function Tile() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((previousPercent) => {
        if (previousPercent === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(previousPercent + diff, 100);
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="w-full h-screen flex justify-center translate-y-[45%]">
      <div>
        <Window resizable className="window w-[50vw] h-[15vh]">
          <WindowHeader className="window-title flex items-center justify-between">
            <span>loading.exe</span>
            <Button>
              <span className="close-icon" > X</span>
            </Button>
          </WindowHeader>
          <WindowContent>
          <ProgressBar variant="tile" value={Math.floor(percent)} />
           
          </WindowContent>

          
        </Window>
      </div>

     
    </div>
  );
}
