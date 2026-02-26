import React from "react";
import {
  Car,
  Bike,
  Plus,
  Edit3,
  Trash2,
  ShieldCheck,
  Settings2,
} from "lucide-react";

const VehicleInfo = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-purple-500/20 h-full flex flex-col">
      {/* 1. HEADER: Increased spacing for clear visual hierarchy */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:rotate-12 transition-transform duration-500">
            <Settings2 size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Registered Garage
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Vehicle Access Control
            </p>
          </div>
        </div>
        <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:bg-purple-600 transition-all active:scale-95 shadow-lg">
          <Plus size={18} />
        </button>
      </div>

      {/* 2. VEHICLE LIST: High-density card stack */}
      <div className="space-y-6 flex-1">
        <VehicleCard
          number="GJ-06-AM-1234"
          type="Car"
          model="Tesla Model 3"
          isVerified={true}
        />
        {/* Placeholder for empty state or second vehicle */}
        <div className="border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 opacity-40 hover:opacity-100 hover:border-white/10 transition-all cursor-pointer">
          <div className="p-2 bg-white/5 rounded-full">
            <Plus size={16} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest">
            Add secondary vehicle
          </span>
        </div>
      </div>

      {/* 3. PRIMARY ACTION: Content-rich button for adding new data */}
      <button className="w-full mt-10 flex items-center justify-center gap-3 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-xl shadow-purple-600/20 transition-all active:scale-95 group/btn">
        <Plus
          size={18}
          className="group-hover/btn:rotate-90 transition-transform"
        />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Register New Vehicle
        </span>
      </button>
    </section>
  );
};

const VehicleCard = ({ number, type, model, isVerified }) => {
  return (
    <div className="relative group/card bg-slate-950/60 border border-white/5 rounded-2xl p-6 transition-all hover:bg-slate-950 hover:border-white/10 shadow-inner">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Icon Mapping: Small but perfectly distinct */}
          <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover/card:text-purple-400 transition-colors">
            {type === "Car" ? <Car size={22} /> : <Bike size={22} />}
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">
              {type}
            </p>
            <h4 className="text-lg font-black text-white tracking-tighter uppercase leading-none">
              {number}
            </h4>
          </div>
        </div>
        {isVerified && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 shadow-sm">
            <ShieldCheck size={12} className="fill-emerald-400/20" />
            <span className="text-[8px] font-black uppercase tracking-tighter">
              Verified
            </span>
          </div>
        )}
      </div>

      {/* VEHICLE DETAILS: Compact and clean */}
      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {model}
        </span>
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-600 hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Edit3 size={14} />
          </button>
          <button className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
