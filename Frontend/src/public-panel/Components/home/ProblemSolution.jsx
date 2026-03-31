import React from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  Shield,
  ArrowRight,
} from "lucide-react";

const ProblemSolution = () => {
  const points = [
    {
      problem: "Wasting 20+ minutes searching for a parking spot.",
      solution: "Instant real-time availability tracking.",
      icon: Clock,
    },
    {
      problem: "Complex and confusing manual payment systems.",
      solution: "One-tap secure digital payments.",
      icon: CreditCard,
    },
    {
      problem: "Uncertainty about vehicle safety in open areas.",
      solution: "Verified and secure parking zones.",
      icon: Shield,
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADING */}
        <header className="text-center max-w-3xl mx-auto mb-20">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              The Evolution
            </span>
          </aside>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] mb-6">
            Why <span className="text-[#FA8112]">SmartPark?</span>
          </h2>
          <p className="text-[#FAF3E1]/50 text-lg leading-relaxed">
            Traditional parking is broken. We're here to fix it with a modern,
            hand-crafted approach that saves you time and stress.
          </p>
        </header>

        {/* COMPARISON LIST */}
        <ul className="space-y-6">
          {points.map((item, index) => (
            <li key={index} className="list-none group">
              <article className="grid grid-cols-1 lg:grid-cols-11 items-center bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#FA8112]/30">
                {/* PROBLEM BLOCK */}
                <section className="lg:col-span-5 p-8 md:p-10 opacity-60 group-hover:opacity-100 transition-opacity">
                  <header className="flex items-center gap-3 mb-4 text-[#FAF3E1]/60">
                    <AlertCircle size={20} className="text-red-400/50" />
                    <span className="text-xs font-bold uppercase tracking-widest">
                      The Friction
                    </span>
                  </header>
                  <p className="text-[#FAF3E1]/80 text-xl font-medium leading-snug">
                    {item.problem}
                  </p>
                </section>

                {/* TRANSITION ICON / DIVIDER */}
                <aside className="lg:col-span-1 flex justify-center py-4 lg:py-0">
                  <div className="bg-[#FA8112] p-4 rounded-2xl shadow-[0_0_20px_rgba(250,129,18,0.3)] group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={24} className="text-[#222222]" />
                  </div>
                </aside>

                {/* SOLUTION BLOCK */}
                <section className="lg:col-span-5 p-8 md:p-10 bg-[#FA8112]/[0.03] lg:border-l border-[#F5E7C6]/10">
                  <header className="flex items-center gap-3 mb-4">
                    <CheckCircle2 size={20} className="text-[#FA8112]" />
                    <span className="text-[#FA8112] text-xs font-bold uppercase tracking-widest">
                      The Fix
                    </span>
                  </header>
                  <p className="text-[#FAF3E1] text-xl font-bold leading-snug">
                    {item.solution}
                  </p>
                </section>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#FA8112]/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default ProblemSolution;
