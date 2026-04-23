import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, History, RefreshCw } from "lucide-react";
import { markExitByCode, getGateLogs } from "../Services/gateService";

const ExitDesk = () => {
  const navigate = useNavigate();
  const [bookingCode, setBookingCode] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const res = await getGateLogs({ action: "exit", limit: 30 });
      setLogs(res.data || []);
    } catch {
      setLogs([]);
    }
  };

  // Auto-load logs on mount
  useEffect(() => {
    loadLogs();
  }, []);

  const onExit = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await markExitByCode(bookingCode.trim(), reason.trim());
      setMessage("Exit processed successfully");
      setBookingCode(""); // Clear form
      setReason("");
      await loadLogs();
    } catch (err) {
      setError(
        `${err?.response?.data?.errorCode || "EXIT_FAILED"}: ${err?.response?.data?.message || err.message}`,
      );
      await loadLogs();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. NAVIGATION & HEADER */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/admin")}
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5 transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Back to Admin
          </span>
        </button>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
            Exit Desk
          </h2>
          <p className="text-[#FAF3E1]/40 text-sm mt-1">
            Process vehicle departures and verify payment clearance.
          </p>
        </div>
      </div>

      {/* 2. RESPONSIVE ACTION FORM */}
      <form
        onSubmit={onExit}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#FAF3E1]/2 p-6 rounded-xl border border-[#F5E7C6]/10 shadow-xl"
      >
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
            Ticket Code
          </label>
          <input
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
            placeholder="PRK-XXXXXX"
            className="w-full h-12 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all placeholder:text-[#FAF3E1]/10"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
            Exit Reason (Optional)
          </label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Standard Exit"
            className="w-full h-12 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all placeholder:text-[#FAF3E1]/10"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-lg bg-amber-500 text-[#222222] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/10"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <LogOut size={16} /> Authorize Exit
              </>
            )}
          </button>
        </div>
      </form>

      {/* ALERT FEEDBACK */}
      {(message || error) && (
        <div
          className={`p-4 rounded-lg border text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            message
              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
              : "bg-rose-500/5 border-rose-500/20 text-rose-300"
          }`}
        >
          {message || error}
        </div>
      )}

      {/* 3. LOGS SECTION */}
      <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-[#F5E7C6]/5 flex items-center justify-between bg-[#FAF3E1]/2">
          <div className="flex items-center gap-2 text-[#FAF3E1]">
            <History size={18} className="text-amber-500" />
            <h3 className="font-semibold text-sm uppercase tracking-wider">
              Departure Logs
            </h3>
          </div>
          <button
            onClick={loadLogs}
            className="p-2 hover:bg-amber-500/10 text-[#FAF3E1]/30 hover:text-amber-500 rounded-lg transition-all"
            title="Refresh logs"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/30 uppercase tracking-tighter">
              <tr>
                <th className="py-4 px-6">Departure Time</th>
                <th className="py-4 px-6">Ticket Code</th>
                <th className="py-4 px-6">Authorized By</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">System Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="text-[#FAF3E1]/80 hover:bg-[#FAF3E1]/2 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap opacity-60">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-amber-500">
                    {log.bookingCode}
                  </td>
                  <td className="py-4 px-6 italic">
                    {log.admin?.fullName || "Auto-System"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                        log.result === "success"
                          ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
                          : "text-rose-400 border-rose-400/20 bg-rose-400/5"
                      }`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="py-4 px-6 opacity-70">
                    {log.errorCode && (
                      <span className="font-bold mr-1">{log.errorCode}:</span>
                    )}
                    {log.message}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td
                    className="py-12 text-center text-[#FAF3E1]/20 uppercase tracking-[0.3em] font-bold"
                    colSpan="5"
                  >
                    No Departure Data Available
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

export default ExitDesk;
