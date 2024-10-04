"use client";

import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import { dryrun } from "@permaweb/aoconnect/browser";
import {
  Frame,
  Window,
  Button,
  ScrollView,
  WindowHeader,
  WindowContent,
} from "react95";
import { LeaderBoardApp, BazarApp, AboutApp } from "./DesktopApps";
import Link from "next/link";

export default function OverlayWindow({
  app,
  onClose,
  position,
  index,
  tokenscore,
}) {
  const [TokenScores, setTokenScores] = useState({});

  useEffect(() => {
    const GetScore = async () => {
      try {
        const result = await dryrun({
          process: "P0Hw4GQzawz8y6Jk4JhGxGkpi7sz6cvk0bmvXu_UwSs",
          tags: [{ name: "Action", value: "Get" }],
        });
        if (result.Messages[0].Data) {
          const Scores = JSON.parse(result.Messages[0].Data);
          setTokenScores(Scores);
        } else {
          console.error("No data found in result.Messages");
        }
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    GetScore();
  }, [TokenScores]);

  // const [bounds, setBounds] = useState({
  //   left: 0,
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  // });

  // useEffect(() => {
  //   const updateBounds = () => {
  //     const screenWidth = window.innerWidth;
  //     const screenHeight = window.innerHeight;
  //     const windowWidth = 400;
  //     const windowHeight = 300;

  //     setBounds({
  //       left: 0,
  //       top: 0,
  //       right: screenWidth - windowWidth,
  //       bottom: screenHeight - windowHeight,
  //     });
  //   };

  //   updateBounds();
  //   window.addEventListener("resize", updateBounds);

  //   return () => {
  //     window.removeEventListener("resize", updateBounds);
  //   };
  // }, []);

  const leaderboardData =
    tokenscore && typeof tokenscore === "object"
      ? Object.entries(tokenscore).map(([id, score]) => ({
          id,
          score,
          name: id,
          nftToken: "N/A",
          popularity: score,
        }))
      : [];

  if (!app) return null;

  return (
    <Draggable handle=".window-header" defaultPosition={position}>
      <Window
        className={`absolute window-header
           ${app.name === "LeaderBoard" && "w-[900px] h-[550px]"}
           ${app.name === "About" && "w-[900px] h-[550px]"}
           ${app.name === "Bazar" && "w-[800px] h-[650px]"}
        `}
        style={{ zIndex: index + 1 }}
      >
        <Frame className="w-full h-[8%] p-px">
          <WindowHeader className="flex justify-between items-center">
            <span>{app.name}</span>
            <Button onClick={() => onClose(app)}>
              <X />
            </Button>
          </WindowHeader>
        </Frame>
        <ScrollView className="h-[92%] overflow-hidden">
          <WindowContent className="p-4 flex ">
            {app.name === "About" && <AboutApp />}
            {app.name === "LeaderBoard" && (
              <LeaderBoardApp TokenScores={TokenScores} />
            )}
            {app.name === "Bazar" && <BazarApp />}
          </WindowContent>
        </ScrollView>
      </Window>
    </Draggable>
  );
}
