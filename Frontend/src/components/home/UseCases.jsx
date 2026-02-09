import React, { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Building2,
  ShoppingBag,
  Ticket,
  Building,
} from "lucide-react";

const UseCases = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const users = [
    {
      title: "Daily Commuters",
      desc: "Save time every morning by pre-booking a spot near your office.",
      icon: Briefcase,
      img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=600",
    },
    {
      title: "Offices & IT Parks",
      desc: "Manage employee parking slots and visitor access effortlessly.",
      icon: Building2,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600",
    },
    {
      title: "Shopping Malls",
      desc: "Reduce weekend congestion with organized digital slot allocation.",
      icon: ShoppingBag,
      img: "https://images.unsplash.com/photo-1575729312527-1bdecaae271e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Event Parking",
      desc: "Handle heavy traffic during concerts or sports events with ease.",
      icon: Ticket,
      img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600",
    },
    {
      title: "Smart Cities",
      desc: "Integrate with urban infrastructure for a greener, faster city.",
      icon: Building,
      img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600",
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
      {/* Background radial glow for extra "depth" */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Who Is It <span className="text-cyan-400">For?</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            SmartPark is designed to scale across various urban environments,
            providing tailored solutions for every sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-[2.5rem] p-px bg-slate-800 transition-all duration-700 overflow-hidden min-h-87.5"
                style={{
                  transitionDelay: isVisible ? `${index * 150}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                {/* 1. IMAGE LAYER: High visibility on hover */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-50 transition-opacity duration-700 ease-in-out">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover scale-125 group-hover:scale-100 transition-transform duration-[1.5s]"
                  />
                  {/* Subtle dark tint to maintain contrast */}
                  <div className="absolute inset-0 bg-slate-950/40 transition-colors group-hover:bg-slate-950/20"></div>
                </div>

                {/* 2. CONTENT LAYER: Transparency changes on hover to reveal image */}
                <div
                  className="relative z-10 h-full p-10 flex flex-col justify-between 
                      bg-slate-900/90 group-hover:bg-slate-900/30 
                      rounded-[2.4rem] border border-slate-800/50 
                      group-hover:border-cyan-500/40 transition-all backdrop-blur-sm"
                >
                  <div className="relative">
                    {/* Icon with hover glow */}
                    <div
                      className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-8 
                                  group-hover:bg-cyan-400 group-hover:rotate-12 group-hover:scale-110 
                                  transition-all duration-500 shadow-lg group-hover:shadow-cyan-400/20"
                    >
                      <Icon className="w-8 h-8 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
