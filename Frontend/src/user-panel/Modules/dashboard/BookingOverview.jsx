import React from "react";
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Clock4,
  ArrowRight,
  Activity,
} from "lucide-react";

const BookingOverview = () => {
  const bookings = [
    {
      id: 1,
      loc: "Anand Central Mall",
      date: "Feb 1, 2026",
      status: "Completed",
      type: "success",
    },
    {
      id: 2,
      loc: "Gujarat Hub Node",
      date: "Jan 30, 2026",
      status: "Cancelled",
      type: "error",
    },
    {
      id: 3,
      loc: "Station Road P1",
      date: "Jan 28, 2026",
      status: "Pending",
      type: "warn",
    },
  ];

  // Logic to handle status colors/icons dynamically
  const getStatusConfig = (type) => {
    switch (type) {
      case "success":
        return {
          color: "text-green-400",
          bg: "bg-green-400/10",
          icon: <CheckCircle2 size={14} />,
        };
      case "error":
        return {
          color: "text-red-400",
          bg: "bg-red-400/10",
          icon: <XCircle size={14} />,
        };
      case "warn":
        return {
          color: "text-yellow-400",
          bg: "bg-yellow-400/10",
          icon: <Clock4 size={14} />,
        };
      default:
        return {
          color: "text-[#FAF3E1]/40",
          bg: "bg-white/5",
          icon: <Activity size={14} />,
        };
    }
  };

  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 md:p-8 space-y-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-[#FAF3E1]">
            Recent <span className="text-[#FA8112]">Bookings</span>
          </h2>
          <p className="text-[#FAF3E1]/30 text-[10px] uppercase tracking-[0.2em] font-bold">
            Transaction Node Logs
          </p>
        </div>
        <button className="flex items-center gap-2 text-[#FA8112] text-xs font-bold hover:gap-3 transition-all">
          View All <ArrowRight size={14} />
        </button>
      </div>

      {/* --- BOOKING LIST --- */}
      <div className="space-y-3">
        {bookings.map((item) => {
          const config = getStatusConfig(item.type);
          return (
            <div
              key={item.id}
              className="group relative flex items-center justify-between bg-[#111111]/40 border border-[#F5E7C6]/5 p-4 rounded-2xl hover:border-[#FA8112]/30 transition-all duration-300"
            >
              {/* Left Side: Location Info */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#222222] border border-[#F5E7C6]/10 rounded-xl text-[#FA8112] group-hover:scale-110 transition-transform">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 font-bold mb-0.5">
                    Location Node
                  </p>
                  <p className="text-sm font-bold text-[#FAF3E1]">{item.loc}</p>
                </div>
              </div>

              {/* Right Side: Date and Status */}
              <div className="text-right flex flex-col items-end gap-2">
                <time className="text-[11px] font-mono text-[#FAF3E1]/40">
                  {item.date}
                </time>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color}`}
                >
                  {config.icon}
                  {item.status}
                </div>
              </div>

              {/* Decorative Accent Line */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[2px] bg-[#FA8112] opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full" />
            </div>
          );
        })}
      </div>

      {/* --- FOOTER ACTION --- */}
      <button className="w-full mt-4 py-4 bg-[#FAF3E1]/5 border border-[#F5E7C6]/5 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black text-[#FAF3E1]/30 hover:bg-[#FA8112]/10 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all">
        Access System History Logs
      </button>
    </div>
  );
};

export default BookingOverview;
