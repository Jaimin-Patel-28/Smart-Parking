import React from "react";
import { Search, CalendarCheck, CreditCard, Car } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Search Parking",
      description:
        "Enter your destination to see real-time availability in nearby spots.",
      icon: Search,
    },
    {
      title: "Book Slot",
      description:
        "Select your preferred time slot and reserve it instantly from your phone.",
      icon: CalendarCheck,
    },
    {
      title: "Pay Digitally",
      description:
        "Complete your booking with safe, encrypted UPI or Card payments.",
      icon: CreditCard,
    },
    {
      title: "Park Easily",
      description:
        "Navigate to your spot using our map and enjoy stress-free parking.",
      icon: Car,
    },
  ];

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <header className="text-center mb-20">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.03] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-4">
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              The Process
            </span>
          </aside>
          <h2 className="text-4xl md:text-5xl font-bold text-[#FAF3E1]">
            Four Simple <span className="text-[#FA8112]">Steps</span>
          </h2>
        </header>

        {/* STEPS FLOW CONTAINER */}
        <div className="relative">
          {/* VISUAL PROGRESS LINE (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-[#F5E7C6]/10 -translate-y-1/2 z-0" />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 list-none p-0">
            {steps.map((item, index) => (
              <li key={index} className="relative z-10 group">
                <article className="flex flex-col items-center text-center">
                  {/* STEP INDICATOR & ICON */}
                  <header className="mb-8">
                    <figure className="relative w-20 h-20 flex items-center justify-center bg-[#222222] border-2 border-[#F5E7C6]/10 rounded-3xl group-hover:border-[#FA8112] group-hover:shadow-[0_0_30px_rgba(250,129,18,0.2)] transition-all duration-500">
                      {/* ICON */}
                      <item.icon
                        size={32}
                        className="text-[#FAF3E1] group-hover:text-[#FA8112] transition-colors"
                      />

                      {/* STEP NUMBER BADGE */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#FA8112] text-[#222222] rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                        {index + 1}
                      </div>
                    </figure>
                  </header>

                  {/* STEP CONTENT */}
                  <section className="px-4">
                    <h3 className="text-[#FAF3E1] text-xl font-bold mb-3 group-hover:text-[#FA8112] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#FAF3E1]/50 text-sm leading-relaxed max-w-[200px] mx-auto">
                      {item.description}
                    </p>
                  </section>

                  {/* MOBILE DIVIDER LINE */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden w-[1px] h-12 bg-gradient-to-b from-[#FA8112] to-transparent mt-8 opacity-20" />
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Background Subtle Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FA8112]/[0.01] blur-[150px] pointer-events-none" />
    </section>
  );
};

export default HowItWorks;
