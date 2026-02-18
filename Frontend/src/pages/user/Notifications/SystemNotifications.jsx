import React from "react";
import { Cpu, Shield, Rocket, Megaphone } from "lucide-react";

const SystemNotifications = () => {
  // Mock data representing administrative system broadcasts
  const broadcasts = [
    {
      type: "Maintenance",
      title: "Node Maintenance",
      desc: "Scheduled database optimization for the Anand Hub on Feb 15.",
      icon: Cpu,
      color: "text-[#FA8112]",
      bg: "bg-[#F5E7C6]",
    },
    {
      type: "Policy",
      title: "Privacy Update",
      desc: "Revised data handling policies for encrypted vehicle IDs.",
      icon: Shield,
      color: "text-[#222222]",
      bg: "bg-[#FAF3E1]",
    },
    {
      type: "Update",
      title: "V1.2 Feature Pack",
      desc: "Real-time occupancy heatmaps are now live in your dashboard.",
      icon: Rocket,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* SECTION HEADER: High-Contrast Editorial Style */}
      <div className="flex items-center gap-3 px-2">
        <div className="p-2 rounded-lg bg-[#222222] text-[#FAF3E1] shadow-sm">
          <Megaphone size={16} strokeWidth={2.5} />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-xl font-black text-[#222222] tracking-tight uppercase">
            Broadcast{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Feed
            </span>
          </h2>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Global Admin Notifications
          </p>
        </div>
      </div>

      {/* BROADCAST LIST: Tactile Cards */}
      <div className="space-y-4">
        {broadcasts.map((broadcast, index) => {
          const Icon = broadcast.icon;
          return (
            <div
              key={index}
              className="group relative bg-white border-2 border-[#222222]/5 p-5 rounded-2xl transition-all duration-300 hover:border-[#222222]/10 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl ${broadcast.bg} ${broadcast.color} transition-transform duration-500 group-hover:scale-110`}
                >
                  <Icon size={18} strokeWidth={3} />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-black text-[#222222] uppercase tracking-wider">
                      {broadcast.title}
                    </h4>
                    <span className="text-[8px] font-bold text-[#222222]/20 uppercase tracking-widest italic">
                      {broadcast.type}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#222222]/50 leading-relaxed">
                    {broadcast.desc}
                  </p>
                </div>
              </div>

              {/* Subtle paper grain */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] rounded-2xl"></div>
            </div>
          );
        })}
      </div>

      {/* VIVA SIGNATURE: Technical Context */}
      <div className="pt-4 flex items-center justify-center gap-2 opacity-20 group">
        <span className="text-[8px] font-black uppercase tracking-[0.4em] group-hover:text-[#FA8112] transition-colors">
          SmartPark Core Broadcast System &bull; 2026
        </span>
      </div>
    </div>
  );
};

export default SystemNotifications;
