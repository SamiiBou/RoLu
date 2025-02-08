// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { VerifyBlock } from "./components/Verify";
import { WalletAuthBlock } from "./components/WalletAuthBlock";
import { SuccessPage } from "./components/SuccessPage";
import PaymentPage from "./components/PaymentPage";
import { BottomNav } from "./components/BottomNav";
import "@worldcoin/mini-apps-ui-kit-react/styles.css";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Affichage des deux options de connexion sur la page d'accueil */}
                <VerifyBlock />
                <WalletAuthBlock />
              </>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/chat" element={<div>Page de Chat</div>} />
          <Route path="/notifications" element={<div>Page de Notifications</div>} />
          <Route path="/watch" element={<div>Page de Watch</div>} />
          <Route path="/profile" element={<div>Page de Profil</div>} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
