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
      className="bg-[#F5E7C6] md:px-14 lg:px-24 relative overflow-hidden"
      // #F5E7C6
    >
      {/* HUMANIZED BACKGROUND: Subtle paper texture instead of heavy images */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div
          className={`text-center mb-24 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-[#FA8112] font-black tracking-[0.2em] uppercase text-sm mb-4 block">
            THE PROCESS
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#222222] tracking-tighter">
            Four Simple{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Steps
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* THE PROGRESS PATH: Humanized with your Primary Orange */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-[#222222]/5">
            <div
              className="absolute h-full bg-[#FA8112] transition-all duration-2000 ease-in-out"
              style={{ width: isVisible ? "100%" : "0%" }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group relative transition-all duration-1000"
                  style={{
                    transitionDelay: isVisible ? `${index * 200}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  }}
                >
                  <div className="relative mb-8">
                    {/* The Icon Box: Beige background with Charcoal border */}
                    <div className="w-20 h-20 rounded-xl bg-[#FAF3E1] border-2 border-[#222222]/5 flex items-center justify-center group-hover:border-[#FA8112] group-hover:-rotate-3 transition-all duration-500 relative z-20 shadow-sm">
                      <Icon
                        size={32}
                        className="text-[#222222] group-hover:text-[#FA8112] transition-colors stroke-[1.5px]"
                      />

                      {/* Step Number: High contrast Charcoal/Cream */}
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-lg bg-[#222222] text-[#FAF3E1] font-bold flex items-center justify-center text-sm z-30 transform group-hover:scale-110 group-hover:rotate-6 transition-all">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 px-4">
                    <h3 className="text-xl font-black text-[#222222] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#222222]/60 text-base md:text-base leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Mobile Divider */}
                  {index !== steps.length - 1 && (
                    <div
                      className={`lg:hidden w-px h-12 bg-[#222222]/10 mt-8 transition-all duration-1000 origin-top`}
                      style={{
                        transitionDelay: `${index * 200 + 100}ms`,
                        transform: isVisible ? "scaleY(1)" : "scaleY(0)",
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
