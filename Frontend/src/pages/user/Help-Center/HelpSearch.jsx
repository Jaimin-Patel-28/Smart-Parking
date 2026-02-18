import React from "react";
import { Search, Sparkles, TrendingUp, X } from "lucide-react";

const HelpSearch = () => {
  const suggestedTopics = [
    "Parking Rates",
    "Wallet Top-up",
    "Booking Cancel",
    "Anand Mall Spots",
  ];

  return (
    <section className="relative z-30">
      <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-2 shadow-2xl shadow-[#222222]/5 transition-all duration-500 hover:border-[#FA8112]/20">
        {/* 1. SEARCH INPUT BOX */}
        <div className="relative flex items-center">
          <div className="absolute left-6 text-[#FA8112]">
            <Search size={22} strokeWidth={3} />
          </div>

          <input
            type="text"
            placeholder="Search help articles..."
            className="w-full bg-[#F5E7C6]/30 border-none rounded-[2rem] py-6 pl-16 pr-14 text-[#222222] font-black text-sm uppercase tracking-widest placeholder:text-[#222222]/30 focus:ring-4 focus:ring-[#FA8112]/5 outline-none transition-all"
          />

          <button className="absolute right-6 p-2 rounded-xl bg-[#222222] text-[#FAF3E1] hover:bg-[#FA8112] transition-colors shadow-lg">
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* 2. SUGGESTED TOPICS: Editorial Style */}
        <div className="px-6 py-5 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#222222]/30">
            <TrendingUp size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Quick Look
            </span>
          </div>

          {suggestedTopics.map((topic, index) => (
            <button
              key={index}
              className="px-4 py-1.5 rounded-full bg-[#FAF3E1] border border-[#222222]/5 text-[#222222]/60 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all shadow-sm"
            >
              {topic}
            </button>
          ))}

          <div className="ml-auto hidden md:flex items-center gap-2 text-[#FA8112]/40">
            <Sparkles size={12} />
            <span className="text-[9px] font-black uppercase tracking-widest italic">
              AI Powered
            </span>
          </div>
        </div>
      </div>

      {/* 3. VIVA SIGNATURE: Technical Context */}
      <p className="mt-4 text-center text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
        Real-time Indexing: Enabled &bull; MERN Search Node
      </p>
    </section>
  );
};

export default HelpSearch;
