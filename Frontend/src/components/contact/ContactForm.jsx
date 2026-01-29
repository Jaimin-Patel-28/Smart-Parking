import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  MessageSquareText,
  AlertCircle,
} from "lucide-react";

const ContactForm = () => {
  const [status, setStatus] = useState("idle"); // idle, submitting, success
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulating a MERN backend API call
    setTimeout(() => {
      console.log("MERN Backend received:", formData);
      setStatus("success");
      // Reset form after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  if (status === "success") {
    return (
      <div className="bg-slate-800/40 border border-emerald-500/30 p-12 rounded-[2.5rem] text-center space-y-4 backdrop-blur-sm">
        <div className="flex justify-center">
          <CheckCircle2 size={60} className="text-emerald-400 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
        <p className="text-slate-400">
          Our support team in Anand will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/20 p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-cyan-400/10 text-cyan-400">
          <MessageSquareText size={24} />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Send Us a Message
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 outline-none transition-all"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="relative">
          <select
            required
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-slate-400 focus:text-white focus:border-cyan-400 outline-none transition-all appearance-none"
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          >
            <option value="" className="bg-slate-900">
              Select Subject
            </option>
            <option value="Inquiry" className="bg-slate-900">
              General Inquiry
            </option>
            <option value="Booking" className="bg-slate-900">
              Booking Issue
            </option>
            <option value="Wallet" className="bg-slate-900">
              Wallet & Payment
            </option>
            <option value="Partner" className="bg-slate-900">
              Partnership
            </option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
            <AlertCircle size={18} />
          </div>
        </div>

        <textarea
          placeholder="Describe your query in detail..."
          rows="4"
          required
          className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:border-cyan-400 outline-none transition-all resize-none"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg ${
            status === "submitting"
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-cyan-400 hover:bg-cyan-300 text-slate-900 shadow-cyan-500/20"
          }`}
        >
          {status === "submitting" ? "Processing..." : "Submit Message"}
          <Send
            size={18}
            className={status === "submitting" ? "animate-pulse" : ""}
          />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
