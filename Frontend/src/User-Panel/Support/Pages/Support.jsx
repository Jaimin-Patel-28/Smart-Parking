import React from "react";
import {
  Clock3,
  HelpCircle,
  MessageSquare,
  Send,
  ShieldAlert,
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
        ? `Booking ${contextItem.bookingCode}`
        : `Transaction ${contextItem.transactionId}`;

    handleChange({
      target: {
        name: "subject",
        value: `${summaryLabel} - ${contextItem.title}`,
      },
    });

    handleChange({
      target: {
        name: "message",
        value: `I need help with ${contextItem.type} ${summaryLabel}. Please review this item and advise next steps.`,
      },
    });

    handleChange({
      target: {
        name: "category",
        value: contextItem.type === "booking" ? "Booking issue" : "Payment / Wallet issue",
      },
    });
  };

  const handleClearContext = () => {
    setSelectedContext(null);
  };

  return (
    <div className="min-h-screen pb-20 lg:pb-10 px-4 md:px-8 lg:px-12">
      <header className="mb-8 md:mb-10 pt-4 md:pt-0">
        <div className="max-w-4xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FA8112]/20 bg-[#FA8112]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#FA8112]">
            <HelpCircle size={14} />
            Support Center
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black text-[#FAF3E1] tracking-tight">
              Need help with your parking account?
            </h1>
            <p className="max-w-2xl text-sm md:text-base leading-7 text-[#FAF3E1]/45">
              Use the support form to report booking, wallet, or app issues.
              We already know your account details, so the process stays quick
              and focused.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.35fr_0.9fr] gap-6 lg:gap-8">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 p-6 md:p-8 shadow-2xl">
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[#FA8112]/10 blur-3xl" />

          <div className="relative z-10 mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
                Direct Message
              </p>
              <h2 className="mt-2 text-2xl font-black text-[#FAF3E1]">
                Send us the issue details
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-[#FAF3E1]/40">
              <Clock3 size={16} className="text-[#FA8112]" />
              Average reply time: 24 hours
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/35">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-[#F5E7C6]/5 bg-[#2a2a2a]/50 px-4 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 outline-none transition-all focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/70"
                />
              </label>

              <label className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/35">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl border border-[#F5E7C6]/5 bg-[#2a2a2a]/50 px-4 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 outline-none transition-all focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/70"
                />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/35">
                Category
              </span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#F5E7C6]/5 bg-[#2a2a2a]/50 px-4 py-4 text-sm text-[#FAF3E1] outline-none transition-all focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/70"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/35">
                Subject
              </span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Short issue summary"
                className="w-full rounded-2xl border border-[#F5E7C6]/5 bg-[#2a2a2a]/50 px-4 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 outline-none transition-all focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/70"
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FAF3E1]/35">
                Message
              </span>
              <textarea
                rows="7"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Explain what happened, when it happened, and what you expected to happen."
                className="w-full resize-none rounded-[1.75rem] border border-[#F5E7C6]/5 bg-[#2a2a2a]/50 px-4 py-4 text-sm text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 outline-none transition-all focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/70"
              />
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
              <div className="flex items-center gap-3 text-sm text-[#FAF3E1]/40">
                <MessageSquare size={16} className="text-[#FA8112]" />
                {user?.email
                  ? "Your account details will be included automatically."
                  : "Signed-out users can still submit a request."}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#FA8112] px-6 py-4 text-sm font-black text-[#222222] transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>

        <aside className="space-y-6">
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

          {activityError ? (
            <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
              {activityError}
            </div>
          ) : null}

          <section className="rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 p-6 md:p-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-[#FA8112]/10 p-3 text-[#FA8112]">
                <ShieldAlert size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#FAF3E1]">What to include</h3>
                <p className="text-sm text-[#FAF3E1]/40">Give us enough context to resolve it faster.</p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-[#FAF3E1]/45">
              <li>• Booking ID or wallet transaction time</li>
              <li>• Parking name, slot label, or booking code</li>
              <li>• What you expected and what actually happened</li>
              <li>• Any payment screenshots or error details</li>
            </ul>
          </section>

          <section className="rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 p-6 md:p-7">
            <SupportQuickActions />
          </section>

          <section className="rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 p-6 md:p-7">
            <SupportFaq />
          </section>
        </aside>
      </div>
    </div>
  );
};

export default Support;
