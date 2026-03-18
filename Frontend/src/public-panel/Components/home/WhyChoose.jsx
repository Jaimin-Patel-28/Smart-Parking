import React from "react";
import { CheckCircle } from "lucide-react";

const WhyChoose = () => {
  const reasons = [
    {
      title: "Maximum Efficiency",
      desc: "Faster than traditional parking with zero searching time.",
    },
    {
      title: "Paperless System",
      desc: "Digital receipts and e-tickets—no more physical paperwork.",
    },
    {
      title: "High Security",
      desc: "Encrypted transactions and transparent pricing with no hidden fees.",
    },
    {
      title: "Scalable Infrastructure",
      desc: "Designed to be Smart-city ready for modern urban environments.",
    },
    {
      title: "Modern Experience",
      desc: "User-friendly UI built with React for a smooth, fast experience.",
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT SIDE: BOLD HEADING */}
          <header className="sticky top-32">
            <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
              <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
                Why Choose Us
              </span>
            </aside>
            <h2 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] leading-[1.1] mb-6">
              Built for the <br />
              <span className="text-[#FA8112]">Next Gen</span> <br />
              of Cities.
            </h2>
            <p className="text-[#FAF3E1]/50 text-lg md:text-xl leading-relaxed max-w-md">
              Revolutionizing urban mobility with data-driven parking management
              and seamless digital flows.
            </p>

            {/* DECORATIVE FOOTER ELEMENTS */}
            <footer className="mt-12 flex items-center gap-4 opacity-20">
              <div className="h-[1px] w-12 bg-[#FA8112]" />
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5E7C6]" />
                <span className="w-2 h-2 rounded-full bg-[#F5E7C6]" />
                <span className="w-2 h-2 rounded-full bg-[#F5E7C6]" />
              </div>
            </footer>
          </header>

          {/* RIGHT SIDE: CORE ADVANTAGES */}
          <section>
            <h3 className="text-[#FAF3E1]/80 text-sm font-bold uppercase tracking-[0.3em] mb-12">
              The Core Advantages
            </h3>

            <ul className="space-y-10 list-none p-0">
              {reasons.map((item, index) => (
                <li
                  key={index}
                  className="group flex gap-6 items-start transition-all duration-300"
                >
                  {/* ICON INDICATOR */}
                  <div className="mt-1">
                    <CheckCircle
                      size={24}
                      className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:scale-110 transition-all duration-300"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* CONTENT */}
                  <header className="flex flex-col gap-2">
                    <h4 className="text-[#FAF3E1] text-xl font-bold group-hover:text-[#FA8112] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[#FAF3E1]/40 text-sm md:text-base leading-relaxed group-hover:text-[#FAF3E1]/60 transition-colors duration-300">
                      {item.desc}
                    </p>

                    {/* BORDER LINE ANIMATION */}
                    <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-[#F5E7C6]/10 to-transparent group-hover:from-[#FA8112]/40 transition-all duration-500" />
                  </header>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FA8112]/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default WhyChoose;
