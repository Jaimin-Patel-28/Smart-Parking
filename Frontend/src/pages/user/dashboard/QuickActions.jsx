import React from "react";
import { Search, PlusCircle, CalendarDays, Wallet, ArrowRight } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: Search, label: "Find Parking", desc: "Locate nearby nodes", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: PlusCircle, label: "Book Slot", desc: "Instant reservation", color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { icon: CalendarDays, label: "My Bookings", desc: "Manage sessions", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: Wallet, label: "Add Money", desc: "Top up credits", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <section className="p-6 h-full flex flex-col">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em]">
          Quick Actions
        </h2>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-slate-700"></div>
          <div className="w-1 h-1 rounded-full bg-slate-700"></div>
        </div>
      </div>

      {/* ACTIONS GRID */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {actions.map((action, index) => (
          <button 
            key={index} 
            className="group flex flex-col items-start p-4 rounded-3xl bg-slate-950/40 border border-white/5 hover:border-white/10 hover:bg-white/5 transition-all text-left relative overflow-hidden active:scale-95"
          >
            {/* Background Glow Effect */}
            <div className={`absolute -right-4 -bottom-4 w-12 h-12 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity ${action.color.replace('text', 'bg')}`} />

            {/* Icon Container - Uses Canonical shrink-0 */}
            <div className={`shrink-0 p-2.5 rounded-2xl ${action.bg} ${action.color} mb-3 transition-transform group-hover:scale-110`}>
              <action.icon size={18} />
            </div>

            {/* Labels */}
            <div className="mt-auto">
              <h4 className="text-[11px] font-black text-white uppercase tracking-wider mb-1">
                {action.label}
              </h4>
              <p className="text-[9px] text-slate-500 font-medium leading-tight">
                {action.desc}
              </p>
            </div>

            <ArrowRight size={12} className="absolute top-4 right-4 text-slate-800 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;