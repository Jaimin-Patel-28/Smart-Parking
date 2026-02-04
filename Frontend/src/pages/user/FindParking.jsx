import React from "react";
import LocationSearch from "./Findparking/LocationSearch";
import DateTimePicker from "./Findparking/DateTimePicker";
import VehicleSelector from "./Findparking/VehicleSelector";
import ParkingResults from "./Findparking/ParkingResults";
import LocationDetails from "./Findparking/LocationDetails";
import SlotGrid from "./Findparking/SlotGrid";
import PriceSummary from "./Findparking/PriceSummary";
import BookingRules from "./Findparking/BookingRules";
import BookingConfirmation from "./Findparking/BookingConfirmation";

const FindParking = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 font-sans">
      {/* 1. HERO HEADER: Search & Discovery Node */}
      <header className="relative py-16 px-6 lg:px-12 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-indigo-600/5 to-transparent" />
        <div className="relative max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">
              Resource Discovery
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Find Your <span className="text-blue-500">Parking Node</span>
          </h1>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto p-6 lg:p-12 space-y-10 lg:space-y-12">
        {/* ROW 1: SEARCH & FILTERS (The Input Hub) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 h-full bg-white/[0.02] border border-white/5 rounded-3xl p-1 shadow-2xl">
            <LocationSearch />
          </div>
          <div className="lg:col-span-5 h-full bg-white/[0.02] border border-white/5 rounded-3xl p-1 shadow-2xl">
            <DateTimePicker />
          </div>
          <div className="lg:col-span-3 h-full bg-white/[0.02] border border-white/5 rounded-3xl p-1 shadow-2xl">
            <VehicleSelector />
          </div>
        </div>

        {/* ROW 2: LIVE RESULTS (Full Width) */}
        <section className="w-full bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <ParkingResults />
        </section>

        {/* ROW 3: DISCOVERY SPLIT (Details & Slot Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <LocationDetails />
          </div>
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-3xl p-8 shadow-inner">
            <SlotGrid />
          </div>
        </div>

        {/* ROW 4: FINALIZATION HUB (Price & Policies) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <div className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-3xl p-1 shadow-2xl">
            <PriceSummary />
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-1 shadow-2xl">
            <BookingRules />
          </div>
        </div>

        {/* ROW 5: CONFIRMATION (Centered Action) */}
        <section className="w-full max-w-3xl mx-auto py-10">
          <BookingConfirmation />
        </section>
      </main>

      <footer className="mt-20 py-12 border-t border-white/5 text-center opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
          Anand Smart City • Real-Time Allocation Node
        </p>
      </footer>
    </div>
  );
};

export default FindParking;
