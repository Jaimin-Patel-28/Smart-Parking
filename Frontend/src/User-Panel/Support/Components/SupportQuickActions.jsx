import React from "react";
import { ArrowUpRight, Terminal, Activity, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

const actions = [
  {
    label: "Registry_Sector",
    description: "Access historical logs, node status, and active allocations.",
    to: "/user/bookings",
  },
  {
    label: "Ledger_Console",
    description: "Verify settlement balances, top-ups, and transaction hashes.",
    to: "/user/wallet",
  },
  {
    label: "Signal_Monitor",
    description: "Monitor real-time alerts for allocation and sync updates.",
    to: "/user/notifications",
  },
  {
    label: "Node_Explorer",
    description: "Re-initialize spatial search and local grid discovery.",
    to: "/user/find-parking",
  },
];

const SupportQuickActions = () => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <section className="space-y-6 animate-in fade-in duration-700">
      {/* 1. SECTOR HEADER */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Zap size={14} className="text-[#FA8112]/60" />
          <h3 className="text-[10px] font-bold text-[#FAF3E1] uppercase tracking-[0.4em]">
            Auxiliary_Links
          </h3>
        </div>
        <span className="text-[8px] font-mono font-bold uppercase tracking-widest text-[#FAF3E1]/10">
          Fast_Track_Active
        </span>
      </div>

      {/* 2. ACTION GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 px-1">
        {actions.map((action) => (
          <NavLink
            key={action.label}
            to={action.to}
            className="group relative flex items-start justify-between gap-6 rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-6 transition-all duration-500 hover:border-[#FA8112]/30 hover:bg-[#FAF3E1]/[0.03] shadow-2xl overflow-hidden"
          >
            {/* HUD Scanline Effect on Hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2">
                <Terminal
                  size={12}
                  className="text-[#FA8112]/20 group-hover:text-[#FA8112]/60 transition-colors"
                />
                <h4 className="text-[11px] font-bold text-[#FAF3E1] uppercase tracking-[0.1em] group-hover:text-[#FA8112] transition-colors">
                  {action.label}
                </h4>
              </div>
              <p className="text-[12px] leading-relaxed text-[#FAF3E1]/30 font-medium group-hover:text-[#FAF3E1]/50 transition-colors">
                {action.description}
              </p>
            </div>

            <div className="relative z-10 p-2 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 group-hover:border-[#FA8112]/40 transition-all duration-500 shadow-xl shrink-0">
              <ArrowUpRight
                size={16}
                strokeWidth={2.5}
                className="text-[#FAF3E1]/10 group-hover:text-[#FA8112] group-hover:rotate-45 transition-all duration-500"
              />
            </div>
          </NavLink>
        ))}
      </div>

      {/* 3. STATUS FOOTER */}
      <div className="flex items-center gap-4 opacity-5 px-2">
        <Activity size={12} />
        <div className="h-px flex-1 bg-[#FAF3E1]" />
      </div>
    </section>
  );
};

export default SupportQuickActions;
