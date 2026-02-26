import React from "react";
import { Car, History, Wallet, MapPin } from "lucide-react";

const SummaryCards = ({ activeSession, wallet, bookings }) => {
  const stats = [
    { label: "Active", value: activeSession.slotId, icon: Car },
    { label: "Sessions", value: bookings.length, icon: History },
    { label: "Wallet", value: `₹${wallet.balance}`, icon: Wallet },
    { label: "Nodes", value: "08", icon: MapPin },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-[#FAF3E1]/3 border border-[#F5E7C6]/10 rounded-2xl px-4 py-3"
        >
          <div className="w-9 h-9 rounded-xl bg-[#222222] text-[#FA8112] flex items-center justify-center">
            <s.icon size={16} />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-widest text-[#F5E7C6]/30">
              {s.label}
            </p>
            <p className="text-sm font-black">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
