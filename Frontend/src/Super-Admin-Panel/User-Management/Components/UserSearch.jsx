import React from "react";
import { Search, X, Filter } from "lucide-react";

const UserSearch = ({ value, onChange, onClear, isLoading }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <div className="relative group w-full">
      {/* Search Icon - Dimmed Cream to Tangerine on focus */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within:text-[#FA8112] transition-colors">
        <Search size={20} />
      </div>

      {/* Main Input - Glassmorphism style */}
      <input
        type="text"
        placeholder="Search by name, email, or User ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-16 pr-14 py-5 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-[2.5rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-[#FA8112]/5 focus:border-[#FA8112] font-medium text-[#FAF3E1] transition-all placeholder:text-[#FAF3E1]/20 tracking-tight"
      />

      {/* Right Side Icons (Loading Spinner or Clear Button) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
        {isLoading ? (
          // Loading Spinner using Tangerine Accent
          <div className="h-5 w-5 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin" />
        ) : value ? (
          // Clear Button - Muted to Rose Red on hover
          <button
            onClick={onClear}
            className="p-1.5 hover:bg-rose-500/10 rounded-full text-[#FAF3E1]/20 hover:text-rose-500 transition-colors"
          >
            <X size={18} />
          </button>
        ) : (
          // Live Badge - Glassmorphism style
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#FAF3E1]/[0.05] rounded-full border border-[#F5E7C6]/5">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse shadow-[0_0_8px_#FA8112]" />
            <span className="text-[10px] font-black text-[#FAF3E1]/40 uppercase tracking-[0.2em]">
              Live
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
