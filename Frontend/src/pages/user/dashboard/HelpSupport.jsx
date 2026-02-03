import React from "react";
import {
  LifeBuoy,
  Bug,
  Headset,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

const HelpSupport = () => {
  return (
    /* FIXED: Changed rounded-[2.5rem] to rounded-3xl and increased padding to p-8 lg:p-10 */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden relative group">
      {/* 1. SECTION HEADER: Increased margin-bottom (mb-10) */}
      <div className="flex items-center gap-4 mb-10">
        <div className="shrink-0 p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:rotate-12 transition-transform duration-500">
          <LifeBuoy size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase">
            Need Help?
          </h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
            24/7 Support Active
          </p>
        </div>
      </div>

      {/* 2. RICH CONTENT: FAST TRACK TILES */}
      <div className="space-y-4 mb-10">
        {/* Support Chat Tile */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group/item shadow-inner">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-sm">
              <MessageSquare size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-wide">
                Live Chat
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                Wait time: ~2 mins
              </p>
            </div>
          </div>
          <ExternalLink
            size={16}
            className="text-slate-700 group-hover/item:text-blue-400 group-hover/item:translate-x-0.5 transition-all"
          />
        </div>

        {/* Documentation Tile */}
        <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group/item shadow-inner">
          <div className="flex items-center gap-4">
            <div className="shrink-0 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-sm">
              <Headset size={18} />
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-wide">
                Knowledge Base
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">
                FAQs & User Guides
              </p>
            </div>
          </div>
          <ExternalLink
            size={16}
            className="text-slate-700 group-hover/item:text-cyan-400 group-hover/item:translate-x-0.5 transition-all"
          />
        </div>
      </div>

      {/* 3. PRIMARY ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-xl transition-all group/btn active:scale-95">
          <Bug size={18} className="group-hover/btn:animate-bounce shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest">
            Report Bug
          </span>
        </button>

        <button className="flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95">
          <Headset size={18} className="shrink-0" />
          <span className="text-[11px] font-black uppercase tracking-widest">
            Call Hub
          </span>
        </button>
      </div>

      {/* Decorative Branding: Balanced at bottom */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Anand Grid Support Node
        </span>
      </div>
    </section>
  );
};

export default HelpSupport;
