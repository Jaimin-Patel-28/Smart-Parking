import React from "react";
import { Terminal, Activity } from "lucide-react";

const Tabs = ({
  activeTab,
  onTabChange,
  tabs = ["Current", "Upcoming", "History"],
}) => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
      {/* 1. SECTOR LABEL */}
      <div className="flex items-center gap-3 opacity-20 ml-1">
        <Terminal size={14} />
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
          Registry_Sector
        </span>
      </div>

      {/* 2. TAB CONTROLLER */}
      <div className="inline-flex p-1 bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl w-full md:w-fit shadow-2xl">
        {tabs.map((tab) => {
          const isActive = activeTab.toLowerCase() === tab.toLowerCase();

          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab.toLowerCase())}
              className={`
                relative flex-1 md:flex-none md:min-w-[130px] py-2.5 px-6 
                text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-500 rounded-lg
                ${
                  isActive
                    ? "bg-[#FA8112] text-[#222222] shadow-[0_0_20px_rgba(250,129,18,0.15)]"
                    : "text-[#FAF3E1]/20 hover:text-[#FAF3E1]/50 hover:bg-[#FAF3E1]/[0.02]"
                }
              `}
            >
              <span className="relative z-10">{tab}</span>

              {/* 3. SIGNAL LED: High-intensity active pulse */}
              {isActive && (
                <div className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FA8112] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FA8112] shadow-[0_0_10px_#FA8112]"></span>
                </div>
              )}

              {/* ACTIVE UNDERGLOW */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
