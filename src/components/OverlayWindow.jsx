"use client";

import { Copyright, X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import st from "../../public/assets/12.jpg";
import so from "../../public/assets/67.png";
import sl from "../../public/assets/68.png";
import si from "../../public/assets/70.png";
=======
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c
import {
  Button,
  Frame,
  ScrollView,
<<<<<<< HEAD
=======
  Separator,
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import Image from "next/image";

<<<<<<< HEAD
export default function OverlayWindow({ app, onClose, position, index }) {
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
=======
export default function OverlayWindow({
  app,
  onClose,
  position,
  index,
  tokenscore,
}) {
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c

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
          name: id, // Placeholder for name; replace with actual names if available
          nftToken: "N/A", // Placeholder for NFT Token; replace with actual data if available
          popularity: score, // Use the score as popularity
        }))
      : [];

  if (!app) return null;
  console.log(tokenscore);
  console.log(leaderboardData);

  return (
    <Draggable handle=".window-header" defaultPosition={position}>
      <Window
        className={`absolute window-header
<<<<<<< HEAD
           ${app.name === "About us" && "w-[900px] h-[500px]"}
=======

          ${app.name === "LeaderBoard" && "w-[800px] h-[550px]"}
           ${app.name === "About us" && "w-[900px] h-[500px]"}

>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c
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
<<<<<<< HEAD
        <ScrollView className="h-[92%] overflow-hidden">
          <WindowContent className="p-4 flex ">
            {app.name === "About us" && (
              <>
                <div className="flex flex-col">
                  <div className="  flex justify-evenly items-center mb-4">
                    <div>

                    <Image
                      className="w-[40%] h-[70%]"
                      alt="about"
                      src={st}
                      width={1000}
                      height={1000}
                      />
                      </div>
                    <div className="flex flex-col justify-center items-center">
                      <h1>
                        Netscape Navigator
                        
                      </h1>
                      <h1> version 2.01</h1>
                      <p>Copyright @ 1994-1995 baZarMash</p>
                      <p>
                        This software is subject to licence aggrements,
                        Pleasease in the name of love ~ love me
                      </p>
                      <p>Report any problem through ur mom</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-5 justify items-center">

                    <div className="flex flex-col justify-center items-center">
                      <Image
                        className="w-[35%] h-[40%] rounded-3xl"
                        alt="about"
                        src={sl}
                        width={1000}
                        height={1000}
                      ></Image>
                      <h1>Ayush aka </h1>
                      <p>Full-Stack Dev</p>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <Image
                        className="w-[35%] h-[40%] rounded-3xl"
                        alt="about"
                        src={so}
                        width={1000}
                        height={1000}
                      ></Image>
                      <h1>Anukul</h1>
                      <p>Front-End Designer</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        className="w-[35%] h-[40%] rounded-3xl"
                        alt="about"
                        src={si}
                        width={1000}
                        height={1000}
                      ></Image>
                      <h1>Satynash </h1>
                      <p> Web3 Backend</p>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                      <Image
                        className="w-[35%] h-[40%] rounded-3xl"
                        alt="about"
                        src={si}
                        width={1000}
                        height={1000}
                      ></Image>
                      <h1>Rahul </h1>
                      <p>Web3 Backend</p>
                    </div>
                  </div>
                </div>
              </>
            )}
         
=======
        <ScrollView className="h-[92%]">
          <WindowContent className="p-4 h-full">
            {app.name === "About us" && (
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
>>>>>>> 677d4e757b96a6ea0008ad78846f97a77bb05b7c
          </WindowContent>
        </ScrollView>
      </Window>
    </Draggable>
  );
}
