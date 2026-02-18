import React from "react";
import { Info, ExternalLink, Clock, Hash, MapPin, Zap } from "lucide-react";

const NotificationDetails = () => {
  // Mock data representing a detailed MERN notification object
  const detail = {
    title: "Parking Session Milestone",
    message:
      "Your vehicle (GJ-07-AC-1234) has successfully occupied slot P-104 at Anand Central Mall. Your billing cycle has commenced under the 'Standard Day' tariff.",
    reference: "BK-990214-SP",
    location: "Level 2, Zone B",
    timestamp: "Feb 14, 2026 • 09:12 AM",
    type: "System Alert",
  };

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 md:p-10 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. HEADER: Metadata & Category */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#F5E7C6] text-[#FA8112] shadow-sm">
            <Info size={20} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
              Alert{" "}
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Intelligence
              </span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
              {detail.type}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#FAF3E1] rounded-full border border-[#222222]/5">
          <Clock size={14} className="text-[#222222]/40" />
          <span className="text-[10px] font-black text-[#222222]/60 uppercase tracking-widest">
            {detail.timestamp}
          </span>
        </div>
      </div>

      {/* 2. BODY: Message Content */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-black text-[#222222] tracking-tight">
            {detail.title}
          </h3>
          <p className="text-base font-medium text-[#222222]/60 leading-relaxed bg-[#FAF3E1]/30 p-6 rounded-3xl border-2 border-dashed border-[#222222]/5">
            {detail.message}
          </p>
        </div>

        {/* 3. REFERENCE GRID: Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-[#222222]/5 rounded-2xl">
            <Hash size={18} className="text-[#FA8112]" />
            <div>
              <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-widest">
                Reference ID
              </p>
              <p className="text-xs font-black text-[#222222]">
                {detail.reference}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-[#222222]/5 rounded-2xl">
            <MapPin size={18} className="text-[#FA8112]" />
            <div>
              <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-widest">
                Spot Detail
              </p>
              <p className="text-xs font-black text-[#222222]">
                {detail.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. ACTION: Global Link */}
      <div className="mt-10">
        <button className="w-full flex items-center justify-center gap-3 py-5 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-[#222222]/10 hover:bg-[#FA8112] transition-all active:scale-95 group/btn">
          <ExternalLink
            size={18}
            strokeWidth={2.5}
            className="group-hover/btn:rotate-12 transition-transform"
          />
          View Detailed Session
        </button>
      </div>

      {/* 5. VIVA SIGNATURE: Technical Context */}
      <div className="mt-8 pt-6 border-t-2 border-[#FAF3E1] flex items-center justify-center gap-3">
        <Zap size={14} className="text-[#222222]/10" />
        <p className="text-[9px] font-black text-[#222222]/10 uppercase tracking-[0.4em]">
          Node-Instance: SP-ANAND-01
        </p>
      </div>
    </section>
  );
};

export default NotificationDetails;
