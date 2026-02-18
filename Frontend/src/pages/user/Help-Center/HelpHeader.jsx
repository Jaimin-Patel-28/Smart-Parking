import React from "react";
import { LifeBuoy, Sparkles, ShieldCheck } from "lucide-react";

const HelpHeader = () => {
  return (
    <section className="relative overflow-hidden rounded-[3rem] bg-white border-2 border-[#222222]/5 p-10 md:p-16 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. BACKGROUND DECORATION: Subtle paper grain and organic shapes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#F5E7C6]/40 blur-3xl rounded-full pointer-events-none group-hover:bg-[#FA8112]/5 transition-colors duration-700"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        {/* MINI BADGE: Clean editorial style */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#222222] text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
          <LifeBuoy size={14} className="text-[#FA8112] animate-spin-slow" />
          24/7 Support Active
        </div>

        {/* MAIN HEADING: High-contrast typography */}
        <h1 className="text-5xl md:text-8xl font-black text-[#222222] tracking-tighter leading-none">
          How can we{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            help?
          </span>
        </h1>

        <p className="text-[#222222]/50 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          Navigate through our resources or reach out to our team in{" "}
          <strong className="text-[#222222]">Anand Smart City</strong>. We're
          here to ensure your parking experience is seamless.
        </p>

        {/* 2. TRUST INDICATORS: Professional MERN feedback */}
        <div className="pt-8 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#222222]/30">
            <ShieldCheck size={16} className="text-emerald-500" />
            Verified Solutions
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#222222]/30">
            <Sparkles size={16} className="text-[#FA8112]" />
            Instant Support
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpHeader;
