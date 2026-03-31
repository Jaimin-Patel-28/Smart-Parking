import React from "react";
import { Zap, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

const WhySmartPark = () => {
  const advantages = [
    {
      title: "User-Centric Design",
      desc: "Built with a 'human-first' approach. Our React interface is optimized for speed, ensuring you find parking in under 3 clicks.",
      icon: Heart,
    },
    {
      title: "Uncompromising Security",
      desc: "From encrypted UPI payments to OTP-verified check-ins, your vehicle and data are protected by industry-standard protocols.",
      icon: ShieldCheck,
      featured: true,
    },
    {
      title: "Hyper-Local Speed",
      desc: "Powered by a high-performance Node.js backend, our real-time updates ensure you never see a 'ghost' available spot.",
      icon: Zap,
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[#222222] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <header className="mb-16 md:mb-20">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              The Advantage
            </span>
          </aside>

          <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] leading-tight max-w-2xl">
            Why the world <br />
            chooses <span className="text-[#FA8112]">SmartPark.</span>
          </h2>
        </header>

        {/* ADVANTAGES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {advantages.map((item, index) => (
            <article
              key={index}
              className={`group relative p-8 md:p-10 rounded-[3rem] transition-all duration-500 overflow-hidden flex flex-col justify-between border ${
                item.featured
                  ? "bg-[#FAF3E1]/[0.04] border-[#FA8112]/30 shadow-[0_0_40px_rgba(250,129,18,0.1)]"
                  : "bg-[#FAF3E1]/[0.02] border-[#F5E7C6]/10 hover:border-[#F5E7C6]/30"
              }`}
            >
              {/* DECORATIVE TOP ICON */}
              <div className="flex justify-between items-start mb-12">
                <div
                  className={`p-4 rounded-2xl transition-all duration-500 ${
                    item.featured
                      ? "bg-[#FA8112] text-[#222222]"
                      : "bg-[#FAF3E1]/05 text-[#FAF3E1] group-hover:bg-[#FA8112] group-hover:text-[#222222]"
                  }`}
                >
                  <item.icon size={28} strokeWidth={1.5} />
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                />
              </div>

              {/* CONTENT */}
              <section>
                <h3
                  className={`text-2xl font-bold mb-4 transition-colors ${
                    item.featured
                      ? "text-[#FA8112]"
                      : "text-[#FAF3E1] group-hover:text-[#FA8112]"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-[#FAF3E1]/50 leading-relaxed text-sm md:text-base group-hover:text-[#FAF3E1]/80 transition-colors">
                  {item.desc}
                </p>
              </section>

              {/* BOTTOM ACCENT */}
              <div
                className={`mt-8 h-1 w-12 rounded-full transition-all duration-500 ${
                  item.featured
                    ? "bg-[#FA8112] w-20"
                    : "bg-[#F5E7C6]/10 group-hover:bg-[#FA8112] group-hover:w-20"
                }`}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Background Subtle Accent Glow */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FA8112]/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default WhySmartPark;
