"use client";

import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import st from "../../public/assets/12.jpg";
import so from "../../public/assets/67.png";
import sl from "../../public/assets/68.png";
import si from "../../public/assets/70.png";
import {
  Button,
  Frame,
  ScrollView,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import Image from "next/image";

export default function OverlayWindow({ app, onClose, position, index }) {
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
    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  if (!app) return null;

  return (
    <Draggable handle=".window-header" defaultPosition={position}>
      <Window
        className={`absolute window-header
           ${app.name === "About us" && "w-[900px] h-[500px]"}
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
            {app.name === "About us" && (
              <>
                <div className="flex flex-col">
                  <div className="  flex justify-center items-center">
                    <div>

                    <Image
                      className="w-[30%] h-[70%]"
                      alt="about"
                      src={st}
                      width={1000}
                      height={1000}
                      />
                      </div>
                    <div>
                      <h1>
                        Netscape Navigator<br></br> version 2.01
                      </h1>
                      <p>Copyright @ 1994-1995 baZarMash</p>
                      <p>
                        This software is subject to licence aggrements,
                        Pleasease in the name of love ~ love me
                      </p>
                      <p>Report any problem through ur mom</p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-5 justify-between items-center">

                    <div className="flex flex-col justify-center items-center">
                      <Image
                        className="w-[95%] h-[40%]"
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
                        className="w-[95%] h-[40%]"
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
                        className="w-[95%] h-[40%]"
                        alt="about"
                        src={si}
                        width={1000}
                        height={1000}
                      ></Image>
                      <h1>Satynash </h1>
                      <p> Web3 Backend</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <Image
                        className="w-[95%] h-[40%]"
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
          </WindowContent>
        </ScrollView>
      </Window>
    </Draggable>
  );
}
