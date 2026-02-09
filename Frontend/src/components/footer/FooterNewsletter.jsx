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
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8 px-2">
      {/* TEXT CONTENT */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
          <Sparkles size={20} className="text-cyan-400 animate-pulse" />
          <h4 className="text-white font-black text-xl tracking-tight uppercase">
            Stay in the Loop
          </h4>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-sm mx-auto lg:mx-0 leading-relaxed">
          Get real-time parking updates and smart city tips delivered straight
          to your inbox.
        </p>
      </div>

      {/* SUBSCRIPTION FORM */}
      <form
        onSubmit={handleSubscribe}
        className="flex-1 w-full max-w-md relative group"
      >
        {/* Responsive Container: Stacked on mobile, row on md+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center p-2 bg-slate-900 border border-slate-800 rounded-4xl focus-within:border-cyan-400/50 transition-all duration-500 shadow-2xl gap-3 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="grow bg-transparent border-none outline-none px-6 py-4 sm:py-0 text-slate-200 text-base placeholder:text-slate-600 w-full"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-3 px-8 py-4 sm:py-3 bg-cyan-400 hover:bg-white text-slate-950 font-black uppercase text-xs tracking-widest rounded-3xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] active:scale-95 whitespace-nowrap"
          >
            <span>Subscribe</span>
            <Send
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-center sm:text-left text-[10px] text-slate-600 font-bold uppercase tracking-widest">
          🔒 Secure • No Spam • Unsubscribe Anytime
        </p>
      </form>
    </div>
  );
};

export default FooterNewsletter;
