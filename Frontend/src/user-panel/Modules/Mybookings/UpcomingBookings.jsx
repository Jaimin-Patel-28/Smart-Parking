import React from "react";
import {
  CalendarClock,
  MapPin,
  Hash,
  Clock,
  Hourglass,
  ExternalLink,
  XCircle,
  ChevronRight,
} from "lucide-react";

const UpcomingBookings = () => {
  return (
    <section className="p-8 lg:p-10 space-y-10">
      {/* 1. SECTION HEADER: "Small & Perfect" labeling */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <CalendarClock size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              Upcoming Queue
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
              Reserved Nodes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
          Total: 03
        </div>
      </div>

      {/* 2. BOOKING CARDS: High-density vertical stack */}
      <div className="space-y-6">
        <UpcomingBookingCard
          location="Anand Railway Station"
          slot="A-012"
          dateTime="Feb 05, 2026 • 09:00 AM"
          duration="4 Hours"
        />
        <UpcomingBookingCard
          location="V.V. Nagar Hub"
          slot="B-209"
          dateTime="Feb 06, 2026 • 02:30 PM"
          duration="2 Hours"
        />
      </div>
    </section>
  );
};

const UpcomingBookingCard = ({ location, slot, dateTime, duration }) => (
  <div className="group bg-slate-950/40 border border-white/5 rounded-3xl p-6 transition-all duration-500 hover:bg-slate-950 hover:border-indigo-500/20 shadow-xl overflow-hidden relative">
    {/* Subtle indicator */}
    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/0 group-hover:bg-indigo-500/40 transition-all" />

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
      {/* PRIMARY DATA: Node & Slot */}
      <div className="lg:col-span-4 flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-slate-500 group-hover:text-indigo-400 transition-colors">
          <MapPin size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-black text-white uppercase tracking-tight truncate">
            {location}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Hash size={12} className="text-slate-600" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Slot {slot}
            </span>
          </div>
        </div>
      </div>

      {/* SCHEDULE DATA: Timeline */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:border-l lg:border-white/5 lg:pl-8">
        <div className="flex items-center gap-3">
          <Clock size={14} className="text-indigo-500" />
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-tight truncate">
            {dateTime}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Hourglass size={14} className="text-slate-600" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {duration}
          </span>
        </div>
      </div>

      {/* ACTION HUB: Clean interactive buttons */}
      <div className="lg:col-span-3 flex items-center justify-end gap-3">
        <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white hover:bg-white/10 transition-all">
          <ExternalLink size={16} />
        </button>
        <button className="flex-1 lg:flex-none py-3 px-6 border border-rose-500/10 text-rose-500/40 hover:text-rose-500 hover:bg-rose-500/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all">
          <XCircle size={14} className="inline mr-2" />
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default UpcomingBookings;
