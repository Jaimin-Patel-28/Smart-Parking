import React, { useEffect, useRef, useState } from "react";
import {
  Layout,
  Sparkles,
  PieChart,
  BarChart3,
  Activity,
  ArrowUpRight,
} from "lucide-react";

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
      className="bg-slate-950 py-24 px-6 relative overflow-hidden"
    >
      {/* Imaginative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-cyan-500/10 blur-[150px] rounded-full animate-pulse"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex justify-center mb-6">
            <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-black uppercase tracking-[0.2em]">
              <Sparkles size={14} className="animate-spin-slow" />
              Intelligence Suite
            </span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Real-time{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
              Analytics.
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Our MERN-powered dashboard provides instant insights into occupancy,
            revenue, and peak hours.
          </p>
        </div>

        {/* 3D Browser Frame Window */}
        <div
          className={`relative mx-auto max-w-5xl rounded-4xl overflow-hidden border border-slate-800/50 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-slate-900 transition-all duration-1000 ease-out transform
            ${isVisible ? "translate-y-0 rotate-x-0 opacity-100" : "translate-y-32 rotate-x-12 opacity-0"}`}
          style={{ perspective: "1200px" }}
        >
          {/* Header Bar */}
          <div className="bg-slate-800/50 backdrop-blur-md px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="bg-slate-950/80 px-6 py-1.5 rounded-full text-[10px] text-slate-500 font-mono border border-slate-800 tracking-wider">
              HTTPS://ADMIN.SMARTPARK.IO/ANALYTICS
            </div>
            <div className="w-10"></div> {/* Spacer */}
          </div>

          {/* Dashboard UI Body */}
          <div className="p-4 md:p-8 grid grid-cols-12 gap-6 bg-slate-950/40">
            {/* Sidebar Skeleton - Responsive hide */}
            <div className="col-span-3 space-y-6 hidden lg:block border-r border-slate-800/50 pr-6">
              <div className="h-4 w-24 bg-slate-800 rounded animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-11 w-full rounded-xl transition-all ${i === 1 ? "bg-cyan-500/10 border border-cyan-500/20" : "bg-slate-900"}`}
                  ></div>
                ))}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9 space-y-8">
              {/* Stats Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: PieChart, label: "Occupancy" },
                  { icon: BarChart3, label: "Revenue" },
                  { icon: Activity, label: "Live Traffic" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="h-28 bg-slate-900 border border-slate-800/50 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-800/50 transition-colors group"
                  >
                    <stat.icon
                      className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-500"
                      size={24}
                    />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* High-Tech Image Display */}
              {/* High-Tech Image Display - Added fixed minimum height to ensure visibility */}
              <div className="relative group w-full min-h-75 md:min-h-112.5 aspect-video rounded-[2.5rem] overflow-hidden border border-slate-800/50 shadow-2xl bg-slate-900">
                {/* The Image - Using Pexels for better compatibility */}
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Live Dashboard Data Visualization"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[1.5s] ease-in-out grayscale group-hover:grayscale-0"
                  onLoad={(e) => console.log("Image Loaded Successfully")}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/1200x800/0f172a/22d3ee?text=Analytics+Dashboard+Active")
                  }
                />

                {/* IMAGINATIVE OVERLAY: Digital Grid/Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(34,211,238,0.03),rgba(0,0,0,0),rgba(59,130,246,0.03))] bg-size-[100%_4px,4px_100%] pointer-events-none"></div>

                {/* Interactive Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button className="group relative flex items-center gap-3 bg-slate-950/80 hover:bg-cyan-400 px-10 py-5 rounded-2xl border border-cyan-500/30 transition-all duration-500 backdrop-blur-xl overflow-hidden shadow-2xl">
                    <span className="relative z-10 text-cyan-400 group-hover:text-slate-950 font-black uppercase text-xs tracking-[0.3em] flex items-center gap-3">
                      <Layout size={18} /> Explore Live Demo
                    </span>
                    {/* Liquid Fill Animation */}
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-20"></div>
                  </button>
                </div>

                {/* Status Indicator Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="flex items-center gap-3 px-4 py-2 bg-slate-950/90 border border-slate-800 rounded-full backdrop-blur-md">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      System Active
                    </span>
                  </div>
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
