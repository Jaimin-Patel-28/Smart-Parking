import useAdminBookings from "../Hooks/useAdminBookings";
import BookingTable from "../Components/BookingTable";
import { useMemo, useState } from "react";

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
    if (lastAction.type === "entry") {
      await onEntry(lastAction.id);
      return;
    }
    await onExit(lastAction.id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-[#FAF3E1]">
          Admin Booking Management
        </h2>
        <p className="text-[#FAF3E1]/40 text-sm mt-1">
          Filter by booking code, status, vehicle, and date. Use quick entry/exit
          actions directly from the list.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#FAF3E1]/2 p-4 rounded-2xl border border-[#F5E7C6]/10">
        <input
          value={filters.bookingCode}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, bookingCode: e.target.value }))
          }
          placeholder="Booking Code"
          className="h-10 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, status: e.target.value }))
          }
          className="h-10 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        >
          <option value="">All Status</option>
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
          placeholder="Vehicle Number"
          className="h-10 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
          className="h-10 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
      </div>

      {(error || actionError) && (
        <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-sm flex items-center justify-between gap-3">
          <span>{actionError || error}</span>
          <div className="flex items-center gap-2">
            {lastAction && (
              <button
                onClick={retryLastAction}
                className="px-3 py-2 text-[10px] font-black uppercase tracking-widest border border-rose-400/30 rounded-lg hover:bg-rose-400 hover:text-[#222222]"
              >
                Retry Action
              </button>
            )}
            <button
              onClick={fetchBookings}
              className="px-3 py-2 text-[10px] font-black uppercase tracking-widest border border-[#F5E7C6]/20 rounded-lg text-[#FAF3E1]"
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/2 text-[#FAF3E1]/60">
          Loading bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-[#F5E7C6]/20 bg-[#FAF3E1]/2 text-[#FAF3E1]/50">
          No bookings match current filters.
        </div>
      ) : (
        <BookingTable
          bookings={filteredBookings}
          loading={loading}
          onEntry={onEntry}
          onExit={onExit}
          processingId={processingId}
          isAdmin={true} // 🔥 important
        />
      )}

    </div>
  );
};

export default BookingList;
