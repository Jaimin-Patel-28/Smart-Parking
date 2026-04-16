import { useEffect, useMemo, useState } from "react";
import {
  getExceptions,
  applyOverride,
  getOperationalAlerts,
  getShiftNotes,
  createShiftNote,
} from "../Services/gateService";

const overrideOptions = [
  { value: "ALLOW_ENTRY", label: "Allow Entry" },
  { value: "ALLOW_EXIT_PENDING_PAYMENT", label: "Allow Exit (Pending Payment)" },
  { value: "MARK_NO_SHOW", label: "Mark No-Show" },
  { value: "FORCE_COMPLETE_OVERSTAY", label: "Force Complete Overstay" },
];

const ExceptionSection = ({ title, items, emptyText, renderRow }) => (
  <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10">
    <h3 className="text-[#FAF3E1] font-black mb-3">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-[#FAF3E1]/50">
          <tr>
            <th className="py-2 pr-3">Code</th>
            <th className="py-2 pr-3">Status</th>
            <th className="py-2 pr-3">Vehicle/User</th>
            <th className="py-2 pr-3">Time</th>
            <th className="py-2 pr-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(renderRow)}
          {items.length === 0 && (
            <tr>
              <td colSpan="5" className="py-3 text-[#FAF3E1]/40">
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const Exceptions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [exceptions, setExceptions] = useState(null);
  const [alerts, setAlerts] = useState({});

  const [selectedCode, setSelectedCode] = useState("");
  const [overrideType, setOverrideType] = useState("ALLOW_ENTRY");
  const [overrideReason, setOverrideReason] = useState("");
  const [overrideMessage, setOverrideMessage] = useState("");

  const [note, setNote] = useState("");
  const [handoverComment, setHandoverComment] = useState("");
  const [shiftNotes, setShiftNotes] = useState([]);

  const loadPage = async () => {
    try {
      setLoading(true);
      setError("");

      const [exceptionsRes, alertsRes, notesRes] = await Promise.all([
        getExceptions({ limit: 20 }),
        getOperationalAlerts(),
        getShiftNotes({ limit: 20 }),
      ]);

      setExceptions(exceptionsRes.data || null);
      setAlerts(alertsRes.data || {});
      setShiftNotes(notesRes.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load exceptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const exceptionCounts = useMemo(
    () => exceptions?.counts || { invalidCodeAttempts: 0, noShows: 0, overstays: 0, pendingPaymentAtExit: 0 },
    [exceptions],
  );

  const selectBookingCode = (code, preferredOverride) => {
    setSelectedCode(code || "");
    if (preferredOverride) {
      setOverrideType(preferredOverride);
    }
    setOverrideMessage("");
  };

  const handleOverride = async (e) => {
    e.preventDefault();

    if (!selectedCode.trim()) {
      setOverrideMessage("Select or enter a booking code before override.");
      return;
    }

    if (!overrideReason.trim()) {
      setOverrideMessage("Reason is mandatory for override actions.");
      return;
    }

    try {
      setSaving(true);
      setOverrideMessage("");
      await applyOverride({
        bookingCode: selectedCode.trim(),
        overrideType,
        reason: overrideReason.trim(),
      });
      setOverrideReason("");
      setOverrideMessage("Override applied successfully and logged.");
      await loadPage();
    } catch (err) {
      setOverrideMessage(
        `${err?.response?.data?.errorCode || "OVERRIDE_FAILED"}: ${err?.response?.data?.message || err.message}`,
      );
    } finally {
      setSaving(false);
    }
  };

  const handleShiftNote = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await createShiftNote({ note, handoverComment });
      setNote("");
      setHandoverComment("");
      await loadPage();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save shift note");
    } finally {
      setSaving(false);
    }
  };

  const data = exceptions?.data || {
    invalidCodeAttempts: [],
    noShows: [],
    overstays: [],
    pendingPaymentAtExit: [],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#FAF3E1]">Operational Exceptions</h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
          <p className="text-xs uppercase tracking-widest text-rose-300">Invalid Code Attempts</p>
          <p className="text-2xl font-black text-rose-200 mt-2">{alerts.invalidCodeAttempts ?? exceptionCounts.invalidCodeAttempts}</p>
        </div>
        <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-200">No-Shows</p>
          <p className="text-2xl font-black text-amber-100 mt-2">{alerts.noShows ?? exceptionCounts.noShows}</p>
        </div>
        <div className="rounded-xl border border-orange-400/20 bg-orange-500/10 p-4">
          <p className="text-xs uppercase tracking-widest text-orange-200">Overstays</p>
          <p className="text-2xl font-black text-orange-100 mt-2">{alerts.overstays ?? exceptionCounts.overstays}</p>
        </div>
        <div className="rounded-xl border border-[#FA8112]/20 bg-[#FA8112]/10 p-4">
          <p className="text-xs uppercase tracking-widest text-[#FAF3E1]">Pending Payment At Exit</p>
          <p className="text-2xl font-black text-[#FAF3E1] mt-2">{alerts.pendingPaymentAtExit ?? exceptionCounts.pendingPaymentAtExit}</p>
        </div>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}
      {loading && <p className="text-sm text-[#FAF3E1]/60">Loading exceptions...</p>}

      <ExceptionSection
        title="Invalid Ticket Code Attempts"
        items={data.invalidCodeAttempts || []}
        emptyText="No invalid code attempts recorded."
        renderRow={(log) => (
          <tr key={log._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
            <td className="py-2 pr-3">{log.bookingCode}</td>
            <td className="py-2 pr-3 text-rose-300">{log.errorCode || "WRONG_CODE"}</td>
            <td className="py-2 pr-3">{log.admin?.fullName || "-"}</td>
            <td className="py-2 pr-3">{new Date(log.createdAt).toLocaleString()}</td>
            <td className="py-2 pr-3 text-[#FAF3E1]/50">Review only</td>
          </tr>
        )}
      />

      <ExceptionSection
        title="No-Show Bookings"
        items={data.noShows || []}
        emptyText="No no-show bookings found."
        renderRow={(booking) => (
          <tr key={booking._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
            <td className="py-2 pr-3">{booking.bookingCode}</td>
            <td className="py-2 pr-3 uppercase">{booking.status}</td>
            <td className="py-2 pr-3">{booking.vehicleNumber || booking.user?.fullName || "-"}</td>
            <td className="py-2 pr-3">{new Date(booking.endTime).toLocaleString()}</td>
            <td className="py-2 pr-3">
              <button
                onClick={() => selectBookingCode(booking.bookingCode, "MARK_NO_SHOW")}
                className="px-3 py-1 rounded-lg border border-[#FA8112]/30 text-[#FA8112] text-xs font-bold"
              >
                Prepare Override
              </button>
            </td>
          </tr>
        )}
      />

      <ExceptionSection
        title="Overstay Bookings"
        items={data.overstays || []}
        emptyText="No overstays currently active."
        renderRow={(booking) => (
          <tr key={booking._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
            <td className="py-2 pr-3">{booking.bookingCode}</td>
            <td className="py-2 pr-3 uppercase">{booking.status}</td>
            <td className="py-2 pr-3">{booking.vehicleNumber || booking.user?.fullName || "-"}</td>
            <td className="py-2 pr-3">{new Date(booking.endTime).toLocaleString()}</td>
            <td className="py-2 pr-3">
              <button
                onClick={() => selectBookingCode(booking.bookingCode, "FORCE_COMPLETE_OVERSTAY")}
                className="px-3 py-1 rounded-lg border border-[#FA8112]/30 text-[#FA8112] text-xs font-bold"
              >
                Prepare Override
              </button>
            </td>
          </tr>
        )}
      />

      <ExceptionSection
        title="Pending Payment At Exit"
        items={data.pendingPaymentAtExit || []}
        emptyText="No active pending-payment exits."
        renderRow={(booking) => (
          <tr key={booking._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
            <td className="py-2 pr-3">{booking.bookingCode}</td>
            <td className="py-2 pr-3 uppercase">{booking.paymentStatus}</td>
            <td className="py-2 pr-3">{booking.vehicleNumber || booking.user?.fullName || "-"}</td>
            <td className="py-2 pr-3">
              {new Date(booking.exitTime || booking.endTime).toLocaleString()}
            </td>
            <td className="py-2 pr-3">
              {booking.status === "active" ? (
                <button
                  onClick={() => selectBookingCode(booking.bookingCode, "ALLOW_EXIT_PENDING_PAYMENT")}
                  className="px-3 py-1 rounded-lg border border-[#FA8112]/30 text-[#FA8112] text-xs font-bold"
                >
                  Prepare Override
                </button>
              ) : (
                <span className="text-xs text-[#FAF3E1]/50">Already exited</span>
              )}
            </td>
          </tr>
        )}
      />

      <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10 space-y-3">
        <h3 className="text-[#FAF3E1] font-black">Override Console (Reason Required)</h3>
        <form onSubmit={handleOverride} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value.toUpperCase())}
            placeholder="Booking code"
            className="h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
          />
          <select
            value={overrideType}
            onChange={(e) => setOverrideType(e.target.value)}
            className="h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
          >
            {overrideOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            placeholder="Mandatory override reason"
            className="h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
          />
          <button
            type="submit"
            disabled={saving}
            className="h-11 rounded-xl bg-[#FA8112] text-[#222222] text-xs font-black uppercase tracking-widest disabled:opacity-50"
          >
            {saving ? "Applying..." : "Apply Override"}
          </button>
        </form>
        {overrideMessage && (
          <p className={`text-sm ${overrideMessage.includes("success") ? "text-[#FA8112]" : "text-rose-400"}`}>
            {overrideMessage}
          </p>
        )}
      </div>

      <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10 space-y-4">
        <h3 className="text-[#FAF3E1] font-black">Shift Notes & Handover</h3>
        <form onSubmit={handleShiftNote} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Shift note"
            className="md:col-span-1 min-h-24 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 p-3 text-[#FAF3E1]"
          />
          <textarea
            value={handoverComment}
            onChange={(e) => setHandoverComment(e.target.value)}
            placeholder="Handover comment"
            className="md:col-span-1 min-h-24 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 p-3 text-[#FAF3E1]"
          />
          <button
            type="submit"
            disabled={saving}
            className="h-11 self-start rounded-xl bg-[#FA8112] text-[#222222] text-xs font-black uppercase tracking-widest disabled:opacity-50"
          >
            Save Note
          </button>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#FAF3E1]/50">
              <tr>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Admin</th>
                <th className="py-2 pr-3">Note</th>
                <th className="py-2 pr-3">Handover</th>
              </tr>
            </thead>
            <tbody>
              {shiftNotes.map((item) => (
                <tr key={item._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
                  <td className="py-2 pr-3">{new Date(item.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-3">{item.admin?.fullName || "-"}</td>
                  <td className="py-2 pr-3">{item.note || "-"}</td>
                  <td className="py-2 pr-3">{item.handoverComment || "-"}</td>
                </tr>
              ))}
              {shiftNotes.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-3 text-[#FAF3E1]/40">
                    No shift notes added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exceptions;
