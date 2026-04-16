import React, { useState, useMemo } from "react";
import { useBookings } from "../Hooks/useBookings";
import BookingTable from "../Components/BookingTable";
import BookingFilters from "../Components/BookingFilters";
import { RefreshCw, LayoutList } from "lucide-react";

const BookingList = () => {
  const { bookings, loading, error, status, setStatus, refresh } = useBookings();

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const [filters, setFilters] = useState({
    vehicleNumber: "",
    date: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ vehicleNumber: "", date: "" });
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const vehicleText = (booking.vehicleNumber || "")
        .toString()
        .toLowerCase();
      const matchesVehicle = vehicleText.includes(
        (filters.vehicleNumber || "").toLowerCase(),
      );
      const matchesDate = filters.date
        ? new Date(booking.startTime).toDateString() ===
          new Date(filters.date).toDateString()
        : true;
      return matchesVehicle && matchesDate;
    });
  }, [bookings, filters]);

  const statusOptions = [
    "pending",
    "confirmed",
    "active",
    "completed",
    "cancelled",
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 bg-[#222222]">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
            Booking <span className="text-[#FA8112]">Intelligence</span>
          </h1>
          <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
            Archive & Real-time Reservation Logs
          </p>
        </div>
        <button
          onClick={refresh}
          className="p-3 bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-2xl shadow-sm hover:bg-[#FA8112] hover:text-[#222222] transition-all group"
        >
          <RefreshCw
            size={20}
            className={`transition-colors ${
              loading
                ? "animate-spin text-[#FA8112] group-hover:text-[#222222]"
                : "text-[#FAF3E1]/40 group-hover:text-[#222222]"
            }`}
          />
        </button>
      </div>

      {/* SEARCH & DATE FILTERS - Inherits theme from component */}
      <BookingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-300 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      {/* STATUS TABS - Replaced Emerald with Tangerine */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setStatus("")}
          className={`px-6 py-3 rounded-2xl text-[10px] font-black tracking-[0.15em] transition-all border ${
            status === ""
              ? "bg-[#FAF3E1] text-[#222222] border-[#FAF3E1]"
              : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/10 hover:border-[#FAF3E1]/40"
          }`}
        >
          ALL RECORDS
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setStatus(opt)}
            className={`px-6 py-3 rounded-2xl text-[10px] font-black transition-all border uppercase tracking-[0.15em] ${
              status === opt
                ? "bg-[#FA8112] text-[#222222] border-[#FA8112] shadow-lg shadow-[#FA8112]/20"
                : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/10 hover:border-[#FA8112]/40"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* DATA TABLE CONTAINER */}
      <div className="bg-[#FAF3E1]/2 p-2 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm min-h-125">
        {loading ? (
          <div className="h-125 flex flex-col items-center justify-center gap-4">
            <RefreshCw size={40} className="animate-spin text-[#FA8112]" />
            <p className="font-black uppercase tracking-[0.3em] text-[10px] text-[#FAF3E1]/20">
              Synchronizing Ledger...
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <BookingTable bookings={filteredBookings} />
        ) : (
          <div className="h-125 flex flex-col items-center justify-center gap-4">
            <div className="bg-[#FAF3E1]/3 p-10 rounded-full text-[#FAF3E1]/10 border border-[#F5E7C6]/5 mb-2">
              <LayoutList size={64} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-[#FAF3E1]/40 font-black uppercase text-[11px] tracking-[0.2em]">
                No matching sequences found
              </p>
              <button
                onClick={clearFilters}
                className="text-[#FA8112] font-black text-xs uppercase tracking-widest hover:text-[#FAF3E1] transition-colors underline underline-offset-8"
              >
                Clear Search Queries
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
