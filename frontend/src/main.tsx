// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import MiniKitProvider from "./minikit-provider";
import { ErudaProvider } from "./components/Eruda";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErudaProvider>
      <MiniKitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MiniKitProvider>
    </ErudaProvider>
  </React.StrictMode>
);
