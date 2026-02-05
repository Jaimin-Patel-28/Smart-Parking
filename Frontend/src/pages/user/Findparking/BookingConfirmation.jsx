import React from "react";
import {
  CheckCircle2,
  Ticket,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";

const BookingConfirmation = () => {
  return (
    <section className="bg-slate-900/60 border border-emerald-500/20 rounded-[3rem] p-10 lg:p-16 shadow-2xl backdrop-blur-3xl group transition-all duration-700 relative overflow-hidden text-center flex flex-col items-center">
      {/* 1. SUCCESS ANCHOR: Animated verification node */}
      <div className="relative mb-10">
        <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full scale-150 animate-pulse" />
        <div className="relative z-10 w-24 h-24 bg-slate-950 border border-emerald-500/30 rounded-4xl flex items-center justify-center text-emerald-400 shadow-2xl group-hover:rotate-360 transition-transform duration-1000">
          <CheckCircle2 size={48} className="fill-emerald-400/5" />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 animate-bounce">
          <Sparkles size={18} />
        </div>
      </div>

      {/* 2. CORE CONTENT: High-density success typography */}
      <div className="max-w-md space-y-6 mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">
            Validation Node Success
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
          Parking Slot <br /> <span className="text-emerald-500">Secured</span>
        </h2>

        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-950/80 border border-white/5 rounded-xl">
          <Ticket size={14} className="text-slate-500" />
          <p className="text-[11px] font-black text-white uppercase tracking-widest">
            ID: <span className="text-emerald-400">SP-2026-992-0402</span>
          </p>
        </div>

        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
          Your allocation at Anand Central Hub is now active. The node will
          remain reserved for your arrival.
        </p>
      </div>

      {/* 3. NAVIGATION ACTIONS: High-performance buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-lg relative z-10">
        <button className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 transition-all active:scale-95 group/main">
          Go to My Bookings
          <ArrowRight
            size={16}
            className="group-hover/main:translate-x-1 transition-transform"
          />
        </button>

        <button className="w-full sm:flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-all active:scale-95 group/details">
          View Node Details
          <ExternalLink
            size={14}
            className="opacity-40 group-hover/details:opacity-100 transition-opacity"
          />
        </button>
      </div>

      {/* 4. FOOTER: Verification node */}
      <div className="mt-12 flex items-center gap-2 opacity-30">
        <ShieldCheck size={12} className="text-emerald-500" />
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">
          Blockchain Verified Asset • 2026
        </p>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] -z-10" />
    </section>
  );
};

export default BookingConfirmation;
