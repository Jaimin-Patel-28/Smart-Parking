import React from "react";
import { HelpCircle, ChevronRight, Zap } from "lucide-react";

const FAQShortcut = () => {
  const faqs = [
    {
      q: "How do I add funds to my Smart Wallet?",
      a: "Go to Profile > Wallet and use any UPI or Card to top up instantly.",
    },
    {
      q: "Can I extend my booking remotely?",
      a: "Yes, use the 'Extend' button in your Active Bookings tab anytime.",
    },
    {
      q: "What if someone else is in my spot?",
      a: "Tap 'Report Issue' in-app; our real-time system will reassign you immediately.",
    },
  ];

  return (
    <section className="relative">
      {/* SECTION HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-md">
          <aside className="inline-flex items-center gap-2 bg-[#FA8112]/10 border border-[#FA8112]/20 px-3 py-1.5 rounded-full mb-4">
            <HelpCircle size={14} className="text-[#FA8112]" />
            <span className="text-[#FA8112] text-[10px] font-bold tracking-[0.2em] uppercase">
              Quick Support
            </span>
          </aside>
          <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
            Common <span className="text-[#FA8112]">Questions.</span>
          </h2>
        </div>

        <a
          href="#faqs"
          className="text-[#FAF3E1]/40 hover:text-[#FA8112] text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 transition-all group"
        >
          View Full Help Center
          <ChevronRight
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </header>

      {/* FAQ GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {faqs.map((faq, index) => (
          <article
            key={index}
            className="p-6 rounded-3xl bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 transition-all duration-500 group"
          >
            <header className="mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2a2a2a] border border-[#F5E7C6]/5 flex items-center justify-center text-[#FA8112] mb-4">
                <Zap size={14} strokeWidth={2.5} />
              </div>
              <h3 className="text-[#FAF3E1] text-sm font-bold leading-tight group-hover:text-[#FA8112] transition-colors">
                {faq.q}
              </h3>
            </header>
            <p className="text-[#FAF3E1]/40 text-xs leading-relaxed">{faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FAQShortcut;
