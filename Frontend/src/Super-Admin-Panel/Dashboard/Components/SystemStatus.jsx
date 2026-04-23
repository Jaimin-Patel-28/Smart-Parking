import React from "react";
import { Activity, Server, Cpu, ShieldCheck } from "lucide-react";

const SystemStatus = ({ data = {} }) => {
  const systems = [
    {
      name: "Camera Analytics",
      status: data.cameraStatus || "Online",
      load: data.cameraLoad || 42,
      icon: Activity,
    },
    {
      name: "Payment Gateway",
      status: data.paymentStatus || "Operational",
      load: data.paymentLoad || 18,
      icon: ShieldCheck,
    },
    {
      name: "Core Database",
      status: data.dbStatus || "Synchronized",
      load: data.dbLoad || 65,
      icon: Server,
    },
  ];

  const getStatusColor = (load) => {
    if (load > 90) return "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]";
    if (load > 70) return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]";
    return "bg-[#FA8112] shadow-[0_0_10px_rgba(250,129,18,0.3)]";
  };

  const getTextColor = (load) => {
    if (load > 90) return "text-rose-400";
    if (load > 70) return "text-amber-400";
    return "text-[#FA8112]";
  };

  return (
    <div className="bg-[#FAF3E1]/2 p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 shadow-2xl h-full flex flex-col">
      {/* 1. HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em]">
            Infrastructure
          </h2>
          <h3 className="text-lg font-bold text-[#FAF3E1] mt-1">
            System Health
          </h3>
        </div>
        <div className="p-2.5 bg-[#FAF3E1]/5 rounded-lg border border-[#F5E7C6]/5 text-[#FA8112]">
          <Cpu size={20} strokeWidth={1.5} className="animate-pulse" />
        </div>
      </div>

      {/* 2. SYSTEM ROWS */}
      <div className="space-y-10 flex-1">
        {systems.map((sys, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-end mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <sys.icon size={14} className="text-[#FAF3E1]/20" />
                  <span className="text-xs font-bold text-[#FAF3E1] tracking-tight">
                    {sys.name}
                  </span>
                </div>
                <p className="text-[9px] text-[#FAF3E1]/20 uppercase font-bold tracking-widest">
                  Processing Load
                </p>
              </div>

              <div className="text-right space-y-1">
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded border border-[#F5E7C6]/5 bg-[#FAF3E1]/5 uppercase tracking-widest ${getTextColor(sys.load)}`}
                >
                  {sys.status}
                </span>
                <span className="block text-[12px] font-mono font-bold text-[#FAF3E1]/60 tabular-nums">
                  {sys.load}%
                </span>
              </div>
            </div>

            {/* SEGMENTED PROGRESS BAR: Feels more technical/industrial */}
            <div className="relative w-full bg-[#FAF3E1]/5 rounded-full h-[3px] overflow-hidden">
              <div
                className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out rounded-full ${getStatusColor(sys.load)}`}
                style={{ width: `${sys.load}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 3. HARDWARE METADATA */}
      <div className="mt-10 pt-6 border-t border-[#F5E7C6]/5">
        <div className="flex justify-between items-center text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
            Node: IN-AND-01
          </div>
          <span>Kernel: v4.8.2-LTS</span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
