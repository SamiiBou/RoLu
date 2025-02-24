import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { SuccessPage } from "./components/SuccessPage";
import PaymentPage from "./components/PaymentPage";
import { BottomNav } from "./components/BottomNav";

import ProfilePage from "./pages/profile";

import { JobDetailsPage } from "./components/Job/JobDetailsPage";
import { CreateJobPage } from "./components/Job/CreateJobPage";
import "@worldcoin/mini-apps-ui-kit-react/styles.css";

export default function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/job/:id" element={<JobDetailsPage />} />
          <Route path="/create-job" element={<CreateJobPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/chat" element={<div>Chat Page</div>} />
          <Route path="/notifications" element={<div>Notifications Page</div>} />
          <Route path="/watch" element={<div>Watch Page</div>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}