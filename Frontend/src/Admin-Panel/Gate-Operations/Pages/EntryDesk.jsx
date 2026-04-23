import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogIn, History, RefreshCcw } from "lucide-react";
import { markEntryByCode, getGateLogs } from "../Services/gateService";

const EntryDesk = () => {
  const navigate = useNavigate();
  const [bookingCode, setBookingCode] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const res = await getGateLogs({ action: "entry", limit: 30 });
      setLogs(res.data || []);
    } catch {
      setLogs([]);
    }
  };

  // Load logs on mount
  useEffect(() => {
    loadLogs();
  }, []);

  const onEntry = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await markEntryByCode(bookingCode.trim(), reason.trim());
      setMessage("Entry marked successfully");
      setBookingCode(""); // Clear form on success
      setReason("");
      await loadLogs();
    } catch (err) {
      setError(
        `${err?.response?.data?.errorCode || "ENTRY_FAILED"}: ${err?.response?.data?.message || err.message}`,
      );
      await loadLogs();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* 1. BACK BUTTON FOR SUBPAGE NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin")} // Adjust this path to your main dashboard route
          className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5">
            <ArrowLeft size={16} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Back to Dashboard
          </span>
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
          Entry Desk
        </h2>
        <p className="text-[#FAF3E1]/40 text-sm">
          Manually authorize vehicle entry using the ticket code.
        </p>
      </div>

      {/* 2. RESPONSIVE FORM */}
      <form
        onSubmit={onEntry}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FAF3E1]/2 p-6 rounded-xl border border-[#F5E7C6]/10 shadow-lg"
      >
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
            Ticket Code
          </label>
          <input
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
            placeholder="e.g. PRK-12345"
            className="w-full h-11 rounded-lg bg-[#222222] border border-[#F5E7C6]/10 px-4 text-[#FAF3E1] text-sm focus:border-[#FA8112]/50 outline-none transition-all"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
            Reason (Optional)
          </label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Security check, etc."
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
                <LogIn size={16} /> Mark Entry
              </>
            )}
          </button>
        </div>
      </form>

      {/* STATUS MESSAGES */}
      {message && (
        <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-sm animate-fade-in">
          {message}
        </div>
      )}
      {error && (
        <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-300 text-sm animate-fade-in">
          {error}
        </div>
      )}

      {/* 3. ACTIVITY LOG SECTION */}
      <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-[#F5E7C6]/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={18} className="text-[#FA8112]" />
            <h3 className="text-[#FAF3E1] font-semibold">Entry Activity Log</h3>
          </div>
          <button
            onClick={loadLogs}
            className="p-2 hover:bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:text-[#FA8112] rounded-lg transition-all"
          >
            <RefreshCcw size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/30 uppercase tracking-tighter">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6">Ticket Code</th>
                <th className="py-3 px-6">Authorized By</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Log Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="text-[#FAF3E1]/80 hover:bg-[#FAF3E1]/2 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-bold text-[#FA8112]">
                    {log.bookingCode}
                  </td>
                  <td className="py-4 px-6">
                    {log.admin?.fullName || "System Admin"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`uppercase font-bold tracking-tighter ${log.result === "success" ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {log.result}
                    </span>
                  </td>
                  <td className="py-4 px-6 max-w-xs truncate">
                    {log.errorCode ? (
                      <span className="opacity-50 mr-1">{log.errorCode}:</span>
                    ) : (
                      ""
                    )}
                    {log.message}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td
                    className="py-10 text-center text-[#FAF3E1]/20 font-bold uppercase tracking-widest"
                    colSpan="5"
                  >
                    No Entry Activity Found
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

export default EntryDesk;
