import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  server: {
    allowedHosts: ["43d6-2001-861-3886-8100-f405-cace-5273-602f.ngrok-free.app"],
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
