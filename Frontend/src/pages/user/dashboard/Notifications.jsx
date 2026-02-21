import React from "react";
import { Bell, Clock, CreditCard, ShieldAlert } from "lucide-react";

const Notifications = () => {
  const alerts = [
    {
      id: 1,
      icon: Clock,
      title: "Booking Reminder",
      msg: "Your session at Anand Central P-104 ends in 15 mins.",
      time: "Now",
      isNew: true,
    },
    {
      id: 2,
      icon: CreditCard,
      title: "Payment Alert",
      msg: "Credits deducted for last session (₹45.00).",
      time: "2h ago",
      isNew: false,
    },
    {
      id: 3,
      icon: ShieldAlert,
      title: "System Message",
      msg: "Security patch updated for Gujarat Hub Node.",
      time: "5h ago",
      isNew: false,
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
            <Bell size={18} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#222222]">
              Notifications
            </h2>
            <p className="text-sm text-[#6B6B6B]">Recent updates and alerts</p>
          </div>
        </div>

        <button className="text-sm text-[#FA8112] hover:underline">
          Clear all
        </button>
      </div>

      {/* Notification List */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {alerts.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-4 rounded-xl border border-[#F5E7C6] hover:bg-[#FAF3E1] transition cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
              <item.icon size={16} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-[#222222]">
                  {item.title}
                </h4>
                <span className="text-xs text-[#6B6B6B]">{item.time}</span>
              </div>

              <p className="text-sm text-[#6B6B6B]">{item.msg}</p>
            </div>

            {item.isNew && (
              <span className="w-2 h-2 bg-[#FA8112] rounded-full mt-2"></span>
            )}
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <button className="w-full mt-5 py-3 bg-[#FA8112] hover:bg-[#e6730f] text-white rounded-lg text-sm transition">
        View All Notifications
      </button>
    </section>
  );
};

export default Notifications;
