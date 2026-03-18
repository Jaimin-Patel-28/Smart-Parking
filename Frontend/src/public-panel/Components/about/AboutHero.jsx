import React from "react";
import { ShieldCheck, Globe, Zap } from "lucide-react";

const AboutHero = () => {
  return (
    <section className="relative min-h-screen w-full bg-[#222222] overflow-hidden flex items-center pt-55 pb-20">
      {/* BACKGROUND AREA - Subtle Abstract Feel */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
          alt="Smart City Infrastructure"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        {/* Deep vignettes to blend with #222222 */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#222222] via-transparent to-[#222222]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#222222] via-[#222222]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE: THE MESSAGE */}
        <header className="flex flex-col gap-6">
          <aside className="inline-flex items-center gap-2 bg-[#FA8112]/10 border border-[#FA8112]/20 px-3 py-1.5 rounded-full w-fit">
            <Globe size={14} className="text-[#FA8112]" />
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Established 2025
            </span>
          </aside>

          <h1 className="text-5xl md:text-7xl font-bold text-[#FAF3E1] leading-[1.1] tracking-tight">
            We are <br />
            <span className="text-[#FA8112]">Redefining</span> <br />
            Urban Space.
          </h1>

          <p className="text-[#FAF3E1]/60 text-lg md:text-xl max-w-lg leading-relaxed mt-4">
            SmartPark isn't just an app; it's a movement toward frictionless
            cities. We build the digital threads that connect drivers to secure
            destinations.
          </p>
        </header>

        {/* RIGHT SIDE: THE GLASS MISSION CARD */}
        <div className="relative">
          {/* Decorative Glow behind card */}
          <div className="absolute inset-0 bg-[#FA8112]/10 blur-[100px] rounded-full -z-10" />

          <article className="bg-[#FAF3E1]/[0.02] backdrop-blur-xl border border-[#F5E7C6]/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            {/* Corner Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FA8112]/10 rounded-full blur-2xl" />

            <div className="flex flex-col gap-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#FA8112] rounded-2xl text-[#222222]">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-[#FAF3E1] text-2xl font-bold">
                  Our Promise
                </h3>
              </div>

              <p className="text-[#FAF3E1]/70 leading-relaxed text-lg">
                "To deliver a secure, real-time parking ecosystem that respects
                your time and enhances city living through modern MERN-stack
                innovation."
              </p>

              <footer className="flex items-center gap-6 pt-6 border-t border-[#F5E7C6]/5">
                <div className="flex flex-col">
                  <span className="text-[#FA8112] font-bold text-xl">100%</span>
                  <span className="text-[#FAF3E1]/40 text-[10px] uppercase font-bold tracking-widest">
                    Secure
                  </span>
                </div>
                <div className="w-[1px] h-8 bg-[#F5E7C6]/10" />
                <div className="flex flex-col">
                  <span className="text-[#FA8112] font-bold text-xl">
                    Real-time
                  </span>
                  <span className="text-[#FAF3E1]/40 text-[10px] uppercase font-bold tracking-widest">
                    Updates
                  </span>
                </div>
              </footer>
            </div>
          </article>

          {/* Floating decorative element */}
          <div className="absolute -bottom-6 -left-6 bg-[#222222] border border-[#F5E7C6]/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce shadow-[#FA8112]/10">
            <Zap size={20} className="text-[#FA8112]" />
            <span className="text-[#FAF3E1] text-xs font-bold uppercase tracking-widest">
              Optimized
            </span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Transition Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#222222] to-transparent z-20" />
    </section>
  );
};

export default AboutHero;
