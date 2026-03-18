import React from "react";
import {
  Car,
  ShoppingBag,
  Building2,
  Ticket,
  Landmark,
  UserPlus,
} from "lucide-react";

const TargetAudience = () => {
  const audiences = [
    {
      title: "Daily Commuters",
      desc: "Anand's office workers and students looking for guaranteed daily spots.",
      icon: Car,
      tag: "Individuals",
    },
    {
      title: "Shopping Malls",
      desc: "Optimizing customer flow and reducing weekend entrance congestion.",
      icon: ShoppingBag,
      tag: "Commercial",
    },
    {
      title: "Offices & IT Parks",
      desc: "Structured parking for employees with automated RFID/Digital entry.",
      icon: Building2,
      tag: "Corporate",
    },
    {
      title: "Event Venues",
      desc: "Temporary high-capacity booking for festivals and sports events.",
      icon: Ticket,
      tag: "Temporary",
    },
    {
      title: "City Authorities",
      desc: "Real-time traffic data and urban space utilization analytics.",
      icon: Landmark,
      tag: "Government",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-[#222222]">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* COMPACT HEADER */}
        <header className="mb-16">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <UserPlus size={14} className="text-[#FA8112]" />
            <span className="text-[#FAF3E1]/80 text-[10px] font-bold tracking-[0.2em] uppercase">
              Who We Serve
            </span>
          </aside>

          <h2 className="text-3xl md:text-5xl font-bold text-[#FAF3E1] leading-tight mb-4">
            Tailored for <br />
            <span className="text-[#FA8112]">everyone.</span>
          </h2>
        </header>

        {/* AUDIENCE GRID */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
          {audiences.map((item, index) => (
            <li key={index} className="group">
              <article className="h-full bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-8 rounded-[2rem] hover:bg-[#FAF3E1]/[0.04] hover:border-[#FA8112]/20 transition-all duration-500">
                <header className="flex justify-between items-center mb-6">
                  {/* TAG BADGE */}
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FA8112] bg-[#FA8112]/10 px-3 py-1 rounded-full border border-[#FA8112]/20">
                    {item.tag}
                  </span>

                  {/* ICON */}
                  <div className="text-[#FAF3E1]/20 group-hover:text-[#FA8112] transition-colors duration-500">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                </header>

                <section>
                  <h3 className="text-[#FAF3E1] text-xl font-bold mb-3 group-hover:text-[#FA8112] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#FAF3E1]/40 text-sm leading-relaxed group-hover:text-[#FAF3E1]/60 transition-colors">
                    {item.desc}
                  </p>
                </section>

                {/* DECORATIVE INDICATOR */}
                <div className="mt-6 h-[1px] w-8 bg-[#F5E7C6]/10 group-hover:w-full group-hover:bg-[#FA8112]/30 transition-all duration-700" />
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Subtle Side Glow */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#FA8112]/[0.03] blur-[100px] pointer-events-none" />
    </section>
  );
};

export default TargetAudience;
