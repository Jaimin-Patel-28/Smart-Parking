import React from "react";
import {
  LifeBuoy,
  Bug,
  Headset,
  ExternalLink,
  MessageSquare,
} from "lucide-react";

const HelpSupport = () => {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#F5E7C6]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
          <LifeBuoy size={18} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">Need Help?</h2>
          <p className="text-sm text-[#6B6B6B]">24/7 support available</p>
        </div>
      </div>

      {/* Support Options */}
      <div className="space-y-4 mb-6">
        {/* Live Chat */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[#F5E7C6] hover:bg-[#FAF3E1] transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
              <MessageSquare size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#222222]">Live Chat</p>
              <p className="text-xs text-[#6B6B6B]">
                Average wait time: 2 mins
              </p>
            </div>
          </div>
          <ExternalLink size={16} className="text-[#6B6B6B]" />
        </div>

        {/* Knowledge Base */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-[#F5E7C6] hover:bg-[#FAF3E1] transition cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FA8112]/10 flex items-center justify-center text-[#FA8112]">
              <Headset size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-[#222222]">
                Knowledge Base
              </p>
              <p className="text-xs text-[#6B6B6B]">FAQs & guides</p>
            </div>
          </div>
          <ExternalLink size={16} className="text-[#6B6B6B]" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 py-3 border border-[#F5E7C6] rounded-lg text-sm text-[#6B6B6B] hover:bg-[#FAF3E1] transition">
          <Bug size={16} />
          Report Bug
        </button>

        <button className="flex items-center justify-center gap-2 py-3 bg-[#FA8112] hover:bg-[#e6730f] text-white rounded-lg text-sm transition">
          <Headset size={16} />
          Call Support
        </button>
      </div>
    </section>
  );
};

export default HelpSupport;
