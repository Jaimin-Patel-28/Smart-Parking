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
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 lg:p-8 shadow-2xl overflow-hidden relative group">
      {/* 1. SECTION HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:rotate-12 transition-transform duration-500">
          <LifeBuoy size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">
            Need Help?
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            24/7 Support Available
          </p>
        </div>
      </div>

      {/* 2. RICH CONTENT: FAST TRACK TILES */}
      <div className="space-y-3 mb-8">
        {/* Support Chat Tile */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group/item">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <MessageSquare size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white">Live Chat</p>
              <p className="text-[9px] text-slate-500 font-medium">
                Wait time: ~2 mins
              </p>
            </div>
          </div>
          <ExternalLink
            size={14}
            className="text-slate-700 group-hover/item:text-white transition-colors"
          />
        </div>

        {/* Documentation Tile */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer group/item">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Headset size={16} />
            </div>
            <div>
              <p className="text-xs font-black text-white">Knowledge Base</p>
              <p className="text-[9px] text-slate-500 font-medium">
                FAQs & User Guides
              </p>
            </div>
          </div>
          <ExternalLink
            size={14}
            className="text-slate-700 group-hover/item:text-white transition-colors"
          />
        </div>
      </div>

      {/* 3. PRIMARY ACTION BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 rounded-xl transition-all group/btn">
          <Bug size={16} className="group-hover/btn:animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Report Bug
          </span>
        </button>

        <button className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95">
          <Headset size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Call Hub
          </span>
        </button>
      </div>

      {/* Decorative Branding */}
      <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
        <div className="w-1 h-1 rounded-full bg-slate-500"></div>
        <span className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.4em]">
          Anand Grid Support Node
        </span>
      </div>
    </section>
  );
};

export default HelpSupport;
