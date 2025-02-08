import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import MiniKitProvider from "./minikit-provider";
import { ErudaProvider } from "./components/Eruda";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErudaProvider>
      <MiniKitProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MiniKitProvider>
    </ErudaProvider>
  </StrictMode>
);
