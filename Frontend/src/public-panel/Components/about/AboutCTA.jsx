import React from "react";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-16 px-6 bg-[#222222]">
      {/* COMPACT CARD CONTAINER */}
      <article className="relative max-w-4xl mx-auto rounded-3xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/1 p-8 md:p-12 text-center overflow-hidden hover:border-[#FA8112]/20 transition-all duration-500">
        {/* SUBTLE GLOW OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#FA8112]/5 to-transparent pointer-events-none" />

        <header className="relative z-10 max-w-xl mx-auto">
          {/* COMPACT LABEL */}
          <aside className="inline-flex items-center gap-2 bg-[#2a2a2a] border border-[#F5E7C6]/5 px-3 py-1.5 rounded-full mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FA8112]"></span>
            </span>
            <span className="text-[#FAF3E1]/60 text-[9px] font-bold tracking-[0.2em] uppercase">
              Final Step
            </span>
          </aside>

          {/* COMPACT HEADING */}
          <h2 className="text-2xl md:text-4xl font-bold text-[#FAF3E1] leading-tight mb-4 tracking-tight">
            Ready for{" "}
            <span className="text-[#FA8112]">Frictionless Parking?</span>
          </h2>

          {/* COMPACT DESCRIPTION */}
          <p className="text-[#FAF3E1]/40 text-sm md:text-base leading-relaxed mb-10">
            Join the SmartPark network and help us build a more organized and
            efficient Anand Smart City.
          </p>
        </header>

        {/* COMPACT ACTION BUTTONS */}
        <nav className="relative z-10 flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/auth/login')}
            className="bg-[#FA8112] text-[#222222] px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(250,129,18,0.2)] hover:-translate-y-0.5 transition-all active:scale-95 group"
          >
            Get Started
            <ArrowRight
              size={18}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </button>

          <button 
            onClick={() => navigate('/user/find-parking')}
            className="bg-[#FAF3E1]/[0.03] text-[#FAF3E1] border border-[#F5E7C6]/10 px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#FAF3E1]/[0.08] transition-all group"
          >
            <ExternalLink size={16} className="text-[#FA8112]" />
            Live Demo
          </button>
        </nav>

        {/* MINIMAL REPOSITORY LINK */}
        <footer className="relative z-10 mt-12 flex justify-center opacity-40 hover:opacity-100 transition-opacity">
          <a
            href="#github"
            className="flex items-center gap-2 text-[#FAF3E1] text-[11px] font-bold uppercase tracking-[0.3em] group"
          >
            <Github size={14} />
            View Source Code
            <div className="h-[1px] w-0 bg-[#FA8112]/50 transition-all group-hover:w-6" />
          </a>
        </footer>
      </article>

      {/* Subtle bottom separation */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F5E7C6]/5 to-transparent" />
    </section>
  );
};

export default AboutCTA;
