import React from "react";
import {
  Filter,
  SortAsc,
  CheckCircle,
  ChevronDown,
  Layers,
} from "lucide-react";

const NotificationsFilters = () => {
  return (
    <section className="bg-white border-b-2 border-[#222222]/5 px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300">
      {/* 1. LEFT SIDE: Functional Filter Group */}
      <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 text-[#222222]/30 px-2">
          <Filter size={16} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Refine
          </span>
        </div>

        {/* CUSTOM SELECT: Type */}
        <div className="relative group flex-1 md:flex-none">
          <select className="appearance-none bg-[#F5E7C6]/50 border-2 border-transparent hover:border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-widest pl-4 pr-10 py-3 rounded-xl cursor-pointer outline-none transition-all w-full">
            <option>All Alerts</option>
            <option>Parking</option>
            <option>Wallet</option>
            <option>System</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#222222]/30 pointer-events-none group-hover:text-[#FA8112] transition-colors"
          />
        </div>

        {/* CUSTOM SELECT: Status */}
        <div className="relative group flex-1 md:flex-none">
          <select className="appearance-none bg-[#FAF3E1] border-2 border-transparent hover:border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-widest pl-4 pr-10 py-3 rounded-xl cursor-pointer outline-none transition-all w-full">
            <option>Unread Only</option>
            <option>Archive</option>
          </select>
          <Layers
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#222222]/30 pointer-events-none group-hover:text-[#FA8112] transition-colors"
          />
        </div>
      </div>

      {/* 2. RIGHT SIDE: Sort & Global Action */}
      <div className="flex items-center gap-4 w-full md:w-auto border-t-2 md:border-t-0 border-[#FAF3E1] pt-6 md:pt-0">
        {/* SORT TOGGLE */}
        <div className="relative group flex-1 md:flex-none">
          <select className="appearance-none bg-white border-2 border-[#222222]/5 text-[#222222] text-[11px] font-black uppercase tracking-widest pl-10 pr-4 py-3 rounded-xl cursor-pointer outline-none transition-all w-full">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
          <SortAsc
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FA8112]"
          />
        </div>

        {/* PRIMARY ACTION: Mark All */}
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[#222222] text-[#FAF3E1] rounded-xl hover:bg-[#FA8112] transition-all duration-300 shadow-xl shadow-[#222222]/10 active:scale-95 whitespace-nowrap">
          <CheckCircle size={16} strokeWidth={2.5} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Mark All
          </span>
        </button>
      </div>
    </section>
  );
};

export default NotificationsFilters;
