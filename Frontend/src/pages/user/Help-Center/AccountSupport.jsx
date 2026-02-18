import React from "react";
import { Lock, UserCog, CarFront, UserMinus, ArrowRight } from "lucide-react";

const AccountSupport = () => {
  const accountTopics = [
    { icon: Lock, label: "Change Password", desc: "Security & auth help" },
    { icon: UserCog, label: "Update Profile", desc: "Personal information" },
    { icon: CarFront, label: "Manage Vehicles", desc: "Add or remove cars" },
    { icon: UserMinus, label: "Deactivation", desc: "Account closing help" },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Branding */}
      <div className="flex items-center gap-4 mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="p-3 rounded-xl bg-[#222222] text-[#FAF3E1]">
          <Lock size={20} strokeWidth={2.5} />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Security{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              & Account
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Identity Management
          </p>
        </div>
      </div>

      {/* 2. TOPIC LIST: Tactile Interaction Rows */}
      <div className="space-y-3">
        {accountTopics.map((topic, index) => {
          const Icon = topic.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#F5E7C6]/30 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white transition-all duration-300 group/btn"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2.5 rounded-xl bg-white text-[#222222]/40 group-hover/btn:text-[#FA8112] group-hover/btn:scale-110 transition-all duration-500 shadow-sm">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[11px] font-black text-[#222222] uppercase tracking-wider">
                    {topic.label}
                  </h4>
                  <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {topic.desc}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-[#222222]/10 group-hover/btn:translate-x-1 group-hover/btn:text-[#222222] transition-all"
              />
            </button>
          );
        })}
      </div>

      {/* 3. VIVA FOOTER: MERN Technical Detail */}
      <div className="mt-8 pt-4 flex items-center justify-center gap-2 border-t-2 border-[#FAF3E1]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Auth Service: Fully Synchronized
        </p>
      </div>
    </section>
  );
};

export default AccountSupport;
