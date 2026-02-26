import React from "react";
import { Sparkles, Car, BellRing, UserCheck } from "lucide-react";

const ProfileTips = () => {
  const tips = [
    { icon: UserCheck, title: "Complete Profile" },
    { icon: Car, title: "Add Vehicle" },
    { icon: BellRing, title: "Enable Alerts" },
  ];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Sparkles size={18} className="text-[#FA8112]" />
        <h3 className="text-lg font-black uppercase tracking-tight">
          Optimization Stack
        </h3>
      </div>

      <div className="flex flex-col gap-3">
        {tips.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-xl p-4"
          >
            <t.icon size={16} className="text-[#FA8112]" />
            <span className="text-sm font-bold">{t.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfileTips;
