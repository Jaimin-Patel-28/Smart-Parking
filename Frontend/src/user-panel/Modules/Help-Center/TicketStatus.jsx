import React from "react";
import { Ticket, Clock, CheckCircle2, ArrowRight } from "lucide-react";

const TicketStatus = () => {
  // Mock data for your MERN project presentation
  const ticket = {
    id: "TK-7702-SP",
    status: "In Progress",
    date: "Feb 17, 2026",
    update: "Agent is reviewing your wallet refund request.",
  };

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Style */}
      <div className="flex items-center justify-between mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Ticket{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Status
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Support Tracking
          </p>
        </div>
        <div className="p-3 rounded-xl bg-[#F5E7C6] text-[#222222] group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500">
          <Ticket size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* 2. MAIN STATUS CARD: Content-Rich Layout */}
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-[#FAF3E1]/50 rounded-2xl border-2 border-dashed border-[#222222]/5">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-[#222222]/30 uppercase tracking-widest">
              Reference ID
            </p>
            <p className="text-xs font-black text-[#222222]">{ticket.id}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#222222]/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FA8112] animate-pulse"></span>
            <span className="text-[9px] font-black text-[#222222] uppercase tracking-widest">
              {ticket.status}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 text-[#FA8112]">
              <Clock size={16} />
            </div>
            <div>
              <p className="text-[9px] font-black text-[#222222]/30 uppercase tracking-widest">
                Submitted On
              </p>
              <p className="text-xs font-bold text-[#222222]/60">
                {ticket.date}
              </p>
            </div>
          </div>

          <p className="text-xs font-medium text-[#222222]/50 leading-relaxed bg-white p-4 rounded-xl border-2 border-[#222222]/5">
            "{ticket.update}"
          </p>
        </div>
      </div>

      {/* 3. ACTION & FOOTER: MERN Technical Detail */}
      <div className="mt-8">
        <button className="w-full flex items-center justify-between px-6 py-4 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#FA8112] transition-all active:scale-95 group/btn shadow-lg shadow-[#222222]/10">
          <span>View Ticket History</span>
          <ArrowRight
            size={16}
            strokeWidth={3}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </button>

        <div className="mt-6 flex items-center justify-center gap-2">
          <CheckCircle2 size={12} className="text-emerald-500" />
          <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
            Helpdesk Database Sync: Active
          </p>
        </div>
      </div>
    </section>
  );
};

export default TicketStatus;
