"use client";

import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import {
  Button,
  Frame,
  ScrollView,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import Image from "next/image";
import { contributors } from "@/data";

export default function OverlayWindow({
  app,
  onClose,
  position,
  index,
  tokenscore,
}) {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });

  useEffect(() => {
    const updateBounds = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const windowWidth = 400;
      const windowHeight = 300;

      setBounds({
        left: 0,
        top: 0,
        right: screenWidth - windowWidth,
        bottom: screenHeight - windowHeight,
      });
    };

    updateBounds();
    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

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
  console.log(tokenscore);
  console.log(leaderboardData);

  return (
    <Draggable handle=".window-header" defaultPosition={position}>
      <Window
        className={`absolute window-header

          ${app.name === "LeaderBoard" && "w-[800px] h-[550px]"}
           ${app.name === "About" && "w-[900px] h-[500px]"}

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
            {app.name === "About" && (
              <div className="flex flex-col">
                <div className="flex justify-evenly items-center mb-4">
                  <div className="w-[40%] h-[70%]">
                    <Image
                      className="w-full h-full object-contain"
                      alt="bazarmash_logo"
                      src={"/bazarmash.png"}
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <ScrollView className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold">Netscape Navigator</h1>
                    <h2 className="text-xl">Version 2.01</h2>
                    <p className="text-center">
                      Copyright © 1994-1995 baZarMash
                    </p>
                    <p className="text-center">
                      This software is subject to license agreements. Please, in
                      the name of love ~ love me
                    </p>
                    <p className="text-center">
                      Report any problems through your mom
                    </p>
                  </ScrollView>
                </div>
                <div className="flex flex-row gap-5 justify-center items- ">
                  {contributors.map(({ name, role, image }) => (
                    <div
                      key={name}
                      className="flex flex-col justify-center items-center m-4"
                    >
                      <Image
                        className="w-[35%] h-[40%] rounded-3xl"
                        alt={image.alt}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                      />
                      <h1 className="text-lg font-semibold">{name}</h1>
                      <p className="text-sm">{role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {app.name === "LeaderBoard" && (
              <div className="w-full h-full flex flex-col gap-4">
                <h1 className="text-center font-bold text-2xl">LeaderBoard</h1>
                <ScrollView className="h-[80%]">
                  <div className="w-full h-full">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Ranking</th>
                          <th>NFT Token</th>
                          <th>Popularity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Leaderboard Data Table */}
                      </tbody>
                    </table>
                  </div>
                </ScrollView>
              </div>
            )}
          </WindowContent>
        </ScrollView>
        {/* <ScrollView className="h-[92%]">
          <WindowContent className="p-4 h-full">
            {app.name === "About" && (
              <div className="w-full text-center">
                
                <div className="w-full">
                  <Image
                    alt="about"
                    src="/bazarmash.png"
                    width={250}
                    height={250}
                  />
                  <ScrollView className="">
                    <div className="w-full flex flex-col gap-10 text-center">
                      <h1 className="font-extrabold text-2xl">BazARmash</h1>
                      <h2 className="text-sm">Version 0.0.1</h2>
                      <div className="flex">
                        Copyright
                        <span>
                          <Copyright />
                        </span>
                        BazARmash Corporations, All rights Reserved.
                      </div>
                      <div>
                        BazARmash is a game developed by BazARmash Corporations.
                        The game is developed using Next.js, React 95, and
                        Tailwind CSS.
                      </div>
                      <div>
                        The game is developed for educational purposes and to
                        showcase the capabilities of Next.js and React 95.
                      </div>
                    </div>
                  </ScrollView>
                </div>
                <div className="my-3">
                  <Separator />
                </div>
              </div>
            )}
            {app.name === "LeaderBoard" && (
              <div className="w-full h-full flex flex-col gap-4">
                <h1 className="text-center font-bold text-2xl">LeaderBoard</h1>
                <ScrollView className="h-[80%]">
                  <div className="w-full h-full">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Ranking</th>
                          <th>NFT Token</th>
                          <th>Popularity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.length > 0 ? (
                          leaderboardData.map(
                            ({ id, score, name, nftToken, popularity }) => (
                              <tr key={id}>
                                <td>{name}</td>
                                <td>{score}</td>
                                <td>{nftToken}</td>
                                <td>{popularity}</td>
                              </tr>
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Data Available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </ScrollView>
              </div>
            )}
          </WindowContent>
        </ScrollView> */}
      </Window>
    </Draggable>
  );
}
