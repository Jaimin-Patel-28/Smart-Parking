import React from "react";
import { AlertTriangle, RefreshCw, WifiOff, LifeBuoy } from "lucide-react";

const HelpErrorState = () => {
  const handleReload = () => {
    // Logic to trigger a MERN data re-fetch
    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white rounded-[3rem] border-2 border-[#222222]/5 shadow-sm transition-all duration-500 group">
      {/* 1. VISUAL ANCHOR: Tactile Error Icon */}
      <div className="relative mb-10">
        <div className="w-24 h-24 bg-[#F5E7C6] rounded-[2.5rem] flex items-center justify-center text-[#FA8112] group-hover:rotate-12 transition-all duration-500 shadow-inner">
          <WifiOff size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 p-3 bg-[#222222] rounded-2xl shadow-xl text-[#FAF3E1] group-hover:scale-110 transition-transform">
          <AlertTriangle size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. EDITORIAL TEXT: Transparent Communication */}
      <div className="max-w-sm space-y-4">
        <h2 className="text-3xl font-black text-[#222222] tracking-tighter leading-tight">
          Service{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Interruption
          </span>
        </h2>
        <p className="text-sm font-medium text-[#222222]/40 leading-relaxed">
          We're having trouble reaching the <strong>Anand Smart City</strong>{" "}
          help node. This is likely a temporary sync error.
        </p>
      </div>

      {/* 3. RECOVERY ACTIONS: Tactile Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={handleReload}
          className="flex items-center gap-3 px-10 py-5 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn"
        >
          <RefreshCw
            size={18}
            strokeWidth={3}
            className="group-hover/btn:rotate-180 transition-transform duration-700"
          />
          Reconnect Node
        </button>

        <button className="flex items-center gap-3 px-8 py-5 bg-white border-2 border-[#222222]/5 text-[#222222]/40 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] hover:text-[#222222] transition-all">
          <LifeBuoy size={16} />
          Go to Dashboard
        </button>
      </div>

      {/* 4. VIVA FOOTER: Technical Branding */}
      <div className="mt-12 flex items-center gap-2 opacity-10">
        <div className="w-8 h-0.5 bg-[#222222]"></div>
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">
          Error: MERN_HELP_SYNC_FAIL_02
        </p>
        <div className="w-8 h-0.5 bg-[#222222]"></div>
      </div>

      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[3rem]"></div>
    </section>
  );
};

export default HelpErrorState;
