import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import supportService from "../Services/supportService";
import {
  MessageSquare,
  Clock,
  User,
  ShieldCheck,
  Database,
  Search,
  RefreshCw,
  Terminal,
} from "lucide-react";

const statusOptions = ["all", "open", "in-progress", "resolved", "closed"];

const statusStyles = {
  open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "in-progress": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  closed: "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", { hour12: false })
    : "Not available";

const SupportInbox = ({ title, subtitle }) => {
  const [tickets, setTickets] = useState([]);
  const [counts, setCounts] = useState({
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTicketId, setActiveTicketId] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const activeTicket = useMemo(
    () =>
      tickets.find((ticket) => ticket._id === activeTicketId) ||
      tickets[0] ||
      null,
    [tickets, activeTicketId],
  );

  useEffect(() => {
    setAdminNotes(activeTicket?.adminNotes || "");
  }, [activeTicket]);

  useEffect(() => {
    let mounted = true;
    const loadTickets = async () => {
      setLoading(true);
      setError("");
      try {
        const params = statusFilter !== "all" ? { status: statusFilter } : {};
        const response = await supportService.getTickets(params);
        const payload = response?.data?.data || {};
        if (!mounted) return;

        setTickets(payload.tickets || []);
        setCounts(
          payload.counts || { open: 0, inProgress: 0, resolved: 0, closed: 0 },
        );
        setActiveTicketId((current) =>
          current && payload.tickets?.some((t) => t._id === current)
            ? current
            : payload.tickets?.[0]?._id || null,
        );
      } catch (err) {
        if (!mounted) return;
        setError(err?.response?.data?.message || "Registry Sync Failure.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadTickets();
    return () => {
      mounted = false;
    };
  }, [statusFilter]);

  const updateStatus = async (status) => {
    if (!activeTicket) return;
    setSaving(true);
    try {
      await supportService.updateTicketStatus(activeTicket._id, {
        status,
        adminNotes,
      });
      toast.success(`Protocol: Ticket status set to ${status.toUpperCase()}`);
    } catch (err) {
      toast.error("Operation Failure: Update blocked.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 pb-10 text-[#FAF3E1] animate-in fade-in duration-700">
      {/* 1. HEADER SECTION */}
      <header className="mb-10 space-y-2">
        <div className="flex items-center gap-2 text-[#FA8112]">
          <Database size={14} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Support Registry
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">
          {title}
        </h1>
        <p className="max-w-3xl text-xs font-medium leading-relaxed italic text-[#FAF3E1]/30">
          {subtitle}
        </p>
      </header>

      {/* 2. STATS CONSOLE */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(counts).map(([key, val]) => (
          <div
            key={key}
            className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.02] p-6 shadow-2xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
            <p className="mt-2 text-3xl font-bold text-[#FAF3E1] tabular-nums tracking-tighter">
              {val}
            </p>
          </div>
        ))}
      </section>

      {/* 3. FILTER TERMINAL */}
      <section className="mb-8 flex flex-wrap gap-2">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-lg border px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
              statusFilter === status
                ? "border-[#FA8112] bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/10"
                : "border-[#F5E7C6]/10 bg-[#FAF3E1]/5 text-[#FAF3E1]/40 hover:text-[#FAF3E1]"
            }`}
          >
            {status}
          </button>
        ))}
      </section>

      {/* 4. MAIN DATA INTERFACE */}
      {loading ? (
        <div className="h-[500px] flex flex-col items-center justify-center space-y-6 bg-[#FAF3E1]/[0.01] rounded-xl border border-dashed border-[#F5E7C6]/5">
          <RefreshCw size={32} className="animate-spin text-[#FA8112]/40" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
            Synchronizing Support Nodes...
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* TICKET LISTING */}
          <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.01] p-5 shadow-2xl">
            <div className="flex items-center justify-between px-2 pb-6 border-b border-[#F5E7C6]/5 mb-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/20">
                Recent Sequences
              </h2>
              <span className="text-[9px] font-mono text-[#FA8112]">
                {tickets.length} LOADED
              </span>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto custom-scrollbar pr-2">
              {tickets.map((ticket) => (
                <button
                  key={ticket._id}
                  onClick={() => setActiveTicketId(ticket._id)}
                  className={`w-full rounded-lg border p-5 text-left transition-all duration-500 group relative ${
                    activeTicket?._id === ticket._id
                      ? "border-[#FA8112]/40 bg-[#FA8112]/5"
                      : "border-[#F5E7C6]/5 bg-transparent hover:bg-[#FAF3E1]/[0.02]"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#FA8112] tracking-widest">
                      {ticket.ticketNumber}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${statusStyles[ticket.status] || ""}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#FAF3E1] mb-1 group-hover:text-[#FA8112] transition-colors">
                    {ticket.subject}
                  </h3>
                  <p className="text-[10px] text-[#FAF3E1]/30 font-medium italic truncate">
                    {ticket.email}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* TICKET INSPECTOR */}
          <div className="rounded-xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.01] p-8 shadow-2xl relative overflow-hidden">
            {activeTicket ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="border-b border-[#F5E7C6]/5 pb-8 space-y-4">
                  <p className="text-[10px] font-mono font-bold text-[#FA8112] tracking-[0.3em]">
                    {activeTicket.ticketNumber}
                  </p>
                  <h2 className="text-2xl font-bold text-[#FAF3E1] tracking-tight uppercase">
                    {activeTicket.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/20">
                    <span>{activeTicket.category}</span>
                    <span className="h-1 w-1 rounded-full bg-current" />
                    <span>{formatDate(activeTicket.createdAt)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-5 rounded-lg border border-[#F5E7C6]/5 space-y-1">
                    <p className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
                      Origin Source
                    </p>
                    <p className="text-sm font-bold text-[#FAF3E1]">
                      {activeTicket.name}
                    </p>
                    <p className="text-[11px] text-[#FAF3E1]/30 font-mono italic">
                      {activeTicket.email}
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-5 rounded-lg border border-[#F5E7C6]/5 space-y-1">
                    <p className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
                      Auth Role
                    </p>
                    <p className="text-sm font-bold text-[#FAF3E1] uppercase">
                      {activeTicket.user?.role || "GUEST_USER"}
                    </p>
                    <p className="text-[11px] text-[#FAF3E1]/30 font-mono tracking-tighter">
                      PORT_REF_{activeTicket.source.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 ml-1">
                    Session Message
                  </p>
                  <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#F5E7C6]/5 text-sm leading-relaxed text-[#FAF3E1]/60 whitespace-pre-line italic">
                    "{activeTicket.message}"
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FA8112] ml-1">
                    Internal Handover Notes
                  </p>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={5}
                    placeholder="Log technical observations for handover..."
                    className="w-full bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg p-5 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/30 outline-none transition-all font-medium resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-[#F5E7C6]/5">
                  {statusOptions
                    .filter((o) => o !== "all")
                    .map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateStatus(opt)}
                        disabled={saving}
                        className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] border transition-all active:scale-95 disabled:opacity-30 ${statusStyles[opt]}`}
                      >
                        SET_{opt.toUpperCase().replace("-", "_")}
                      </button>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[500px] flex-col items-center justify-center space-y-4 opacity-10">
                <Terminal size={48} strokeWidth={1} />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em]">
                  Awaiting Node Selection
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportInbox;
