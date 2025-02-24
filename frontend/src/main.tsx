// src/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import MiniKitProvider from "./minikit-provider";
import { ErudaProvider } from "./components/Eruda";
import { Provider } from "@/components/ui/provider"


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
    <ErudaProvider>
      <MiniKitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MiniKitProvider>
    </ErudaProvider>
    </Provider>
  </React.StrictMode>
);
