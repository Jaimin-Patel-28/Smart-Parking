import {
  HelpCircle,
  ChevronRight,
  Plus,
  Wallet,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import { Link } from "react-router-dom";

const FAQShortcut = () => {
  const faqs = [
    {
      question: "How do I book a parking slot?",
      icon: CalendarClock,
      hint: "Search area, select slot, and confirm time.",
    },
    {
      question: "Can I cancel my booking?",
      icon: Plus,
      hint: "Cancellations allowed up to 30 mins before.",
    },
    {
      question: "Is my payment secure?",
      icon: ShieldCheck,
      hint: "Encrypted transactions via SSL & UPI.",
    },
    {
      question: "How do I use the Smart Wallet?",
      icon: Wallet,
      hint: "Top up via dashboard to pay instantly.",
    },
  ];

  return (
    <section className="relative">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#FA8112] text-[#FAF3E1]">
            <HelpCircle size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#222222] tracking-tighter">
              Quick Answers
            </h2>
            <p className="text-[#FA8112] text-[10px] font-black uppercase tracking-[0.2em] mt-1">
              Frequently Asked Questions
            </p>
          </div>
        </div>
        <Link
          to="/faqs"
          className="hidden sm:flex items-center gap-2 text-[#222222] font-black text-xs uppercase tracking-widest border-b-2 border-[#222222]/10 hover:border-[#FA8112] transition-all"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          return (
            <div
              key={index}
              className="p-8 rounded-4xl bg-white border-2 border-[#222222]/5 hover:border-[#222222] transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="flex items-start gap-5">
                <div className="mt-1 p-2.5 rounded-xl bg-[#F5E7C6] text-[#222222]/40 group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all">
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className="text-[#222222] font-black text-lg tracking-tight mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-[#222222]/40 text-sm font-medium leading-relaxed">
                    {faq.hint}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQShortcut;
