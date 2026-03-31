import React, { useState, useMemo } from "react";
import { useBookings } from "../Hooks/useBookings";
import BookingTable from "../Components/BookingTable";
import BookingFilters from "../Components/BookingFilters"; // Import new component
import { RefreshCw, LayoutList } from "lucide-react";

const BookingList = () => {
  const { bookings, loading, status, setStatus, refresh } = useBookings();

  // Local state for search filters
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

  // Logic to filter the bookings list based on search and date
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const vehicleText = (booking.vehicleNumber || "").toString().toLowerCase();
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800">
            Booking Management
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage reservations and check-in status.
          </p>
        </div>
        <button
          onClick={refresh}
          className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50"
        >
          <RefreshCw
            size={20}
            className={
              loading ? "animate-spin text-emerald-500" : "text-slate-400"
            }
          />
        </button>
      </div>

      {/* SEARCH & DATE FILTERS */}
      <BookingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      {/* STATUS TABS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatus("")}
          className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border ${status === "" ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
        >
          ALL
        </button>
        {statusOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setStatus(opt)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border uppercase ${status === opt ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* DATA TABLE */}
      <div className="bg-white p-2 rounded-[2.5rem] border border-slate-100 shadow-sm">
        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-300">
            <RefreshCw size={40} className="animate-spin" />
            <p className="font-bold uppercase tracking-widest text-xs">
              Fetching Records...
            </p>
          </div>
        ) : filteredBookings.length > 0 ? (
          <BookingTable bookings={filteredBookings} />
        ) : (
          <div className="h-96 flex flex-col items-center justify-center gap-2">
            <div className="bg-slate-50 p-6 rounded-full text-slate-200 mb-2">
              <LayoutList size={48} />
            </div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              No match found
            </p>
            <button
              onClick={clearFilters}
              className="text-emerald-600 font-bold text-sm underline underline-offset-4"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;
