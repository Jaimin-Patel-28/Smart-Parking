import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    /* 1. Changed h-screen to min-h-screen to prevent content overflow 
       2. Added pb-32 to create a 'cushion' so StatsSection doesn't touch buttons */
    <section className="relative min-h-screen w-full bg-[#222222] overflow-hidden flex items-center pt-55 pb-32 md:pb-40">
      
      {/* BACKGROUND AREA */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a"
          alt="Modern Parking"
          className="w-full h-full object-cover opacity-30 md:opacity-40"
        />

        {/* VIGNETTE GRADIENTS */}
        {/* Top Fade - Blends with Navbar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-[#222222]/20 to-transparent h-1/3" />

        {/* Bottom Fade - STRENGTHENED to prevent the 'hard cut' line */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-[#222222]/90 to-transparent" />

        {/* Left Side protection - DARKER to ensure text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/60 to-transparent w-full md:w-2/3" />
      </div>

      <article className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col gap-8">
          
          <header className="max-w-2xl">
            {/* LIVE STATUS TAG */}
            <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112]"></span>
              </span>
              <span className="text-[#FAF3E1] text-[10px] font-bold tracking-[0.2em] uppercase">
                12 Cities Live
              </span>
            </aside>

            <h1 className="text-5xl md:text-7xl font-bold text-[#FAF3E1] leading-[1.1] mb-6 tracking-tight">
              Parking made <br />
              <span className="text-[#FA8112]">effortless.</span>
            </h1>

            <p className="text-[#FAF3E1]/70 text-lg md:text-xl max-w-lg leading-relaxed">
              Find, book, and navigate to the perfect spot in seconds. No more
              driving in circles—just seamless city living.
            </p>
          </header>

          <nav className="flex flex-wrap items-center gap-5">
            <button 
              onClick={() => navigate('/auth/login')}
              className="bg-[#FA8112] text-[#222222] px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3 hover:shadow-[0_0_30px_rgba(250,129,18,0.3)] hover:-translate-y-1 transition-all active:scale-95"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
            
            <button 
              onClick={() => navigate('/user/find-parking')}
              className="group flex items-center gap-2 text-[#FAF3E1] font-semibold text-base py-4 px-2 hover:text-[#FA8112] transition-colors"
            >
              View Live Map
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </nav>
        </div>
      </article>

      {/* Subtle decorative glow to bridge the gap to StatsSection */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-t from-[#222222] to-transparent z-20" />
    </section>
  );
};

export default HeroSection;