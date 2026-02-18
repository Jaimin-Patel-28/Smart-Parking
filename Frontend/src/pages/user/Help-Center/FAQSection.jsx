import React from "react";
import FAQItem from "./FAQItem";
import { MessageSquareText, Sparkles } from "lucide-react";

const FAQSection = () => {
  // Mock data representing common SmartPark queries
  const faqs = [
    {
      question: "How do I extend my parking session?",
      answer:
        "Navigate to your 'Active Session' card on the dashboard and select 'Extend'. You can add time in 30-minute increments using your wallet balance.",
      linkLabel: "Extend Session Guide",
    },
    {
      question: "What happens if I overstay my booking?",
      answer:
        "Overstaying triggers a grace period of 10 minutes. Following this, a premium tariff is applied automatically from your linked wallet.",
      linkLabel: "View Penalty Rates",
    },
  ];

  return (
    <section className="space-y-10">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#222222] text-[#FAF3E1]">
            <MessageSquareText size={18} strokeWidth={2.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
              Common{" "}
              <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
                Questions
              </span>
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
              Frequently Asked
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[#FA8112]/40">
          <Sparkles size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest italic">
            Smart Solutions
          </span>
        </div>
      </div>

      {/* FAQ FEED */}
      <div className="grid grid-cols-1 gap-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            linkLabel={faq.linkLabel}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
