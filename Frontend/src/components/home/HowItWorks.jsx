import React, { useEffect, useRef, useState } from "react";
import { Search, CalendarCheck, CreditCard, Car } from "lucide-react";

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-slate-950 py-24 px-6 relative overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className={`text-center mb-24 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-cyan-400 font-black tracking-[0.3em] uppercase text-xs mb-4 block">
            The Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Four Simple <span className="text-cyan-400">Steps</span>
          </h2>
        </div>

        <div className="relative">
          {/* THE PROGRESS PATH (Desktop Only) */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-slate-800">
            <div
              className="absolute h-full bg-linear-to-r from-cyan-500 via-blue-500 to-cyan-500 transition-all duration-2500 ease-in-out shadow-[0_0_15px_rgba(34,211,238,0.4)]"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group relative transition-all duration-1000 ease-out"
                  style={{
                    transitionDelay: isVisible ? `${index * 300}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  }}
                >
                  {/* Fixed Icon Container: Removed overflow-hidden so number isn't cut off */}
                  <div className="relative mb-10">
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-cyan-400/20 animate-ping opacity-0 group-hover:opacity-100"></div>

                    {/* The Icon Box - overflow-visible is key here */}
                    <div className="w-24 h-24 rounded-4xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 group-hover:-rotate-6 transition-all duration-500 relative z-20 shadow-2xl">
                      <Icon
                        size={38}
                        className="text-white group-hover:text-cyan-400 transition-colors"
                      />

                      {/* Fixed Step Number: Now sits on top and isn't clipped */}
                      <div className="absolute -bottom-3 -right-3 w-11 h-11 rounded-2xl bg-cyan-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-[0_4px_20px_rgba(34,211,238,0.4)] z-30 transform group-hover:scale-110 group-hover:rotate-12 transition-all">
                        0{index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-65 mx-auto group-hover:text-slate-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Mobile Divider (Sequential Growth) */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`lg:hidden w-0.5 h-12 bg-linear-to-b from-cyan-500 to-transparent mt-8 transition-all duration-1000 origin-top`}
                      style={{
                        transitionDelay: `${index * 300 + 150}ms`,
                        transform: isVisible ? "scaleY(1)" : "scaleY(0)",
                        opacity: isVisible ? 0.5 : 0,
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
