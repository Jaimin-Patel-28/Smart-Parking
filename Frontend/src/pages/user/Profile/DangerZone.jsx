import React from "react";
import {
  AlertTriangle,
  Trash2,
  UserMinus,
  ShieldAlert,
  ChevronRight,
} from "lucide-react";

const DangerZone = () => {
  return (
    /* FIXED: Using 'rounded-3xl' and increased padding for 110% zoom safety */
    <section className="bg-rose-500/[0.02] border border-rose-500/10 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:bg-rose-500/[0.04] hover:border-rose-500/20">
      {/* 1. HEADER: High-density security warning */}
      <div className="flex items-center justify-between mb-10 px-1">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-rose-500/10 rounded-2xl text-rose-500 group-hover:scale-110 transition-transform duration-500">
            <AlertTriangle size={26} className="fill-rose-500/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Danger Zone
            </h2>
            <p className="text-[9px] font-black text-rose-500/60 uppercase tracking-[0.2em] mt-2">
              Irreversible Account Actions
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-black text-rose-500 bg-rose-500/5 px-3 py-1.5 rounded-xl border border-rose-500/10 uppercase tracking-widest">
          <ShieldAlert size={14} />
          High Risk
        </div>
      </div>

      {/* 2. ACTIONS GRID: Horizontal spread for widescreen impact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Deactivation Card */}
        <button className="flex items-start gap-5 p-6 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-white/10 transition-all text-left group/btn shadow-inner">
          <div className="shrink-0 p-3 bg-white/5 rounded-xl text-slate-500 group-hover/btn:text-white transition-colors">
            <UserMinus size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-black text-white uppercase tracking-wider">
                Deactivate Account
              </h4>
              <ChevronRight
                size={14}
                className="text-slate-700 group-hover/btn:translate-x-1 transition-transform"
              />
            </div>
            <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
              Temporarily hide your profile and bookings. You can return
              anytime.
            </p>
          </div>
        </button>

        {/* Deletion Card */}
        <button className="flex items-start gap-5 p-6 rounded-2xl bg-rose-500/[0.02] border border-rose-500/10 hover:bg-rose-600 hover:border-rose-500 transition-all text-left group/delete shadow-inner">
          <div className="shrink-0 p-3 bg-rose-500/10 rounded-xl text-rose-500 group-hover/delete:bg-white/20 group-hover/delete:text-white transition-colors">
            <Trash2 size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-[11px] font-black text-rose-500 group-hover/delete:text-white uppercase tracking-wider">
                Delete Account
              </h4>
              <ChevronRight
                size={14}
                className="text-rose-900 group-hover/delete:text-white group-hover/delete:translate-x-1 transition-transform"
              />
            </div>
            <p className="text-[10px] text-rose-900/60 group-hover/delete:text-rose-100 font-bold leading-relaxed">
              Permanently remove all data, credits, and vehicle records.
            </p>
          </div>
        </button>
      </div>

      {/* 3. FOOTER NOTICE: Centered and subtle */}
      <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center gap-3 opacity-30">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
          Identity Node Deletion Protocol v1.2
        </span>
      </div>
    </section>
  );
};

export default DangerZone;
