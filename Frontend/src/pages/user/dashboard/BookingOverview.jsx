import React from "react";
import { Calendar, Clock, MapPin, ChevronRight, CheckCircle2, XCircle, Clock4 } from "lucide-react";

const BookingOverview = () => {
  const bookings = [
    { id: 1, loc: "Anand Central", date: "Feb 1, 2026", duration: "2h 30m", status: "Completed", type: "success" },
    { id: 2, loc: "Gujarat Hub Node", date: "Jan 30, 2026", duration: "1h 15m", status: "Cancelled", type: "error" },
    { id: 3, loc: "Station Road P1", date: "Jan 28, 2026", duration: "4h 00m", status: "Pending", type: "warn" },
  ];

  const getStatusStyle = (type) => {
    switch (type) {
      case "success": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "error": return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "warn": return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default: return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <section className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-6 lg:p-8 shadow-2xl overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Calendar size={24} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Recent Bookings</h2>
        </div>
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white transition-colors">
          View All History
        </button>
      </div>

      {/* LIST HEADER (Hidden on small screens) */}
      <div className="hidden md:grid grid-cols-4 px-4 py-3 mb-2 bg-white/5 rounded-xl border border-white/5">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Location</span>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">Date</span>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">Duration</span>
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 text-right">Status</span>
      </div>

      {/* BOOKING ITEMS */}
      <ul className="space-y-3">
        {bookings.map((item) => (
          <li key={item.id} className="group cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 px-4 py-4 rounded-2xl bg-slate-950/30 border border-white/5 group-hover:bg-white/5 group-hover:border-blue-500/20 transition-all">
              
              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                  <MapPin size={16} />
                </div>
                <span className="text-sm font-bold text-white tracking-tight">{item.loc}</span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <Calendar size={14} className="opacity-50" />
                <span className="text-xs font-medium">{item.date}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-center gap-2 text-slate-400">
                <Clock size={14} className="opacity-50" />
                <span className="text-xs font-medium">{item.duration}</span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center justify-end">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${getStatusStyle(item.type)}`}>
                  {item.type === "success" && <CheckCircle2 size={12} />}
                  {item.type === "error" && <XCircle size={12} />}
                  {item.type === "warn" && <Clock4 size={12} />}
                  {item.status}
                </span>
              </div>

            </div>
          </li>
        ))}
      </ul>

      {/* MOBILE ACTION */}
      <button className="w-full mt-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all md:hidden">
        Show Full History
      </button>

    </section>
  );
};

export default BookingOverview;