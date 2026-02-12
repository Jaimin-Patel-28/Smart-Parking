import React, { useEffect, useRef, useState } from "react";
import { Layout, Sparkles, PieChart, BarChart3, Activity } from "lucide-react";

const AppPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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
      className="bg-[#FAF3E1] py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* HUMANIZED BACKGROUND: Subtle paper texture instead of digital glows */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-40 pointer-events-none"></div>

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#F5E7C6] border border-[#222222]/5 text-[#FA8112] text-[11px] font-black uppercase tracking-[0.2em]">
              <Sparkles size={14} className="animate-pulse" />
              Intelligence Suite
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-[#222222] mb-6 tracking-tighter leading-none">
            Real-time <br className="md:hidden" />
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Analytics.
            </span>
          </h2>
          <p className="text-[#222222]/60 text-xl max-w-2xl mx-auto font-medium">
            Our MERN-powered dashboard provides instant insights into occupancy,
            revenue, and peak hours.
          </p>
        </div>

        {/* Browser Frame Window: Humanized with soft shadows and custom palette */}
        <div
          className={`relative mx-auto max-w-6xl rounded-[2.5rem] overflow-hidden border-4 border-[#222222] shadow-[0_40px_100px_-20px_rgba(34,34,34,0.15)] bg-white transition-all duration-1000 ease-out transform
            ${isVisible ? "translate-y-0 rotate-x-0 opacity-100" : "translate-y-32 rotate-x-6 opacity-0"}`}
          style={{ perspective: "1500px" }}
        >
          {/* Header Bar: Clean & Minimal */}
          <div className="bg-[#F5E7C6] px-8 py-5 border-b-2 border-[#222222] flex items-center justify-between">
            <div className="flex gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#222222]/10"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#222222]/10"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#222222]/10"></div>
            </div>
            <div className="hidden sm:block bg-white px-8 py-2 rounded-lg text-[11px] text-[#222222]/40 font-bold border border-[#222222]/5 tracking-widest">
              ADMIN.SMARTPARK.IO/ANALYTICS
            </div>
            <div className="w-12"></div>
          </div>

          {/* Dashboard UI Body */}
          <div className="p-6 md:p-10 grid grid-cols-12 gap-8 bg-white">
            {/* Sidebar Skeleton */}
            <div className="col-span-3 space-y-8 hidden lg:block border-r-2 border-[#FAF3E1] pr-8">
              <div className="h-4 w-20 bg-[#F5E7C6] rounded animate-pulse"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-12 w-full rounded-xl transition-all ${
                      i === 1
                        ? "bg-[#FA8112] shadow-lg shadow-[#FA8112]/20"
                        : "bg-[#FAF3E1]"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9 space-y-10">
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: PieChart, label: "Occupancy" },
                  { icon: BarChart3, label: "Revenue" },
                  { icon: Activity, label: "Live Traffic" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="h-32 bg-[#FAF3E1] border-2 border-transparent rounded-3xl flex flex-col items-center justify-center gap-4 hover:border-[#FA8112]/20 hover:bg-white transition-all duration-300 group shadow-sm"
                  >
                    <stat.icon
                      className="text-[#222222]/40 group-hover:text-[#FA8112] transition-colors duration-500"
                      size={28}
                    />
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#222222] font-black">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* High-Tech Image Display */}
              <div className="relative group w-full aspect-video rounded-4xl overflow-hidden border-2 border-[#222222]/5 shadow-inner bg-[#FAF3E1]">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Dashboard"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 group-hover:scale-105 transition-transform duration-[2s]"
                />

                {/* Status Indicator */}
                <div className="absolute top-8 left-8 z-20">
                  <div className="flex items-center gap-3 px-5 py-2.5 bg-white border-2 border-[#222222] rounded-full shadow-xl">
                    <div className="w-2.5 h-2.5 bg-[#FA8112] rounded-full animate-ping"></div>
                    <span className="text-[11px] text-[#222222] font-black uppercase tracking-widest">
                      System Active
                    </span>
                  </div>
                </div>

                {/* Center Action Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button className="group relative flex items-center gap-4 bg-[#222222] hover:bg-[#FA8112] px-12 py-6 rounded-2xl transition-all duration-500 shadow-2xl hover:-translate-y-1">
                    <span className="text-[#FAF3E1] font-black uppercase text-xs tracking-[0.3em] flex items-center gap-3">
                      <Layout size={20} /> Explore Demo
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;
