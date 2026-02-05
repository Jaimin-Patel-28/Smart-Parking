import React from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

const TransactionItem = ({ type, amount, date, time, status, title }) => {
  const isCredit = type === "Credit";

  return (
    <div className="group relative bg-slate-950/60 border border-white/5 rounded-2xl p-5 transition-all duration-500 hover:border-white/10 hover:bg-slate-950 shadow-inner overflow-hidden">
      <div className="flex items-center justify-between gap-6 relative z-10">
        {/* LEFT: ICON & IDENTITY */}
        <div className="flex items-center gap-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 ${isCredit ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
          >
            {isCredit ? (
              <ArrowDownLeft size={20} />
            ) : (
              <ArrowUpRight size={20} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[8px] font-black uppercase tracking-[0.2em] ${isCredit ? "text-emerald-500/60" : "text-rose-500/60"}`}
              >
                {type} Node
              </span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 rounded-md">
                <ShieldCheck size={8} className="text-slate-500" />
                <span className="text-[7px] font-black text-slate-500 uppercase tracking-widest">
                  Verified
                </span>
              </div>
            </div>
            <h4 className="text-[13px] font-black text-white uppercase tracking-tight truncate">
              {title}
            </h4>
          </div>
        </div>

        {/* RIGHT: DATA & STATUS */}
        <div className="flex items-center gap-8 text-right shrink-0">
          <div className="hidden md:block">
            <div className="flex items-center justify-end gap-1.5 mb-1 text-slate-600">
              <Clock size={10} />
              <span className="text-[8px] font-black uppercase tracking-widest">
                {date}
              </span>
            </div>
            <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">
              {time}
            </p>
          </div>

          <div className="w-24">
            <p
              className={`text-base font-black tracking-tighter mb-0.5 ${isCredit ? "text-emerald-400" : "text-white"}`}
            >
              {isCredit ? "+" : "-"} ₹{amount}
            </p>
            <div className="flex items-center justify-end gap-1.5">
              <CheckCircle2 size={10} className="text-emerald-500" />
              <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                {status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUBTLE INDICATOR */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-0.5 opacity-20 ${isCredit ? "bg-emerald-500" : "bg-rose-500"}`}
      />
    </div>
  );
};

export default TransactionItem;
