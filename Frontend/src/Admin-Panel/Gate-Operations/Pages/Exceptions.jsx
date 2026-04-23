import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Clock,
  CreditCard,
  ShieldAlert,
  Terminal,
  MessageSquare,
  Save,
} from "lucide-react";
import {
  getExceptions,
  applyOverride,
  getOperationalAlerts,
  getShiftNotes,
  createShiftNote,
} from "../Services/gateService";

const overrideOptions = [
  { value: "ALLOW_ENTRY", label: "Allow Entry" },
  {
    value: "ALLOW_EXIT_PENDING_PAYMENT",
    label: "Allow Exit (Pending Payment)",
  },
  { value: "MARK_NO_SHOW", label: "Mark No-Show" },
  { value: "FORCE_COMPLETE_OVERSTAY", label: "Force Complete Overstay" },
];

const ExceptionSection = ({
  title,
  icon: Icon,
  items,
  emptyText,
  renderRow,
  columns,
}) => (
  <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden shadow-sm">
    <div className="px-5 py-4 border-b border-[#F5E7C6]/5 flex items-center gap-2 bg-[#FAF3E1]/2">
      <Icon size={18} className="text-[#FA8112]" />
      <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
        {title}
      </h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/30 uppercase tracking-tighter">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="py-3 px-5 font-bold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F5E7C6]/5">
          {items.map(renderRow)}
          {items.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-[#FAF3E1]/20 italic"
              >
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
  const navigate = useNavigate();
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
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load exceptions",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, []);

  const exceptionCounts = useMemo(
    () =>
      exceptions?.counts || {
        invalidCodeAttempts: 0,
        noShows: 0,
        overstays: 0,
        pendingPaymentAtExit: 0,
      },
    [exceptions],
  );

  const selectBookingCode = (code, preferredOverride) => {
    setSelectedCode(code || "");
    if (preferredOverride) setOverrideType(preferredOverride);
    setOverrideMessage("");
    // Scroll to console smoothly
    document
      .getElementById("override-console")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOverride = async (e) => {
    e.preventDefault();
    if (!selectedCode.trim() || !overrideReason.trim()) {
      setOverrideMessage("Booking code and Reason are mandatory.");
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
      setOverrideMessage("Override applied successfully.");
      await loadPage();
    } catch (err) {
      setOverrideMessage(
        `${err?.response?.data?.errorCode || "FAILED"}: ${err?.response?.data?.message}`,
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
      setError("Failed to save shift note");
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
    <div className="space-y-8 max-w-[1600px] mx-auto pb-20">
      {/* 1. BACK NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Back to Admin
          </span>
        </button>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
          Operational Exceptions
        </h2>
        <p className="text-[#FAF3E1]/40 text-sm">
          Monitor system alerts, overstays, and manual overrides.
        </p>
      </div>

      {/* 2. STATS GRID - REFINED COLORS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Invalid Attempts",
            val:
              alerts.invalidCodeAttempts ?? exceptionCounts.invalidCodeAttempts,
            color: "rose",
          },
          {
            label: "No-Shows",
            val: alerts.noShows ?? exceptionCounts.noShows,
            color: "amber",
          },
          {
            label: "Overstays",
            val: alerts.overstays ?? exceptionCounts.overstays,
            color: "orange",
          },
          {
            label: "Pending Payment",
            val:
              alerts.pendingPaymentAtExit ??
              exceptionCounts.pendingPaymentAtExit,
            color: "emerald",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl border border-${stat.color}-500/10 bg-${stat.color}-500/5 p-5 transition-transform hover:scale-[1.02]`}
          >
            <p
              className={`text-[10px] uppercase font-bold tracking-widest text-${stat.color}-400/60`}
            >
              {stat.label}
            </p>
            <p className={`text-3xl font-bold text-${stat.color}-400 mt-2`}>
              {stat.val}
            </p>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-300 text-sm">
          {error}
        </div>
      )}

      {/* 3. EXCEPTION SECTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ExceptionSection
          title="Invalid Code Attempts"
          icon={ShieldAlert}
          columns={["Code", "Error", "Admin", "Time", "Action"]}
          items={data.invalidCodeAttempts || []}
          emptyText="No recent invalid attempts."
          renderRow={(log) => (
            <tr
              key={log._id}
              className="text-[#FAF3E1]/80 hover:bg-[#FAF3E1]/2"
            >
              <td className="py-3 px-5 font-mono text-[#FA8112]">
                {log.bookingCode}
              </td>
              <td className="py-3 px-5">
                <span className="text-rose-400 font-bold">
                  {log.errorCode || "WRONG_CODE"}
                </span>
              </td>
              <td className="py-3 px-5">{log.admin?.fullName || "-"}</td>
              <td className="py-3 px-5 opacity-50">
                {new Date(log.createdAt).toLocaleTimeString()}
              </td>
              <td className="py-3 px-5 text-[10px] uppercase font-bold opacity-30">
                Review Only
              </td>
            </tr>
          )}
        />

        <ExceptionSection
          title="No-Show Bookings"
          icon={AlertTriangle}
          columns={["Code", "Status", "User/Vehicle", "Deadline", "Action"]}
          items={data.noShows || []}
          emptyText="Clean record: No no-shows."
          renderRow={(booking) => (
            <tr
              key={booking._id}
              className="text-[#FAF3E1]/80 hover:bg-[#FAF3E1]/2"
            >
              <td className="py-3 px-5 font-mono text-[#FA8112]">
                {booking.bookingCode}
              </td>
              <td className="py-3 px-5 uppercase text-[10px] font-bold">
                {booking.status}
              </td>
              <td className="py-3 px-5">{booking.vehicleNumber || "N/A"}</td>
              <td className="py-3 px-5 opacity-50">
                {new Date(booking.endTime).toLocaleTimeString()}
              </td>
              <td className="py-3 px-5">
                <button
                  onClick={() =>
                    selectBookingCode(booking.bookingCode, "MARK_NO_SHOW")
                  }
                  className="text-[#FA8112] hover:underline font-bold uppercase text-[10px]"
                >
                  Override
                </button>
              </td>
            </tr>
          )}
        />
      </div>

      {/* 4. OVERRIDE CONSOLE */}
      <div
        id="override-console"
        className="bg-[#FAF3E1]/2 p-6 rounded-xl border border-[#FA8112]/20 shadow-2xl shadow-[#FA8112]/5"
      >
        <div className="flex items-center gap-2 mb-6 text-[#FA8112]">
          <Terminal size={20} />
          <h3 className="font-bold uppercase tracking-widest">
            Override Command Console
          </h3>
        </div>
        <form
          onSubmit={handleOverride}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value.toUpperCase())}
            placeholder="Booking code"
            className="h-12 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112] outline-none"
          />
          <select
            value={overrideType}
            onChange={(e) => setOverrideType(e.target.value)}
            className="h-12 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm outline-none"
          >
            {overrideOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            value={overrideReason}
            onChange={(e) => setOverrideReason(e.target.value)}
            placeholder="Reason for manual override"
            className="h-12 rounded-lg bg-[#222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112] outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="h-12 rounded-lg bg-[#FA8112] text-[#222] font-bold uppercase text-[11px] tracking-widest disabled:opacity-50 transition-transform active:scale-95"
          >
            {saving ? "Authorizing..." : "Apply Manual Override"}
          </button>
        </form>
        {overrideMessage && (
          <p
            className={`mt-4 text-xs font-bold uppercase tracking-tighter ${overrideMessage.includes("success") ? "text-emerald-400" : "text-rose-400"}`}
          >
            {overrideMessage}
          </p>
        )}
      </div>

      {/* 5. SHIFT NOTES */}
      <div className="bg-[#FAF3E1]/2 p-6 rounded-xl border border-[#F5E7C6]/10">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare size={18} className="text-[#FA8112]" />
          <h3 className="text-[#FAF3E1] font-bold uppercase tracking-wider">
            Duty Handover & Shift Notes
          </h3>
        </div>
        <form
          onSubmit={handleShiftNote}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start"
        >
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Current shift observations..."
            className="lg:col-span-2 min-h-24 rounded-lg bg-[#222] border border-[#F5E7C6]/10 p-4 text-[#FAF3E1] text-sm outline-none"
          />
          <textarea
            value={handoverComment}
            onChange={(e) => setHandoverComment(e.target.value)}
            placeholder="Notes for the next operator..."
            className="lg:col-span-2 min-h-24 rounded-lg bg-[#222] border border-[#F5E7C6]/10 p-4 text-[#FAF3E1] text-sm outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="h-24 rounded-lg bg-[#FAF3E1]/5 text-[#FAF3E1] border border-[#F5E7C6]/10 font-bold uppercase text-[10px] flex flex-col items-center justify-center gap-2 hover:bg-[#FA8112] hover:text-[#222] transition-all"
          >
            <Save size={18} /> Save Note
          </button>
        </form>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#FAF3E1]/30 uppercase tracking-tighter">
              <tr>
                <th className="py-3 pr-4">Time</th>
                <th className="py-3 pr-4">Operator</th>
                <th className="py-3 pr-4">Shift Note</th>
                <th className="py-3 pr-4">Handover Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {shiftNotes.map((item) => (
                <tr key={item._id} className="text-[#FAF3E1]/60">
                  <td className="py-3 pr-4 whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 font-bold text-[#FAF3E1]">
                    {item.admin?.fullName || "-"}
                  </td>
                  <td className="py-3 pr-4 italic">"{item.note || "-"}"</td>
                  <td className="py-3 pr-4 text-[#FA8112]">
                    {item.handoverComment || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exceptions;
