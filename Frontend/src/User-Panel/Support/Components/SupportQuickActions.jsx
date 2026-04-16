import React from "react";
import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const actions = [
  {
    label: "View Bookings",
    description: "Check history, status, or booking details.",
    to: "/user/bookings",
  },
  {
    label: "Open Wallet",
    description: "Review balance, top-ups, and transactions.",
    to: "/user/wallet",
  },
  {
    label: "See Notifications",
    description: "Look for booking, payment, or system updates.",
    to: "/user/notifications",
  },
  {
    label: "Find Parking",
    description: "Jump back to slot search and booking.",
    to: "/user/find-parking",
  },
];

const SupportQuickActions = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#FAF3E1]">Quick Actions</h3>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
          Fast Track
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {actions.map((action) => (
          <NavLink
            key={action.label}
            to={action.to}
            className="group flex items-start justify-between gap-4 rounded-[1.5rem] border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.03] p-5 transition-all hover:border-[#FA8112]/30 hover:bg-[#FA8112]/10"
          >
            <div>
              <h4 className="font-bold text-[#FAF3E1] group-hover:text-[#FA8112] transition-colors">
                {action.label}
              </h4>
              <p className="mt-2 text-sm leading-6 text-[#FAF3E1]/45">
                {action.description}
              </p>
            </div>
            <ArrowUpRight
              size={18}
              className="mt-1 text-[#FA8112] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default SupportQuickActions;