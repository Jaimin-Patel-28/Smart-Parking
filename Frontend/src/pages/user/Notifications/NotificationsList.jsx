import React from "react";
import NotificationItem from "./NotificationItem";
import { ListFilter, Sparkles } from "lucide-react";

const NotificationsList = () => {
  // Mock data array representing your MERN backend's notification objects
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "Slot P-104 Reserved",
      description:
        "Your parking reservation at Anand Central is confirmed. Navigation link is now active.",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "wallet",
      title: "Wallet Refill Success",
      description:
        "₹500.00 successfully added via UPI. Enjoy seamless automated parking check-outs.",
      time: "1h ago",
      read: true,
    },
    {
      id: 3,
      type: "system",
      title: "Server Node Sync",
      description:
        "SmartPark Anand Node has completed a scheduled security update. All systems green.",
      time: "3h ago",
      read: true,
    },
  ];

  return (
    <section className="space-y-8">
      {/* 1. SECTION SUB-HEADER: Humanized Editorial Style */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#222222] text-[#FAF3E1]">
            <ListFilter size={16} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xl font-black text-[#222222] tracking-tight">
              Activity{" "}
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Stream
              </span>
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
              Real-time MERN Ledger
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-[#222222]/5 text-[#222222]/40">
          <Sparkles size={14} className="text-[#FA8112]" />
          <span className="text-[9px] font-black uppercase tracking-widest italic">
            All Up-To-Date
          </span>
        </div>
      </div>

      {/* 2. THE FEED: Content-Rich List Mapping */}
      <div className="grid grid-cols-1 gap-4">
        {notifications.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}
      </div>

      {/* 3. VIVA FOOTER: Technical Branding */}
      <div className="pt-6 flex justify-center">
        <button className="px-8 py-4 rounded-2xl bg-transparent border-2 border-[#222222]/10 text-[#222222]/40 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#222222] hover:text-[#FAF3E1] hover:border-transparent transition-all duration-500">
          Load Historical Alerts
        </button>
      </div>
    </section>
  );
};

export default NotificationsList;
