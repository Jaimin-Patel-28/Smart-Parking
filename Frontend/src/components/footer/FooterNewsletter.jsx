import React, { useState } from "react";
import { Send, Sparkles } from "lucide-react";

const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Since you are working on the MERN stack, you'll eventually
    // connect this to your Express/MongoDB backend here.
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* TEXT CONTENT */}
      <div className="flex-1 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
          <Sparkles size={18} className="text-cyan-400" />
          <h4 className="text-white font-bold text-lg tracking-tight">
            Stay in the Loop
          </h4>
        </div>
        <p className="text-slate-400 text-sm max-w-sm">
          Get real-time parking updates, smart city tips, and exclusive offers
          delivered straight to your inbox.
        </p>
      </div>

      {/* SUBSCRIPTION FORM */}
      <form
        onSubmit={handleSubscribe}
        className="flex-1 w-full max-w-md relative group"
      >
        <div className="flex items-center p-1.5 bg-slate-900 border border-slate-700 rounded-2xl focus-within:border-cyan-400/50 transition-all duration-300 shadow-inner">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="grow bg-transparent border-none outline-none px-4 text-slate-200 text-sm placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] active:scale-95"
          >
            <span>Subscribe</span>
            <Send
              size={16}
              className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Subtle helper text */}
        <p className="absolute -bottom-6 left-2 text-[10px] text-slate-600 font-medium italic">
          We value your privacy. No spam, ever.
        </p>
      </form>
    </div>
  );
};

export default FooterNewsletter;
