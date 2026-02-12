import React from "react";
import { Zap, ShieldCheck, Globe, Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden bg-[#FAF3E1]">
      {/* 1. HUMANIZED BACKGROUND: Subtle paper texture instead of tech grids */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      {/* 2. SIMPLE ACCENTS: Soft Beige blurs for a gentle "hand-painted" glow */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-full bg-[#F5E7C6]/50 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 right-[-10%] w-[40%] h-full bg-[#FA8112]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10 text-center">
        {/* TOP BADGE: Clean Beige Pill */}
        <div className="flex justify-center mb-10 animate-fade-in">
          <span className="flex items-center gap-3 px-6 py-2 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-[0.3em] shadow-sm">
            <Sparkles size={16} className="text-[#FA8112] animate-pulse" />
            The Mission of SmartPark
          </span>
        </div>

        {/* MAIN HEADING: Massive, "Hand-set" Editorial Typography */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#222222] mb-10 tracking-tighter leading-[0.9] animate-slide-up">
          Driving the Future <br />
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            of Urban Mobility.
          </span>
        </h1>

        {/* DESCRIPTION: High-readability MERN focus */}
        <p className="text-[#222222]/60 text-xl md:text-2xl max-w-3xl mx-auto mb-16 leading-relaxed font-medium animate-slide-up delay-200">
          Born out of a vision to digitize the streets of{" "}
          <strong className="text-[#222222]">Anand</strong>, SmartPark leverages
          the <strong className="text-[#222222]">MERN stack</strong> to
          eliminate parking stress through real-time automation and secure
          digital infrastructure.
        </p>

        {/* CORE PILLARS: Simple, tactile cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 animate-slide-up delay-400">
          {[
            {
              icon: Zap,
              label: "Real-time Efficiency",
              color: "text-[#FA8112]",
            },
            {
              icon: ShieldCheck,
              label: "Secure Transactions",
              color: "text-[#222222]",
            },
            {
              icon: Globe,
              label: "Smart City Ready",
              color: "text-[#222222]/60",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border-2 border-[#222222]/5 text-[#222222] text-sm font-bold shadow-sm hover:border-[#222222] hover:-translate-y-1 transition-all duration-300"
            >
              <pillar.icon size={20} className={pillar.color} />
              <span>{pillar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION DIVIDER: Minimalist line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-[#222222]/5"></div>
    </section>
  );
};

export default AboutHero;
