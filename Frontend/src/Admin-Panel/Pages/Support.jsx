import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LifeBuoy, Inbox } from "lucide-react";
import SupportInbox from "../../Shared/Components/SupportInbox";

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      {/* 1. NAVIGATION & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
          >
            <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Back to Dashboard
            </span>
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#FA8112]/10 border border-[#FA8112]/20 text-[#FA8112]">
              <LifeBuoy size={24} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
                Operational Support
              </h2>
              <p className="text-[#FAF3E1]/40 text-sm mt-1">
                Manage and resolve tickets submitted by parkers and staff.
              </p>
            </div>
          </div>
        </div>

        {/* Support Stats Shortcut (Optional UI Polish) */}
        <div className="hidden lg:flex gap-4">
          <div className="px-6 py-3 rounded-xl bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 text-center">
            <p className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 tracking-tighter">
              Queue Status
            </p>
            <p className="text-emerald-400 text-sm font-bold mt-1 uppercase">
              Active
            </p>
          </div>
        </div>
      </div>

      {/* 2. SUPPORT INBOX CONTAINER */}
      <div className="bg-[#FAF3E1]/2 rounded-xl border border-[#F5E7C6]/10 overflow-hidden shadow-2xl">
        {/* Subtle Section Header */}
        <div className="px-6 py-4 border-b border-[#F5E7C6]/5 bg-[#FAF3E1]/2 flex items-center gap-2">
          <Inbox size={18} className="text-[#FA8112]" />
          <h3 className="text-[#FAF3E1] font-semibold text-xs uppercase tracking-widest">
            Triage Command Center
          </h3>
        </div>

        <div className="p-1">
          {" "}
          {/* Tight padding to let the internal Inbox handle its own layout */}
          <SupportInbox
            title="Staff Support Box"
            subtitle="Triage user booking, wallet, and parking issues raised from the User Panel."
          />
        </div>
      </div>

      {/* 3. HELP FOOTER */}
      <div className="text-center">
        <p className="text-[10px] text-[#FAF3E1]/20 font-medium uppercase tracking-[0.3em]">
          Priority tickets are automatically moved to the top of the queue
        </p>
      </div>
    </div>
  );
};

export default Support;
