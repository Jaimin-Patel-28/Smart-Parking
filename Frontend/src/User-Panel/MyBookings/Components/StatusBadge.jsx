import React from "react";
import { Activity, ShieldAlert, CheckCircle2, Clock, Ban } from "lucide-react";

const StatusBadge = ({ status, className = "" }) => {
  const getStatusConfig = (s) => {
    const state = s?.toLowerCase();
    switch (state) {
      case "active":
        return {
          bg: "bg-emerald-500/5",
          text: "text-emerald-400",
          border: "border-emerald-500/20",
          label: "Active_Session",
          icon: Activity,
          pulse: true,
        };
      case "confirmed":
        return {
          bg: "bg-sky-500/5",
          text: "text-sky-400",
          border: "border-sky-500/20",
          label: "Confirmed_Node",
          icon: CheckCircle2,
        };
      case "completed":
        return {
          bg: "bg-[#FAF3E1]/[0.02]",
          text: "text-[#FAF3E1]/20",
          border: "border-[#F5E7C6]/5",
          label: "Sequence_Finalized",
          icon: CheckCircle2,
        };
      case "cancelled":
      case "error":
        return {
          bg: "bg-rose-500/5",
          text: "text-rose-400",
          border: "border-rose-500/20",
          label: state === "error" ? "System_Failure" : "Registry_Aborted",
          icon: state === "error" ? ShieldAlert : Ban,
        };
      case "pending":
        return {
          bg: "bg-amber-500/5",
          text: "text-amber-400",
          border: "border-amber-500/20",
          label: "Awaiting_Sync",
          icon: Clock,
        };
      default:
        return {
          bg: "bg-[#FAF3E1]/[0.02]",
          text: "text-[#FAF3E1]/10",
          border: "border-[#F5E7C6]/5",
          label: s?.toUpperCase() || "NULL_STATE",
          icon: Activity,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={`
      inline-flex items-center gap-2 px-2.5 py-1 rounded border 
      text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500
      ${config.bg} ${config.text} ${config.border} ${className}
    `}
    >
      {/* 1. SIGNAL LED: High-intensity status dot */}
      <div className="relative flex h-1.5 w-1.5">
        {config.pulse && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-40"></span>
        )}
        <span
          className={`relative inline-flex rounded-full h-1.5 w-1.5 bg-current ${!config.pulse && "opacity-40"}`}
        ></span>
      </div>

      {/* 2. TECHNICAL LABEL */}
      <span className="font-mono">{config.label}</span>

      {/* 3. OPTIONAL ICON: Micro-visual cue */}
      {Icon && <Icon size={10} strokeWidth={3} className="opacity-40" />}
    </div>
  );
};

export default StatusBadge;
