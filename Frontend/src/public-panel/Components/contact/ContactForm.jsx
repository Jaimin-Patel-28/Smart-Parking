import React, { useState } from "react";
import { Send, User, Mail, MessageSquare, Terminal, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import backendUrl from "../../../Shared/config/backendUrl";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="relative bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 p-8 md:p-12 rounded-[3rem] shadow-2xl overflow-hidden group">
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
        onSubmit={handleSubmit}
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
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
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
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
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
            name="subject"
            placeholder="Subject (e.g., Booking Issue, Tech Support)"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-2xl py-4 pl-12 pr-4 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm"
          />
        </div>

        {/* MESSAGE */}
        <div className="relative group/input">
          <textarea
            rows="5"
            name="message"
            placeholder="How can our MERN experts assist you today?"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full bg-[#2a2a2a]/40 border border-[#F5E7C6]/5 rounded-4xl p-6 text-[#FAF3E1] placeholder:text-[#FAF3E1]/20 focus:outline-none focus:border-[#FA8112]/40 focus:bg-[#2a2a2a]/60 transition-all text-sm resize-none"
          ></textarea>
        </div>

        {/* SUBMIT BUTTON */}
        <button 
          type="submit"
          disabled={isSubmitting}
          className="relative mt-4 bg-[#FA8112] text-[#222222] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 overflow-hidden group/btn hover:shadow-[0_0_30px_rgba(250,129,18,0.3)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center gap-3">
            {isSubmitting ? 'Sending...' : 'Dispatch Message'}
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#222222]"></div>
            ) : (
              <Send
                size={18}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            )}
          </span>
          {/* Animated Highlight */}
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
        </button>
      </form>
    </article>
  );
};

export default ContactForm;
