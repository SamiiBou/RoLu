//frontend/vite.config.ts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    allowedHosts: ['022d9a9411c8.ngrok.app', "2aa3-2001-861-3886-8100-9e5-b1b8-af70-a68e.ngrok-free.app"],
    port: 5173, // Make sure frontend is running on 5173
    proxy: {
      "/api": {
        target: "https://cd5d-2001-861-3886-8100-9e5-b1b8-af70-a68e.ngrok-free.app",
        changeOrigin: true,
        secure: false, // Add this to allow HTTP target from HTTPS frontend
      },
    },
  },
  define: {
    "process.env": process.env,
    "VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  },

});
