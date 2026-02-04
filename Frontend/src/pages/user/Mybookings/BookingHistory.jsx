import React from "react";
import {
  History,
  MapPin,
  Hash,
  Calendar,
  Clock,
  Receipt,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const BookingHistory = () => {
  return (
    <section className="p-8 lg:p-10 space-y-10">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <History size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              Booking History
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Completed Transactions
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Archive Node v1.0
        </div>
      </div>

      {/* 2. HISTORY LIST: High-density horizontal table-style cards */}
      <div className="space-y-4">
        <HistoryBookingCard
          location="Anand Central Mall"
          slot="P-104"
          date="Jan 28, 2026"
          duration="2.5 Hours"
          amount="₹125.00"
          status="Completed"
        />
        <HistoryBookingCard
          location="Gujarat Hub Square"
          slot="G-502"
          date="Jan 24, 2026"
          duration="1 Hour"
          amount="₹50.00"
          status="Completed"
        />
      </div>
    </section>
  );
};

const HistoryBookingCard = ({
  location,
  slot,
  date,
  duration,
  amount,
  status,
}) => (
  <div className="group bg-slate-950/40 border border-white/5 rounded-2xl p-5 transition-all duration-300 hover:bg-slate-950 hover:border-white/10 shadow-sm overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* NODE INFO (4/12) */}
      <div className="lg:col-span-4 flex items-center gap-4">
        <div className="shrink-0 p-2.5 bg-white/5 rounded-xl text-slate-600 group-hover:text-emerald-400 transition-colors">
          <MapPin size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-[11px] font-black text-white uppercase tracking-wider truncate">
            {location}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <Hash size={10} className="text-slate-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
              Slot {slot}
            </span>
          </div>
        </div>
      </div>

      {/* TIMELINE (3/12) */}
      <div className="lg:col-span-3 flex flex-col gap-1 lg:border-l lg:border-white/5 lg:pl-6">
        <div className="flex items-center gap-2">
          <Calendar size={12} className="text-slate-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            {date}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-slate-500" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            {duration}
          </span>
        </div>
      </div>

      {/* FINANCIAL DATA (3/12) */}
      <div className="lg:col-span-3 flex items-center justify-between lg:border-l lg:border-white/5 lg:px-6">
        <div>
          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-0.5">
            Paid
          </p>
          <p className="text-sm font-black text-white uppercase tracking-tighter">
            {amount}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
          <CheckCircle2 size={10} className="text-emerald-500" />
          <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
            {status}
          </span>
        </div>
      </div>

      {/* ACTIONS (2/12) */}
      <div className="lg:col-span-2 flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[9px] font-black text-white uppercase tracking-widest transition-all group/btn">
          <Receipt
            size={14}
            className="text-slate-500 group-hover/btn:text-blue-400 transition-colors"
          />
          Receipt
        </button>
      </div>
    </div>
  </div>
);

export default BookingHistory;
