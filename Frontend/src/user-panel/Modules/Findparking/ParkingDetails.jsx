import React from "react";
import {
  Info,
  Clock,
  CreditCard,
  Sparkles,
  LayoutGrid,
  CheckCircle2,
  Map,
  ShieldCheck,
  Zap,
  Activity,
} from "lucide-react";

const ParkingDetails = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      {/* 🟠 Header & Status */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#FA8112]/20 rounded-lg text-[#FA8112]">
            <Info size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-[#FAF3E1]">
              Location Details
            </h2>
            <p className="text-[#FAF3E1]/40 text-xs uppercase tracking-widest font-semibold">
              Intelligence Node v2.0
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-3 py-1 rounded-full">
          <CheckCircle2 size={12} className="text-[#4ADE80]" />
          <span className="text-[10px] font-black text-[#4ADE80] uppercase">
            Open Node
          </span>
        </div>
      </div>

      {/* 🟠 Overview Description */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#FA8112]">
          <Map size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Node Overview
          </span>
        </div>
        <p className="text-sm leading-relaxed text-[#FAF3E1]/70 bg-[#222222] p-4 rounded-2xl border border-[#F5E7C6]/5 shadow-inner">
          Premium multi-level parking facility located at{" "}
          <span className="text-[#FAF3E1] font-bold">Anand Hub</span>. Features
          real-time occupancy tracking and 24/7 security surveillance with
          verified Level 2 automation.
        </p>
      </div>

      {/* 🟠 Core Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <DetailStat icon={Clock} label="Operating Hours" value="24/7 Access" />
        <DetailStat
          icon={CreditCard}
          label="Pricing Start"
          value="₹20.00 /hr"
        />
      </div>

      {/* 🟠 Amenities Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 text-[#FA8112]">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">
            Node Amenities
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["EV Charging", "CCTV 24/7", "Valet Node", "Disabled Access"].map(
            (amenity) => (
              <span
                key={amenity}
                className="px-3 py-1.5 bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/10 rounded-lg text-[10px] font-bold text-[#FAF3E1]/60 uppercase tracking-tighter"
              >
                {amenity}
              </span>
            ),
          )}
        </div>
      </div>

      {/* 🟠 Inventory Summary */}
      <div className="p-5 bg-[#FA8112]/5 border border-[#FA8112]/20 rounded-3xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-[#FA8112] p-2.5 rounded-2xl text-[#222222]">
            <LayoutGrid size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#FA8112]">
              Inventory Summary
            </p>
            <h4 className="text-lg font-black text-[#FAF3E1]">
              124 Slots Total
            </h4>
          </div>
        </div>
        <Activity size={24} className="text-[#FA8112]/30 animate-pulse" />
      </div>

      {/* 🟠 Trusted Badge */}
      <div className="flex justify-center items-center gap-2 text-[#FAF3E1]/20">
        <ShieldCheck size={14} />
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
          Verified Anand Asset
        </span>
      </div>
    </div>
  );
};

const DetailStat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 p-4 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl">
    <div className="text-[#FA8112]">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-[10px] uppercase opacity-40 leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-[#FAF3E1]">{value}</p>
    </div>
  </div>
);

export default ParkingDetails;
