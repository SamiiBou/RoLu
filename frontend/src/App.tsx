import React from "react";
import { Routes, Route } from "react-router-dom";
import { VerifyBlock } from "./components/Verify";
import { SuccessPage } from "./components/SuccessPage";
import PaymentPage from "./components/PaymentPage";
import { BottomNav } from "./components/BottomNav";
import "@worldcoin/mini-apps-ui-kit-react/styles.css";

export default function App() {
  return (
    // The "relative" wrapper allows the BottomNav (positioned as fixed) to display correctly
    <div className="relative min-h-screen">
      <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-y-3">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <VerifyBlock />
                {/* You can uncomment the other blocks if needed */}
                {/* <PayBlock /> */}
                {/* <PaymentPage /> */}
              </>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          {/* New route for payment */}
          <Route path="/payment" element={<PaymentPage />} />

          {/* Pages for bottom navigation */}
          <Route path="/chat" element={<div>Chat Page</div>} />
          <Route path="/notifications" element={<div>Notifications Page</div>} />
          <Route path="/watch" element={<div>Watch Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Routes>
      </main>
      {/* Bottom navigation bar */}
      <BottomNav />
    </div>
  );
}
