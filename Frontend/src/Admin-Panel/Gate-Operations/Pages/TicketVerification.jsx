import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  History,
} from "lucide-react";
import { verifyTicketCode, getGateLogs } from "../Services/gateService";

const TicketVerification = () => {
  const navigate = useNavigate();
  const [bookingCode, setBookingCode] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  const loadLogs = async (code) => {
    try {
      const res = await getGateLogs({ bookingCode: code, limit: 20 });
      setLogs(res.data || []);
    } catch {
      setLogs([]);
    }
  };

  const onVerify = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    try {
      setLoading(true);
      setError("");
      const res = await verifyTicketCode(bookingCode.trim(), reason.trim());
      setResult(res.data || null);
      await loadLogs(bookingCode.trim());
    } catch (err) {
      setResult(null);
      setError(
        `${err?.response?.data?.errorCode || "VERIFY_FAILED"}: ${err?.response?.data?.message || err.message}`,
      );
      await loadLogs(bookingCode.trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. NAVIGATION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all w-fit"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Back to Admin
          </span>
        </button>

        <div className="text-left sm:text-right">
          <h2 className="text-2xl font-bold text-[#FAF3E1]">
            Ticket Verification
          </h2>
          <p className="text-[#FAF3E1]/40 text-xs mt-1">
            Validate ticket status and gate permissions.
          </p>
        </div>
      </div>

      {/* 2. VERIFICATION FORM */}
      <form
        onSubmit={onVerify}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF3E1]/2 p-6 rounded-xl border border-[#F5E7C6]/10 shadow-lg"
      >
        <div className="md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 mb-1 block">
            Ticket Code
          </label>
          <input
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
            placeholder="PRK-XXXX"
            className="w-full h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all"
          />
        </div>
        <div className="md:col-span-1">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1 mb-1 block">
            Verification Reason
          </label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Security Spot Check"
            className="w-full h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-lg bg-[#FA8112] text-[#222222] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-[#FA8112]/10"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Search size={16} /> Run Validation
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-300 text-sm flex items-center gap-3">
          <XCircle size={18} /> {error}
        </div>
      )}

      {/* 3. VERIFICATION RESULT CARD */}
      {result?.booking && (
        <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4">
          <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#FA8112]" />
            <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
              Validation Result
            </h3>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* User Info */}
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 mb-1">
                  Customer & Vehicle
                </p>
                <p className="text-sm font-bold text-[#FAF3E1]">
                  {result.booking.user?.fullName || "Guest User"}
                </p>
                <p className="text-xs font-mono text-[#FA8112] mt-1">
                  {result.booking.vehicleNumber || "NO PLATE"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 mb-1">
                  Current Status
                </p>
                <span className="inline-block px-2 py-0.5 rounded bg-[#FAF3E1]/10 text-[#FAF3E1] text-[10px] font-bold uppercase border border-[#F5E7C6]/10">
                  {result.booking.status}
                </span>
              </div>
            </div>

            {/* Permission Indicators */}
            <div className="space-y-4 lg:border-x lg:border-[#F5E7C6]/5 lg:px-8">
              <p className="text-[10px] uppercase tracking-widest text-[#FAF3E1]/30 mb-1">
                Gate Permissions
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#222]">
                  <span className="text-xs text-[#FAF3E1]/60">
                    Entry Access
                  </span>
                  {result.gate?.canEnter ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <XCircle size={18} className="text-rose-500" />
                  )}
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#222]">
                  <span className="text-xs text-[#FAF3E1]/60">Exit Access</span>
                  {result.gate?.canExit ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <XCircle size={18} className="text-rose-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Validation Message */}
            <div className="flex flex-col justify-center">
              {result.validation ? (
                <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                  <p className="text-[10px] uppercase font-bold text-amber-500 mb-1">
                    System Warning
                  </p>
                  <p className="text-xs text-[#FAF3E1]/80 leading-relaxed italic">
                    "{result.validation.message}"
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-center">
                  <p className="text-emerald-400 text-xs font-bold uppercase">
                    No Validation Conflicts
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. ACTIVITY LOGS */}
      <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F5E7C6]/5 flex items-center gap-2">
          <History size={18} className="text-[#FA8112]" />
          <h3 className="text-[#FAF3E1] font-semibold text-sm uppercase tracking-wider">
            Related Gate Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/30 uppercase tracking-tighter">
              <tr>
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Event</th>
                <th className="py-4 px-6">Result</th>
                <th className="py-4 px-6">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="text-[#FAF3E1]/70 hover:bg-[#FAF3E1]/2 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-bold uppercase tracking-widest">
                    {log.action}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={
                        log.result === "success"
                          ? "text-emerald-500"
                          : "text-rose-400"
                      }
                    >
                      {log.result.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6 opacity-80">{log.message || "-"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td
                    className="py-12 text-center text-[#FAF3E1]/20 uppercase font-bold tracking-[0.2em]"
                    colSpan="4"
                  >
                    Enter a code to see history
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

export default TicketVerification;
