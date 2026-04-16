import React from "react";
import {
  Clock3,
  CheckCircle2,
  CircleDashed,
  RefreshCw,
  X,
  RotateCcw,
} from "lucide-react";

const statusStyles = {
  open: "bg-amber-500/15 text-amber-300",
  "in-progress": "bg-sky-500/15 text-sky-300",
  resolved: "bg-emerald-500/15 text-emerald-300",
  closed: "bg-zinc-500/15 text-zinc-300",
};

const statusIcons = {
  open: CircleDashed,
  "in-progress": Clock3,
  resolved: CheckCircle2,
  closed: CheckCircle2,
};

const filters = ["all", "open", "in-progress", "resolved", "closed"];

const SupportTicketTracker = ({
  tickets,
  loading,
  reopening,
  statusFilter,
  onStatusFilterChange,
  error,
  onRefresh,
  onReopen,
}) => {
  const [activeTicket, setActiveTicket] = React.useState(null);

  const closeDrawer = () => setActiveTicket(null);

  return (
    <section className="rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 p-6 md:p-7 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
            Request Status
          </p>
          <h3 className="mt-2 text-lg font-bold text-[#FAF3E1]">My Tickets</h3>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-full border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FAF3E1]"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusFilterChange(status)}
            className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
              statusFilter === status
                ? "border-[#FA8112] bg-[#FA8112] text-[#222222]"
                : "border-[#F5E7C6]/10 bg-[#FAF3E1]/5 text-[#FAF3E1]/60"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3 animate-pulse">
          <div className="h-20 rounded-3xl bg-[#FAF3E1]/5" />
          <div className="h-20 rounded-3xl bg-[#FAF3E1]/5" />
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
          {error}
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-sm leading-6 text-[#FAF3E1]/40">
          You have not submitted any support requests yet.
        </p>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const StatusIcon = statusIcons[ticket.status] || CircleDashed;

            return (
              <div
                key={ticket._id}
                className="rounded-3xl border border-[#F5E7C6]/10 bg-[#222222]/40 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
                      {ticket.ticketNumber}
                    </p>
                    <h4 className="mt-2 text-sm font-bold text-[#FAF3E1]">
                      {ticket.subject}
                    </h4>
                    <p className="mt-1 text-xs text-[#FAF3E1]/40">
                      {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${
                      statusStyles[ticket.status] || "bg-[#FAF3E1]/10 text-[#FAF3E1]/60"
                    }`}
                  >
                    <StatusIcon size={12} />
                    {ticket.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#FAF3E1]/45">
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[#FAF3E1]/25">Category</p>
                    <p className="mt-1 text-[#FAF3E1]">{ticket.category}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.25em] text-[#FAF3E1]/25">Handled By</p>
                    <p className="mt-1 text-[#FAF3E1]">
                      {ticket.handledBy?.fullName || "Pending assignment"}
                    </p>
                  </div>
                </div>

                {ticket.adminNotes ? (
                  <div className="mt-4 rounded-2xl bg-[#FAF3E1]/5 p-3 text-xs leading-6 text-[#FAF3E1]/50">
                    {ticket.adminNotes}
                  </div>
                ) : null}

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTicket(ticket)}
                    className="rounded-full border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FAF3E1]"
                  >
                    View Details
                  </button>

                  {["resolved", "closed"].includes(ticket.status) ? (
                    <button
                      type="button"
                      disabled={reopening}
                      onClick={() => onReopen(ticket._id)}
                      className="inline-flex items-center gap-2 rounded-full border border-[#FA8112]/30 bg-[#FA8112]/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FA8112] disabled:opacity-60"
                    >
                      <RotateCcw size={12} />
                      Reopen
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTicket ? (
        <div className="fixed inset-0 z-50 bg-black/70 p-4 md:p-8" onClick={closeDrawer}>
          <div
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#F5E7C6]/10 bg-[#222222] p-6 md:p-8 text-[#FAF3E1] max-h-[90vh] overflow-y-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
                  {activeTicket.ticketNumber}
                </p>
                <h4 className="mt-2 text-2xl font-black">{activeTicket.subject}</h4>
                <p className="mt-2 text-sm text-[#FAF3E1]/45">
                  {new Date(activeTicket.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-full border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-2"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Status</p>
                <p className="mt-2 font-bold">{activeTicket.status}</p>
              </div>
              <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Category</p>
                <p className="mt-2 font-bold">{activeTicket.category}</p>
              </div>
              <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Created</p>
                <p className="mt-2">{new Date(activeTicket.createdAt).toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Last Update</p>
                <p className="mt-2">{new Date(activeTicket.updatedAt).toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Your Message</p>
                <p className="mt-2 text-sm leading-7 text-[#FAF3E1]/70 whitespace-pre-line">
                  {activeTicket.message}
                </p>
              </div>

              {activeTicket.bookingContext ? (
                <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4 text-sm">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Attached Booking</p>
                  <p className="mt-2">{activeTicket.bookingContext.bookingCode || activeTicket.bookingContext._id}</p>
                </div>
              ) : null}

              {activeTicket.transactionContext ? (
                <div className="rounded-2xl border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-4 text-sm">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#FAF3E1]/30">Attached Transaction</p>
                  <p className="mt-2">{activeTicket.transactionContext._id || "Transaction context attached"}</p>
                </div>
              ) : null}

              {activeTicket.adminNotes ? (
                <div className="rounded-2xl border border-[#FA8112]/30 bg-[#FA8112]/10 p-4 text-sm leading-7 text-[#FAF3E1]/80">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#FA8112]">Team Notes</p>
                  <p className="mt-2 whitespace-pre-line">{activeTicket.adminNotes}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SupportTicketTracker;