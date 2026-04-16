import React from "react";
import {
  Layout,
  Sparkles,
  PieChart,
  BarChart3,
  Activity,
  MousePointer2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppPreview = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#222222] py-24 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <header className="text-center mb-16">
          <aside className="inline-flex items-center gap-2 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-[#FA8112]" />
            <span className="text-[#FAF3E1] text-[10px] font-bold tracking-[0.2em] uppercase">
              Intelligence Suite
            </span>
          </aside>

          <h2 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] leading-tight mb-6">
            Real-time <br />
            <span className="text-[#FA8112]">Analytics.</span>
          </h2>

          <p className="text-[#FAF3E1]/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Our MERN-powered dashboard provides instant insights into occupancy,
            revenue, and peak hours at a single glance.
          </p>
        </header>

        {/* BROWSER FRAME REPRESENTATION */}
        <article className="relative group mx-auto max-w-5xl transition-all duration-700 hover:rotate-x-2">
          {/* Browser Top Bar */}
          <header className="bg-[#2a2a2a] border border-[#F5E7C6]/10 rounded-t-2xl px-6 py-4 flex items-center justify-between shadow-2xl">
            <nav className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
            </nav>
            <address className="not-italic text-[#FAF3E1]/30 text-[10px] font-mono tracking-widest bg-[#222222] px-4 py-1.5 rounded-full border border-[#F5E7C6]/5 uppercase">
              admin.smartpark.io/analytics
            </address>
            <div className="w-12" /> {/* Spacer */}
          </header>

          {/* Dashboard Body Structure */}
          <section className="flex bg-[#FAF3E1]/[0.02] backdrop-blur-xl border-x border-b border-[#F5E7C6]/10 rounded-b-2xl h-[400px] md:h-[500px] overflow-hidden shadow-2xl">
            {/* Sidebar Navigation Skeleton */}
            <aside className="hidden md:flex w-20 lg:w-64 border-r border-[#F5E7C6]/5 flex-col p-6 gap-8">
              <div className="h-4 w-24 bg-[#FAF3E1]/10 rounded-full mb-4" />{" "}
              {/* Sidebar Header */}
              <nav className="flex flex-col gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-[#FAF3E1]/5" />
                    <div className="h-2 flex-1 bg-[#FAF3E1]/5 rounded-full" />
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Dashboard Content Area */}
            <section className="flex-1 p-6 md:p-10 flex flex-col gap-8 overflow-y-auto">
              {/* Metric Summary Grid */}
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none">
                {[
                  {
                    icon: PieChart,
                    label: "Occupancy",
                    color: "text-blue-400",
                  },
                  {
                    icon: BarChart3,
                    label: "Revenue",
                    color: "text-[#FA8112]",
                  },
                  {
                    icon: Activity,
                    label: "Live Traffic",
                    color: "text-green-400",
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-[#2a2a2a] p-6 rounded-2xl border border-[#F5E7C6]/5 flex items-center gap-4 group/card hover:border-[#FA8112]/30 transition-all"
                  >
                    <div
                      className={`p-3 rounded-xl bg-[#222222] ${item.color}`}
                    >
                      <item.icon size={20} />
                    </div>
                    <span className="text-[#FAF3E1]/80 font-bold text-sm">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Main Visual Display Area */}
              <figure className="relative flex-1 bg-[#2a2a2a]/50 rounded-3xl border border-[#F5E7C6]/5 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Decorative Grid Lines */}
                <div
                  className="absolute inset-0 opacity-5 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(#FAF3E1 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Status Badge */}
                <aside className="relative flex items-center gap-3 bg-[#222222] border border-green-500/20 px-4 py-2 rounded-full mb-6 group-hover:scale-105 transition-transform">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-green-400 text-[10px] font-bold tracking-widest uppercase">
                    System Active
                  </span>
                </aside>

                <h3 className="text-[#FAF3E1]/40 text-sm mb-8 italic">
                  Visualization generated from live IoT sensors...
                </h3>

                {/* Call to Action Button */}
                <nav>
                  <button 
                    onClick={() => navigate('/user/dashboard')}
                    className="group/btn relative px-8 py-4 bg-[#FA8112] text-[#222222] rounded-2xl font-bold flex items-center gap-3 hover:shadow-[0_0_30px_rgba(250,129,18,0.4)] transition-all active:scale-95"
                  >
                    <Layout size={20} />
                    Explore Dashboard
                    <MousePointer2 className="absolute -bottom-4 -right-4 text-[#FAF3E1] opacity-0 group-hover/btn:opacity-100 transition-all translate-x-4 group-hover/btn:translate-x-0" />
                  </button>
                </nav>
              </figure>
            </section>
          </section>

          {/* 3D Reflection Effect */}
          <div className="absolute -bottom-10 left-10 right-10 h-20 bg-[#FA8112]/5 blur-[80px] rounded-full -z-10" />
        </article>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#FA8112]/[0.02] blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default AppPreview;
