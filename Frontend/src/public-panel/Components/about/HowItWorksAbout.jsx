import React from "react";
import { Search, MousePointer2, Wallet, Car, ArrowRight } from "lucide-react";

const HowItWorksAbout = () => {
  const steps = [
    {
      title: "Discover Space",
      desc: "Search for available parking across Anand in real-time.",
      icon: Search,
    },
    {
      title: "Select & Reserve",
      desc: "Choose your slot and booking duration with a single tap.",
      icon: MousePointer2,
    },
    {
      title: "Digital Payment",
      desc: "Complete your booking securely using the Smart Wallet.",
      icon: Wallet,
    },
    {
      title: "Park & Relax",
      desc: "Navigate to your reserved spot and enjoy the experience.",
      icon: Car,
    },
  ];

  return (
    <section className="relative w-full py-20 bg-[#222222]">
      <div className="max-w-6xl mx-auto px-6">
        {/* COMPACT HEADER */}
        <header className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FAF3E1] mb-4">
            The <span className="text-[#FA8112]">SmartPark</span> Flow
          </h2>
          <p className="text-[#FAF3E1]/50 text-sm max-w-xl mx-auto leading-relaxed">
            Our automated process is designed to save you time and optimize
            urban space in the Smart City network.
          </p>
        </header>

        {/* STEPS FLOW */}
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
          {steps.map((step, index) => (
            <li key={index} className="relative group">
              {/* DESKTOP CONNECTOR ARROW */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:flex absolute top-10 -right-4 text-[#F5E7C6]/10 z-20 transition-colors group-hover:text-[#FA8112]/40">
                  <ArrowRight size={24} />
                </div>
              )}

              <article className="flex flex-col items-center text-center">
                {/* STEP INDICATOR & ICON */}
                <header className="mb-6">
                  <figure className="relative w-20 h-20 flex items-center justify-center bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl group-hover:border-[#FA8112]/40 transition-all duration-500">
                    {/* STEP NUMBER */}
                    <span className="absolute -top-3 -left-3 text-[10px] font-mono font-bold text-[#FA8112] bg-[#222222] border border-[#FA8112]/20 px-2 py-1 rounded-md">
                      0{index + 1}
                    </span>

                    <step.icon
                      size={28}
                      className="text-[#FAF3E1]/70 group-hover:text-[#FA8112] transition-colors"
                      strokeWidth={1.5}
                    />
                  </figure>
                </header>

                {/* STEP CONTENT */}
                <section>
                  <h3 className="text-[#FAF3E1] text-lg font-bold mb-2 group-hover:text-[#FA8112] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#FAF3E1]/40 text-xs leading-relaxed px-4">
                    {step.desc}
                  </p>
                </section>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowItWorksAbout;
