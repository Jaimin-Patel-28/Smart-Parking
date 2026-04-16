import React from "react";
import { BellOff } from "lucide-react";

const NotificationEmpty = () => {
  return (
    <div className="py-24 text-center bg-[#FAF3E1]/2 border border-dashed border-[#F5E7C6]/10 rounded-[2.5rem]">
      <div className="inline-flex p-5 rounded-full bg-[#FAF3E1]/5 text-[#FAF3E1]/20 mb-6">
        <BellOff size={40} />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAF3E1]/30">
        No notifications yet
      </p>
      <p className="text-sm text-[#FAF3E1]/40 mt-2 max-w-sm mx-auto">
        Booking, payment, refund, and system alerts will appear here.
      </p>
    </div>
  );
};

export default NotificationEmpty;
