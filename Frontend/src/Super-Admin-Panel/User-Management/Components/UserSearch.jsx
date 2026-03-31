import React from "react";
import { Search, X, Filter } from "lucide-react";

const UserSearch = ({ value, onChange, onClear, isLoading }) => {
  return (
    <div className="relative group w-full">
      {/* Search Icon */}
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
        <Search size={20} />
      </div>

      {/* Main Input */}
      <input
        type="text"
        placeholder="Search by name, email, or User ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-14 pr-12 py-5 bg-white border border-slate-200 rounded-[2rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 font-medium text-slate-700 transition-all placeholder:text-slate-300"
      />

      {/* Right Side Icons (Loading Spinner or Clear Button) */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        ) : value ? (
          <button
            onClick={onClear}
            className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        ) : (
          <div className="flex items-center gap-1 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
            <Filter size={12} className="text-slate-400" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
              Live
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
