import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Clock4,
  History,
} from "lucide-react";

const BookingOverview = () => {
  const bookings = [
    {
      id: 1,
      loc: "Anand Central Mall",
      date: "Feb 1, 2026",
      duration: "2h 30m",
      status: "Completed",
      type: "success",
    },
    {
      id: 2,
      loc: "Gujarat Hub Node",
      date: "Jan 30, 2026",
      duration: "1h 15m",
      status: "Cancelled",
      type: "error",
    },
    {
      id: 3,
      loc: "Station Road P1",
      date: "Jan 28, 2026",
      duration: "4h 00m",
      status: "Pending",
      type: "warn",
    },
  ];

  const getStatusStyle = (type) => {
    switch (type) {
      case "success":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "error":
        return "text-rose-400 bg-rose-500/10 border-rose-500/20";
      case "warn":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-slate-400 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden group">
      {/* 1. HEADER: Increased margin-bottom (mb-10) for better separation */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 shrink-0">
            <History size={26} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight uppercase">
              Recent Bookings
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1">
              Transaction History
            </p>
          </div>
        </div>
        <button className="hidden sm:block px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 hover:text-white hover:bg-blue-600/10 transition-all">
          View All History
        </button>
      </div>

      {/* 2. LIST HEADER: Balanced spacing for 110% zoom */}
      <div className="hidden md:grid grid-cols-4 px-8 py-4 mb-4 bg-white/2 rounded-2xl border border-white/5">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          Location
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 text-center">
          Date
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 text-center">
          Duration
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 text-right">
          Status
        </span>
      </div>

      {/* 3. BOOKING ITEMS: Increased vertical gap (space-y-4) and horizontal padding */}
      <ul className="space-y-4">
        {bookings.map((item) => (
          <li key={item.id} className="group/item cursor-pointer">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-6 px-8 py-6 rounded-3xl bg-slate-950/40 border border-white/5 group-hover/item:bg-white/5 group-hover/item:border-blue-500/30 transition-all duration-300">
              {/* Location Detail */}
              <div className="flex items-center gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover/item:text-blue-400 group-hover/item:bg-blue-400/10 transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-sm font-black text-white tracking-wide uppercase">
                  {item.loc}
                </span>
              </div>

              {/* Date Detail */}
              <div className="flex items-center justify-center gap-2.5 text-slate-400">
                <Calendar size={15} className="opacity-40" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {item.date}
                </span>
              </div>

              {/* Duration Detail */}
              <div className="flex items-center justify-center gap-2.5 text-slate-400">
                <Clock size={15} className="opacity-40" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {item.duration}
                </span>
              </div>

              {/* Status Detail */}
              <div className="flex items-center justify-end">
                <span
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-[0.15em] shadow-sm ${getStatusStyle(item.type)}`}
                >
                  {item.type === "success" && <CheckCircle2 size={13} />}
                  {item.type === "error" && <XCircle size={13} />}
                  {item.type === "warn" && <Clock4 size={13} />}
                  {item.status}
                </span>
                <ChevronRight
                  size={16}
                  className="ml-4 text-slate-700 group-hover/item:text-white transition-all group-hover/item:translate-x-1"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* MOBILE ACTION: Visible only on small screens */}
      <button className="w-full mt-8 py-5 bg-white/5 border border-white/5 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all md:hidden">
        Show Full History
      </button>
    </section>
  );
};

export default BookingOverview;
