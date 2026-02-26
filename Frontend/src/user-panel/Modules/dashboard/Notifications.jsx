import React from "react";
import { Bell, Clock } from "lucide-react";

const formatTimeAgo = (timestamp) => {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return "Now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

const Notifications = ({ alerts = [] }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Bell size={20} className="text-[#FA8112]" />
        <h3 className="text-xl font-black uppercase tracking-tight">
          Live Feed
        </h3>
      </div>

      <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <Clock size={14} className="text-[#FA8112]" />
              <span className="text-sm font-bold">{a.title}</span>
            </div>

            <span className="text-[10px] text-[#FAF3E1]/30 uppercase">
              {formatTimeAgo(a.time)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notifications;
