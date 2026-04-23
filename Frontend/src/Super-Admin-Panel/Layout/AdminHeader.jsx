import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  Command,
} from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import useUnreadCount from "../Notifications/Hooks/useUnreadCount";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useUnreadCount();

  const displayName = user?.fullName || user?.name || "Admin User";
  const displayRole = user?.role
    ? user.role
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ")
    : "Super Admin";

  // Get initials for the avatar (e.g., "Jaimin Patel" -> "JP")
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#F5E7C6]/5 bg-[#222222]/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* LEFT: LOGO & SEARCH */}
        <div className="flex items-center gap-6">
          <button
            onClick={onMenuClick}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#FAF3E1]/60 hover:text-[#FA8112] hover:bg-[#FA8112]/5 transition-all lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Search Bar - Refined to look like a technical command input */}
          <div className="relative hidden lg:block group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <Search
                className="text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors"
                size={14}
              />
            </div>
            <input
              type="text"
              placeholder="Search registry or commands..."
              className="h-9 w-72 rounded-lg text-[#FAF3E1] bg-[#FAF3E1]/2 pl-10 pr-4 text-[11px] font-medium placeholder:text-[#FAF3E1]/10 focus:outline-none border border-[#F5E7C6]/5 focus:border-[#FA8112]/30 transition-all uppercase tracking-widest"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-focus-within:flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FAF3E1]/5 border border-[#F5E7C6]/10">
              <span className="text-[9px] font-bold text-[#FAF3E1]/20">
                ESC
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: ACTIONS & PROFILE */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Notifications Hub */}
          <button
            onClick={() => navigate("/super-admin/notifications")}
            className="relative p-2.5 text-[#FAF3E1]/40 hover:text-[#FA8112] hover:bg-[#FA8112]/5 rounded-lg transition-all group"
            title="System Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-[#F5E7C6]/5 mx-1 hidden md:block"></div>

          {/* Profile Control */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1 rounded-xl hover:bg-[#FAF3E1]/5 transition-all group"
            >
              <div className="h-8 w-8 rounded-lg bg-[#FA8112] flex items-center justify-center text-[#222222] text-[11px] font-bold shadow-lg shadow-[#FA8112]/10 group-hover:scale-105 transition-transform">
                {initials}
              </div>
              <div className="hidden lg:block text-left pr-1">
                <p className="text-xs font-bold text-[#FAF3E1] tracking-tight">
                  {displayName}
                </p>
                <p className="text-[9px] uppercase font-bold text-[#FAF3E1]/20 tracking-widest mt-0.5">
                  {displayRole}
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`text-[#FAF3E1]/20 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Premium Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-xl border border-[#F5E7C6]/10 bg-[#1a1a1a] p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="px-3 py-2 mb-1 border-b border-[#F5E7C6]/5">
                  <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.2em]">
                    Session Identity
                  </p>
                </div>

                <Link
                  to="/super-admin/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/60 hover:text-[#FAF3E1] hover:bg-[#FAF3E1]/5 transition-colors"
                >
                  <User size={14} /> Profile Settings
                </Link>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10 transition-colors w-full text-left"
                >
                  <LogOut size={14} /> Terminate Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
