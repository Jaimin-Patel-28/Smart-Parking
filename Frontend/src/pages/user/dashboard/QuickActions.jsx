import React from "react";
import {
  Search,
  PlusCircle,
  CalendarDays,
  Wallet,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {

  const navigate = useNavigate();

  const actions = [
    {
      icon: Search,
      label: "Find Parking",
      desc: "Locate nearby nodes",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      route: "/user/find-parking"
    },
    {
      icon: PlusCircle,
      label: "Book Slot",
      desc: "Instant reservation",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      route: "/user/find-parking"
    },
    {
      icon: CalendarDays,
      label: "My Bookings",
      desc: "Manage sessions",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      route: "/user/bookings"
    },
    {
      icon: Wallet,
      label: "Add Money",
      desc: "Top up credits",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      route: "/user/wallet"
    },
  ];

  return (
    /* FIXED: Using 'rounded-3xl' and increased padding 'p-8 lg:p-10' for spacing */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl h-full flex flex-col group transition-all duration-500 hover:border-blue-500/20">
      {/* 1. SECTION HEADER: Increased margin-bottom (mb-8) and enhanced branding */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-3">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Zap size={20} className="fill-blue-400/20" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-[0.3em]">
              Quick Actions
            </h2>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">
              Instant Operations
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* 2. ACTIONS GRID: Increased gap (gap-5) for 'Small & Perfect' layout */}
      <div className="grid grid-cols-2 gap-5 flex-1">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={()=>navigate(action.route)}
            className="group/btn flex flex-col items-start p-6 rounded-3xl bg-slate-950/60 border border-white/5 hover:border-blue-500/30 hover:bg-slate-950 transition-all text-left relative overflow-hidden active:scale-95 shadow-inner"
          >
            {/* Background Glow Effect: Optimized for performance */}
            <div
              className={`absolute -right-8 -bottom-8 w-20 h-20 blur-3xl opacity-0 group-hover/btn:opacity-10 transition-opacity ${action.color.replace("text", "bg")}`}
            />

            {/* Icon Container: Using 'shrink-0' to resolve canonical warning */}
            <div
              className={`shrink-0 p-3 rounded-2xl ${action.bg} ${action.color} mb-5 transition-all duration-300 group-hover/btn:scale-110 shadow-sm`}
            >
              <action.icon size={22} />
            </div>

            {/* Labels: Enhanced typography for 110% zoom */}
            <div className="mt-auto relative z-10">
              <h4 className="text-[12px] font-black text-white uppercase tracking-wider mb-2">
                {action.label}
              </h4>
              <p className="text-[10px] text-slate-500 font-bold leading-tight tracking-tight group-hover/btn:text-slate-400 transition-colors">
                {action.desc}
              </p>
            </div>

            {/* Subtle Action Indicator */}
            <ArrowRight
              size={14}
              className="absolute top-6 right-6 text-slate-800 group-hover/btn:text-blue-400 group-hover/btn:translate-x-1 transition-all"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
