import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Map, Ticket, User, Wallet, LifeBuoy } from "lucide-react";

const BottomNavigation = () => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/10

  const navItems = [
    { name: "Home", path: "/user/dashboard", icon: Home },
    { name: "Explore", path: "/user/find-parking", icon: Map },
    { name: "Registry", path: "/user/bookings", icon: Ticket },
    { name: "Ledger", path: "/user/wallet", icon: Wallet },
    { name: "Node", path: "/user/profile", icon: User },
  ];

  return (
    <div className="bg-[#222222]/95 backdrop-blur-2xl border-t border-[#F5E7C6]/5 flex justify-around items-center pt-4 pb-8 px-4 relative overflow-hidden">
      {/* 1. TOP SCANLINE ACCENT */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent" />

      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `
            flex flex-col items-center gap-1.5 transition-all duration-500 relative group
            ${isActive ? "text-[#FA8112]" : "text-[#FAF3E1]/20"}
          `}
        >
          {({ isActive }) => (
            <>
              {/* Active Glow Signal */}
              {isActive && (
                <div className="absolute -top-4 w-8 h-8 bg-[#FA8112]/10 blur-xl rounded-full" />
              )}

              <item.icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.5}
                className={`transition-all duration-500 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(250,129,18,0.4)]" : "group-hover:text-[#FAF3E1]/40"}`}
              />

              <span
                className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? "text-[#FA8112]" : "text-transparent"}`}
              >
                {item.name}
              </span>

              {/* Technical Indicator Dot */}
              <div
                className={`h-1 w-1 rounded-full transition-all duration-700 ${isActive ? "bg-[#FA8112] scale-100 mt-1 shadow-[0_0_8px_#FA8112]" : "bg-transparent scale-0 mt-0"}`}
              />
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
