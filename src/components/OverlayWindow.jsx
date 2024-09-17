"use client";
import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import { dryrun } from '@permaweb/aoconnect/browser';
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

    console.log(TokenScores);


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

          ${app.name === "LeaderBoard" && "w-[900px] h-[550px]"}
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
                  <div className="w-[40%] h-[90%]">
                    <Image
                      className=" scale-1 -mt-10"
                      alt="bazarmash_logo"
                      src={"/bazarmash.png"}
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <ScrollView className="flex   py-8 justify-center text-center gap-5 items-center">
                    <h1 className="text-2xl font-bold py-2">
                      Netscape Navigator
                    </h1>
                    <h2 className="text-xl">Version 2.01</h2>
                    <p className="text-center py-2">
                      Copyright © 1994-1995 baZarMash
                    </p>
                    <p className="text-center">
                      This software is subject to license agreements.
                    </p>
                    <p className="text-center">made /w lobe ~</p>
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
                <div className="w-full h-full px-3 flex">
                  
                    <div>
                    <div className="font-semibold pb-2 text-center mr-[40%] ">
                      Token
                    </div>
                      {Object.entries(TokenScores).map(([key, value]) => (
                       
                        <div key={key} className=" w-full ">
                            <a href={`https://bazar.ar.io/#/asset/${key}`}>{key}</a>
                        </div> 
                      ))}
                      </div>


                        <div className="ml-9">
                      <div className="font-semibold pb-2 text-center mr-[40%] ">
                      ranking
                    </div>
                    <div>
                      {Object.entries(TokenScores).map(([key, value]) => (
                        <div key={key} className=" w-full text-center ">
                            <div>{value}</div>
                        </div> 
                      ))}
                      </div>

                      </div>
                </div>
              </ScrollView>
            </div>
            
            )}
          </WindowContent>
        </ScrollView>
      </Window>
    </Draggable>
  );
}
