import React, { useState, useMemo } from "react";
import { useBookings } from "../Hooks/useBookings";
import BookingTable from "../Components/BookingTable";
import BookingFilters from "../Components/BookingFilters";
import { RefreshCw, LayoutList, Database, Activity } from "lucide-react";

const BookingList = () => {
  const { bookings, loading, error, status, setStatus, refresh } =
    useBookings();

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
    <div className="max-w-[1600px] mx-auto space-y-10 pb-16 animate-in fade-in duration-700">
      {/* 1. REGISTRY HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Database size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Audit Ledger
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
            Booking <span className="text-[#FA8112]">Intelligence</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest">
            Real-time Reservation & Archive Logs
          </p>
        </div>

        <button
          onClick={refresh}
          className="p-3 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-lg hover:bg-[#FA8112]/10 transition-all group"
          title="Resync Ledger"
        >
          <RefreshCw
            size={18}
            className={`transition-colors ${
              loading
                ? "animate-spin text-[#FA8112]"
                : "text-[#FAF3E1]/20 group-hover:text-[#FA8112]"
            }`}
          />
        </button>
      </div>

      {/* 2. QUERY CONSOLE */}
      <BookingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      {/* 3. PROTOCOL SWITCHER (Status Tabs) */}
      <div className="flex flex-wrap gap-2 px-1">
        <button
          onClick={() => setStatus("")}
          className={`px-5 py-2 rounded-lg text-[10px] font-bold tracking-[0.2em] transition-all border uppercase ${
            status === ""
              ? "bg-[#FA8112] text-[#222222] border-[#FA8112] shadow-lg shadow-[#FA8112]/10"
              : "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/5 hover:text-[#FAF3E1]"
          }`}
        >
          Full Archive
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setStatus(opt)}
            className={`px-5 py-2 rounded-lg text-[10px] font-bold transition-all border uppercase tracking-[0.2em] ${
              status === opt
                ? "bg-[#FA8112] text-[#222222] border-[#FA8112] shadow-lg shadow-[#FA8112]/10"
                : "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5 hover:text-[#FAF3E1]/60"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* 4. MAIN DATA VIEWPORT */}
      <div className="relative min-h-[500px]">
        {error ? (
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-6 text-rose-400 text-xs font-bold uppercase tracking-widest">
            Critical Error: {error}
          </div>
        ) : loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <RefreshCw
                size={48}
                className="animate-spin text-[#FA8112]"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 rounded-full border-2 border-[#FA8112]/5" />
            </div>
            <p className="font-bold uppercase tracking-[0.5em] text-[9px] text-[#FAF3E1]/10">
              Synchronizing Ledger Data...
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="bg-[#FAF3E1]/[0.01] rounded-xl border border-[#F5E7C6]/5 overflow-hidden shadow-2xl">
            <BookingTable bookings={filteredBookings} />
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <div className="bg-[#FAF3E1]/[0.02] p-12 rounded-xl border border-[#F5E7C6]/5 text-[#FAF3E1]/5">
              <LayoutList size={64} strokeWidth={1} />
            </div>
            <div className="text-center space-y-4">
              <p className="text-[#FAF3E1]/20 font-bold uppercase text-[10px] tracking-[0.4em]">
                Zero Matching Sequences
              </p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-[#FA8112] font-bold text-[10px] uppercase tracking-widest hover:text-[#FAF3E1] transition-colors"
              >
                <Activity size={12} /> Clear Search Queries
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
