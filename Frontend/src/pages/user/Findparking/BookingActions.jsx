import React from "react";
import {
  CheckCircle2,
  RefreshCw,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const BookingActions = () => {
  return (
    <section className="bg-slate-900/60 border border-white/5 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl backdrop-blur-2xl group transition-all duration-500 relative overflow-hidden">
      {/* 1. HEADER: Small & Perfect operational labeling */}
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <Zap size={22} className="fill-blue-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter leading-none">
              Execution Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2">
              Final Command Phase
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/5 border border-blue-500/10 rounded-xl">
          <ShieldCheck size={12} className="text-blue-400" />
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
            Ready
          </span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* 2. PRIMARY ACTION: High-impact Confirm */}
        <button className="w-full group/main relative overflow-hidden flex items-center justify-between p-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95">
          <div className="flex items-center gap-4">
            <CheckCircle2
              size={24}
              className="group-hover/main:scale-110 transition-transform"
            />
            <div className="text-left">
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                Initialize Transaction
              </span>
              <span className="text-lg font-black uppercase tracking-tighter">
                Confirm Booking
              </span>
            </div>
          </div>
          <ArrowRight
            size={20}
            className="group-hover/main:translate-x-2 transition-transform"
          />
          {/* Animated background glow for the button */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/main:translate-x-full transition-transform duration-1000" />
        </button>

        {/* 3. SECONDARY ACTIONS: Organized grid */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button className="flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-slate-400 hover:text-white transition-all group/btn">
            <RefreshCw
              size={16}
              className="group-hover/btn:rotate-180 transition-transform duration-700"
            />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Change Slot
            </span>
          </button>

          <button className="flex items-center justify-center gap-3 py-4 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-2xl text-rose-500/60 hover:text-rose-500 transition-all group/cancel">
            <XCircle
              size={16}
              className="group-hover/cancel:scale-110 transition-transform"
            />
            <span className="text-[9px] font-black uppercase tracking-widest">
              Cancel All
            </span>
          </button>
        </div>

        {/* 4. FOOTER: Verification metadata */}
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-4 opacity-30">
          <div className="flex items-center gap-2">
            <ShieldCheck size={10} className="text-slate-500" />
            <p className="text-[8px] font-black uppercase tracking-widest">
              Secure Handshake
            </p>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <p className="text-[8px] font-black uppercase tracking-widest text-slate-500">
            v2.0.4 Encrypted
          </p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10 group-hover:bg-blue-500/10 transition-all duration-700" />
    </section>
  );
};

export default BookingActions;
