import React from "react";
import { Activity } from "lucide-react";

const SystemStatus = ({ data = {} }) => {
  const systems = [
    {
      name: "Camera Sensors",
      status: data.cameraStatus || "Checking...",
      load: data.cameraLoad || 0,
    },
    {
      name: "Payment Gateway",
      status: data.paymentStatus || "Checking...",
      load: data.paymentLoad || 0,
    },
    {
      name: "Database Server",
      status: data.dbStatus || "Checking...",
      load: data.dbLoad || 0,
    },
  ];

  // Logic adapted for Dark Theme: Backgrounds
  const getStatusColor = (load) => {
    if (load > 90) return "bg-rose-500"; // Critical
    if (load > 70) return "bg-amber-500"; // Warning
    return "bg-[#FA8112]"; // Healthy (Using your Accent color)
  };

  // Logic adapted for Dark Theme: Text
  const getTextColor = (load) => {
    if (load > 90) return "text-rose-400";
    if (load > 70) return "text-amber-400";
    return "text-[#FA8112]";
  };

  return (
    // Card BG: #FAF3E1 at 2% opacity | Border: #F5E7C6 at 10% opacity
    <div className="bg-[#FAF3E1]/[0.02] p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest">
          System Health
        </h3>
        <div className="p-2.5 bg-[#FAF3E1]/[0.05] rounded-xl text-[#FAF3E1]/40 border border-[#F5E7C6]/5">
          <Activity
            size={18}
            className={data ? `animate-pulse ${getTextColor(0)}` : ""}
          />
        </div>
      </div>

      <div className="space-y-8">
        {systems.map((sys, i) => (
          <div key={i} className="group">
            <div className="flex justify-between text-sm mb-3 items-end">
              <div>
                <span className="block font-bold text-[#FAF3E1] tracking-tight">
                  {sys.name}
                </span>
                <span className="text-[10px] text-[#FAF3E1]/30 font-black uppercase tracking-widest">
                  Current Load
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-tighter ${getTextColor(sys.load)} bg-[#FAF3E1]/[0.05] border border-[#F5E7C6]/5`}
                >
                  {sys.status}
                </span>
                <span className="block text-[11px] font-mono font-bold text-[#FAF3E1]/40 mt-1.5">
                  {sys.load}%
                </span>
              </div>
            </div>

            {/* Progress Bar Container: BG #FAF3E1 at 5% opacity */}
            <div className="w-full bg-[#FAF3E1]/[0.05] rounded-full h-1.5 overflow-hidden border border-[#F5E7C6]/5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getStatusColor(sys.load)} shadow-[0_0_8px_rgba(250,129,18,0.2)]`}
                style={{ width: `${sys.load}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Hardware Version Tag */}
      <div className="mt-10 pt-6 border-t border-[#F5E7C6]/5">
        <div className="flex justify-between items-center text-[9px] font-black text-[#FAF3E1]/20 uppercase tracking-[0.2em]">
          <span>Kernel: v2.4.0-stable</span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FA8112] animate-pulse"></div>
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
