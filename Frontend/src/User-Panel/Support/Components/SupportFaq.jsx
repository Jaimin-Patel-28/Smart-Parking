import React from "react";
import { HelpCircle, ChevronRight, Terminal, Activity } from "lucide-react";

const faqs = [
  {
    id: "LOG_01",
    question: "Why does a booking get blocked for extra time?",
    answer:
      "Your allocation includes a mandatory 15-minute temporal buffer before and after the reservation window. This protocol ensures zero-latency transitions between mobility units.",
  },
  {
    id: "LOG_02",
    question: "How long does a slot stay locked before confirmation?",
    answer:
      "Nodes are held in a 'Awaiting_Confirmation' state for 300 seconds (5 minutes). If the handshake is not finalized within this cycle, the allocation is auto-released to the grid.",
  },
  {
    id: "LOG_03",
    question: "My wallet top-up is missing. What should I do?",
    answer:
      "Access the 'Ledger' sector from Quick Actions to verify transaction hashes. If status remains 'Unsynced', initiate a support ticket with the exact ISO timestamp.",
  },
  {
    id: "LOG_04",
    question: "Can I update or cancel a booking?",
    answer:
      "Modifications must be initiated via the Registry sector. For critical sequence failures, transmit the specific Node_UID using the support console below.",
  },
];

const SupportFaq = () => {
  // Theme: BG #222222 | Accent #FA8112 | Border #F5E7C6/5

  return (
    <section className="space-y-6 animate-in fade-in duration-700">
      {/* 1. SECTOR HEADER */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Terminal size={14} className="text-[#FA8112]/60" />
          <h3 className="text-[10px] font-bold text-[#FAF3E1] uppercase tracking-[0.4em]">
            Knowledge_Base
          </h3>
        </div>
        <div className="flex items-center gap-2 opacity-20">
          <Activity size={10} />
          <span className="text-[8px] font-mono font-bold uppercase tracking-widest">
            Ready_State
          </span>
        </div>
      </div>

      {/* 2. ACCORDION REGISTRY */}
      <div className="space-y-3 px-1">
        {faqs.map((faq) => (
          <details
            key={faq.id}
            className="group rounded-xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01] overflow-hidden transition-all duration-500 open:bg-[#FAF3E1]/[0.03] open:border-[#FA8112]/20 shadow-2xl"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none p-6 outline-none transition-all">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-[#FA8112]/40 font-bold group-open:text-[#FA8112]">
                  {faq.id}
                </span>
                <span className="text-sm font-bold text-[#FAF3E1]/80 group-hover:text-[#FAF3E1] transition-colors group-open:text-[#FA8112]">
                  {faq.question}
                </span>
              </div>
              <ChevronRight
                size={16}
                className="text-[#FAF3E1]/10 transition-transform duration-500 group-open:rotate-90 group-open:text-[#FA8112]"
              />
            </summary>

            <div className="px-6 pb-6 pt-0 animate-in slide-in-from-top-2 duration-500">
              <div className="h-px w-full bg-[#F5E7C6]/5 mb-6" />
              <div className="flex gap-4">
                <HelpCircle
                  size={14}
                  className="text-[#FA8112]/30 shrink-0 mt-1"
                />
                <p className="text-[12px] leading-relaxed text-[#FAF3E1]/40 font-medium uppercase tracking-wide">
                  {faq.answer}
                </p>
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* 3. SYSTEM DECOR */}
      <div className="flex items-center justify-center pt-2 opacity-5">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FAF3E1]" />
        <Terminal size={14} className="mx-4" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FAF3E1]" />
      </div>
    </section>
  );
};

export default SupportFaq;
