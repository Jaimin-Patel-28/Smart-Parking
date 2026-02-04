import React from "react";
import PageHeader from "./Mybookings/PageHeader";
import BookingSummary from "./Mybookings/BookingSummary";
import FiltersSearch from "./Mybookings/FiltersSearch";
import ActiveBookings from "./Mybookings/ActiveBookings";
import UpcomingBookings from "./Mybookings/UpcomingBookings";
import BookingHistory from "./Mybookings/BookingHistory";
import BookingDetailsView from "./Mybookings/BookingDetailsView";
import PaymentInfo from "./Mybookings/PaymentInfo";
import BookingPolicies from "./Mybookings/BookingPolicies";
import NotificationsAlerts from "./Mybookings/NotificationsAlerts";
import SupportHelp from "./Mybookings/SupportHelp";
import EmptyState from "./Mybookings/EmptyState";

const MyBookingsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <PageHeader />

      <main className="max-w-[1600px] mx-auto p-6 lg:p-12 space-y-10 lg:space-y-12">
        {/* ROW 1: Active Bookings (Full Width) */}
        <section className="w-full">
          <ActiveBookings />
        </section>

        {/* ROW 2: Summary (Left 2/3) & Filters (Right 1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* BOOKING SUMMARY: Compact 5-column span for 2x2 cards */}
          <div className="lg:col-span-5 h-full">
            <BookingSummary />
          </div>

          {/* FILTERS SEARCH: Expanded 7-column span for wide inputs */}
          <div className="lg:col-span-7 h-full">
            <FiltersSearch />
          </div>
        </div>

        {/* ROW 3: Upcoming Bookings (Full Width) */}
        <section className="w-full">
          <UpcomingBookings />
        </section>

        {/* ROW 4: Booking History (Full Width) */}
        <section className="w-full">
          <BookingHistory />
        </section>

        {/* ROW 5: Payment Info (Left) & Notifications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <PaymentInfo />
          <NotificationsAlerts />
        </div>

        {/* ROW 6: Support (Left) & Policies (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          <SupportHelp />
          <BookingPolicies />
        </div>

        {/* ROW 7: Details View (Full Width) */}
        <section className="w-full">
          <BookingDetailsView />
        </section>

        <footer className="mt-20 py-10 border-t border-white/5 text-center opacity-20">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">
            Anand Smart City • Parking Asset Management • 2026
          </p>
        </footer>
      </main>
    </div>
  );
};

export default MyBookingsPage;
