import React from "react";
import {
  Search,
  PlusCircle,
  CalendarDays,
  Wallet,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Search,
      label: "Find Parking",
      route: "/user/find-parking",
      desc: "Search Nodes",
    },
    {
      icon: PlusCircle,
      label: "Book Slot",
      route: "/user/find-parking",
      desc: "Instant Reserve",
    },
    {
      icon: CalendarDays,
      label: "My Bookings",
      route: "/user/bookings",
      desc: "Session Logs",
    },
    {
      icon: Wallet,
      label: "Add Money",
      route: "/user/wallet",
      desc: "Refill Credits",
    },
  ];

  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 space-y-6">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#FA8112]/60">
            System Shortcuts
          </p>
          <h3 className="text-xl font-black text-[#FAF3E1]">
            Quick <span className="text-[#FA8112]">Actions</span>
          </h3>
        </div>
        <Zap size={18} className="text-[#FA8112] animate-pulse opacity-50" />
      </div>

      {/* --- ACTION GRID --- */}
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="group relative flex flex-col items-start gap-4 p-4 bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl transition-all duration-300 hover:border-[#FA8112]/40 hover:bg-[#FA8112]/5 text-left"
          >
            {/* Icon Node */}
            <div className="p-2.5 bg-[#222222] border border-[#F5E7C6]/5 rounded-xl text-[#FAF3E1]/40 group-hover:text-[#FA8112] group-hover:border-[#FA8112]/20 transition-all">
              <action.icon size={18} />
            </div>

            {/* Label & Arrow */}
            <div className="w-full">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-black text-[#FAF3E1] tracking-tight">
                  {action.label}
                </span>
                <ArrowUpRight
                  size={12}
                  className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#FAF3E1]/20 font-bold">
                {action.desc}
              </p>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-[#FA8112]/0 group-hover:bg-[#FA8112]/2 transition-colors -z-10" />
          </button>
        ))}
      </div>

      {/* --- SYSTEM OVERLAY --- */}
      <div className="pt-2">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5E7C6]/5 to-transparent mb-4" />
        <p className="text-center text-[8px] uppercase tracking-[0.5em] font-black text-[#FAF3E1]/10">
          Operational Terminal Interface
        </p>
      </div>
    </div>
  );
};

export default QuickActions;
