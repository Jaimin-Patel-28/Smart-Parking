import React from "react";
import {
  LifeBuoy,
  Bug,
  Headset,
  ExternalLink,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const HelpSupport = () => {
  return (
    <div className="w-full bg-[#222222]/50 border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 md:p-8 space-y-8 relative overflow-hidden group">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
            <LifeBuoy size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
              Support <span className="text-[#FA8112]">Center</span>
            </h2>
            <p className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.3em] font-bold">
              Active Node: 24/7 Assistance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 bg-[#111111]/60 rounded-xl border border-[#F5E7C6]/5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">
            Systems Online
          </span>
        </div>
      </div>

      {/* --- NAVIGATION GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="group/item flex items-center justify-between p-5 bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl hover:border-[#FA8112]/40 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#FAF3E1]/5 rounded-lg text-[#FA8112]">
              <MessageSquare size={18} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#FAF3E1]">Live Chat</p>
              <p className="text-[10px] text-emerald-500/60 font-medium uppercase tracking-tighter">
                Wait Time: ~2m
              </p>
            </div>
          </div>
          <ArrowRight
            size={16}
            className="text-[#FAF3E1]/10 group-hover/item:text-[#FA8112] group-hover/item:translate-x-1 transition-all"
          />
        </button>

        <button className="group/item flex items-center justify-between p-5 bg-[#111111]/40 border border-[#F5E7C6]/5 rounded-2xl hover:border-[#FA8112]/40 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#FAF3E1]/5 rounded-lg text-blue-400">
              <Headset size={18} />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#FAF3E1]">Knowledge Base</p>
              <p className="text-[10px] text-[#FAF3E1]/30 font-medium uppercase tracking-tighter">
                Guides & FAQs
              </p>
            </div>
          </div>
          <ExternalLink
            size={16}
            className="text-[#FAF3E1]/10 group-hover/item:text-blue-400 transition-all"
          />
        </button>
      </div>

      {/* --- ACTION FOOTER --- */}
      <div className="space-y-6 pt-4 border-t border-[#F5E7C6]/5">
        <div className="flex flex-wrap gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 hover:bg-red-500/10 hover:border-red-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/40 hover:text-red-400 transition-all">
            <Bug size={14} /> Report System Bug
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 hover:bg-[#FA8112]/10 hover:border-[#FA8112]/20 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all">
            <Headset size={14} /> Call Support Hub
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            <ShieldCheck size={10} className="text-blue-400" />
            <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest text-center md:text-left">
              Secure Support Node
            </span>
          </div>
          <small className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/10">
            Anand Smart City • Infrastructure v2.0.26
          </small>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
    </div>
  );
};

export default HelpSupport;
