import useAdminBookings from "../Hooks/useAdminBookings";
import BookingTable from "../Components/BookingTable";
import { useMemo, useState } from "react";
import { Search, Filter, RotateCcw, AlertCircle } from "lucide-react";

const BookingList = () => {
  const { bookings, loading, error, fetchBookings, handleEntry, handleExit } =
    useAdminBookings();
  const [processingId, setProcessingId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [lastAction, setLastAction] = useState(null);
  const [filters, setFilters] = useState({
    bookingCode: "",
    status: "",
    vehicle: "",
    date: "",
  });

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const code = String(booking.bookingCode || "").toLowerCase();
      const vehicle = String(booking.vehicleNumber || "").toLowerCase();
      const status = String(booking.status || "").toLowerCase();
      const startDate = booking.startTime
        ? new Date(booking.startTime).toISOString().slice(0, 10)
        : "";

      const matchesCode = code.includes(filters.bookingCode.toLowerCase());
      const matchesVehicle = vehicle.includes(filters.vehicle.toLowerCase());
      const matchesStatus = filters.status ? status === filters.status : true;
      const matchesDate = filters.date ? startDate === filters.date : true;

      return matchesCode && matchesVehicle && matchesStatus && matchesDate;
    });
  }, [bookings, filters]);

  const onEntry = async (id) => {
    try {
      setProcessingId(id);
      setActionError("");
      setLastAction({ type: "entry", id });
      await handleEntry(id);
      setLastAction(null);
    } catch (err) {
      setActionError(
        err?.response?.data?.message || err.message || "Failed to mark entry",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const onExit = async (id) => {
    try {
      setProcessingId(id);
      setActionError("");
      setLastAction({ type: "exit", id });
      await handleExit(id);
      setLastAction(null);
    } catch (err) {
      setActionError(
        err?.response?.data?.message || err.message || "Failed to mark exit",
      );
    } finally {
      setProcessingId(null);
    }
  };

  const retryLastAction = async () => {
    if (!lastAction) return;
    lastAction.type === "entry"
      ? await onEntry(lastAction.id)
      : await onExit(lastAction.id);
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
            Booking Management
          </h2>
          <p className="text-[#FAF3E1]/40 text-sm max-w-xl">
            Real-time oversight of all parking reservations. Authorize vehicle
            entries and exits directly from this dashboard.
          </p>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF3E1]/5 text-[#FAF3E1]/60 text-xs font-bold uppercase tracking-widest border border-[#F5E7C6]/10 rounded-lg hover:bg-[#FAF3E1]/10 transition-all"
        >
          <RotateCcw size={14} /> Refresh Data
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4 text-[#FA8112]">
          <Filter size={16} />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            Quick Filters
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20"
              size={16}
            />
            <input
              value={filters.bookingCode}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, bookingCode: e.target.value }))
              }
              placeholder="Search Ticket Code..."
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 focus:ring-0 outline-none transition-all"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
            className="h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none appearance-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            value={filters.vehicle}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, vehicle: e.target.value }))
            }
            placeholder="Vehicle Plate Number"
            className="h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all"
          />

          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, date: e.target.value }))
            }
            className="h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none color-scheme-dark"
          />
        </div>
      </div>

      {/* ALERT/ERROR BOX */}
      {(error || actionError) && (
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" />
            <span>{actionError || error}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {lastAction && (
              <button
                onClick={retryLastAction}
                className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-rose-500/10 border border-rose-500/30 rounded-lg hover:bg-rose-500 hover:text-white transition-all"
              >
                Retry Last Action
              </button>
            )}
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[400px] border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 rounded-xl">
            <div className="w-8 h-8 border-2 border-[#FA8112] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#FAF3E1]/40 text-sm font-medium">
              Syncing database...
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] border border-dashed border-[#F5E7C6]/20 bg-[#FAF3E1]/2 rounded-xl text-center p-6">
            <p className="text-[#FAF3E1]/30 text-base font-medium mb-1">
              No matches found
            </p>
            <p className="text-[#FAF3E1]/10 text-xs uppercase tracking-widest font-bold">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <BookingTable
            bookings={filteredBookings}
            onEntry={onEntry}
            onExit={onExit}
            processingId={processingId}
            isAdmin={true}
          />
        )}
      </div>
    </div>
  );
};

export default BookingList;
