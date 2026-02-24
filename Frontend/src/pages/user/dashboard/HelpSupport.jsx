import React from "react";
import { LifeBuoy, MessageSquare, Headset, Bug } from "lucide-react";

const HelpSupport = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <LifeBuoy size={20} className="text-[#FA8112]" />
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
          Support Hub
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-5 flex items-center gap-3">
          <MessageSquare size={18} className="text-[#FA8112]" />
          <span className="font-black text-sm uppercase">Live Chat</span>
        </div>

        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-5 flex items-center gap-3">
          <Headset size={18} className="text-[#FA8112]" />
          <span className="font-black text-sm uppercase">Guides</span>
        </div>

        <div className="bg-[#222222]/40 border border-[#F5E7C6]/10 rounded-2xl p-5 flex items-center gap-3">
          <Bug size={18} className="text-[#FA8112]" />
          <span className="font-black text-sm uppercase">Report Bug</span>
        </div>
      </div>
    </section>
  );
};

export default HelpSupport;
