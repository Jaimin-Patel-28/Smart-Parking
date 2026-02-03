import React from "react";
import { User, Mail, Phone, MapPin, Save, ShieldCheck } from "lucide-react";

const PersonalInfo = () => {
  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-blue-500/20">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:rotate-12 transition-transform duration-500">
            <User size={26} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Personal Identity
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Core Account Details
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10">
          <ShieldCheck size={14} />
          Encrypted
        </div>
      </div>

      {/* 2. RESPONSIVE FORM GRID: 2 columns for data-rich feel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Full Name Input */}
        <InputGroup
          icon={User}
          label="Full Name"
          placeholder="Jaimin Patel"
          defaultValue="Jaimin Patel" //
        />

        {/* Email Address Input */}
        <InputGroup
          icon={Mail}
          label="Email Address"
          placeholder="jaimin@anandsmartcity.in"
          type="email"
        />

        {/* Mobile Number Input */}
        <InputGroup
          icon={Phone}
          label="Mobile Number"
          placeholder="+91 98765 43210"
          type="tel"
        />

        {/* City / Location Input */}
        <InputGroup
          icon={MapPin}
          label="City / Node"
          placeholder="Anand, Gujarat"
          defaultValue="Anand, Gujarat" //
        />
      </div>

      {/* 3. ACTION FOOTER: Anchored button with unique glow animation */}
      <div className="pt-8 border-t border-white/5 flex items-center justify-between gap-6">
        <p className="hidden md:block text-[9px] font-bold text-slate-600 uppercase tracking-widest">
          Last updated: 2 days ago
        </p>
        <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 group/btn">
          <Save
            size={18}
            className="group-hover/btn:translate-y-0.5 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-widest">
            Save Changes
          </span>
        </button>
      </div>
    </section>
  );
};

/* REUSABLE INPUT COMPONENT: Maintains spacing and animated hover */
const InputGroup = ({ icon: Icon, label, ...props }) => (
  <div className="space-y-3 group/field">
    <div className="flex items-center gap-2 px-1">
      <Icon
        size={14}
        className="text-slate-500 group-hover/field:text-blue-400 transition-colors"
      />
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/field:text-slate-300 transition-colors">
        {label}
      </span>
    </div>
    <div className="relative">
      <input
        {...props}
        className="w-full bg-slate-950/60 border border-white/5 rounded-2xl px-5 py-4 text-sm font-bold text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:bg-slate-950 transition-all shadow-inner"
      />
      {/* Subtle Focus Glow */}
      <div className="absolute inset-0 rounded-2xl bg-blue-500/0 group-hover/field:bg-blue-500/2 -z-10 transition-all pointer-events-none" />
    </div>
  </div>
);

export default PersonalInfo;
