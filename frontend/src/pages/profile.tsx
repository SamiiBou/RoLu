// frontend/src/pages/Profile.tsx
import React, { useEffect, useState } from "react";
import {
  FaCommentDots,
  FaBell,
  FaDesktop,
  FaUser,
} from "react-icons/fa";
import { MdSettings } from "react-icons/md";

// Define types for your profile data
type Transaction = {
  id: string;
  sender?: {
    fullName: string;
    username: string;
    profilePic: string;
  };
  receiver?: {
    fullName: string;
    username: string;
    profilePic: string;
  };
  // If you store snapshot data, you might include these:
  profilePic?: string;
  username?: string;
  handle?: string;
  amount: number;
  currency: string;
};

type EarningsGraphData = {
  month: string;
  earnings: number;
};

type ProfileData = {
  profilePic: string;
  fullName: string;
  email: string;
  earnings: number;
  stakingBalance: number;
  stakingAPY: number;
  reputation: number;
  reviewsSummary: string;
  // For the earnings graph – you can store this as an array
  earningsGraph: EarningsGraphData[];
  transactions: Transaction[];
  // Additional fields as needed…
};

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [selectedView, setSelectedView] = useState("Monthly");

  // Fetch profile data from the backend
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include cookies
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProfile(data.profile);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };


  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between bg-gray-100 px-4 py-3 shadow-sm">
        <div className="text-lg font-semibold text-gray-500">Work Anywhere</div>
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search Transactions"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="text-gray-600">
          <MdSettings size={24} />
        </div>
      </header>

      {/* User Profile Section */}
      <section className="p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <img
            src={profile.profilePic}
            alt="User Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <div className="text-sm text-gray-500">Welcome</div>
            <div className="text-2xl font-bold text-black">{profile.fullName}</div>
            <div className="text-gray-500 mt-1">February 28 - March 28, 2020</div>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setSelectedView("Monthly")}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              {selectedView}
            </button>
          </div>
        </div>
      </section>

      {/* Financial Overview Section */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-md shadow">
            <div className="text-3xl font-bold text-black">
              {profile.earnings.toLocaleString()} USDC
            </div>
            <div className="text-gray-500 mt-1">Earned</div>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <div className="text-3xl font-bold text-black">
              {profile.stakingBalance} WLD
            </div>
            <div className="text-gray-500 mt-1">
              Staking APY {profile.stakingAPY}%
            </div>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <div className="text-3xl font-bold text-black">
              {profile.reputation.toFixed(2)} / 5.0
            </div>
            <div className="text-gray-500 mt-1">Reputation</div>
          </div>
        </div>
      </section>

      {/* Earnings Graph Section */}
      <section className="px-4 py-6">
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-xl font-bold mb-4">Earnings Graph</h2>
          <div className="flex items-end justify-between h-40">
            {profile.earningsGraph.map((bar, idx) => {
              // Scale bar height relative to a maximum earnings value (e.g., 8000 USDC)
              const maxEarnings = 8000;
              const barHeight = Math.min((bar.earnings / maxEarnings) * 100, 100);
              const bgColor = idx % 2 === 0 ? "bg-purple-300" : "bg-purple-500";
              return (
                <div key={idx} className="flex flex-col items-center w-1/6">
                  <div
                    style={{ height: `${barHeight}%` }}
                    className={`${bgColor} w-full rounded-t-md cursor-pointer hover:opacity-80`}
                    title={`${bar.month}: ${bar.earnings} USDC`}
                  ></div>
                  <div className="mt-2 text-sm">{bar.month}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="px-4 py-6 flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {profile.transactions.map((tx) => {
            // For a real-world scenario, if transactions are stored as references,
            // you would use populated data (e.g., tx.sender, tx.receiver). Here we use snapshot fields.
            return (
              <div
                key={tx.id}
                className="flex items-center bg-white p-4 rounded-md shadow cursor-pointer hover:bg-gray-50"
                onClick={() => console.log("Transaction clicked:", tx)}
              >
                <img
                  src={tx.profilePic || (tx.sender?.profilePic || "https://via.placeholder.com/40")}
                  alt={tx.username || (tx.sender?.username || "User")}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <div className="font-bold text-black">
                    {tx.username || (tx.sender?.fullName || "Unknown")}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {tx.handle || (tx.sender ? `WorldID • @${tx.sender.username}` : "")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-black">
                    {tx.amount} {tx.currency}
                  </div>
                  <div className="text-gray-400 text-xs">****</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <button className="flex flex-col items-center text-gray-500">
            <FaCommentDots size={20} />
            <span className="text-xs">Chats</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <FaBell size={20} />
            <span className="text-xs">Notifications</span>
          </button>
          <button className="flex flex-col items-center text-gray-500">
            <FaDesktop size={20} />
            <span className="text-xs">Watch</span>
          </button>
          <button className="flex flex-col items-center text-black">
            <FaUser size={20} />
            <span className="text-xs font-bold">Profile</span>
          </button>
        </div>
      </nav>

      {/* Centered Floating Action Button */}
      <button
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg"
        onClick={() => console.log("FAB Clicked")}
      >
        <FaCommentDots size={24} />
      </button>
    </div>
  );
};

export default ProfilePage;
