import React from "react";
import { HelpCircle, Bug, PhoneCall, ArrowRight } from "lucide-react";

const NotificationsSupport = () => {
  const supportActions = [
    { icon: HelpCircle, label: "Notification FAQs", sub: "Common questions" },
    { icon: Bug, label: "Report Issue", sub: "Technical feedback" },
    { icon: PhoneCall, label: "Contact Support", sub: "Live assistance" },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. HEADER: Editorial Branding */}
      <div className="space-y-2 mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
          Need{" "}
          <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
            Assistance?
          </span>
        </h2>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
          Support & Feedback Hub
        </p>
      </div>

      {/* 2. ACTION LIST: Tactile Buttons */}
      <div className="space-y-3">
        {supportActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#FAF3E1]/50 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white transition-all duration-300 group/btn"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="p-2.5 rounded-xl bg-white text-[#222222]/40 group-hover/btn:text-[#FA8112] group-hover/btn:scale-110 transition-all duration-500 shadow-sm">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#222222] uppercase tracking-wider">
                    {action.label}
                  </h4>
                  <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {action.sub}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-[#222222]/20 group-hover/btn:translate-x-1 group-hover/btn:text-[#222222] transition-all"
              />
            </button>
          );
        })}
      </div>

      {/* 3. VIVA FOOTER: Technical Branding */}
      <div className="mt-8 pt-6 border-t-2 border-[#FAF3E1] flex items-center justify-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          Helpdesk Online &bull; Anand Node
        </p>
      </div>
    </section>
  );
};

export default NotificationsSupport;
