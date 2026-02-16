import React, { useEffect, useRef, useState } from "react";
import { CheckCircle } from "lucide-react";

const WhyChoose = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FAF3E1] py-12 px-3 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* HUMANIZED BACKGROUND: Subtle paper grain and a grayscale city blend */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000"
          alt="Smart City"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-[#FAF3E1]"></div>
      </div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          {/* LEFT SIDE: The "Main Feature" Card with a hand-drawn feel */}
          <div
            className={`flex-1 relative transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            {/* Replaced Glow with a Beige Shadow layer */}
            <div className="absolute -inset-4 bg-[#F5E7C6]/50 blur-3xl rounded-full"></div>

            <div className="relative group overflow-hidden border-2 border-[#fa821299] bg-white p-10 md:p-14 rounded-4xl shadow-[0_40px_80px_-15px_rgba(34,34,34,0.1)]">
              {/* Subtle background image within the card */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000"
                  className="w-full h-full object-cover"
                  alt="Parking Grid"
                />
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-[#222222] leading-[0.95] tracking-tighter relative z-10">
                Built for the <br />
                <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                  Next Gen
                </span>{" "}
                <br />
                of Cities.
              </h2>

              <p className="text-[#222222]/60 mt-6 text-lg font-medium relative z-10 max-w-sm leading-relaxed">
                Revolutionizing urban mobility with data-driven parking
                management.
              </p>

              {/* Functional Indicator: Using Primary Orange */}
              <div className="mt-12 flex gap-4 relative z-10">
                <div className="h-3 w-20 bg-[#FA8112] rounded-full"></div>
                <div className="h-3 w-8 bg-[#222222]/10 rounded-full"></div>
                <div className="h-3 w-8 bg-[#222222]/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reasons List with Clean Typography */}
          <div className="flex-1 w-full">
            <div
              className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <span className="text-[#FA8112] font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                WHY CHOOSE US
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-[#222222] mb-8 tracking-tighter">
                The Core Advantages
              </h3>
            </div>

            <div className="space-y-4">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-6 p-6 rounded-2xl border-2 border-transparent hover:border-[#222222]/10 hover:bg-[#F5E7C6]/30 transition-all duration-500 mb-2"
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  }}
                >
                  <div className="mt-1 relative">
                    {/* Hand-drawn style checkmark */}
                    <div className="absolute inset-0 bg-[#FA8112]/20 blur-lg rounded-full scale-0 group-hover:scale-125 transition-transform"></div>
                    <CheckCircle className="w-6 h-6 text-[#FA8112] relative z-10 stroke-[2.5px]" />
                  </div>
                  <div>
                    <h4 className="text-[#222222] font-black text-xl tracking-tight transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[#222222]/60 text-base md:text-base mt-2 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
