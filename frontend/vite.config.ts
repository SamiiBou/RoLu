import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    allowedHosts: ['022d9a9411c8.ngrok.app'], 
  },
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
