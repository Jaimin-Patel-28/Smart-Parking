import React from "react";
import { Search, PlusCircle, CalendarDays, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: Search, label: "Find", route: "/user/find-parking" },
    { icon: PlusCircle, label: "Book", route: "/user/find-parking" },
    { icon: CalendarDays, label: "Sessions", route: "/user/bookings" },
    { icon: Wallet, label: "Wallet", route: "/user/wallet" },
  ];

  return (
    <section className="flex flex-col gap-4 h-full">
      <div>
        <p className="text-[9px] uppercase tracking-[0.3em] text-[#222222]/60">
          Control Panel
        </p>
        <h3 className="text-xl font-black uppercase tracking-tight">
          Quick Actions
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 grow">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={() => navigate(a.route)}
            className="flex flex-col justify-between bg-[#222222]/10 rounded-2xl p-4 hover:bg-[#222222] hover:text-[#FAF3E1] transition-all"
          >
            <a.icon size={20} className="text-[#FA8112]" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
