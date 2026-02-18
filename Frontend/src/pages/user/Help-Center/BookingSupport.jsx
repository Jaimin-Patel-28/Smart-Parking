import React from "react";
import { CalendarX, MapPinOff, ShieldAlert, ArrowRight } from "lucide-react";

const BookingSupport = () => {
  const supportTopics = [
    {
      icon: CalendarX,
      label: "Cancel / Refund Queries",
      desc: "Manage cancellations & check status.",
    },
    {
      icon: MapPinOff,
      label: "Slot Not Available",
      desc: "Issues with occupied or blocked slots.",
    },
    {
      icon: ShieldAlert,
      label: "Booking Not Confirmed",
      desc: "Payment done but no confirmation.",
    },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Branding */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Booking{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Assistance
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Reservation Issues
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[#F5E7C6] text-[#222222]/30 group-hover:text-[#FA8112] transition-colors duration-500">
          <CalendarX size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. TOPIC LIST: Tactile Interaction Rows */}
      <div className="space-y-3">
        {supportTopics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FAF3E1]/40 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white transition-all duration-300 group/btn"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2.5 rounded-xl bg-white text-[#222222]/40 group-hover/btn:text-[#FA8112] group-hover/btn:scale-110 transition-all duration-500 shadow-sm">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#222222] uppercase tracking-wider">
                    {topic.label}
                  </h4>
                  <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {topic.desc}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-[#222222]/10 group-hover/btn:translate-x-1 group-hover/btn:text-[#222222] transition-all"
              />
            </button>
          );
        })}
      </div>

      {/* 3. VIVA FOOTER: MERN Technical Context */}
      <div className="mt-8 pt-4 flex items-center justify-center gap-2 border-t-2 border-[#FAF3E1]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Live Booking API: Responsive
        </p>
      </div>
    </section>
  );
};

export default BookingSupport;
