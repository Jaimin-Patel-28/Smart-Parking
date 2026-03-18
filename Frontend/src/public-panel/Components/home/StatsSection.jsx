import React from "react";
import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { label: "Happy Users", value: "10,000+", icon: Users },
    { label: "Parking Locations", value: "500+", icon: MapPin },
    { label: "Hours Saved", value: "25k+", icon: Clock },
    { label: "Secure Payments", value: "100%", icon: ShieldCheck },
  ];

  return (
    /* Removed min-h-screen to prevent the big gap; added border-t for a clean blend */
    <main className="relative w-full bg-[#222222] py-16 md:py-24 border-t border-[#F5E7C6]/5 overflow-hidden">
      {/* Background Decorative Glow - Lowered opacity for a lighter feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FA8112]/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        {/* SECTION HEADING */}
        <header className="mb-12 md:mb-16">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-4">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Impact
            </span>
          </aside>
          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF3E1] leading-tight">
            Trust built on <span className="text-[#FA8112]">reliability.</span>
          </h2>
          <p className="text-[#FAF3E1]/50 mt-4 max-w-lg text-base md:text-lg">
            Transforming urban mobility with real-time data and secure
            infrastructure for daily commuters.
          </p>
        </header>

        {/* STATS GRID */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, index) => (
            <li key={index} className="list-none">
              <article className="group bg-[#FAF3E1]/[0.02] hover:bg-[#FAF3E1]/[0.04] border border-[#F5E7C6]/10 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2">
                {/* ICON BOX */}
                <figure className="mb-6 inline-flex p-3 rounded-2xl bg-[#FA8112]/10 text-[#FA8112] group-hover:bg-[#FA8112] group-hover:text-[#222222] transition-colors duration-300">
                  <item.icon size={24} strokeWidth={1.5} />
                </figure>

                {/* CONTENT */}
                <section>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#FAF3E1] mb-1 tracking-tight">
                    {item.value}
                  </h3>
                  <p className="text-[#FAF3E1]/40 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    {item.label}
                  </p>
                </section>

                {/* STATUS INDICATORS */}
                <aside className="mt-6 flex gap-1 items-center">
                  <span className="h-1 w-8 rounded-full bg-[#FA8112] opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
                  <span className="h-1 w-1 rounded-full bg-[#F5E7C6]/20" />
                </aside>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default StatsSection;
