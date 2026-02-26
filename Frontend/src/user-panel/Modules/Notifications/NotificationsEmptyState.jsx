import React from "react";
import { Inbox, Sparkles, Coffee } from "lucide-react";

const NotificationsEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#222222]/10 transition-all duration-700 hover:border-[#FA8112]/20 group">
      {/* 1. VISUAL ANCHOR: Tactile Icon Composition */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-[#FAF3E1] rounded-[2.5rem] flex items-center justify-center text-[#222222]/20 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-inner">
          <Inbox size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 p-3 bg-white rounded-2xl shadow-xl text-[#FA8112] group-hover:animate-bounce">
          <Sparkles size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. EDITORIAL TEXT: High-Contrast Typography */}
      <div className="max-w-xs space-y-3">
        <h2 className="text-3xl font-black text-[#222222] tracking-tighter leading-tight">
          All{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Quiet
          </span>{" "}
          Here
        </h2>
        <p className="text-sm font-medium text-[#222222]/40 leading-relaxed">
          Your notification grid is empty. Take a break—we'll alert you when
          there's a new parking milestone.
        </p>
      </div>

      {/* 3. SUBTLE CTA: "Humanized" Interaction */}
      <div className="mt-10 flex items-center gap-3 px-6 py-3 bg-[#F5E7C6] rounded-full text-[#222222]/40 text-[10px] font-black uppercase tracking-[0.2em] border border-[#222222]/5 shadow-sm">
        <Coffee size={14} strokeWidth={2.5} />
        Status: Fully Synchronized
      </div>

      {/* 4. VIVA DETAIL: Technical Signature */}
      <div className="mt-12 flex items-center gap-2 opacity-10">
        <div className="w-8 h-0.5 bg-[#222222]"></div>
        <p className="text-[8px] font-black uppercase tracking-[0.4em]">
          SmartPark Node Anand 01
        </p>
        <div className="w-8 h-0.5 bg-[#222222]"></div>
      </div>

      {/* Subtle paper grain */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[3rem]"></div>
    </section>
  );
};

export default NotificationsEmptyState;
