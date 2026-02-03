import React from "react";
import {
  ShieldCheck,
  Lock,
  Monitor,
  RefreshCcw,
  LogOut,
  ChevronRight,
} from "lucide-react";

function AccountSecurity() {
  return (
    /* FIXED: Using rounded-3xl and slate-900/40 for dashboard consistency */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20">
      {/* 1. HEADER: Increased margin (mb-10) for breathing room */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck size={26} className="fill-blue-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Security Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Identity & Access Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Protected
        </div>
      </div>

      {/* 2. SECURITY STATS: Horizontal spread for 110% zoom safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Password Strength Card */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 shadow-inner relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Password Strength
            </span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Excellent
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden p-px">
              <div className="h-full w-[92%] bg-linear-to-r from-blue-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
            </div>
            <span className="text-xs font-black text-white">92%</span>
          </div>
          <Lock
            size={48}
            className="absolute -right-4 -bottom-4 text-white opacity-[0.02] -rotate-12"
          />
        </div>

        {/* Last Update Info Card */}
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 shadow-inner">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/5 rounded-lg text-slate-400">
              <RefreshCcw size={14} />
            </div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Last Modified
            </span>
          </div>
          <p className="text-lg font-black text-white uppercase tracking-tighter">
            Dec 24, 2025
          </p>
          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">
            42 Days Ago • Secure Node
          </p>
        </div>
      </div>

      {/* 3. INTERACTIVE ACTIONS: Responsive layout */}
      <div className="space-y-4 pt-8 border-t border-white/5">
        <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group/btn">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <Lock size={16} />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
              Change Account Password
            </span>
          </div>
          <ChevronRight
            size={14}
            className="text-slate-600 group-hover/btn:translate-x-1 transition-transform"
          />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-xl transition-all group/btn">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
              <LogOut size={16} />
            </div>
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">
              Logout from All Devices
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor size={12} className="text-slate-600" />
            <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">
              3 Active
            </span>
          </div>
        </button>
      </div>
    </section>
  );
}

export default AccountSecurity;
