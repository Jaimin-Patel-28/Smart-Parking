import React from "react";
import { LayoutDashboard, Car, CalendarRange, Wallet } from "lucide-react";

const SidebarPrimary = () => {
  const primaryLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      color: "text-blue-400",
      active: true,
    },
    { icon: Car, label: "Find Parking", color: "text-cyan-400", active: false },
    {
      icon: CalendarRange,
      label: "My Bookings",
      color: "text-purple-400",
      active: false,
    },
    {
      icon: Wallet,
      label: "Wallet Hub",
      color: "text-emerald-400",
      active: false,
    },
  ];

  return (
    <nav className="px-2">
      <p className="px-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
        Core Operations
      </p>

      <ul className="space-y-1">
        {primaryLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <li key={index}>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                  link.active
                    ? "bg-blue-600/10 text-white border border-blue-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon
                  size={18}
                  className={`${link.color} ${link.active ? "opacity-100" : "opacity-60 group-hover:opacity-100"} transition-opacity`}
                />
                <span className="text-xs font-bold tracking-tight">
                  {link.label}
                </span>

                {link.active && (
                  <div className="ml-auto w-1 h-4 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarPrimary;
