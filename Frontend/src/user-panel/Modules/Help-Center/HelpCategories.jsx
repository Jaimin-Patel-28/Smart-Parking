import React from "react";
import {
  Car,
  Wallet,
  UserCircle,
  Settings,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const HelpCategories = () => {
  const categories = [
    { label: "Booking Support", icon: Car, desc: "Reservations & spots" },
    { label: "Wallet & Payments", icon: Wallet, desc: "Top-ups & refunds" },
    {
      label: "Account & Profile",
      icon: UserCircle,
      desc: "Settings & security",
    },
    { label: "Technical Issues", icon: Settings, desc: "App & hardware help" },
    {
      label: "Policies & Rules",
      icon: ShieldCheck,
      desc: "Terms & conditions",
    },
  ];

  return (
    <section className="space-y-10">
      {/* 1. SECTION HEADER: Editorial Branding */}
      <div className="flex items-center justify-between px-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[#222222] tracking-tighter">
            Browse{" "}
            <span className="text-[#FA8112] italic font-serif font-medium tracking-normal">
              Categories
            </span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#222222]/30">
            Explore by topic
          </p>
        </div>
        <div className="hidden md:block w-32 h-[2px] bg-[#FAF3E1]"></div>
      </div>

      {/* 2. CATEGORY GRID: Tactile & High-Contrast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <button
              key={index}
              className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[#FAF3E1]/30 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white hover:shadow-xl transition-all duration-500"
            >
              <div className="p-4 rounded-2xl bg-white text-[#222222] shadow-sm group-hover:bg-[#FA8112] group-hover:text-[#FAF3E1] transition-all duration-500 mb-6">
                <Icon size={28} strokeWidth={2} />
              </div>

              <h3 className="text-[11px] font-black text-[#222222] uppercase tracking-[0.1em] mb-2">
                {cat.label}
              </h3>
              <p className="text-[9px] font-bold text-[#222222]/30 uppercase tracking-widest leading-relaxed">
                {cat.desc}
              </p>

              {/* FLOATING ACTION: Visual Feedback */}
              <div className="absolute top-4 right-4 text-[#222222]/10 group-hover:text-[#FA8112] transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. VIVA DETAIL: Technical Context */}
      <p className="text-center text-[9px] font-black text-[#222222]/20 uppercase tracking-[0.4em] pt-4">
        Dynamic Category Mapping Enabled
      </p>
    </section>
  );
};

export default HelpCategories;
