import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MapPin,
  Bell,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Activity,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../Authentication-UI/Context/AuthContext";
import useUnreadCount from "../Notifications/Hooks/useUnreadCount";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { unreadCount } = useUnreadCount();

  const navLinks = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Find_Parking", path: "/user/find-parking" },
    { name: "My_Bookings", path: "/user/bookings" },
    { name: "Wallet_Ledger", path: "/user/wallet" },
    { name: "Support_Node", path: "/user/support" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#222222]/90 backdrop-blur-xl border-b border-[#F5E7C6]/5 h-20">
      <div className="max-w-[1600px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* 1. LOGO: System Brand */}
        <div
          onClick={() => navigate("/user/dashboard")}
          className="flex items-center gap-4 cursor-pointer group"
        >
          <div className="h-10 w-10 bg-[#FA8112]/10 border border-[#FA8112]/30 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(250,129,18,0.1)] group-hover:bg-[#FA8112] transition-all duration-500">
            <MapPin
              size={20}
              className="text-[#FA8112] group-hover:text-[#222222] transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#FAF3E1] leading-none uppercase">
              Smart<span className="text-[#FA8112]">Park</span>
            </span>
            <span className="text-[8px] font-mono font-bold text-[#FAF3E1]/20 uppercase tracking-[0.4em] mt-1">
              Client_Access_V2
            </span>
          </div>
        </div>

        {/* 2. NAVIGATION: Command Center Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300
                ${
                  isActive
                    ? "text-[#FA8112] drop-shadow-[0_0_8px_rgba(250,129,18,0.3)]"
                    : "text-[#FAF3E1]/30 hover:text-[#FAF3E1]/60"
                }
              `}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* 3. ACTIONS: Identity & Signals */}
        <div className="flex items-center gap-6">
          {/* Notification Signal */}
          <button
            onClick={() => navigate("/user/notifications")}
            className="relative p-2 text-[#FAF3E1]/20 hover:text-[#FA8112] transition-all duration-500 group"
          >
            <Bell size={20} strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]" />
              </span>
            )}
          </button>

          {/* Profile Console */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center gap-4 pl-2 pr-4 py-1.5 rounded-lg border transition-all duration-500 ${
                isProfileOpen
                  ? "bg-[#FA8112]/5 border-[#FA8112]/30"
                  : "bg-[#1a1a1a] border-[#F5E7C6]/5 hover:border-[#FAF3E1]/20"
              }`}
            >
              <div className="h-8 w-8 rounded-md bg-[#FA8112]/10 border border-[#FA8112]/20 flex items-center justify-center text-[#FA8112] font-mono text-sm font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-[10px] font-bold text-[#FAF3E1] uppercase tracking-tight">
                  {user?.name?.split(" ")[0] || "SUBJECT_NULL"}
                </span>
                <span className="text-[8px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest leading-none">
                  Online
                </span>
              </div>
              <ChevronDown
                size={12}
                className={`text-[#FAF3E1]/20 transition-transform duration-500 ${isProfileOpen ? "rotate-180 text-[#FA8112]" : ""}`}
              />
            </button>

            {/* Technical Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 rounded-xl bg-[#1a1a1a] border border-[#F5E7C6]/10 p-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="px-4 py-4 border-b border-[#F5E7C6]/5 mb-2 bg-[#222222]/50 rounded-lg">
                  <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] mb-1">
                    Identity_Sequence
                  </p>
                  <p className="text-[12px] font-mono font-bold truncate text-[#FAF3E1]/80">
                    {user?.email}
                  </p>
                </div>

                <NavLink
                  to="/user/profile"
                  className="flex w-full items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/40 hover:text-[#FA8112] hover:bg-[#FA8112]/5 rounded-lg transition-all"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <ShieldCheck size={16} strokeWidth={1.5} /> User_Manifest
                </NavLink>

                <div className="h-px bg-[#F5E7C6]/5 my-2 mx-2" />

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-widest text-rose-500/60 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition-all"
                >
                  <LogOut size={16} strokeWidth={1.5} /> Terminate_Session
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
