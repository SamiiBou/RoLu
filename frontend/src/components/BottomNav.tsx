import { Link, useLocation } from "react-router-dom";
import { FaComments, FaBell, FaVideo, FaUser } from "react-icons/fa";

const navItems = [
  { label: "Chat", icon: FaComments, to: "/chat" },
  { label: "Notifications", icon: FaBell, to: "/notifications" },
  { label: "Watch", icon: FaVideo, to: "/watch" },
  { label: "Profile", icon: FaUser, to: "/profile" },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200"
      style={{ zIndex: 50 }}
    >
      <div className="flex justify-around items-center h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center space-y-1 text-sm transition-colors ${
                isActive ? "text-blue-500" : "text-gray-700 hover:text-blue-500"
              }`}
            >
              <Icon size={24} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
