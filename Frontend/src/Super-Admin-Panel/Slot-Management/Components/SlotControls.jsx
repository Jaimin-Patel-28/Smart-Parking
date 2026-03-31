import React from "react";
import { RefreshCcw, Info, CheckCircle, Car, Lock } from "lucide-react";

const SlotControls = ({ total, occupied, onReset, isLoading }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-200 mb-8">
      {/* Legend Section */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            available ({total - occupied})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            occupied ({occupied})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">
            maintenance
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onReset}
          disabled={isLoading}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCcw size={18} className={isLoading ? "animate-spin" : ""} />
          Reset All Slots
        </button>

        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
          <Info size={16} />
          <span className="text-xs font-bold">Live View</span>
        </div>
      </div>
    </div>
  );
};

export default SlotControls;
