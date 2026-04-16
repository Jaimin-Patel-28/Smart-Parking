import React from "react";
import { CalendarClock, ReceiptText, RotateCw, Link2, X } from "lucide-react";

const statusPillStyles = {
  confirmed: "bg-sky-500/15 text-sky-300",
  active: "bg-emerald-500/15 text-emerald-300",
  completed: "bg-zinc-500/15 text-zinc-300",
  cancelled: "bg-rose-500/15 text-rose-300",
  pending: "bg-amber-500/15 text-amber-300",
  success: "bg-emerald-500/15 text-emerald-300",
  failed: "bg-rose-500/15 text-rose-300",
};

const SupportRecentActivity = ({
  bookingItems,
  transactionItems,
  loadingBookings,
  loadingTransactions,
  selectedContext,
  onSelectContext,
  onClearContext,
  onRefresh,
}) => {
  const renderCard = (item) => {
    const isSelected = selectedContext?.type === item.type && selectedContext?.id === item.id;

    return (
      <button
        key={`${item.type}-${item.id}`}
        type="button"
        onClick={() => onSelectContext(item)}
        className={`w-full rounded-3xl border p-4 text-left transition-all ${
          isSelected
            ? "border-[#FA8112]/60 bg-[#FA8112]/10"
            : "border-[#F5E7C6]/10 bg-[#FAF3E1]/5 hover:border-[#FA8112]/30"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
              {item.type === "booking" ? <CalendarClock size={13} /> : <ReceiptText size={13} />}
              {item.type}
            </div>
            <h4 className="mt-2 font-bold text-[#FAF3E1]">{item.title}</h4>
            <p className="mt-1 text-sm text-[#FAF3E1]/45">{item.subtitle}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${
              statusPillStyles[item.status] || "bg-[#FAF3E1]/10 text-[#FAF3E1]/60"
            }`}
          >
            {item.status}
          </span>
        </div>

        <p className="mt-4 text-xs text-[#FAF3E1]/30">
          {item.type === "booking"
            ? `Booking code: ${item.bookingCode}`
            : `Transaction: ${item.transactionId}`}
        </p>
      </button>
    );
  };

  return (
    <section className="rounded-[2.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/2 p-6 md:p-7 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
            Context Attachment
          </p>
          <h3 className="mt-2 text-lg font-bold text-[#FAF3E1]">Recent Activity</h3>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-full border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-[#FAF3E1]"
        >
          <RotateCw size={14} />
          Refresh
        </button>
      </div>

      {selectedContext ? (
        <div className="rounded-3xl border border-[#FA8112]/30 bg-[#FA8112]/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FA8112]">
                Selected Attachment
              </p>
              <p className="mt-2 text-sm font-bold text-[#FAF3E1]">
                {selectedContext.title}
              </p>
              <p className="mt-1 text-xs text-[#FAF3E1]/45">
                {selectedContext.type === "booking"
                  ? selectedContext.bookingCode
                  : selectedContext.transactionId}
              </p>
            </div>

            <button
              type="button"
              onClick={onClearContext}
              className="rounded-full border border-[#F5E7C6]/10 bg-[#FAF3E1]/5 p-2 text-[#FAF3E1]"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : null}

      <div className="space-y-5">
        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#FAF3E1]">
            <CalendarClock size={16} className="text-[#FA8112]" />
            Bookings
          </div>
          {loadingBookings ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-24 rounded-3xl bg-[#FAF3E1]/5" />
              <div className="h-24 rounded-3xl bg-[#FAF3E1]/5" />
            </div>
          ) : bookingItems.length > 0 ? (
            <div className="space-y-3">{bookingItems.map(renderCard)}</div>
          ) : (
            <p className="text-sm text-[#FAF3E1]/40">No recent bookings found.</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-[#FAF3E1]">
            <ReceiptText size={16} className="text-[#FA8112]" />
            Transactions
          </div>
          {loadingTransactions ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-24 rounded-3xl bg-[#FAF3E1]/5" />
              <div className="h-24 rounded-3xl bg-[#FAF3E1]/5" />
            </div>
          ) : transactionItems.length > 0 ? (
            <div className="space-y-3">{transactionItems.map(renderCard)}</div>
          ) : (
            <p className="text-sm text-[#FAF3E1]/40">No recent transactions found.</p>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-[#F5E7C6]/10 p-4 text-xs leading-6 text-[#FAF3E1]/35">
        Pick a booking or transaction above to attach it to the support request.
      </div>
    </section>
  );
};

export default SupportRecentActivity;