import React from "react";
import { Wallet, ShieldCheck, Sparkles, TrendingUp, Lock } from "lucide-react";

const WalletHeader = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 border-b border-white/5 pb-16">
      {/* 1. CINEMATIC BACKGROUND: Emerald-tinted mesh for financial growth feel */}
      <div className="absolute inset-0 h-64 md:h-80 bg-linear-to-br from-emerald-600/20 via-blue-600/10 to-slate-950">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/* 2. MAIN CONTAINER: Fluid padding for high-density scannability */}
      <div className="relative max-w-400 mx-auto px-6 md:px-12 pt-24 md:pt-32">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 lg:gap-12">
          {/* HEADER CONTENT: Content-rich typography */}
          <div className="space-y-6 pb-2">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-[0.4em]">
                  Financial Asset Node
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/5 border border-blue-500/10 rounded-full">
                <Lock size={10} className="text-blue-400" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
                  SSL Encrypted
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.85]">
              Smart <br /> <span className="text-emerald-500">Wallet</span>
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-slate-400 pt-2">
              <div className="flex items-center gap-3">
                <Wallet size={14} className="text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  Liquid Assets
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <TrendingUp size={14} className="text-blue-400" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  Transaction Flow
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                <ShieldCheck size={14} className="text-indigo-400" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                  Verified Secure
                </span>
              </div>
            </div>
          </div>

          {/* QUICK FINANCIAL STATS: Real-time asset data */}
          <div className="grid grid-cols-2 gap-6 w-full md:w-auto pb-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">
                Total Balance
              </p>
              <p className="text-2xl font-black text-white uppercase tracking-tighter">
                ₹450.00
              </p>
            </div>
            <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-md">
              <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-1">
                24h Volume
              </p>
              <p className="text-2xl font-black text-white uppercase tracking-tighter">
                ₹1,240
              </p>
            </div>
          </div>
        </div>

        {/* 3. SYSTEM NOTIFICATION: High-density security alert */}
        <div className="mt-16 flex items-center justify-between border-t border-white/5 pt-8 opacity-40">
          <div className="flex items-center gap-3">
            <Sparkles size={14} className="text-emerald-400" />
            <span className="text-[9px] font-black text-white uppercase tracking-widest">
              Anand Hub Financial Settlement Protocol active.
            </span>
          </div>
          <div className="hidden md:block">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Node ID: WH-992-SECURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletHeader;
