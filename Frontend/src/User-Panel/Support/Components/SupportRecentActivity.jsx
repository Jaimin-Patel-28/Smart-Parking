import React from "react";
import {
  CalendarClock,
  ReceiptText,
  RotateCw,
  Terminal,
  Activity,
  X,
  Database,
} from "lucide-react";

const statusPillStyles = {
  confirmed: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  completed: "bg-[#FAF3E1]/5 text-[#FAF3E1]/40 border-[#F5E7C6]/5",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  failed: "bg-rose-500/10 text-rose-400 border-rose-500/20",
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
    const isSelected =
      selectedContext?.type === item.type && selectedContext?.id === item.id;

    return (
      <button
        key={`${item.type}-${item.id}`}
        type="button"
        onClick={() => onSelectContext(item)}
        // Added overflow-hidden to prevent pill bleed and relative for positioning
        className={`w-full rounded-lg border p-4 text-left transition-all duration-500 group/card relative overflow-hidden shadow-2xl ${
          isSelected
            ? "border-[#FA8112] bg-[#FA8112]/5"
            : "border-[#F5E7C6]/5 bg-[#1a1a1a] hover:border-[#FA8112]/30"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 min-w-0 flex-1">
            {" "}
            {/* min-w-0 prevents text from pushing width */}
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FA8112]/60">
              {item.type === "booking" ? (
                <CalendarClock size={12} />
              ) : (
                <ReceiptText size={12} />
              )}
              <span className="truncate">{item.type}_ENTITY</span>
            </div>
            <h4 className="font-bold text-[#FAF3E1] uppercase tracking-tight text-[13px] truncate">
              {item.title}
            </h4>
            <p className="text-[10px] text-[#FAF3E1]/20 font-medium uppercase tracking-widest truncate">
              {item.subtitle}
            </p>
          </div>

          {/* Corrected Status Pill positioning */}
          <span
            className={`shrink-0 rounded border px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest h-fit ${
              statusPillStyles[item.status] ||
              "bg-[#FAF3E1]/5 text-[#FAF3E1]/20 border-[#F5E7C6]/5"
            }`}
          >
            {item.status}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-[#F5E7C6]/5 flex items-center justify-between">
          <p className="text-[9px] font-mono text-[#FAF3E1]/10 uppercase tracking-widest truncate">
            {item.type === "booking" ? "REF_CODE" : "TRANS_HEX"}:
            <span className="ml-2 text-[#FAF3E1]/40">
              {item.type === "booking"
                ? item.bookingCode
                : item.transactionId.slice(0, 10).toUpperCase()}
            </span>
          </p>
        </div>
      </button>
    );
  };

  return (
    <section className="rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] p-6 space-y-6 shadow-2xl">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Context_Linker
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#FAF3E1] uppercase tracking-tight">
            Recent_Activity
          </h3>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="p-2.5 rounded-lg border border-[#F5E7C6]/10 bg-[#1a1a1a] text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
        >
          <RotateCw
            size={14}
            className={
              loadingBookings || loadingTransactions ? "animate-spin" : ""
            }
          />
        </button>
      </div>

      {/* Changed to flex-col on small and remain grid on XL to provide more horizontal breathing room */}
      <div className="grid grid-cols-1 gap-6">
        {/* Bookings Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em]">
            <Database size={12} /> Registry_Bookings
          </div>
          <div className="grid grid-cols-1 gap-3">
            {loadingBookings ? (
              <div className="h-20 bg-white/5 rounded-lg animate-pulse" />
            ) : (
              bookingItems.map(renderCard)
            )}
          </div>
        </div>

        {/* Transactions Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.2em]">
            <ReceiptText size={12} /> Registry_Transactions
          </div>
          <div className="grid grid-cols-1 gap-3">
            {loadingTransactions ? (
              <div className="h-20 bg-white/5 rounded-lg animate-pulse" />
            ) : (
              transactionItems.map(renderCard)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportRecentActivity;
