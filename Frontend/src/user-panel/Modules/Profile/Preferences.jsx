import React from "react";
import {
  Languages,
  Moon,
  MapPin,
  ChevronRight,
  Sparkles,
  Globe,
} from "lucide-react";

const Preferences = () => {
  return (
    /* FIXED: Using 'rounded-3xl' and increased padding for professional depth */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-amber-500/20 h-full flex flex-col">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-amber-500/10 rounded-2xl text-amber-400 group-hover:rotate-12 transition-transform duration-500">
            <Sparkles size={26} className="fill-amber-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              App Preferences
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Interface Node
            </p>
          </div>
        </div>
      </div>

      {/* 2. SETTINGS STACK: High-density interactive rows */}
      <div className="space-y-4 flex-1">
        {/* Language Selector Tile */}
        <PreferenceTile
          icon={Globe}
          label="System Language"
          value="English (India)"
          color="text-blue-400"
        />

        {/* Theme Selector Tile */}
        <PreferenceTile
          icon={Moon}
          label="Interface Theme"
          value="OLED Dark Mode"
          color="text-purple-400"
        />

        {/* Default Location Input: Content-rich with icon */}
        <div className="group/field space-y-3 pt-2">
          <div className="flex items-center gap-2 px-1">
            <MapPin
              size={14}
              className="text-slate-500 group-hover/field:text-amber-400 transition-colors"
            />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Default Node
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Anand Central Mall"
              defaultValue="Anand Central Mall" /* */
              className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all shadow-inner"
            />
          </div>
        </div>
      </div>

      {/* 3. FOOTER: Minimalist status indicator */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-2 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Preference Sync Active
        </span>
      </div>
    </section>
  );
};

/* REUSABLE PREFERENCE ROW: Clean and interactive */
const PreferenceTile = ({ icon: Icon, label, value, color }) => (
  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 hover:bg-slate-950 transition-all group/tile shadow-inner">
    <div className="flex items-center gap-4">
      <div className={`shrink-0 p-2.5 rounded-xl bg-white/5 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="text-left">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-[11px] font-bold text-white uppercase">{value}</p>
      </div>
    </div>
    <ChevronRight
      size={14}
      className="text-slate-700 group-hover/tile:translate-x-1 transition-transform"
    />
  </button>
);

export default Preferences;
