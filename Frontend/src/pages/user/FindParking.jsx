import FindParkingHeader from "./Findparking/FindParkingHeader";
import LocationSearch from "./Findparking/LocationSearch";
import DateTimeSelector from "./Findparking/DateTimeSelector";
import VehicleSelector from "./Findparking/VehicleSelector";
import ParkingResults from "./Findparking/ParkingResults";
import ParkingDetails from "./Findparking/ParkingDetails";
import SlotSelection from "./Findparking/SlotSelection";
import PriceSummary from "./Findparking/PriceSummary";
import BookingActions from "./Findparking/BookingActions";
import BookingRules from "./Findparking/BookingRules";
import BookingConfirmation from "./Findparking/BookingConfirmation";
import EmptyState from "./Findparking/EmptyState";
import ErrorState from "./Findparking/ErrorState";
import SupportShortcut from "./Findparking/SupportShortcut";

const FindParking = () => {
  const hasResults = true; // Logic to toggle EmptyState/ErrorState

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      {/* 1. HEADER: Fixed navigation node */}
      <FindParkingHeader />

      <main className="max-w-400 mx-auto p-6 lg:p-12 space-y-12 lg:space-y-16">
        {/* STAGE 1: DISCOVERY HUB (Input & Vehicle) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
              Stage 01: Parameter Definition
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-5">
              <LocationSearch />
            </div>
            <div className="lg:col-span-4">
              <DateTimeSelector />
            </div>
            <div className="lg:col-span-3">
              <VehicleSelector />
            </div>
          </div>
        </section>

        {/* STAGE 2: RESULTS & SELECTION (The Core Engine) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Feed (Left 7/12) */}
          <div className="lg:col-span-7 space-y-10">
            {hasResults ? (
              <>
                <ParkingResults />
                <SlotSelection />
              </>
            ) : (
              <div className="space-y-6">
                <EmptyState />
                <ErrorState />
              </div>
            )}
          </div>

          {/* Inspection Sidebar (Right 5/12) */}
          <aside className="lg:col-span-5 space-y-10">
            <div className="lg:sticky lg:top-32 space-y-10">
              <ParkingDetails />
              <div className="bg-white/2 border border-white/5 rounded-3xl p-1 shadow-2xl">
                <PriceSummary />
              </div>
            </div>
          </aside>
        </div>

        {/* STAGE 3: FINALIZATION (Rules & Checkout) */}
        <section className="pt-10 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-8">
              <BookingRules />
              <SupportShortcut />
            </div>
            <div className="lg:sticky lg:top-32 bg-blue-600/3 border border-blue-500/10 rounded-[2.5rem] p-1 shadow-2xl">
              <div className="space-y-6">
                <BookingActions />
                <BookingConfirmation />
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-700">
            Smart Park • Anand Hub Asset Allocation • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default FindParking;
