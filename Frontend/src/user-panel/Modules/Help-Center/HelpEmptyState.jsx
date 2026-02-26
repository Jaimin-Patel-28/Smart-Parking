import React from "react";
import { SearchX, Sparkles, MessageSquarePlus, ArrowRight } from "lucide-react";

const HelpEmptyState = () => {
  return (
    <section className="flex flex-col items-center justify-center py-24 px-8 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#222222]/10 transition-all duration-700 hover:border-[#FA8112]/20 group">
      {/* 1. VISUAL ANCHOR: Tactile Icon Composition */}
      <div className="relative mb-10">
        <div className="w-24 h-24 bg-[#FAF3E1] rounded-[2.5rem] flex items-center justify-center text-[#222222]/20 group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-500 shadow-inner">
          <SearchX size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 p-3 bg-white rounded-2xl shadow-xl text-[#FA8112] group-hover:animate-bounce">
          <Sparkles size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. EDITORIAL TEXT: High-Contrast Typography */}
      <div className="max-w-xs space-y-4">
        <h2 className="text-3xl font-black text-[#222222] tracking-tighter leading-tight">
          No matches in <br />
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Anand Hub
          </span>
        </h2>
        <p className="text-sm font-medium text-[#222222]/40 leading-relaxed">
          We couldn't find any articles for that search. Try a broader term or
          reach out to our local team.
        </p>
      </div>

      {/* 3. SUGGESTED ACTIONS: Tactile "Humanized" Buttons */}
      <div className="mt-12 flex flex-col gap-4 w-full max-w-60">
        <button className="flex items-center justify-between px-6 py-4 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn">
          <div className="flex items-center gap-3">
            <MessageSquarePlus size={16} strokeWidth={2.5} />
            <span>Raise Ticket</span>
          </div>
          <ArrowRight
            size={14}
            strokeWidth={3}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>

        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          MERN Search Node: Active
        </p>
      </div>

      {/* Subtle paper grain texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-[3rem]"></div>
    </section>
  );
};

export default HelpEmptyState;
