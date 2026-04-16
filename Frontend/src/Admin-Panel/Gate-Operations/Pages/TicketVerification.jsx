import { useState } from "react";
import { verifyTicketCode, getGateLogs } from "../Services/gateService";

const TicketVerification = () => {
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
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-[#FAF3E1]">Ticket Verification</h2>

      <form onSubmit={onVerify} className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10">
        <input
          value={bookingCode}
          onChange={(e) => setBookingCode(e.target.value.toUpperCase())}
          placeholder="Enter ticket code (e.g. PRK-1234)"
          className="md:col-span-1 h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          className="md:col-span-1 h-11 rounded-xl bg-[#222222] border border-[#F5E7C6]/10 px-3 text-[#FAF3E1]"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-11 rounded-xl bg-[#FA8112] text-[#222222] text-xs font-black uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && <p className="text-rose-400 text-sm">{error}</p>}

      {result?.booking && (
        <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10 space-y-2 text-[#FAF3E1]">
          <p><strong>User:</strong> {result.booking.user?.fullName || "N/A"}</p>
          <p><strong>Vehicle:</strong> {result.booking.vehicleNumber || "N/A"}</p>
          <p><strong>Status:</strong> {result.booking.status}</p>
          <p><strong>Can Enter:</strong> {result.gate?.canEnter ? "Yes" : "No"}</p>
          <p><strong>Can Exit:</strong> {result.gate?.canExit ? "Yes" : "No"}</p>
          {result.validation && (
            <p className="text-amber-400"><strong>Validation:</strong> {result.validation.errorCode} - {result.validation.message}</p>
          )}
        </div>
      )}

      <div className="bg-[#FAF3E1]/2 p-5 rounded-2xl border border-[#F5E7C6]/10">
        <h3 className="text-[#FAF3E1] font-black mb-3">Recent Gate Logs</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[#FAF3E1]/40">
              <tr>
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Action</th>
                <th className="py-2 pr-3">Result</th>
                <th className="py-2 pr-3">Code</th>
                <th className="py-2 pr-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-t border-[#F5E7C6]/10 text-[#FAF3E1]">
                  <td className="py-2 pr-3">{new Date(log.createdAt).toLocaleString()}</td>
                  <td className="py-2 pr-3 uppercase">{log.action}</td>
                  <td className={`py-2 pr-3 uppercase ${log.result === "success" ? "text-[#FA8112]" : "text-rose-400"}`}>{log.result}</td>
                  <td className="py-2 pr-3">{log.bookingCode}</td>
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

export default TicketVerification;
