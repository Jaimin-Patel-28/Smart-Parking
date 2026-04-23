import React from "react";
import {
  Clock3,
  CheckCircle2,
  CircleDashed,
  RefreshCw,
  X,
  RotateCcw,
  Terminal,
  Activity,
  Database,
  Hash,
  ShieldCheck,
} from "lucide-react";

const statusStyles = {
  open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "in-progress": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  closed: "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5",
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

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-8 space-y-10 shadow-2xl animate-in fade-in duration-700">
      {/* 1. SECTOR HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Protocol_Registry_Monitor
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
            Transmission Logs
          </h3>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-3 rounded-lg border border-[#F5E7C6]/10 bg-[#1a1a1a] px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/40 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all active:scale-95"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Sync_Ledger
        </button>
      </div>

      {/* 2. REGISTRY FILTERS */}
      <div className="flex flex-wrap gap-3 px-1">
        {filters.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => onStatusFilterChange(status)}
            className={`rounded-lg border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
              statusFilter === status
                ? "border-[#FA8112] bg-[#FA8112] text-[#222222] shadow-[0_0_15px_rgba(250,129,18,0.2)]"
                : "border-[#F5E7C6]/5 bg-[#1a1a1a] text-[#FAF3E1]/20 hover:text-[#FAF3E1]/50 hover:border-[#F5E7C6]/20"
            }`}
          >
            {status === "all" ? "Full_View" : status.replace("-", "_")}
          </button>
        ))}
      </div>

      {/* 3. LOG ENTRIES */}
      <div className="relative min-h-[300px]">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-24 rounded-lg bg-[#FAF3E1]/5" />
            <div className="h-24 rounded-lg bg-[#FAF3E1]/5" />
          </div>
        ) : error ? (
          <div className="rounded-lg border border-rose-500/10 bg-rose-500/[0.02] p-8 text-center animate-in zoom-in-95">
            <Activity size={24} className="mx-auto text-rose-500/40 mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400">
              Sync_Protocol_Failure: {error}
            </p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#F5E7C6]/5 rounded-xl">
            <Database size={32} className="mx-auto text-[#FAF3E1]/5 mb-6" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
              Zero_Signals_Detected_In_Sector
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => {
              const StatusIcon = statusIcons[ticket.status] || CircleDashed;

              return (
                <div
                  key={ticket._id}
                  className="group rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] p-6 hover:border-[#FA8112]/20 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Hash size={12} className="text-[#FA8112]/40" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/20">
                          {ticket.ticketNumber}
                        </span>
                      </div>
                      <h4 className="text-[15px] font-bold text-[#FAF3E1] uppercase tracking-tight group-hover:text-[#FA8112] transition-colors">
                        {ticket.subject}
                      </h4>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-widest">
                        <Activity size={10} />
                        {new Date(ticket.createdAt)
                          .toLocaleString()
                          .toUpperCase()}
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-3 rounded border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] h-fit ${statusStyles[ticket.status] || "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5"}`}
                    >
                      <StatusIcon size={12} strokeWidth={2.5} />
                      {ticket.status.replace("-", "_")}
                    </span>
                  </div>

                  <div className="mt-8 pt-8 border-t border-[#F5E7C6]/5 grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
                        Classification
                      </p>
                      <p className="text-[11px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                        {ticket.category}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
                        Assigned_Node
                      </p>
                      <p className="text-[11px] font-bold text-[#FAF3E1]/40 uppercase tracking-widest">
                        {ticket.handledBy?.fullName || "AWAITING_ALLOCATION"}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 flex items-end justify-end gap-3">
                      <button
                        onClick={() => setActiveTicket(ticket)}
                        className="px-5 py-2.5 rounded-lg border border-[#F5E7C6]/5 bg-[#222222] text-[9px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/30 hover:text-[#FA8112] hover:border-[#FA8112]/20 transition-all shadow-xl"
                      >
                        Read_Detailed_Log
                      </button>
                      {["resolved", "closed"].includes(ticket.status) && (
                        <button
                          disabled={reopening}
                          onClick={() => onReopen(ticket._id)}
                          className="px-5 py-2.5 rounded-lg border border-[#FA8112]/20 bg-[#FA8112]/5 text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112] hover:bg-[#FA8112] hover:text-[#222222] transition-all disabled:opacity-20"
                        >
                          <RotateCcw size={12} className="inline mr-2" />
                          Re_Open
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. DETAIL OVERLAY (MANIFEST) */}
      {activeTicket && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6 backdrop-blur-xl animate-in fade-in duration-500"
          onClick={closeDrawer}
        >
          <div
            className="w-full max-w-4xl bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-xl p-10 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FA8112]" />

            <div className="flex items-start justify-between mb-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#FA8112]/40">
                  <Hash size={14} />
                  <span className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase">
                    {activeTicket.ticketNumber}
                  </span>
                </div>
                <h4 className="text-3xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  {activeTicket.subject}
                </h4>
                <p className="text-[10px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.5em]">
                  ISO_TIMESTAMP:{" "}
                  {new Date(activeTicket.createdAt).toISOString()}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="p-3 bg-[#222222] border border-[#F5E7C6]/5 rounded-lg text-[#FAF3E1]/20 hover:text-rose-500 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <div className="bg-[#222222] border border-[#F5E7C6]/5 p-5 rounded-lg">
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 mb-2">
                  Protocol_Status
                </p>
                <p className="text-sm font-bold text-[#FA8112] uppercase tracking-widest">
                  {activeTicket.status.replace("-", "_")}
                </p>
              </div>
              <div className="bg-[#222222] border border-[#F5E7C6]/5 p-5 rounded-lg">
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 mb-2">
                  Sector_Classification
                </p>
                <p className="text-sm font-bold text-[#FAF3E1]/60 uppercase tracking-widest">
                  {activeTicket.category}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#222222] border border-[#F5E7C6]/5 p-8 rounded-lg relative">
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10 mb-6">
                  User_Message_Transmission
                </p>
                <p className="text-sm leading-8 text-[#FAF3E1]/60 whitespace-pre-line font-medium uppercase tracking-wide">
                  {activeTicket.message}
                </p>
              </div>

              {activeTicket.adminNotes && (
                <div className="bg-[#FA8112]/5 border border-[#FA8112]/20 p-8 rounded-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#FA8112]" />
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck size={14} className="text-[#FA8112]" />
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#FA8112]">
                      Team_Response_Log
                    </p>
                  </div>
                  <p className="text-sm leading-8 text-[#FAF3E1]/80 whitespace-pre-line font-bold uppercase tracking-wide">
                    {activeTicket.adminNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SupportTicketTracker;
