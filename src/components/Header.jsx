"use client";

import { useState, useEffect } from "react";
import { desktopApps } from "@/data";
import OverlayWindow from "./OverlayWindow";

export default function Header() {
  const [openApps, setOpenApps] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [selectedApp, setSelectedApp] = useState(null);

  const getRandomPosition = (index) => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const windowWidth = 400;
    const windowHeight = 300;
    const spacing = 30; // Spacing between windows

    let x = Math.random() * (screenWidth - windowWidth - spacing);
    let y = Math.random() * (screenHeight - windowHeight - spacing);

    // Adjust position if it overlaps with previous windows
    Object.values(windowPositions).forEach(({ x: prevX, y: prevY }) => {
      if (Math.abs(x - prevX) < spacing && Math.abs(y - prevY) < spacing) {
        x += spacing;
        y += spacing;
      }
    });

    return { x, y };
  };

  const handleIconClick = (app) => {
    if (selectedApp === app) {
      setSelectedApp(null); // Deselect if the same app is clicked
    } else {
      setSelectedApp(app); // Select new app
    }
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
    setOpenApps((prevApps) => prevApps.filter((openApp) => openApp.name !== app.name));
    const { [app.name]: _, ...rest } = windowPositions;
    setWindowPositions(rest);
    // Deselect the app if it was open
    if (selectedApp === app) {
      setSelectedApp(null);
    }
  };

  // Handle clicks outside of the icons area
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
    <div className="h-screen w-full p-6 relative">
      <div className="flex flex-col gap-6">
        {desktopApps.map((app) => (
          <div
            role="button"
            tabIndex={0}
            aria-label={app.name}
            className={`icon-container rounded-sm px-1 py-2 cursor-pointer h-16 w-24 ${
              openApps.some((openApp) => openApp.name === app.name) ? "bg-white/35" : ""
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
            index={index}
          >
            <div>{app.name} Content</div>
          </OverlayWindow>
        ))}
      </div>
    </div>
  );
}
