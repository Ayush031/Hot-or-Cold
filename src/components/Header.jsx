"use client";

import Link from "next/link";
import Image from "next/image";
import { desktopApps } from "@/data";
import { useState, useEffect } from "react";
import OverlayWindow from "./OverlayWindow";

export default function Header({ tokenScore }) {
  const [openApps, setOpenApps] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);

  const getRandomPosition = (index) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const windowWidth = 400;
    const windowHeight = 300;
    const spacing = 30;

    const xSteps = Math.floor((screenWidth - windowWidth) / spacing);
    const ySteps = Math.floor((screenHeight - windowHeight) / spacing);

    const x = (index % xSteps) * spacing;
    const y = Math.floor(index / xSteps) * spacing;

    return {
      x: Math.min(x, screenWidth - windowWidth),
      y: Math.min(y, screenHeight - windowHeight),
    };
  };

  const handleIconClick = (app) => {
    setSelectedApp((prev) => (prev === app ? null : app));
  };

  const handleAppClick = (app) => {
    if (!openApps.some((openApp) => openApp.name === app.name)) {
      const newPosition = getRandomPosition(openApps.length);
      setOpenApps((prevApps) => [...prevApps, app]);
      setWindowPositions((prevPositions) => ({
        ...prevPositions,
        [app.name]: newPosition,
      }));
    }
  };

  const handleClose = (app) => {
    setOpenApps((prevApps) =>
      prevApps.filter((openApp) => openApp.name !== app.name)
    );
    setWindowPositions((prevPositions) => {
      const { [app.name]: _, ...rest } = prevPositions;
      return rest;
    });
    if (selectedApp === app) {
      setSelectedApp(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".icon-container")) {
        setSelectedApp(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-screen w-full p-3 relative">
      <div className="flex flex-col gap-6">
        <Link href="/game">
          <div className="select-none w-32">
            <img src="/bazarmash.png" alt="bazarmash_logo" />
            <h1 className="font-semibold text-center">BazARmash</h1>
          </div>
        </Link>
        {desktopApps.map((app) => (
          <div
            role="button"
            tabIndex={0}
            aria-label={app.name}
            className={`icon-container rounded-sm px-1 py-2 cursor-pointer h-24 w-36 ${
              openApps.some((openApp) => openApp.name === app.name)
                ? "bg-white/35"
                : ""
            } ${selectedApp === app ? "bg-white/35" : ""}`}
            key={app.name} 
            onClick={() => handleIconClick(app)}
            onDoubleClick={() => handleAppClick(app)}
          >
            <div className="flex flex-col justify-center items-center select-none">
              <span>{app.icon}</span>
              <h1 className="font-semibold">{app.name}</h1>
            </div>
          </div>
        ))}
        {openApps.map((app, index) => (
          <OverlayWindow
            key={app.name}
            app={app}
            onClose={handleClose}
            position={windowPositions[app.name]}
            index={1}
            tokenScore={tokenScore}
          >
            <div>{app.name}</div>
          </OverlayWindow>
        ))}
      </div>
    </div>
  );
}
