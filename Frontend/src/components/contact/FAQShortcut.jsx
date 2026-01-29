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
    <section className="relative group">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400">
            <HelpCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Quick Answers
            </h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-0.5">
              Frequently Asked Questions
            </p>
          </div>
        </div>

        <Link
          to="/faqs"
          className="hidden sm:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      {/* FAQ GRID/LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          return (
            <div
              key={index}
              className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-400/30 hover:bg-slate-800/50 transition-all duration-300 group/item cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-slate-900 text-slate-500 group-hover/item:text-cyan-400 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm group-hover/item:text-cyan-400 transition-colors">
                    {faq.question}
                  </h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    {faq.hint}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE CTA */}
      <div className="mt-8 sm:hidden">
        <Link
          to="/faqs"
          className="w-full py-4 bg-slate-800 border border-slate-700 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2"
        >
          View Full FAQ Center <ChevronRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default FAQShortcut;
