import React from "react";
import { Target, Eye, MoveRight } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="relative w-full py-36 bg-[#222222]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* MISSION CARD */}
        <article className="group relative p-15 rounded-[2rem] bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 transition-all duration-500 overflow-hidden flex flex-col justify-between">
          {/* Shrunk Background Icon */}
          <Target className="absolute -right-4 -top-4 w-24 h-24 text-[#FA8112] opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700" />

          <div>
            <header className="mb-6">
              <div className="w-15 h-15 flex items-center justify-center rounded-xl bg-[#FA8112]/5 text-[#FA8112]/80 mb-4 group-hover:bg-[#FA8112] group-hover:text-[#222222] transition-all duration-500">
                <Target size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#FAF3E1]/90">
                Our <span className="text-[#FA8112]">Mission</span>
              </h2>
            </header>

            <p className="text-[#FAF3E1]/50 text-md leading-relaxed mb-6">
              Simplifying urban mobility through a secure, real-time parking
              platform. We eliminate city driving stress, giving you back your
              <strong> Time.</strong>
            </p>
          </div>

          <footer className="flex items-center gap-2 text-[#FA8112]/80 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
            Solving the now <MoveRight size={14} />
          </footer>
        </article>

        {/* VISION CARD */}
        <article className="group relative p-15 rounded-[2rem] bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 transition-all duration-500 overflow-hidden flex flex-col justify-between">
          {/* Shrunk Background Icon */}
          <Eye className="absolute -right-4 -top-4 w-24 h-24 text-[#FA8112] opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-700" />

          <div>
            <header className="mb-6">
              <div className="w-15 h-15 flex items-center justify-center rounded-xl bg-[#FAF3E1]/5 text-[#FAF3E1]/60 mb-4 group-hover:bg-[#FA8112] group-hover:text-[#222222] transition-all duration-500">
                <Eye size={28} />
              </div>
              <h2 className="text-3xl font-bold text-[#FAF3E1]/90">
                Our <span className="text-[#FA8112]">Vision</span>
              </h2>
            </header>

            <p className="text-[#FAF3E1]/50 text-md leading-relaxed mb-6">
              Becoming the backbone of smart cities. A future with autonomous
              parking, EV integration, and a{" "}
              <strong>Carbon-Neutral World.</strong>
            </p>
          </div>

          <footer className="flex items-center gap-2 text-[#FA8112]/80 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">
            Building the future <MoveRight size={14} />
          </footer>
        </article>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#222222] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default MissionVision;
