import React from "react";
import {
  Search,
  Filter,
  Calendar,
  ListOrdered,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const FiltersSearch = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-4xl p-8 lg:p-10 shadow-2xl backdrop-blur-xl h-full flex flex-col justify-between gap-6">
      {/* 1. SEARCH BAR: Full width at top */}
      <div className="relative group w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
          <Search size={16} />
        </div>
        <input
          type="text"
          placeholder="Search by location node..."
          className="w-full bg-slate-950/60 border border-white/5 rounded-xl py-4 pl-14 pr-6 text-[11px] font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
        />
      </div>

      {/* 2. DATE RANGE: Centered Group */}
      <div className="flex justify-center w-full">
        <div className="flex items-center gap-4 bg-slate-950/60 border border-white/5 rounded-xl px-6 py-3 w-fit">
          <Calendar size={14} className="text-blue-400" />
          <div className="flex items-center gap-3">
            <input
              type="date"
              className="bg-transparent text-[10px] font-black text-white uppercase focus:outline-none scheme:dark"
            />
            <span className="text-slate-700 text-xs">—</span>
            <input
              type="date"
              className="bg-transparent text-[10px] font-black text-white uppercase focus:outline-none scheme:dark"
            />
          </div>
        </div>
      </div>

      {/* 3. DROPDOWN ROW: Split layout */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <CustomDropdown icon={Filter} label="Status" />
        <CustomDropdown icon={ListOrdered} label="Sort By" />
      </div>

      {/* 4. RESET ACTION: Centered at bottom */}
      <div className="flex justify-center w-full mt-2">
        <button className="flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all group">
          <RotateCcw
            size={14}
            className="group-hover:rotate-180 transition-transform duration-500"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Reset Action
          </span>
        </button>
      </div>
    </section>
  );
};

/* REUSABLE CUSTOM DROPDOWN */
const CustomDropdown = ({ icon: Icon, label }) => (
  <div className="flex items-center justify-between bg-slate-950/60 border border-white/5 rounded-xl px-5 py-3 hover:border-white/10 transition-all cursor-pointer group">
    <div className="flex items-center gap-3">
      <Icon size={14} className="text-slate-500 group-hover:text-blue-400" />
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <ChevronDown size={14} className="text-slate-700" />
  </div>
);

export default FiltersSearch;
