import React, { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Building2,
  ShoppingBag,
  Ticket,
  Building,
  ArrowUpRight,
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
      img: "https://images.unsplash.com/photo-1575729312527-1bdecaae271e?q=80&w=687",
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
      className="bg-[#FAF3E1] py-20 px-5 md:px-12 lg:px-24"
    >
      <div className="container mx-auto max-w-screen-2xl">
        {/* HEADER: Notion-style Editorial Layout */}
        <div
          className={`mb-15 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#222222] tracking-tighter mb-4 leading-none">
            Built for <br />
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              every scenario.
            </span>
          </h2>
          <p className="text-[#222222]/60 text-lg max-w-xl font-medium leading-relaxed">
            A flexible platform designed to scale across urban environments and
            specialized sectors.
          </p>
        </div>

        {/* GRID: Hand-coded "Card" feel with high-contrast borders */}
        <div className="h-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`h-fit group relative overflow-hidden rounded-3xl border-[#222222]/5 bg-white transition-all duration-500  hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(34,34,34,0.1)] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col h-full">
                  {/* Image Container: Black and White to Color Transition */}
                  <div className="relative aspect-16/11 overflow-hidden border-[#222222]/5 group-hover:border-[#222222]">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale brightness-110 contrast-75 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 group-hover:contrast-100"
                    />
                    {/* The "Hand-drawn" Arrow Icon */}
                    <div className="absolute top-6 right-6 h-12 w-12 rounded-2xl bg-[#222222] flex items-center justify-center text-[#FAF3E1] opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowUpRight size={22} strokeWidth={3} />
                    </div>
                  </div>

                  {/* Content: Clean, High-Contrast Typography */}
                  <div className="p-7">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5E7C6] text-[#222222] mb-6 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-colors duration-500 border border-[#222222]/5">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-black text-[#222222] mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-[#222222]/60 font-medium leading-relaxed text-sm">
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
