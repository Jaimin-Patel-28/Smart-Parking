import React from "react";
import { CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";

const BookingNotifications = () => {
  // Mock data representing different stages of a parking lifecycle
  const bookingAlerts = [
    {
      type: "Confirmed",
      title: "Booking Confirmed",
      time: "2 mins ago",
      desc: "Slot P-104 at Anand Central Mall is reserved for you.",
      icon: CheckCircle2,
      statusColor: "text-emerald-500",
      active: false,
    },
    {
      type: "Reminder",
      title: "Arrival Reminder",
      time: "15 mins left",
      desc: "Your reservation starts at 09:00 AM. Navigate now.",
      icon: Clock,
      statusColor: "text-[#222222]",
      active: true,
    },
    {
      type: "Expiry",
      title: "Expiry Alert",
      time: "Critical",
      desc: "Your session expires in 10 mins. Extend to avoid fine.",
      icon: AlertTriangle,
      statusColor: "text-[#FA8112]",
      active: false,
    },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* SECTION HEADER: Editorial Style */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Booking{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Journey
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Live Trip Status
          </p>
        </div>
        <button className="p-3 rounded-xl bg-[#F5E7C6] text-[#222222] hover:bg-[#222222] hover:text-[#FAF3E1] transition-all duration-300">
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* TIMELINE FEED: Content-rich list items */}
      <div className="space-y-6">
        {bookingAlerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`flex gap-4 p-4 rounded-2xl transition-all duration-300 ${alert.active ? "bg-[#FAF3E1] border-2 border-[#222222]/5 shadow-sm" : "opacity-60 hover:opacity-100"}`}
            >
              <div
                className={`mt-1 p-2 rounded-lg bg-white ${alert.statusColor} shadow-sm`}
              >
                <Icon size={18} strokeWidth={3} />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-[#222222] tracking-tight">
                    {alert.title}
                  </h4>
                  <span className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {alert.time}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#222222]/50 leading-relaxed">
                  {alert.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER: Technical Branding */}
      <div className="mt-8 pt-4 border-t-2 border-[#FAF3E1] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.3em]">
          MERN Lifecycle Tracker Enabled
        </p>
      </div>
    </div>
  );
};

export default BookingNotifications;
