import React from "react";
import { Settings2, BellRing, ArrowRight } from "lucide-react";

const NotificationPreferencesShortcut = () => {
  return (
    <section className="bg-[#F5E7C6]/50 rounded-4xl p-8 border-2 border-dashed border-[#222222]/10 transition-all duration-500 hover:bg-white hover:border-[#FA8112]/20 group">
      {/* 1. ICON & STATUS HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="p-3 rounded-xl bg-white text-[#222222] shadow-sm group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500">
          <Settings2 size={20} strokeWidth={2.5} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#222222]/40">
            System Active
          </span>
        </div>
      </div>

      {/* 2. TEXT CONTENT: Editorial Style */}
      <div className="space-y-2 mb-8">
        <h2 className="text-xl font-black text-[#222222] tracking-tight leading-tight">
          Manage your <br />
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Preferences
          </span>
        </h2>
        <p className="text-xs font-medium text-[#222222]/50 leading-relaxed">
          Choose which alerts you receive via email, push, or SMS.
        </p>
      </div>

      {/* 3. CTA BUTTON: Tactile & High Contrast */}
      <button className="w-full flex items-center justify-between px-6 py-4 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn">
        <div className="flex items-center gap-3">
          <BellRing
            size={16}
            strokeWidth={2.5}
            className="group-hover/btn:animate-bounce"
          />
          <span>Config Settings</span>
        </div>
        <ArrowRight
          size={16}
          strokeWidth={3}
          className="group-hover/btn:translate-x-1 transition-transform"
        />
      </button>

      {/* 4. TECHNICAL FOOTER */}
      <p className="mt-6 text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.3em] text-center">
        MERN Preferences Sync Enabled
      </p>
    </section>
  );
};

export default NotificationPreferencesShortcut;
