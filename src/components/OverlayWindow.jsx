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
        <ScrollView className="h-[92%]">
          <WindowContent className="p-4">
            {app.name === "About us" && <>fdas</>}
            <Image alt="about" src="/assets/1.png" width={1000} height={1000} />
          </WindowContent>
        </ScrollView>
      </Window>
    </Draggable>
  );
}
