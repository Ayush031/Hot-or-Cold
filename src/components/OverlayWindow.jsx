"use client";

import { X } from "lucide-react";
import Draggable from "react-draggable";
import { useEffect, useState } from "react";
import { Button, Window, WindowContent, WindowHeader } from "react95";

export default function OverlayWindow({ app, onClose, position, index }) {
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

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
    <Draggable
      handle=".window-header"
      defaultPosition={position}
    >
      <Window className="absolute w-[400px] h-[300px]" style={{ zIndex: index + 1 }}>
        <WindowHeader className="window-header flex justify-between items-center">
          <span>{app.name}</span>
          <Button onClick={() => onClose(app)}>
            <X />
          </Button>
        </WindowHeader>
        <WindowContent className="p-4">
          {app.name} Content
        </WindowContent>
      </Window>
    </Draggable>
  );
}
