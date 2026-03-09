import React from "react";
import {
  Search,
  MapPin,
  Sparkles,
  Navigation,
  ShieldCheck,
  Activity,
} from "lucide-react";

const FindParkingHeader = ({ stats, currentPath }) => {
  // Logic to determine which Node is active based on the URL
  const getStepClass = (pathSegment, isExact = false) => {
    const isActive = isExact
      ? currentPath === pathSegment
      : currentPath.includes(pathSegment);

    return isActive
      ? "text-[#FA8112] font-black scale-110 transition-all duration-300 relative"
      : "text-[#FAF3E1]/20 font-medium";
  };

  return (
    <div className="w-full space-y-8 py-4">
      {/* 🟢 Top Status & Meta Layer */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3 bg-[#FAF3E1]/[0.03] px-4 py-2 rounded-2xl border border-[#F5E7C6]/5">
          <Activity size={14} className="text-[#FA8112] animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#FAF3E1]/60 font-bold">
            System Status: Nominal
          </span>
        </div>
        <div className="flex items-center gap-2 text-[#FA8112]">
          <ShieldCheck size={16} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-black">
            Live Inventory Node
          </span>
        </div>
      </div>

      {/* 🟢 Main Branding Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-[#FAF3E1] leading-[0.9]">
            Find <br /> <span className="text-[#FA8112]">Parking</span>
          </h1>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-widest">
              <MapPin size={12} className="text-[#FA8112]" />
              <span>Anand Smart City</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#FAF3E1]/20" />
            <div className="flex items-center gap-2 text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} className="text-[#FA8112]" />
              <span>AI Optimized</span>
            </div>
          </div>
        </div>

        {/* Real-Time Stats Display */}
        <div className="flex gap-8 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-5 rounded-[2rem] min-w-[280px]">
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-1 font-bold">
              Available Slots
            </p>
            <p className="text-3xl font-black text-[#FAF3E1] tabular-nums">
              {stats?.totalSlots || "1,248"}
            </p>
          </div>
          <div className="w-[1px] bg-[#F5E7C6]/10" />
          <div className="flex-1">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-1 font-bold">
              Active Hubs
            </p>
            <p className="text-3xl font-black text-[#FAF3E1] tabular-nums">
              {stats?.activeHubs || "24"}
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 NODE-WISE PROGRESS TRACKER (5 NODES) */}
      <div className="relative pt-6">
        {/* Connection Line Background */}
        <div className="absolute top-[38px] left-0 w-full h-[1px] bg-[#FAF3E1]/5 z-0" />

        <div className="relative z-10 flex justify-between items-center text-[9px] uppercase tracking-[0.25em] font-black">
          <div className="flex flex-col items-center gap-3 group">
            <span className={getStepClass("/user/find-parking", true)}>
              Node 01: Search
            </span>
            <div
              className={`w-2 h-2 rounded-full border-2 transition-all ${currentPath === "/user/find-parking" ? "bg-[#FA8112] border-[#FA8112] shadow-[0_0_15px_#FA8112]" : "bg-[#222222] border-[#FAF3E1]/20"}`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <span className={getStepClass("results")}>Node 02: Results</span>
            <div
              className={`w-2 h-2 rounded-full border-2 transition-all ${currentPath.includes("results") ? "bg-[#FA8112] border-[#FA8112] shadow-[0_0_15px_#FA8112]" : "bg-[#222222] border-[#FAF3E1]/20"}`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <span className={getStepClass("select-slot")}>
              Node 03: Selection
            </span>
            <div
              className={`w-2 h-2 rounded-full border-2 transition-all ${currentPath.includes("select-slot") ? "bg-[#FA8112] border-[#FA8112] shadow-[0_0_15px_#FA8112]" : "bg-[#222222] border-[#FAF3E1]/20"}`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <span className={getStepClass("checkout")}>Node 04: Checkout</span>
            <div
              className={`w-2 h-2 rounded-full border-2 transition-all ${currentPath.includes("checkout") ? "bg-[#FA8112] border-[#FA8112] shadow-[0_0_15px_#FA8112]" : "bg-[#222222] border-[#FAF3E1]/20"}`}
            />
          </div>

          <div className="flex flex-col items-center gap-3 group">
            <span className={getStepClass("success")}>Final: Success</span>
            <div
              className={`w-2 h-2 rounded-full border-2 transition-all ${currentPath.includes("success") ? "bg-[#FA8112] border-[#FA8112] shadow-[0_0_15px_#FA8112]" : "bg-[#222222] border-[#FAF3E1]/20"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindParkingHeader;
