import React from "react";
import {
  Search,
  PlusCircle,
  CalendarDays,
  Wallet,
  ArrowRight,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Search,
      label: "Find Parking",
      desc: "Locate nearby nodes",
      route: "/user/find-parking",
    },
    {
      icon: PlusCircle,
      label: "Book Slot",
      desc: "Instant reservation",
      route: "/user/find-parking",
    },
    {
      icon: CalendarDays,
      label: "My Bookings",
      desc: "Manage sessions",
      route: "/user/bookings",
    },
    {
      icon: Wallet,
      label: "Add Money",
      desc: "Top up credits",
      route: "/user/wallet",
    },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
          <Zap size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">
            Quick Actions
          </h2>
          <p className="text-sm text-[#6B6B6B]">Frequently used operations</p>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-5">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className="group flex flex-col items-start p-5 rounded-xl border border-[#F5E7C6] hover:border-[#FA8112]/40 hover:shadow-sm transition-all text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112] mb-4">
              <action.icon size={18} />
            </div>

            <h4 className="text-sm font-medium text-[#222222]">
              {action.label}
            </h4>

            <p className="text-xs text-[#6B6B6B] mt-1">{action.desc}</p>

            <ArrowRight
              size={16}
              className="mt-4 text-[#6B6B6B] group-hover:text-[#FA8112] group-hover:translate-x-1 transition"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
