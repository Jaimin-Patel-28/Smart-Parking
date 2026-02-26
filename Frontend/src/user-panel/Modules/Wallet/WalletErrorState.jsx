import React from "react";
import {
  AlertCircle,
  RefreshCw,
  ShieldAlert,
  WifiOff,
  Terminal,
  ChevronRight,
} from "lucide-react";

const WalletErrorState = () => {
  return (
    <section className="bg-slate-900/60 border border-rose-500/20 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl backdrop-blur-3xl group transition-all duration-700 hover:border-rose-500/40 relative overflow-hidden text-center flex flex-col items-center justify-center">
      {/* 1. CINEMATIC ERROR ANCHOR: Status-driven visualization */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-rose-500/20 blur-[60px] rounded-full scale-150 group-hover:bg-rose-500/30 transition-all duration-700" />
        <div className="relative z-10 w-24 h-24 bg-slate-950 border border-rose-500/30 rounded-[2.2rem] flex items-center justify-center text-rose-500 shadow-2xl group-hover:rotate-12 transition-transform duration-700">
          <WifiOff size={44} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center text-rose-500 animate-pulse">
          <AlertCircle size={18} />
        </div>
      </div>

      {/* 2. DIAGNOSTIC MESSAGING: Small & Perfect typography */}
      <div className="max-w-sm space-y-6 mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em]">
            Protocol Interruption
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        </div>

        <h2 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tighter leading-none">
          Connection <br /> <span className="text-rose-500">Node Failed</span>
        </h2>

        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-white/5 rounded-xl">
          <Terminal size={14} className="text-slate-500" />
          <p className="text-[11px] font-black text-white uppercase tracking-widest">
            Error Code:{" "}
            <span className="text-rose-400 font-mono">FIN-SYNC-ERR_04</span>
          </p>
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
          The financial ledger for Anand Smart City could not be reached. Check
          your network or the node status and try again.
        </p>
      </div>

      {/* 3. RECOVERY ACTIONS: High-performance buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md relative z-10">
        <button
          onClick={() => window.location.reload()}
          className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 transition-all active:scale-95 group/main"
        >
          <RefreshCw
            size={16}
            className="group-hover/main:rotate-180 transition-transform duration-700"
          />
          Re-Sync Node
        </button>

        <button className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all active:scale-95 group/report">
          Report Error
          <ChevronRight
            size={14}
            className="opacity-40 group-hover/report:opacity-100 group-hover/report:translate-x-1 transition-all"
          />
        </button>
      </div>

      {/* 4. FOOTER: Security metadata */}
      <div className="mt-12 opacity-30 flex items-center gap-2">
        <ShieldAlert size={12} className="text-rose-500" />
        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
          Secure Error Logging Active
        </p>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-[120px] -z-10" />
    </section>
  );
};

export default WalletErrorState;
