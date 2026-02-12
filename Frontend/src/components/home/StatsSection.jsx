import React from "react";
import { Users, MapPin, Clock, ShieldCheck } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      label: "Happy Users",
      value: "10,000+",
      icon: Users,
    },
    {
      label: "Parking Locations",
      value: "500+",
      icon: MapPin,
    },
    {
      label: "Time Saved",
      value: "99%",
      icon: Clock,
    },
    {
      label: "Secure Payments",
      value: "100%",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* HUMANIZED BACKGROUND: Subtle paper grain texture */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-10 rounded-[2.5rem] bg-white border-2 border-[#222222]/5 transition-all duration-500 hover:border-[#222222] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(34,34,34,0.1)]"
              >
                {/* Background Accent: Soft Beige hover */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-[#F5E7C6] opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon Container: Signature Orange on hover */}
                  <div className="p-5 rounded-2xl bg-[#F5E7C6] mb-8 group-hover:bg-[#FA8112] group-hover:rotate-6 transition-all duration-500 border border-[#222222]/5">
                    <Icon className="w-10 h-10 text-[#222222] group-hover:text-[#FAF3E1] transition-colors duration-300 stroke-[1.5px]" />
                  </div>

                  {/* Value: Massive, "Hand-set" Typography */}
                  <h3 className="text-5xl lg:text-6xl font-black text-[#222222] mb-4 tracking-tighter">
                    {item.value}
                  </h3>

                  {/* Label: Clean & Intentional */}
                  <p className="text-[#222222]/50 font-black uppercase tracking-[0.2em] text-xs">
                    {item.label}
                  </p>
                </div>

                {/* Animated Corner Dots: Replacing digital glow with design intent */}
                <div className="absolute top-8 right-8 flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#222222]/10 group-hover:bg-[#FA8112] transition-colors"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#222222]/10 group-hover:bg-[#FA8112]/40 transition-colors"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
