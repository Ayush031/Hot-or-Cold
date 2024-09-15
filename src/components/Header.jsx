"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BazarIcon } from "./icons";
import { desktopApps } from "@/data";

export default function Header() {
  const [selectedApp, setSelectedApp] = useState(null);
  const router = useRouter();

  const handleClick = (app) => {
    setSelectedApp(app);
  };

  const handleDoubleClick = (app) => {
    router.push(app.href);
  };

  return (
    <div className="h-screen w-full p-6">
      <div className="flex flex-col gap-6">
        {desktopAppsopApps.map((app) => (
          <div
            role="button"
            tabIndex={0}
            aria-label={app.name}
            className={`rounded-sm px-1 py-2 cursor-pointer h-16 w-24 ${
              selectedApp?.name === app.name ? "bg-white/35" : ""
            }`}
            key={app.name}
            onClick={() => handleClick(app)}
            onDoubleClick={() => handleDoubleClick(app)}
          >
            <div className="flex flex-col justify-center items-center">
              <span>{app.icon}</span>
              <h1 className="font-semibold">{app.name}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
