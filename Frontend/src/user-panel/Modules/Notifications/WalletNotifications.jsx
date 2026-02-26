import React from "react";
import { PlusCircle, AlertCircle, RefreshCw, ArrowUpRight } from "lucide-react";

const WalletNotifications = () => {
  // Mock transaction data for your MERN project
  const walletAlerts = [
    {
      title: "Top-Up Successful",
      amount: "+₹500.00",
      time: "1 hour ago",
      desc: "Funds added via UPI. Your new balance is ₹1,250.",
      icon: PlusCircle,
      type: "success",
      color: "text-emerald-600",
    },
    {
      title: "Low Balance Warning",
      amount: "Action Req.",
      time: "Critical",
      desc: "Balance below ₹100. Top up to ensure seamless parking.",
      icon: AlertCircle,
      type: "warning",
      color: "text-[#FA8112]",
    },
    {
      title: "Refund Processed",
      amount: "+₹45.00",
      time: "Yesterday",
      desc: "Refund for early checkout at Anand Hub processed.",
      icon: RefreshCw,
      type: "neutral",
      color: "text-[#222222]/40",
    },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Branding */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Wallet{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Activity
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Financial Ledger Feed
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#222222] text-[#FAF3E1] text-[10px] font-black uppercase tracking-widest hover:bg-[#FA8112] transition-all">
          Manage <ArrowUpRight size={14} />
        </button>
      </div>

      {/* 2. TRANSACTION LIST */}
      <div className="space-y-4">
        {walletAlerts.map((alert, index) => {
          const Icon = alert.icon;
          return (
            <div
              key={index}
              className={`flex items-start gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
                alert.type === "warning"
                  ? "bg-[#F5E7C6]/50 border-[#FA8112]/20"
                  : "bg-white border-transparent hover:border-[#222222]/5"
              }`}
            >
              <div
                className={`p-3 rounded-xl bg-white shadow-sm ${alert.color}`}
              >
                <Icon size={20} strokeWidth={2.5} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-[#222222] truncate">
                    {alert.title}
                  </h4>
                  <span className={`text-[11px] font-black ${alert.color}`}>
                    {alert.amount}
                  </span>
                </div>
                <p className="text-xs font-medium text-[#222222]/50 leading-relaxed mb-2">
                  {alert.desc}
                </p>
                <span className="text-[9px] font-bold text-[#222222]/20 uppercase tracking-[0.15em]">
                  {alert.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. VIVA FOOTER: MERN Technical Detail */}
      <div className="mt-8 pt-6 border-t-2 border-[#FAF3E1] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FA8112]"></div>
          <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.3em]">
            Payment Gateway: Active
          </p>
        </div>
        <p className="text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.3em]">
          Last Sync: Just Now
        </p>
      </div>
    </div>
  );
};

export default WalletNotifications;
