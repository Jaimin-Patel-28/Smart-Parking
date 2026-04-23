import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  History,
  CreditCard,
} from "lucide-react";
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
          `Failed to mark ${nextStatus}`,
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
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-[#FAF3E1]/5 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-[#FAF3E1]/5 rounded-xl" />
          <div className="h-96 bg-[#FAF3E1]/5 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-20 bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10">
        <p className="text-rose-400 mb-6">
          {error || "Booking details could not be found."}
        </p>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FA8112] text-[#222222] font-bold rounded-lg transition-transform hover:scale-95"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto pb-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
            Booking Record
          </h2>
          <p className="text-[#FAF3E1]/40 text-sm mt-1">
            Manage gate entry, exit, and view audit trails.
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/bookings")}
          className="flex items-center justify-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#FAF3E1]/60 border border-[#F5E7C6]/20 rounded-lg hover:bg-[#FAF3E1]/5 transition-all"
        >
          <ArrowLeft size={14} /> Back to List
        </button>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-300 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={loadAll}
            className="p-2 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: PRIMARY INFO */}
        <div className="lg:col-span-2 space-y-6">
          {/* INFO CARD */}
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#FA8112]" />
              <h3 className="text-[#FAF3E1] font-semibold">Primary Details</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {[
                {
                  label: "Ticket Code",
                  value: booking.bookingCode,
                  highlight: true,
                },
                {
                  label: "Current Status",
                  value: booking.status,
                  uppercase: true,
                },
                { label: "Customer Name", value: booking.user?.fullName },
                {
                  label: "Vehicle Number",
                  value: booking.vehicleNumber,
                  font: "font-mono",
                },
                { label: "Parking Area", value: booking.parking?.name },
                {
                  label: "Assigned Slot",
                  value: booking.slot?.label || booking.slot?.slotNumber,
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30">
                    {item.label}
                  </p>
                  <p
                    className={`text-sm ${item.highlight ? "text-[#FA8112] font-bold" : "text-[#FAF3E1] font-medium"} ${item.uppercase ? "uppercase" : ""} ${item.font || ""}`}
                  >
                    {item.value || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE SECTION */}
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl p-6">
            <h3 className="text-[#FAF3E1] font-semibold mb-6 flex items-center gap-2">
              <History size={18} className="text-[#FA8112]" /> Status Timeline
            </h3>
            <div className="relative space-y-8 before:absolute before:left-[5px] before:top-2 before:h-[80%] before:w-[1px] before:bg-[#F5E7C6]/10">
              {timeline.map((item) => (
                <div
                  key={item.key}
                  className="relative flex items-start gap-6 pl-6"
                >
                  <div
                    className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-[#222222] ${item.done ? "bg-[#FA8112]" : "bg-[#444]"}`}
                  />
                  <div className="flex-1 sm:flex items-center justify-between">
                    <p
                      className={`text-sm font-bold ${item.done ? "text-[#FAF3E1]" : "text-[#FAF3E1]/30"}`}
                    >
                      {item.label}
                    </p>
                    <p className="text-[#FAF3E1]/40 text-xs mt-1 sm:mt-0">
                      {item.time
                        ? new Date(item.time).toLocaleString(undefined, {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Waiting for action"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIT LOGS TABLE */}
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#F5E7C6]/5 flex items-center justify-between">
              <h3 className="text-[#FAF3E1] font-semibold">
                Security Audit Trail
              </h3>
              <span className="text-[10px] bg-[#FA8112]/10 text-[#FA8112] px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                System Logs
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/30 uppercase tracking-tighter">
                  <tr>
                    <th className="py-3 px-6">Timestamp</th>
                    <th className="py-3 px-6">Action</th>
                    <th className="py-3 px-6">Outcome</th>
                    <th className="py-3 px-6">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F5E7C6]/5">
                  {logs.map((log) => (
                    <tr
                      key={log._id}
                      className="text-[#FAF3E1]/80 hover:bg-[#FAF3E1]/2"
                    >
                      <td className="py-3 px-6 whitespace-nowrap">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>
                      <td className="py-3 px-6 font-bold uppercase tracking-tighter">
                        {log.action}
                      </td>
                      <td className="py-3 px-6">
                        <span
                          className={
                            log.result === "success"
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }
                        >
                          {log.result}
                        </span>
                      </td>
                      <td className="py-3 px-6 max-w-xs truncate">
                        {log.message || log.reason || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIONS & PAYMENT */}
        <div className="space-y-6">
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-xl p-6">
            <h3 className="text-[#FAF3E1] font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={18} className="text-[#FA8112]" /> Billing
              Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-[#F5E7C6]/5">
                <span className="text-[#FAF3E1]/40 text-xs">Total Fare</span>
                <span className="text-[#FAF3E1] font-bold text-lg">
                  ₹{booking.totalAmount}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#FAF3E1]/40 text-xs">Payment</span>
                <span
                  className={`text-[10px] font-bold uppercase ${booking.paymentStatus === "paid" ? "text-emerald-400" : "text-amber-400"}`}
                >
                  {booking.paymentStatus || "Unpaid"}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF3E1]/5 border border-[#FA8112]/20 rounded-xl p-6">
            <h3 className="text-[#FAF3E1] font-semibold mb-4">
              Quick Gate Control
            </h3>
            <div className="space-y-3">
              {booking.status === "confirmed" && (
                <button
                  onClick={() => runWithOptimisticUpdate("active", markEntry)}
                  disabled={actionLoading}
                  className="w-full py-3 bg-[#FA8112] text-[#222222] font-bold uppercase text-[11px] tracking-widest rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {actionLoading ? "Updating..." : "Authorize Entry"}
                </button>
              )}

              {booking.status === "active" && (
                <button
                  onClick={() => runWithOptimisticUpdate("completed", markExit)}
                  disabled={actionLoading}
                  className="w-full py-3 border border-amber-400 text-amber-400 font-bold uppercase text-[11px] tracking-widest rounded-lg hover:bg-amber-400 hover:text-[#222222] disabled:opacity-50 transition-all"
                >
                  {actionLoading ? "Updating..." : "Authorize Exit"}
                </button>
              )}

              {!["confirmed", "active"].includes(booking.status) && (
                <div className="text-center py-4 px-2 border border-[#F5E7C6]/10 rounded-lg bg-[#222]">
                  <p className="text-[#FAF3E1]/30 text-[10px] uppercase font-bold">
                    Session Closed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
