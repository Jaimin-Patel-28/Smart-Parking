import React from "react";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAF3E1] pt-24 pb-16 lg:pt-40 lg:pb-32">
      {/* HUMANIZED BACKGROUND: 
          Replaced blue tint with Beige (#F5E7C6). 
          The grayscale image now blends into your custom Cream background. 
      */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-screen opacity-[0.15] lg:opacity-25 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=2000"
          alt="Modern Parking"
          className="w-full h-full object-cover grayscale brightness-75"
        />
        {/* Modern mask using your palette colors */}
        <div className="absolute inset-0 bg-linear-to-l from-transparent via-[#FAF3E1]/80 to-[#FAF3E1]"></div>
      </div>

      <div className="container max-w-screen mx-auto px-6 lg:px-16 xl:px-24 relative z-10">
        <div className="max-w-screen">
          {/* Notion-style Tag: Using Beige/Orange combo */}
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center rounded-lg bg-[#F5E7C6] px-4 py-1.5 text-[13px] font-bold text-[#222222] border border-[#222222]/5">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-[#FA8112] animate-pulse"></span>
              LIVE IN 12 CITIES
            </span>
          </div>

          {/* Typography: "Effortless" now uses your Primary Orange */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-[#222222] leading-[0.9] mb-10">
            Parking made <br />
            <span className="text-[#FA8112] font-serif italic font-medium tracking-normal">
              effortless.
            </span>
          </h1>

          {/* Subtext: Improved contrast and width for readability */}
          <p className="max-w-2xl text-xl md:text-2xl text-[#222222]/70 leading-relaxed mb-12 font-medium">
            SmartPark helps you find, book, and navigate to the perfect spot in
            seconds. No more driving in circles—just seamless city living.
          </p>

          {/* Action Buttons: Humanized with tactile hover effects */}
          <div className="flex flex-col sm:flex-row items-center gap-5 mb-20">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#222222] text-[#FAF3E1] rounded-xl font-bold text-lg transition-all hover:bg-[#FA8112] hover:-translate-y-1 active:scale-95 shadow-xl shadow-[#222222]/10">
              Get Started
              <ArrowRight size={20} strokeWidth={3} />
            </button>

            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-[#F5E7C6] border border-[#222222]/10 text-[#222222] rounded-xl font-bold text-lg transition-all hover:bg-[#FAF3E1] active:scale-95">
              <Play size={20} fill="#222222" />
              Watch Demo
            </button>
          </div>

          {/* Simple Stats: Responsive grid with custom border color */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 pt-12 border-t-2 border-[#222222]/5">
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-[#222222] tracking-tighter">
                500+
              </p>
              <p className="text-sm md:text-base font-bold text-[#222222]/50 uppercase tracking-widest">
                Prime Spots
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl md:text-5xl font-black text-[#222222] tracking-tighter">
                10k+
              </p>
              <p className="text-sm md:text-base font-bold text-[#222222]/50 uppercase tracking-widest">
                Daily Users
              </p>
            </div>
            <div className="hidden md:block space-y-1">
              <p className="text-4xl md:text-5xl font-black text-[#222222] tracking-tighter">
                99.9%
              </p>
              <p className="text-sm md:text-base font-bold text-[#222222]/50 uppercase tracking-widest">
                Success Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
