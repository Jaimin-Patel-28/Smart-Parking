{
  /* [calc(100vh-70px)] */
}

import React from "react";
import { Zap, ShieldCheck, Globe, Sparkles } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden bg-[#FAF3E1] px-6">
      {/* BIG BACKGROUND TEXT */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none">
        <div className="flex whitespace-nowrap animate-slideRightToLeft">
          <h1 className="text-[18vw] font-black text-[#222222]/5 tracking-tight mr-20">
            SMARTPARK
          </h1>
          <h1 className="text-[18vw] font-black text-[#222222]/5 tracking-tight mr-20">
            SMARTPARK
          </h1>
        </div>
      </div>

      {/* ORANGE SPOTLIGHT */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-150 bg-[#FA8112]/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 text-center max-w-4xl">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#F5E7C6] border border-[#222222]/10 text-[#222222] text-[10px] font-bold uppercase tracking-widest shadow-sm">
            <Sparkles size={14} className="text-[#FA8112]" />
            The Mission of SmartPark
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-black text-[#222222] leading-tight mb-6">
          Driving the Future
          <br />
          <span className="text-[#FA8112] italic font-serif font-medium">
            of Urban Mobility.
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-[#222222]/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          Built using the <strong className="text-[#222222]">MERN stack</strong>
          , SmartPark transforms traditional parking into a digital-first system
          designed for speed, security, and scalability.
        </p>

        {/* Floating Pillar Cards */}
        <div className="flex flex-wrap justify-center gap-6">
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
              className="flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#222222]/10 text-[#222222] text-sm font-semibold shadow-sm hover:-translate-y-1 transition-all duration-300"
            >
              <pillar.icon size={18} className={pillar.color} />
              {pillar.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
