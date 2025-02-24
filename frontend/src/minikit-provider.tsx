//frontend/src/minikit-provider.tsx
"use client";

import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    //MiniKit.install();
    const appId = import.meta.env.VITE_MINIKIT_APP_ID;
    if (!appId) {
      console.error("MiniKit appId not provided. Check your .env file.");
      return;
    }
    console.log("VITE_MINIKIT_APP_ID:", appId);
    console.log("Current hostname:", window.location.hostname);

    // For development, simulate MiniKit installation if on localhost or using ngrok
    if (import.meta.env.DEV || window.location.hostname.includes("ngrok") || window.location.hostname === "localhost") {
      console.warn("Development mode: simulating MiniKit installation.");
      // Call install with appId to avoid the "App ID not provided" error
      MiniKit.install({ appId });
      // Force isInstalled() to return true for simulation
      MiniKit.isInstalled = () => true;
    } else {
      // In production, use the real installation
      MiniKit.install({ appId });
    }
  }, []);

  console.log("Is MiniKit installed correctly? ", MiniKit.isInstalled());

  return <>{children}</>;
}
