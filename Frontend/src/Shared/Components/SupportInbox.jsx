import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import supportService from "../Services/supportService";

const statusOptions = ["all", "open", "in-progress", "resolved", "closed"];

const statusStyles = {
  open: "bg-amber-500/15 text-amber-300 border-amber-500/20",
  "in-progress": "bg-sky-500/15 text-sky-300 border-sky-500/20",
  resolved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  closed: "bg-zinc-500/15 text-zinc-300 border-zinc-500/20",
};

const formatDate = (value) =>
  value ? new Date(value).toLocaleString() : "Not available";

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
    () => tickets.find((ticket) => ticket._id === activeTicketId) || tickets[0] || null,
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
        const params = {};

        if (statusFilter !== "all") {
          params.status = statusFilter;
        }

        const response = await supportService.getTickets(params);
        const payload = response?.data?.data || {};
        const nextTickets = payload.tickets || [];
        const nextCounts = payload.counts || {
          open: 0,
          inProgress: 0,
          resolved: 0,
          closed: 0,
        };

        if (!mounted) {
          return;
        }

        setTickets(nextTickets);
        setCounts(nextCounts);
        setActiveTicketId((current) => {
          if (current && nextTickets.some((ticket) => ticket._id === current)) {
            return current;
          }

          return nextTickets[0]?._id || null;
        });
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            "Unable to load support tickets.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTickets();

    return () => {
      mounted = false;
    };
  }, [statusFilter]);

  const refreshTickets = async () => {
    try {
      const params = {};

      if (statusFilter !== "all") {
        params.status = statusFilter;
      }

      const response = await supportService.getTickets(params);
      const payload = response?.data?.data || {};
      const nextTickets = payload.tickets || [];
      const nextCounts = payload.counts || {
        open: 0,
        inProgress: 0,
        resolved: 0,
        closed: 0,
      };

      setTickets(nextTickets);
      setCounts(nextCounts);
      setActiveTicketId((current) => {
        if (current && nextTickets.some((ticket) => ticket._id === current)) {
          return current;
        }

        return nextTickets[0]?._id || null;
      });
    } catch (requestError) {
      toast.error(
        requestError?.response?.data?.message ||
          "Unable to refresh support tickets.",
      );
    }
  };

  const updateStatus = async (status) => {
    if (!activeTicket) {
      return;
    }

    setSaving(true);

    try {
      await supportService.updateTicketStatus(activeTicket._id, {
        status,
        adminNotes,
      });

      toast.success("Support ticket updated.");
      await refreshTickets();
    } catch (requestError) {
      toast.error(
        requestError?.response?.data?.message ||
          "Unable to update support ticket.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 pb-10 text-[#FAF3E1]">
      <header className="mb-6 md:mb-8 pt-4 md:pt-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FA8112]">
          Support Inbox
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">
          {title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm md:text-base leading-7 text-[#FAF3E1]/45">
          {subtitle}
        </p>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FAF3E1]/30">Open</p>
          <p className="mt-3 text-3xl font-black text-amber-300">{counts.open}</p>
        </div>
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FAF3E1]/30">In Progress</p>
          <p className="mt-3 text-3xl font-black text-sky-300">{counts.inProgress}</p>
        </div>
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FAF3E1]/30">Resolved</p>
          <p className="mt-3 text-3xl font-black text-emerald-300">{counts.resolved}</p>
        </div>
        <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[#FAF3E1]/30">Closed</p>
          <p className="mt-3 text-3xl font-black text-zinc-300">{counts.closed}</p>
        </div>
      </section>

      <section className="mb-6 flex flex-wrap gap-3">
        {statusOptions.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-all ${
              statusFilter === status
                ? "border-[#FA8112] bg-[#FA8112] text-[#222222]"
                : "border-[#F5E7C6]/10 bg-[#FAF3E1]/5 text-[#FAF3E1]/60 hover:text-[#FAF3E1]"
            }`}
          >
            {status === "all" ? "All" : status}
          </button>
        ))}
      </section>

      {loading ? (
        <div className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-8 animate-pulse">
          <div className="h-6 w-40 rounded bg-[#FAF3E1]/10 mb-6" />
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-[#FAF3E1]/5" />
              ))}
            </div>
            <div className="h-[420px] rounded-3xl bg-[#FAF3E1]/5" />
          </div>
        </div>
      ) : error ? (
        <div className="rounded-[2.5rem] border border-red-500/20 bg-red-500/10 p-8 text-red-200">
          <h2 className="text-xl font-bold">Support inbox unavailable</h2>
          <p className="mt-2 text-sm text-red-200/80">{error}</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4 md:p-5">
            <div className="flex items-center justify-between px-2 pb-4">
              <h2 className="text-lg font-bold">Recent Tickets</h2>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
                {tickets.length} loaded
              </span>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {tickets.map((ticket) => (
                <button
                  key={ticket._id}
                  type="button"
                  onClick={() => setActiveTicketId(ticket._id)}
                  className={`w-full rounded-[1.75rem] border p-4 text-left transition-all ${
                    activeTicket?._id === ticket._id
                      ? "border-[#FA8112]/60 bg-[#FA8112]/10"
                      : "border-[#F5E7C6]/10 bg-[#FAF3E1]/5 hover:border-[#FA8112]/30"
                  }`}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
                        {ticket.ticketNumber}
                      </p>
                      <h3 className="mt-2 text-base font-bold text-[#FAF3E1]">
                        {ticket.subject}
                      </h3>
                      <p className="mt-1 text-sm text-[#FAF3E1]/45">
                        {ticket.name} · {ticket.email}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] ${
                        statusStyles[ticket.status] ||
                        "bg-[#FAF3E1]/10 text-[#FAF3E1]/70 border-[#F5E7C6]/10"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  <p className="mt-4 max-h-16 overflow-hidden text-sm leading-6 text-[#FAF3E1]/45">
                    {ticket.message}
                  </p>
                </button>
              ))}

              {tickets.length === 0 && (
                <div className="rounded-[1.75rem] border border-dashed border-[#F5E7C6]/10 p-8 text-center text-sm text-[#FAF3E1]/45">
                  No support tickets found for the selected filter.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-5 md:p-6">
            {activeTicket ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
                    {activeTicket.ticketNumber}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-[#FAF3E1]">
                    {activeTicket.subject}
                  </h2>
                  <p className="mt-2 text-sm text-[#FAF3E1]/45">
                    {activeTicket.category} · {formatDate(activeTicket.createdAt)}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#222222]/40 p-4">
                    <p className="text-[#FAF3E1]/30 text-xs uppercase tracking-[0.25em]">Customer</p>
                    <p className="mt-2 font-bold text-[#FAF3E1]">{activeTicket.name}</p>
                    <p className="text-[#FAF3E1]/45">{activeTicket.email}</p>
                  </div>
                  <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#222222]/40 p-4">
                    <p className="text-[#FAF3E1]/30 text-xs uppercase tracking-[0.25em]">Source</p>
                    <p className="mt-2 font-bold text-[#FAF3E1]">{activeTicket.source}</p>
                    <p className="text-[#FAF3E1]/45">{activeTicket.user?.role || "Guest"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
                    Message
                  </p>
                  <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#222222]/40 p-5 text-sm leading-7 text-[#FAF3E1]/70 whitespace-pre-line">
                    {activeTicket.message}
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
                    Internal Notes
                  </p>
                  <textarea
                    value={adminNotes}
                    onChange={(event) => setAdminNotes(event.target.value)}
                    rows={6}
                    placeholder="Add internal notes for the next handler..."
                    className="w-full rounded-[1.75rem] border border-[#F5E7C6]/10 bg-[#222222]/40 px-4 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 outline-none transition-all focus:border-[#FA8112]/40"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => updateStatus("open")}
                    className="rounded-full border border-amber-500/20 bg-amber-500/15 px-4 py-2 text-sm font-bold text-amber-300 disabled:opacity-60"
                  >
                    Mark Open
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => updateStatus("in-progress")}
                    className="rounded-full border border-sky-500/20 bg-sky-500/15 px-4 py-2 text-sm font-bold text-sky-300 disabled:opacity-60"
                  >
                    In Progress
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => updateStatus("resolved")}
                    className="rounded-full border border-emerald-500/20 bg-emerald-500/15 px-4 py-2 text-sm font-bold text-emerald-300 disabled:opacity-60"
                  >
                    Resolved
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => updateStatus("closed")}
                    className="rounded-full border border-zinc-500/20 bg-zinc-500/15 px-4 py-2 text-sm font-bold text-zinc-300 disabled:opacity-60"
                  >
                    Closed
                  </button>
                </div>

                <div className="rounded-3xl border border-[#F5E7C6]/10 bg-[#222222]/40 p-4 text-xs text-[#FAF3E1]/40">
                  Handled by: {activeTicket.handledBy?.fullName || "Unassigned"}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[420px] items-center justify-center rounded-[2rem] border border-dashed border-[#F5E7C6]/10 text-sm text-[#FAF3E1]/45">
                Select a support ticket to inspect it.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportInbox;