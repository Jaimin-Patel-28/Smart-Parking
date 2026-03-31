import React from "react";
import { Activity } from "lucide-react";

// Accept 'data' prop from Dashboard.jsx
const SystemStatus = ({ data = {} }) => {
  // Format the API data or fall back to defaults if data hasn't arrived
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

  // Helper function to determine color based on system load
  const getStatusColor = (load) => {
    if (load > 90) return "bg-rose-500"; // Critical
    if (load > 70) return "bg-amber-500"; // Warning
    return "bg-emerald-500"; // Healthy
  };

  const getTextColor = (load) => {
    if (load > 90) return "text-rose-600";
    if (load > 70) return "text-amber-600";
    return "text-emerald-600";
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800">System Health</h3>
        <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
          <Activity
            size={18}
            className={data ? "animate-pulse text-emerald-500" : ""}
          />
        </div>
      </div>

      <div className="space-y-6">
        {systems.map((sys, i) => (
          <div key={i} className="group">
            <div className="flex justify-between text-sm mb-2 items-end">
              <div>
                <span className="block font-bold text-slate-700">
                  {sys.name}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-tight">
                  Current Load
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-md bg-opacity-10 ${getTextColor(sys.load)} ${getStatusColor(sys.load).replace("bg-", "bg-opacity-10 bg-")}`}
                >
                  {sys.status}
                </span>
                <span className="block text-[11px] font-mono text-slate-500 mt-1">
                  {sys.load}%
                </span>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${getStatusColor(sys.load)}`}
                style={{ width: `${sys.load}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Hardware Version Tag */}
      <div className="mt-8 pt-4 border-t border-slate-50">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
          <span>Kernel: v2.4.0-stable</span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            Encrypted
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
