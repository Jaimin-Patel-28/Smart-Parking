import React, { useEffect, useRef, useState } from "react";
import {
  Map,
  History,
  UserCheck,
  LayoutDashboard,
  Wallet,
  Zap,
} from "lucide-react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const features = [
    {
      title: "Live Parking Map",
      description:
        "Real-time Google Maps integration showing available slots with color-coded markers.",
      icon: Map,
      color: "text-blue-400",
      // New: Modern City Map view
      bgImg:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600",
    },
    {
      title: "Booking History",
      description:
        "Keep track of all your past parkings, invoices, and duration with a clean digital log.",
      icon: History,
      color: "text-purple-400",
      // New: Clean Document/Log visual
      bgImg:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600",
    },
    {
      title: "Verified Users",
      description:
        "Enhanced security with OTP-verified profiles and trusted parking space providers.",
      icon: UserCheck,
      color: "text-green-400",
      // New: Abstract Security/Shield pattern
      bgImg:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600",
    },
    {
      title: "Admin Dashboard",
      description:
        "Powerful management tools for owners to track revenue and slot occupancy.",
      icon: LayoutDashboard,
      color: "text-orange-400",
      // Updated: Clean Analytics/Data screen
      bgImg:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
    },
    {
      title: "Smart Wallet",
      description:
        "Seamlessly pay for parking using a built-in wallet with quick recharge options.",
      icon: Wallet,
      color: "text-cyan-400",
      // New: Digital Payment/Fintech aesthetic
      bgImg:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=600",
    },
    {
      title: "Quick Booking",
      description:
        "Book a slot in under 30 seconds with our optimized one-tap reservation system.",
      icon: Zap,
      color: "text-yellow-400",
      // Updated: High-speed/Light trails
      bgImg:
        "https://images.unsplash.com/photo-1503221043305-f7498f8b7888?q=80&w=600",
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
      className="bg-slate-950 py-24 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div
            className={`max-w-xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <span className="text-cyan-400 font-black tracking-widest text-xs uppercase mb-3 block">
              Premium Modules
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Advanced{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                Features
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Everything you need to manage city parking, built with the power
              of the MERN stack for high-performance real-time updates.
            </p>
          </div>
          <div
            className={`hidden md:block h-0.5 grow bg-linear-to-r from-slate-800 to-transparent mx-8 mb-6 transition-all duration-1000 delay-500 ${isVisible ? "w-full opacity-100" : "w-0 opacity-0"}`}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative p-10 rounded-[2.5rem] bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden flex flex-col items-start"
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {/* Relatable Background Image Reveal */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src={item.bgImg}
                    alt=""
                    className="w-full h-full object-cover opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                </div>

                {/* Animated Light Beam */}
                <div className="absolute -top-full left-0 w-full h-full bg-linear-to-b from-cyan-500/10 to-transparent group-hover:top-0 transition-all duration-1000 ease-in-out pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-2xl">
                    <Icon
                      className={`w-8 h-8 ${item.color} group-hover:animate-pulse`}
                    />
                  </div>

                  {/* <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3> */}

                  <h3 className={`text-2xl font-bold text-white mb-4 tracking-tight group-hover:${item.color} transition-colors`}>
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Corner Decorative Element */}
                <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-1 bg-cyan-500/20 rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
