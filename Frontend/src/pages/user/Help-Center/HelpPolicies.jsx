import React from "react";
import { Scale, FileText, Undo2, ShieldAlert, ArrowRight } from "lucide-react";

const HelpPolicies = () => {
  const policies = [
    {
      icon: Undo2,
      label: "Cancellation Policy",
      desc: "View time-frames & grace periods",
    },
    {
      icon: Scale,
      label: "Refund Policy",
      desc: "Processing times & wallet credits",
    },
    {
      icon: ShieldAlert,
      label: "Parking Rules",
      desc: "Conduct & safety in Anand City spots",
    },
    {
      icon: FileText,
      label: "Terms & Conditions",
      desc: "Legal framework & usage rights",
    },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Style */}
      <div className="flex items-center gap-4 mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="p-3 rounded-xl bg-[#222222] text-[#FAF3E1]">
          <Scale size={20} strokeWidth={2.5} />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Legal{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Guidelines
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Compliance & Rules
          </p>
        </div>
      </div>

      {/* 2. POLICY LINKS: Tactile Interaction List */}
      <div className="space-y-4">
        {policies.map((policy, index) => {
          const Icon = policy.icon;
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
                    {policy.label}
                  </h4>
                  <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {policy.desc}
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

      {/* 3. VIVA SIGNATURE: Technical Detail */}
      <div className="mt-8 pt-4 flex items-center justify-center gap-2 border-t-2 border-[#FAF3E1]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#FA8112]"></div>
        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Anand Smart City Regulatory Sync
        </p>
      </div>
    </section>
  );
};

export default HelpPolicies;
