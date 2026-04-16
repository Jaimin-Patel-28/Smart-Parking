import React from "react";

const faqs = [
  {
    question: "Why does a booking get blocked for extra time?",
    answer:
      "Your booking uses a 15 minute buffer before and after the reserved slot so the same parking space stays conflict-free.",
  },
  {
    question: "How long does a slot stay locked before confirmation?",
    answer:
      "A selected slot is held temporarily for 5 minutes while you complete the booking flow.",
  },
  {
    question: "My wallet top-up is missing. What should I do?",
    answer:
      "Open Wallet from Quick Actions, confirm the transaction status, and mention the transaction time in the support form.",
  },
  {
    question: "Can I update or cancel a booking?",
    answer:
      "Yes, use the booking management screens first. If something fails, send us the booking ID from the support form.",
  },
];

const SupportFaq = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-[#FAF3E1]">FAQ</h3>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FAF3E1]/30">
          Self Help
        </span>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-3xl border border-[#F5E7C6]/5 bg-[#FAF3E1]/3 p-5 open:border-[#FA8112]/25"
          >
            <summary className="cursor-pointer list-none font-bold text-[#FAF3E1] outline-none transition-colors group-open:text-[#FA8112]">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-[#FAF3E1]/45">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default SupportFaq;