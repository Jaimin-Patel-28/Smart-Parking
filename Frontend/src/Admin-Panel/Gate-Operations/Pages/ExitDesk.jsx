import { useState } from "react";
import { markExitByCode, getGateLogs } from "../Services/gateService";

const ExitDesk = () => {
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

  const onExit = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await markExitByCode(bookingCode.trim(), reason.trim());
      setMessage("Exit marked successfully");
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
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#FAF3E1]">Exit Desk</h2>

      <form onSubmit={onExit} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10">
        <input
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
          placeholder="Ticket code"
          className="h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          className="h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-xl bg-[#FA8112] text-[#222222] text-xs font-black uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? "Processing..." : "Mark Exit"}
        </button>
      </form>

      {message && <p className="text-[#FA8112] text-sm">{message}</p>}
      {error && <p className="text-rose-400 text-sm">{error}</p>}

      <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10">
        <h3 className="text-[#FAF3E1] font-black mb-3">Exit Activity Log</h3>
        <button onClick={loadLogs} className="mb-3 px-3 py-2 border border-[#F5E7C6]/10 rounded-lg text-xs text-[#FAF3E1]">Refresh Logs</button>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#FAF3E1]/40">
              <tr>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Code</th>
                <th className="py-2 pr-3">Admin</th>
                <th className="py-2 pr-3">Result</th>
                <th className="py-2 pr-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
                  <td className="py-2 pr-3">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-3">{log.bookingCode}</td>
                  <td className="py-2 pr-3">{log.admin?.fullName || "-"}</td>
                  <td className={`py-2 pr-3 uppercase ${log.result === "success" ? "text-[#FA8112]" : "text-rose-400"}`}>{log.result}</td>
                  <td className="py-2 pr-3">{log.errorCode ? `${log.errorCode}: ` : ""}{log.message}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td className="py-3 text-[#FAF3E1]/40" colSpan="5">No logs found</td>
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
