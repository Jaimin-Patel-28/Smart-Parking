import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
      {/* TEXT CONTENT: Bold and editorial */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
          <Sparkles size={22} className="text-[#FA8112] animate-pulse" />
          <h4 className="text-[#222222] font-black text-2xl tracking-tighter uppercase">
            Stay in the Loop
          </h4>
        </div>
        <p className="text-[#222222]/60 text-lg font-medium max-w-sm mx-auto lg:mx-0 leading-relaxed">
          Get real-time parking updates and smart city tips delivered straight
          to your inbox.
        </p>
      </div>

      {/* SUBSCRIPTION FORM: High-contrast and tactile */}
      <form
        onSubmit={handleSubscribe}
        className="flex-1 w-full max-w-lg relative group"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-2.5 bg-white border-2 border-[#222222]/5 rounded-4xl focus-within:border-[#222222] transition-all duration-500 shadow-sm gap-3 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="grow bg-transparent border-none outline-none px-6 py-4 sm:py-0 text-[#222222] text-lg font-medium placeholder:text-[#222222]/30 w-full"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-3 px-10 py-4 sm:py-3.5 bg-[#222222] hover:bg-[#FA8112] text-[#FAF3E1] font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl transition-all duration-300 active:scale-95 whitespace-nowrap shadow-lg shadow-[#222222]/10"
          >
            <span>Subscribe</span>
            <Send
              size={18}
              strokeWidth={3}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>

        {/* Privacy Note: Styled as an authentic foot-note */}
        <p className="mt-5 text-center sm:text-left text-[10px] text-[#222222]/40 font-black uppercase tracking-[0.2em]">
          🔒 Secure • No Spam • Unsubscribe Anytime
        </p>
      </form>
    </div>
  );
};

export default FooterNewsletter;
