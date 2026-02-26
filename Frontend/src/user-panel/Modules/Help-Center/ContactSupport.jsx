import React from "react";
import { Mail, MessageCircle, Phone, Clock, ArrowRight } from "lucide-react";

const ContactSupport = () => {
  const contacts = [
    {
      icon: Mail,
      label: "Email Support",
      value: "help@smartpark.in",
      sub: "Response within 2 hours",
    },
    {
      icon: MessageCircle,
      label: "Live Chat",
      value: "Instant Messaging",
      sub: "Available 24/7",
    },
    {
      icon: Phone,
      label: "Phone Support",
      value: "+91 2692 234XXX",
      sub: "Anand City Helpline",
    },
  ];

  return (
    <section className="bg-white rounded-[2.5rem] border-2 border-[#222222]/5 p-8 shadow-sm transition-all duration-500 hover:shadow-xl group">
      {/* 1. SECTION HEADER: Editorial Style */}
      <div className="flex items-center gap-4 mb-8 border-b-2 border-[#FAF3E1] pb-6">
        <div className="p-3 rounded-xl bg-[#222222] text-[#FAF3E1]">
          <Phone size={20} strokeWidth={2.5} />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-black text-[#222222] tracking-tighter">
            Direct{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Connect
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Live Assistance
          </p>
        </div>
      </div>

      {/* 2. CONTACT OPTIONS: Tactile Interaction Rows */}
      <div className="space-y-3">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center justify-between p-5 rounded-2xl bg-[#F5E7C6]/30 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white transition-all duration-300 group/btn text-left"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white text-[#222222]/40 group-hover/btn:text-[#FA8112] group-hover/btn:scale-110 transition-all duration-500 shadow-sm">
                  <Icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-[#222222] uppercase tracking-widest">
                    {contact.label}
                  </h4>
                  <p className="text-sm font-black text-[#222222]/80">
                    {contact.value}
                  </p>
                  <p className="text-[8px] font-bold text-[#222222]/30 uppercase tracking-widest">
                    {contact.sub}
                  </p>
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-[#222222]/10 group-hover/btn:translate-x-1 group-hover/btn:text-[#222222] transition-all"
              />
            </button>
          );
        })}
      </div>

      {/* 3. OFFICE HOURS & VIVA DETAIL */}
      <div className="mt-8 pt-6 border-t-2 border-[#FAF3E1] flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#FAF3E1] rounded-full">
          <Clock size={14} className="text-[#FA8112]" />
          <span className="text-[9px] font-black text-[#222222]/60 uppercase tracking-widest">
            Office: 09:00 AM — 08:00 PM (IST)
          </span>
        </div>
        <p className="text-[8px] font-black text-[#222222]/20 uppercase tracking-[0.4em]">
          SmartPark Support Node &bull; Anand City Hub
        </p>
      </div>
    </section>
  );
};

export default ContactSupport;
