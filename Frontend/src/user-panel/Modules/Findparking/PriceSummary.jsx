import React from "react";
import {
  CreditCard,
  Wallet,
  Calculator,
  MapPin,
  Hash,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const PriceSummary = ({ selection }) => {
  // Constants (These could eventually come from selection.selectedNode)
  const baseRate = 20;

  // Parse duration from selection
  const parseDuration = (durationStr) => {
    if (!durationStr || durationStr === "Invalid Range") return 2.5;
    const match = durationStr.match(/(\d+):(\d+)/);
    if (match) {
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      return hours + minutes / 60;
    }
    return 2.5;
  };

  const durationHours = parseDuration(selection?.duration);
  const smartFee = 5;

  // Dynamic Calculation
  const subTotal = baseRate * durationHours;
  const totalLiability = subTotal + smartFee;
  const walletBalance = 450.0;
  const isSufficient = walletBalance >= totalLiability;

  // 🟢 Logic Check: Is a slot actually selected?
  const hasActiveSlot = !!selection?.slotId;

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🟢 Header: Identity */}
      <div className="flex justify-between items-start border-b border-[#F5E7C6]/10 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-[#FA8112]/20 rounded-xl text-[#FA8112]">
            <CreditCard size={22} />
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#FAF3E1]">
              Price Summary
            </h2>
            <p className="text-[#FAF3E1]/40 text-[10px] uppercase tracking-[0.3em] font-bold">
              Settlement Node v1.0.4
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 px-3 py-1 rounded-full">
          <ShieldCheck size={12} className="text-[#4ADE80]" />
          <span className="text-[10px] font-black text-[#4ADE80] uppercase">
            Verified Rate
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🟢 Left: Parameters & Financials */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3">
            <PriceDetail
              icon={MapPin}
              label="Location Node"
              value={selection?.selectedNode?.name || "Anand Central Hub"}
            />

            {/* 🟢 Target Slot: Highlighted when active */}
            <PriceDetail
              icon={Hash}
              label="Target Slot"
              value={hasActiveSlot ? selection.slotId : "Not Selected"}
              highlight={hasActiveSlot}
            />

            <PriceDetail
              icon={Clock}
              label="Duration"
              value={`${durationHours} Hrs`}
            />
          </div>

          {/* Cost Breakdown Card */}
          <div className="bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-[#FAF3E1]/40">
                Base Rate (₹{baseRate}/hr)
              </span>
              <span className="text-[#FAF3E1] font-mono font-bold">
                ₹{subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[#FAF3E1]/40">Smart Utility Fee</span>
                <TrendingUp size={12} className="text-[#FA8112]" />
              </div>
              <span className="text-[#FAF3E1] font-mono font-bold">
                ₹{smartFee.toFixed(2)}
              </span>
            </div>

            <div className="pt-4 border-t border-[#F5E7C6]/10 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#FA8112]">
                <Calculator size={18} />
                <span className="text-xs font-black uppercase tracking-widest">
                  Total Liability
                </span>
              </div>
              <span className="text-3xl font-black text-[#FAF3E1]">
                ₹{totalLiability.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* 🟢 Right: Wallet & Auth */}
        <div className="flex flex-col gap-6">
          <div
            className={`bg-[#222222] border-2 rounded-[2.5rem] p-8 relative overflow-hidden group transition-all 
            ${isSufficient ? "border-[#FA8112]/20 hover:border-[#FA8112]/40" : "border-red-500/40"}`}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#FAF3E1]/40">
                  <Wallet size={16} />
                  <p className="text-[10px] uppercase font-bold tracking-widest">
                    Available Balance
                  </p>
                </div>
                <h4 className="text-4xl font-black text-[#FAF3E1]">
                  ₹{walletBalance.toFixed(2)}
                </h4>
              </div>
              <div
                className={`px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-widest 
                ${isSufficient ? "bg-[#4ADE80]/20 text-[#4ADE80]" : "bg-red-500/20 text-red-500"}`}
              >
                {isSufficient ? "Sufficient" : "Low Balance"}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FA8112]/10 blur-[50px] rounded-full group-hover:bg-[#FA8112]/20 transition-all" />
          </div>

          <button
            disabled={!hasActiveSlot || !isSufficient}
            className="w-full group bg-[#FA8112] disabled:opacity-20 disabled:grayscale hover:bg-[#fa8e2e] text-[#222222] py-6 rounded-[2rem] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all shadow-[0_20px_40px_rgba(250,129,18,0.2)]"
          >
            <span>Authorize Settlement</span>
            <ChevronRight
              size={20}
              className="group-hover:translate-x-2 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// 🟢 Reusable Price Detail Row with Highlight Logic
const PriceDetail = ({ icon: Icon, label, value, highlight }) => (
  <div
    className={`flex items-center justify-between p-4 bg-[#FAF3E1]/[0.03] border rounded-xl transition-all
    ${highlight ? "border-[#FA8112]/40 bg-[#FA8112]/5" : "border-[#F5E7C6]/5"}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`p-1.5 rounded-lg ${highlight ? "bg-[#FA8112] text-[#222222]" : "bg-[#222222] text-[#FA8112]/60"}`}
      >
        <Icon size={16} />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/30">
        {label}
      </span>
    </div>
    <span
      className={`text-xs font-bold uppercase tracking-tighter ${highlight ? "text-[#FA8112] scale-110" : "text-[#FAF3E1]"}`}
    >
      {value}
    </span>
  </div>
);

export default PriceSummary;
