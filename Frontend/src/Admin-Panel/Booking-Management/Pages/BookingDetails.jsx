import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAdminBookingById,
  markEntry,
  markExit,
} from "../Services/adminBookingService";
import { getGateLogs } from "../../Gate-Operations/Services/gateService";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooking = async () => {
    const data = await getAdminBookingById(id);
    setBooking(data);
    return data;
  };

  const fetchAuditLogs = async (bookingCode) => {
    if (!bookingCode) {
      setLogs([]);
      return;
    }
    const res = await getGateLogs({ bookingCode, limit: 100 });
    setLogs(res?.data || []);
  };

  const loadAll = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchBooking();
      await fetchAuditLogs(data?.bookingCode);
    } catch (err) {
      setError(
        err?.response?.data?.message || err.message || "Failed to load booking",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [id]);

  const runWithOptimisticUpdate = async (nextStatus, apiFn) => {
    if (!booking) return;
    const previous = booking;

    try {
      setActionLoading(true);
      setError("");

      setBooking((current) => ({
        ...current,
        status: nextStatus,
        ...(nextStatus === "active"
          ? { entryTime: new Date().toISOString() }
          : { exitTime: new Date().toISOString() }),
      }));

      await apiFn(id);
      await loadAll();
    } catch (err) {
      setBooking(previous);
      setError(
        err?.response?.data?.message ||
          err.message ||
          `Failed to mark ${nextStatus === "active" ? "entry" : "exit"}`,
      );
    } finally {
      setActionLoading(false);
    }
  };

  const timeline = useMemo(() => {
    if (!booking) return [];
    return [
      {
        key: "confirmed",
        label: "Confirmed",
        done: ["confirmed", "active", "completed"].includes(booking.status),
        time: booking.createdAt,
      },
      {
        key: "active",
        label: "Entered",
        done: ["active", "completed"].includes(booking.status),
        time: booking.entryTime,
      },
      {
        key: "completed",
        label: "Exited",
        done: booking.status === "completed",
        time: booking.exitTime,
      },
    ];
  }, [booking]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-40 rounded-xl bg-[#FAF3E1]/2 animate-pulse" />
        <div className="h-48 rounded-2xl bg-[#FAF3E1]/2 animate-pulse" />
        <div className="h-56 rounded-2xl bg-[#FAF3E1]/2 animate-pulse" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="space-y-4">
        <p className="text-rose-300">{error || "Booking not found"}</p>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 rounded-lg"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-[#FAF3E1]">Booking Detail</h2>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 rounded-lg"
        >
          Back
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-300 text-sm flex items-center justify-between gap-3">
          <span>{error}</span>
          <button
            onClick={loadAll}
            className="px-3 py-2 text-[10px] font-black uppercase tracking-widest border border-[#F5E7C6]/20 rounded-lg text-[#FAF3E1]"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/10">
            <p className="text-[#FAF3E1]"><strong>Ticket Code:</strong> {booking.bookingCode || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>Status:</strong> {booking.status || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>User:</strong> {booking.user?.fullName || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>Vehicle:</strong> {booking.vehicleNumber || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>Parking:</strong> {booking.parking?.name || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>Slot:</strong> {booking.slot?.label || booking.slot?.slotNumber || "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>Start:</strong> {booking.startTime ? new Date(booking.startTime).toLocaleString() : "N/A"}</p>
            <p className="text-[#FAF3E1]"><strong>End:</strong> {booking.endTime ? new Date(booking.endTime).toLocaleString() : "N/A"}</p>
          </div>

          <div className="bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/10">
            <h3 className="text-[#FAF3E1] font-black mb-3">Status Timeline</h3>
            <div className="space-y-3">
              {timeline.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div
                    className={`h-3 w-3 rounded-full ${item.done ? "bg-[#FA8112]" : "bg-[#FAF3E1]/30"}`}
                  />
                  <p className="text-[#FAF3E1] text-sm font-bold min-w-24">{item.label}</p>
                  <p className="text-[#FAF3E1]/50 text-xs">
                    {item.time ? new Date(item.time).toLocaleString() : "Pending"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/10">
            <h3 className="text-[#FAF3E1] font-black mb-3">Audit Trail</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[#FAF3E1]/40">
                  <tr>
                    <th className="py-2 pr-3">Time</th>
                    <th className="py-2 pr-3">Action</th>
                    <th className="py-2 pr-3">Result</th>
                    <th className="py-2 pr-3">Reason</th>
                    <th className="py-2 pr-3">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
                      <td className="py-2 pr-3">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-3 uppercase">{log.action}</td>
                      <td className={`py-2 pr-3 uppercase ${log.result === "success" ? "text-[#FA8112]" : "text-rose-400"}`}>{log.result}</td>
                      <td className="py-2 pr-3">{log.reason || "-"}</td>
                      <td className="py-2 pr-3">{log.errorCode ? `${log.errorCode}: ` : ""}{log.message || "-"}</td>
                    </tr>
                  ))}
                  {logs.length === 0 && (
                    <tr>
                      <td className="py-3 text-[#FAF3E1]/40" colSpan="5">No audit logs found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/10">
            <h3 className="text-[#FAF3E1] font-black mb-3">Payment & Slot Info</h3>
            <p className="text-[#FAF3E1] text-sm"><strong>Amount:</strong> ₹{booking.totalAmount ?? "N/A"}</p>
            <p className="text-[#FAF3E1] text-sm"><strong>Payment Status:</strong> {booking.paymentStatus || "N/A"}</p>
            <p className="text-[#FAF3E1] text-sm"><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
            <p className="text-[#FAF3E1] text-sm"><strong>Slot Status:</strong> {booking.slot?.status || "N/A"}</p>
          </div>

          <div className="bg-[#FAF3E1]/2 p-6 rounded-2xl border border-[#F5E7C6]/10">
            <h3 className="text-[#FAF3E1] font-black mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              {booking.status === "confirmed" && (
                <button
                  onClick={() => runWithOptimisticUpdate("active", markEntry)}
                  disabled={actionLoading}
                  className="px-5 py-3 text-xs font-black uppercase tracking-widest text-[#FA8112] border border-[#FA8112]/30 rounded-lg hover:bg-[#FA8112] hover:text-[#222222] disabled:opacity-50"
                >
                  {actionLoading ? "Processing..." : "Mark Entry"}
                </button>
              )}

              {booking.status === "active" && (
                <button
                  onClick={() => runWithOptimisticUpdate("completed", markExit)}
                  disabled={actionLoading}
                  className="px-5 py-3 text-xs font-black uppercase tracking-widest text-amber-400 border border-amber-400/30 rounded-lg hover:bg-amber-400 hover:text-[#222222] disabled:opacity-50"
                >
                  {actionLoading ? "Processing..." : "Mark Exit"}
                </button>
              )}

              {!['confirmed', 'active'].includes(booking.status) && (
                <p className="text-[#FAF3E1]/60 text-sm">No gate action available for current status.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
