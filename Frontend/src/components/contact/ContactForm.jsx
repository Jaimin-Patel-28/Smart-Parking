import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  MessageSquareText,
  AlertCircle,
} from "lucide-react";

const ContactForm = () => {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-white border-2 border-[#222222] p-16 rounded-[3rem] text-center space-y-6 shadow-2xl">
        <CheckCircle2
          size={80}
          className="text-[#FA8112] mx-auto animate-bounce"
        />
        <h3 className="text-4xl font-black text-[#222222] tracking-tighter">
          Message Sent!
        </h3>
        <p className="text-[#222222]/60 font-medium text-lg">
          Our team in Anand will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-[#FA8112] font-black uppercase tracking-widest text-xs border-b-2 border-[#FA8112]"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 md:p-14 rounded-[3rem] border-2 border-[#222222]/5 shadow-sm hover:shadow-2xl transition-all duration-700">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 rounded-2xl bg-[#F5E7C6] text-[#FA8112]">
          <MessageSquareText size={28} />
        </div>
        <h2 className="text-3xl font-black text-[#222222] tracking-tighter">
          Send Us a Message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="bg-[#FAF3E1] border-2 border-transparent rounded-2xl px-6 py-4 text-[#222222] font-bold focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/30"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="bg-[#FAF3E1] border-2 border-transparent rounded-2xl px-6 py-4 text-[#222222] font-bold focus:border-[#222222] outline-none transition-all placeholder:text-[#222222]/30"
          />
        </div>
        <div className="relative">
          <select
            required
            className="w-full bg-[#FAF3E1] border-2 border-transparent rounded-2xl px-6 py-4 text-[#222222] font-bold focus:border-[#222222] outline-none transition-all appearance-none"
          >
            <option value="">Select Subject</option>
            <option value="Inquiry">General Inquiry</option>
            <option value="Booking">Booking Issue</option>
            <option value="Wallet">Wallet & Payment</option>
          </select>
          <AlertCircle
            size={18}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#222222]/20"
          />
        </div>
        <textarea
          placeholder="How can we help?"
          rows="4"
          required
          className="w-full bg-[#FAF3E1] border-2 border-transparent rounded-2xl px-6 py-4 text-[#222222] font-bold focus:border-[#222222] outline-none transition-all resize-none placeholder:text-[#222222]/30"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-5 bg-[#222222] text-[#FAF3E1] rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-[#FA8112] transition-all active:scale-95 shadow-lg"
        >
          {status === "submitting" ? "Processing..." : "Submit Message"}
          <Send size={18} strokeWidth={3} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
