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
});
