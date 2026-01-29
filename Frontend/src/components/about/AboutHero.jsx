import React from "react";
import { Zap, ShieldCheck, Globe, Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-slate-950">
      {/* 1. THE TECH GRID (Subtle backdrop) */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* 2. THE NEON BEAMS (Converging from corners) */}
      {/* Left Beam */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-linear-to-br from-cyan-500/20 via-transparent to-transparent -rotate-12 blur-xl pointer-events-none"></div>

      {/* Right Beam */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-bl from-blue-500/20 via-transparent to-transparent rotate-12 blur-xl pointer-events-none"></div>

      {/* Central Sharp Beams (The bright lines) */}
      <div className="absolute top-0 left-1/4 w-px h-150 bg-linear-to-b from-cyan-400 via-cyan-400/20 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)] rotate-15 origin-top"></div>
      <div className="absolute top-0 right-1/4 w-px h-150 bg-linear-to-b from-blue-400 via-blue-400/20 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] -rotate-15 origin-top"></div>

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        {/* TOP BADGE */}
        <div className="flex justify-center mb-8">
          <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
            <Sparkles size={14} className="animate-pulse" />
            The Mission of SmartPark
          </span>
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
          Driving the Future <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
            of Urban Mobility.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Born out of a vision to digitize the streets of <strong>Anand</strong>
          , SmartPark leverages the <strong>MERN stack</strong> to eliminate
          parking stress through real-time automation and secure digital
          infrastructure.
        </p>

        {/* CORE PILLARS */}
        <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-sm backdrop-blur-sm hover:border-amber-400/30 transition-colors">
            <Zap size={18} className="text-amber-400" />
            <span>Real-time Efficiency</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-sm backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span>Secure Transactions</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-sm backdrop-blur-sm hover:border-blue-500/30 transition-colors">
            <Globe size={18} className="text-blue-400" />
            <span>Smart City Ready</span>
          </div>
        </div>
      </div>

      {/* SECTION DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-800 to-transparent"></div>
    </section>
  );
};

export default AboutHero;
