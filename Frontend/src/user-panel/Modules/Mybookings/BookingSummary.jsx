import React from "react";
import { Timer, CalendarClock, CheckCircle2, XCircle } from "lucide-react";

const BookingSummary = () => {
  return (
    <section className="h-full">
      {/* FIXED: Internal 2-column grid to match wireframe 
         
      */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* CARD 1: ACTIVE (Top Left) */}
        <SummaryCard
          label="Active"
          count="01"
          icon={Timer}
          color="text-blue-400"
          bg="bg-blue-500/10"
          borderColor="border-blue-500/20"
        />

        {/* CARD 2: UPCOMING (Top Right) */}
        <SummaryCard
          label="Upcoming"
          count="03"
          icon={CalendarClock}
          color="text-indigo-400"
          bg="bg-indigo-500/10"
          borderColor="border-indigo-500/20"
        />

        {/* CARD 3: COMPLETED (Bottom Left) */}
        <SummaryCard
          label="Completed"
          count="124"
          icon={CheckCircle2}
          color="text-emerald-400"
          bg="bg-emerald-500/10"
          borderColor="border-emerald-500/20"
        />

        {/* CARD 4: CANCELLED (Bottom Right) */}
        <SummaryCard
          label="Cancelled"
          count="02"
          icon={XCircle}
          color="text-rose-400"
          bg="bg-rose-500/10"
          borderColor="border-rose-500/20"
        />
      </div>
    </section>
  );
};

/* REUSABLE SUMMARY CARD: Maintaining the premium 'Status Node' feel */
const SummaryCard = ({ label, count, icon: Icon, color, bg, borderColor }) => (
  <div
    className={`group relative bg-slate-900/40 border ${borderColor} rounded-3xl p-5 transition-all duration-500 hover:bg-slate-900 shadow-xl overflow-hidden flex flex-col justify-between`}
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-2.5 rounded-xl ${bg} ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon size={18} />
      </div>
      <span className="text-2xl font-black text-white uppercase tracking-tighter">
        {count}
      </span>
    </div>

    <div className="space-y-0.5">
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
        Status Node
      </p>
      <h3
        className={`text-[10px] font-black uppercase tracking-widest ${color} leading-tight`}
      >
        {label} Bookings
      </h3>
    </div>

    {/* Subtle Background Glow */}
    <div
      className={`absolute -right-4 -bottom-4 w-16 h-16 ${bg} blur-[30px] opacity-10 group-hover:opacity-30 transition-opacity`}
    />
  </div>
);

export default BookingSummary;
