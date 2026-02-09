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
      className="bg-slate-950 py-24 px-6 relative overflow-hidden"
    >
      {/* Background Decorative Image */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1000"
          alt="Smart City"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-l from-transparent to-slate-950"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* LEFT SIDE: Visual Element with Smooth Floating Animation */}
          <div
            className={`flex-1 relative transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
          >
            <div className="absolute inset-0 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>

            <div className="relative group overflow-hidden border border-slate-800 bg-slate-900/60 p-8 md:p-12 rounded-[3rem] backdrop-blur-xl shadow-2xl">
              {/* Added Image inside the card */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
                <img
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1000"
                  className="w-full h-full object-cover"
                  alt="Parking Grid"
                />
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] relative z-10">
                Built for the <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  Next Gen
                </span>{" "}
                <br />
                of Cities.
              </h2>

              <p className="text-slate-400 mt-6 text-lg relative z-10 max-w-sm">
                Revolutionizing urban mobility with data-driven parking
                management.
              </p>

              <div className="mt-10 flex gap-4 relative z-10">
                <div className="h-2 w-16 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="h-2 w-6 bg-slate-700 rounded-full"></div>
                <div className="h-2 w-6 bg-slate-700 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Reasons List with Sequential Entrance */}
          <div className="flex-1 w-full">
            <div
              className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                Why Choose Us
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-10">
                The Core Advantages
              </h3>
            </div>

            <div className="space-y-4">
              {reasons.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-5 p-6 rounded-3xl border border-transparent hover:border-slate-800 hover:bg-slate-900/40 transition-all duration-500"
                  style={{
                    transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(30px)",
                  }}
                >
                  <div className="mt-1 relative">
                    <div className="absolute inset-0 bg-cyan-400/20 blur-md rounded-full scale-0 group-hover:scale-150 transition-transform"></div>
                    <CheckCircle className="w-7 h-7 text-cyan-400 relative z-10 group-hover:rotate-360 transition-all duration-700" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed">
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
