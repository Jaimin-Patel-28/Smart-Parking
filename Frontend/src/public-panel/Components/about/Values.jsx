import React from "react";
import {
  Eye,
  ShieldCheck,
  Lightbulb,
  Smartphone,
  CheckCircle,
  Users,
  Heart,
} from "lucide-react";

const Values = () => {
  const valuesData = [
    {
      title: "Transparency",
      desc: "Clear pricing and real-time slot availability without hidden fees.",
      icon: Eye,
    },
    {
      title: "Security",
      desc: "End-to-end encryption for all digital payments and user data.",
      icon: ShieldCheck,
    },
    {
      title: "Innovation",
      desc: "Using the MERN stack to solve parking problems with automation.",
      icon: Lightbulb,
    },
    {
      title: "User-First Design",
      desc: "A responsive and intuitive interface designed for Anand commuters.",
      icon: Smartphone,
    },
    {
      title: "Reliability",
      desc: "99.9% uptime for our booking engine ensuring a stress-free experience.",
      icon: CheckCircle,
    },
    {
      title: "Community",
      desc: "Building a smarter infrastructure for a more organized Gujarat.",
      icon: Users,
    },
  ];

  return (
    <section className="relative w-full py-20 bg-[#222222]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* COMPACT HEADER */}
        <header className="mb-16">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <Heart size={14} className="text-[#FA8112]" />
            <span className="text-[#FAF3E1]/80 text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Core DNA
            </span>
          </aside>

          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-4">
            Principles that <br />
            <span className="text-[#FA8112]">drive us.</span>
          </h2>
        </header>

        {/* VALUES GRID */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0">
          {valuesData.map((item, index) => (
            <li key={index} className="group">
              <article className="h-full flex flex-col gap-4 p-6 rounded-3xl border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 hover:bg-[#FAF3E1]/[0.01] transition-all duration-500">
                {/* ICON BOX */}
                <header className="mb-2">
                  <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#2a2a2a] border border-[#F5E7C6]/5 text-[#FAF3E1]/30 group-hover:text-[#FA8112] group-hover:bg-[#222222] group-hover:border-[#FA8112]/20 transition-all duration-500">
                    <item.icon size={22} strokeWidth={1.5} />
                  </div>
                </header>

                {/* CONTENT */}
                <section>
                  <h3 className="text-[#FAF3E1] text-lg font-bold mb-2 group-hover:text-[#FA8112] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#FAF3E1]/40 text-xs leading-relaxed group-hover:text-[#FAF3E1]/60 transition-colors">
                    {item.desc}
                  </p>
                </section>

                {/* MINI DECORATIVE DOT */}
                <footer className="mt-auto pt-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FA8112]/20 group-hover:bg-[#FA8112] transition-colors" />
                </footer>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FA8112]/[0.01] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Values;
