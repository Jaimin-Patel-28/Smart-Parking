import React from "react";
import { MapPin } from "lucide-react";

const BookingOverview = ({ bookings = [] }) => {
  return (
    <section className="flex flex-col gap-5 h-full">
      <div>
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
          Session Timeline
        </h3>
        <p className="text-[10px] text-[#FAF3E1]/30 uppercase">
          Recent Parking Activity
        </p>
      </div>

      <div className="flex flex-col gap-4 grow">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-4"
          >
            <div className="flex items-center gap-3">
              <MapPin size={14} className="text-[#FA8112]" />
              <span className="font-bold">{b.loc}</span>
            </div>

            <span className="text-[10px] uppercase text-[#FA8112] font-black">
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingOverview;
