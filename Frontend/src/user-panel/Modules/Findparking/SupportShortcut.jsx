import React from "react";
import {
  LifeBuoy,
  AlertCircle,
  Headphones,
  MessageSquare,
  ChevronRight,
  Zap,
} from "lucide-react";

const SupportShortcut = () => {
  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
      {/* 🟠 Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#FA8112]/20 rounded-2xl text-[#FA8112]">
            <LifeBuoy size={24} className="animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-[#FAF3E1]">
              Need Help?
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
              Assistance Node v1.0
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FA8112]/5 border border-[#FA8112]/20 rounded-full">
          <Zap size={12} className="text-[#FA8112] fill-[#FA8112]" />
          <span className="text-[9px] font-black text-[#FA8112] uppercase tracking-widest">
            24/7 Live
          </span>
        </div>
      </div>

      {/* 🟠 Support Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Report Issue Button */}
        <button className="group flex items-center gap-4 p-5 rounded-[1.5rem] bg-[#222222] border border-red-500/10 hover:border-red-500/40 hover:bg-red-500/[0.02] transition-all text-left">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-[#FAF3E1] uppercase tracking-tight">
              Report Issue
            </p>
            <p className="text-[10px] text-[#FAF3E1]/30 font-medium">
              Technical or Slot Discrepancy
            </p>
          </div>
          <ChevronRight
            size={18}
            className="text-[#FAF3E1]/10 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
          />
        </button>

        {/* Contact Support Button */}
        <button className="group flex items-center gap-4 p-5 rounded-[1.5rem] bg-[#222222] border border-[#F5E7C6]/5 hover:border-[#FA8112]/40 hover:bg-[#FA8112]/[0.02] transition-all text-left">
          <div className="p-3 bg-[#FA8112]/10 rounded-xl text-[#FA8112] group-hover:scale-110 transition-transform">
            <Headphones size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black text-[#FAF3E1] uppercase tracking-tight">
              Contact Node
            </p>
            <p className="text-[10px] text-[#FAF3E1]/30 font-medium">
              Direct Human Assistance
            </p>
          </div>
          <ChevronRight
            size={18}
            className="text-[#FAF3E1]/10 group-hover:text-[#FA8112] group-hover:translate-x-1 transition-all"
          />
        </button>
      </div>

      {/* 🟠 Status Footer */}
      <div className="flex items-center justify-center gap-2 text-[#FAF3E1]/20">
        <MessageSquare size={12} />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
          Avg Response: <span className="text-[#4ADE80]">2 Mins</span>
        </span>
      </div>
    </div>
  );
};

export default SupportShortcut;
