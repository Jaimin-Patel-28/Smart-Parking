import React from "react";
import { Send, User, Mail, MessageSquare, Terminal } from "lucide-react";

const ContactForm = () => {
  return (
    <article className="relative bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/10 p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-hidden group">
      {/* Decorative Corner Glow */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FA8112]/5 blur-[80px] rounded-full pointer-events-none" />

      <header className="mb-10">
        <aside className="flex items-center gap-2 mb-4">
          <Terminal size={14} className="text-[#FA8112]" />
          <span className="text-[#FAF3E1]/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            Direct Channel
          </span>
        </aside>
        <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
          Send a <span className="text-[#FA8112]">Message.</span>
        </h2>
      </header>

      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* NAME & EMAIL ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group/input">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within/input:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm"
            />
          </div>
          <div className="relative group/input">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within/input:text-[#FA8112] transition-colors"
              size={18}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm"
            />
          </div>
        </div>

        {/* SUBJECT */}
        <div className="relative group/input">
          <MessageSquare
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF3E1]/20 group-focus-within/input:text-[#FA8112] transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Subject (e.g., Booking Issue, Tech Support)"
            className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm"
          />
        </div>

        {/* MESSAGE */}
        <div className="relative group/input">
          <textarea
            rows="5"
            placeholder="How can our MERN experts assist you today?"
            className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-[2rem] p-6 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm resize-none"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="relative mt-4 bg-[#FA8112] text-[#222222] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 overflow-hidden group/btn hover:shadow-[0_0_30px_rgba(250,129,18,0.3)] transition-all active:scale-95">
          <span className="relative z-10 flex items-center gap-3">
            Dispatch Message
            <Send
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </span>
          {/* Animated Highlight */}
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
        </button>
      </form>
    </article>
  );
};

export default ContactForm;
