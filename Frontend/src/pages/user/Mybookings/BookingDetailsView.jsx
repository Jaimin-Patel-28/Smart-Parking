import React from "react";
import {
  FileSearch,
  MapPin,
  Hash,
  Clock,
  CreditCard,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const BookingDetailsView = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-[2rem] p-8 lg:p-10 shadow-2xl relative overflow-hidden group">
      {/* 1. SECTION HEADER: Cinematic metadata */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform duration-500">
            <FileSearch size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Inspection Node
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Booking ID: SP-992-040226
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
            Verified Session
          </span>
        </div>
      </div>

      {/* 2. GRID CORE: Multi-column content for 110% zoom safety */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Physical Node Data */}
        <div className="space-y-6">
          <DetailTile
            icon={MapPin}
            label="Parking Node"
            value="Anand Central Mall, Gujarat"
            sub="Anand Hub • Zone 04"
          />
          <DetailTile
            icon={Hash}
            label="Slot Information"
            value="Slot P-104 (Level 2)"
            sub="Premium Access Lane"
          />
        </div>

        {/* Temporal Data */}
        <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-10">
          <DetailTile
            icon={Clock}
            label="Booking Timeline"
            value="10:00 AM — 12:00 PM"
            sub="Feb 04, 2026 • 2.0h Duration"
          />
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
              Session Status
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Currently Active
              </span>
            </div>
          </div>
        </div>

        {/* Financial Data */}
        <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-10">
          <DetailTile
            icon={CreditCard}
            label="Payment Summary"
            value="₹125.00 INR"
            sub="Wallet Deduction • Successful"
          />
          <a
            href="#"
            className="flex items-center justify-between p-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-2xl transition-all group/link"
          >
            <div className="flex items-center gap-3">
              <HelpCircle size={18} className="text-blue-400" />
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
                Support Node
              </span>
            </div>
            <ExternalLink
              size={14}
              className="text-blue-400 group-hover/link:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
    </section>
  );
};

/* REUSABLE DETAIL COMPONENT: Content-rich and clean */
const DetailTile = ({ icon: Icon, label, value, sub }) => (
  <div className="group/tile">
    <div className="flex items-center gap-3 mb-2">
      <Icon
        size={14}
        className="text-slate-500 group-hover/tile:text-blue-400 transition-colors"
      />
      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
    <h4 className="text-sm font-black text-white uppercase tracking-tight">
      {value}
    </h4>
    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">
      {sub}
    </p>
  </div>
);

export default BookingDetailsView;
