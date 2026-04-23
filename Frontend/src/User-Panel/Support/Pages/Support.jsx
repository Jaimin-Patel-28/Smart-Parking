import React from "react";
import {
  Clock3,
  HelpCircle,
  MessageSquare,
  Send,
  ShieldAlert,
  Terminal,
  Activity,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import useSupportForm from "../Hooks/useSupportForm";
import useSupportActivity from "../Hooks/useSupportActivity";
import useSupportTickets from "../Hooks/useSupportTickets";
import SupportRecentActivity from "../Components/SupportRecentActivity";
import SupportTicketTracker from "../Components/SupportTicketTracker";
import SupportFaq from "../Components/SupportFaq";
import SupportQuickActions from "../Components/SupportQuickActions";

const categories = [
  "Booking issue",
  "Payment / Wallet issue",
  "Slot availability issue",
  "Refund request",
  "App bug",
  "Delete / Deactivate account",
  "Other",
];

const Support = () => {
  const { user } = useAuth();
  const {
    bookingItems,
    transactionItems,
    loadingBookings,
    loadingTransactions,
    error: activityError,
    refreshActivity,
  } = useSupportActivity();
  const {
    tickets,
    loading: ticketsLoading,
    reopening,
    statusFilter,
    setStatusFilter,
    error: ticketsError,
    reopenTicket,
    refreshTickets,
  } = useSupportTickets();
  const [selectedContext, setSelectedContext] = React.useState(null);
  const { formData, isSubmitting, handleChange, handleSubmit } =
    useSupportForm(selectedContext);

  const handleSelectContext = (contextItem) => {
    setSelectedContext(contextItem);
    const summaryLabel =
      contextItem.type === "booking"
        ? `ID_${contextItem.bookingCode}`
        : `HEX_${contextItem.transactionId.slice(0, 8)}`;

    handleChange({
      target: {
        name: "subject",
        value: `SIGNAL_${contextItem.type.toUpperCase()}: ${summaryLabel}`,
      },
    });
    handleChange({
      target: {
        name: "message",
        value: `RE_SYNC_REQUEST: Analysis required for ${contextItem.type} [${summaryLabel}]. Node state mismatch detected. Please advise.`,
      },
    });
    handleChange({
      target: {
        name: "category",
        value:
          contextItem.type === "booking"
            ? "Booking issue"
            : "Payment / Wallet issue",
      },
    });
  };

  const handleClearContext = () => setSelectedContext(null);

  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <div className="max-w-[1600px] mx-auto pb-24 space-y-12 animate-in fade-in duration-700 px-4 xl:px-10">
      {/* 1. SUPPORT ENGINE HEADER */}
      <header className="space-y-6 pt-6">
        <div className="flex items-center gap-3 text-[#FA8112]">
          <HelpCircle size={16} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
            Support_Engine_v4.2
          </span>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[#FAF3E1] uppercase tracking-tight leading-none">
            Help <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="max-w-2xl text-[12px] md:text-[13px] font-medium leading-relaxed text-[#FAF3E1]/30 uppercase tracking-widest">
            Synchronize with our resolution matrix to report node errors, ledger
            discrepancies, or system bugs. All transmissions are logged with
            active auth metadata.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-10">
        {/* 2. TRANSMISSION CONSOLE (LEFT) */}
        <div className="space-y-10">
          <section className="relative overflow-hidden rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] p-10 shadow-2xl group">
            {/* HUD Scanline */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FA8112]/20 to-transparent" />

            <div className="relative z-10 mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-[#F5E7C6]/5 pb-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#FA8112]/40" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
                    Issue_Transmission_Link
                  </p>
                </div>
                <h2 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  Signal Generation
                </h2>
              </div>
              <div className="flex items-center gap-3 bg-[#222222] px-4 py-2 rounded border border-[#F5E7C6]/5">
                <Clock3 size={14} className="text-[#FA8112]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/40">
                  Response_Latency: ~24HR
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                    Identity_Label
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="LABEL_UID"
                    className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#222222] px-5 py-4 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/40 outline-none transition-all uppercase tabular-nums"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                    Communication_Link
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="EMAIL_ADDR"
                    className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#222222] px-5 py-4 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/40 outline-none transition-all uppercase"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                  Sector_Classification
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#222222] px-5 py-4 text-sm font-bold text-[#FAF3E1] focus:border-[#FA8112]/40 outline-none transition-all appearance-none uppercase tracking-widest cursor-pointer shadow-inner"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.toUpperCase().replace(" / ", "_")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                  Signal_Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="SHORT_ISSUE_HEX"
                  className="w-full rounded-lg border border-[#F5E7C6]/5 bg-[#222222] px-5 py-4 text-sm font-bold text-[#FAF3E1] placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/40 outline-none transition-all uppercase"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#FA8112]/60 ml-1">
                  Payload_Data
                </label>
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="ELABORATE_FAULT_SEQUENCE..."
                  className="w-full resize-none rounded-lg border border-[#F5E7C6]/5 bg-[#222222] px-5 py-4 text-sm font-bold text-[#FAF3E1]/70 placeholder:text-[#FAF3E1]/5 focus:border-[#FA8112]/40 outline-none transition-all uppercase leading-relaxed font-mono"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-[#F5E7C6]/5">
                <div className="flex items-center gap-3 text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.2em]">
                  <Activity size={14} className="text-[#FA8112]/40" />
                  {user?.email
                    ? "Auto_Linked: Session_Credentials_Active"
                    : "Anonymous_Packet_Transmission"}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-4 rounded-lg bg-[#FA8112] px-10 py-4 text-[11px] font-bold text-[#222222] uppercase tracking-[0.3em] transition-all hover:bg-[#FAF3E1] disabled:opacity-20 active:scale-[0.98] shadow-2xl shadow-[#FA8112]/10 group"
                >
                  {isSubmitting ? "Transmitting..." : "Initiate_Transmission"}
                  <Send
                    size={14}
                    strokeWidth={3}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </button>
              </div>
            </form>
          </section>

          {/* REGISTRY MONITOR */}
          <SupportTicketTracker
            tickets={tickets}
            loading={ticketsLoading}
            reopening={reopening}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            error={ticketsError}
            onRefresh={refreshTickets}
            onReopen={reopenTicket}
          />

          <SupportFaq />
        </div>

        {/* 3. CONTEXT ATTACHMENT ASIDE (RIGHT) */}
        <aside className="space-y-8">
          <SupportRecentActivity
            bookingItems={bookingItems}
            transactionItems={transactionItems}
            loadingBookings={loadingBookings}
            loadingTransactions={loadingTransactions}
            selectedContext={selectedContext}
            onSelectContext={handleSelectContext}
            onClearContext={handleClearContext}
            onRefresh={refreshActivity}
          />

          <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#1a1a1a] p-8 space-y-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#FA8112]/5 border border-[#FA8112]/20 rounded-lg text-[#FA8112]">
                <ShieldAlert size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-[13px] font-bold text-[#FAF3E1] uppercase tracking-wider">
                  Protocol_Requirements
                </h3>
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest leading-none">
                  Diagnostic Metadata
                </p>
              </div>
            </div>

            <ul className="space-y-4 font-mono text-[10px] text-[#FAF3E1]/40 uppercase tracking-widest">
              <li className="flex items-start gap-3">
                <ChevronRight size={12} className="text-[#FA8112] shrink-0" />{" "}
                Unique Node_ID / Ledger_Hash
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={12} className="text-[#FA8112] shrink-0" />{" "}
                Precise ISO Spatial_Zone
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={12} className="text-[#FA8112] shrink-0" />{" "}
                Observed vs Expected Result
              </li>
              <li className="flex items-start gap-3">
                <ChevronRight size={12} className="text-[#FA8112] shrink-0" />{" "}
                Captured GUI Fault Logs
              </li>
            </ul>
          </section>

          <SupportQuickActions />
        </aside>
      </div>
    </div>
  );
};

export default Support;
