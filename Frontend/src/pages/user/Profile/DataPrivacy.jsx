import React from "react";
import {
  ShieldCheck,
  Download,
  ExternalLink,
  FileText,
  Lock,
} from "lucide-react";

const DataPrivacy = () => {
  return (
    /* FIXED: Using rounded-3xl and increased padding for professional depth */
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 lg:p-10 shadow-2xl group transition-all duration-500 hover:border-cyan-500/20 flex flex-col h-full">
      {/* 1. HEADER: Increased spacing for 110% zoom safety */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="shrink-0 p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 group-hover:rotate-12 transition-transform duration-500">
            <ShieldCheck size={26} className="fill-cyan-400/10" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight uppercase leading-none">
              Privacy Vault
            </h2>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-2">
              Gujarat Hub Data Node
            </p>
          </div>
        </div>
      </div>

      {/* 2. DATA EXPORT: Content-rich interactive tile */}
      <div className="mb-10 flex-1">
        <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-6 shadow-inner relative overflow-hidden group/tile transition-all hover:bg-slate-950">
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                Account Archive
              </p>
              <h4 className="text-lg font-black text-white uppercase tracking-tighter">
                Your Data Package
              </h4>
            </div>
            <div className="p-2 bg-white/5 rounded-lg text-slate-400 group-hover/tile:text-cyan-400 transition-colors">
              <Download size={16} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-6 max-w-[200px]">
            Download a portable copy of your booking history and settings.
          </p>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[9px] font-black text-white uppercase tracking-widest transition-all active:scale-95 shadow-sm">
            Request Export
          </button>
          <Lock
            size={64}
            className="absolute -right-6 -bottom-6 text-white opacity-[0.02] -rotate-12"
          />
        </div>
      </div>

      {/* 3. LEGAL LINKS: Clean grid with external indicators */}
      <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/5">
        <LegalLink icon={FileText} label="Privacy Policy" href="#" />
        <LegalLink icon={ExternalLink} label="Terms of Use" href="#" />
      </div>
    </section>
  );
};

/* REUSABLE LEGAL LINK: Compact and clean */
const LegalLink = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 text-slate-500 hover:text-cyan-400 hover:bg-white/5 transition-all group/link"
  >
    <div className="flex items-center gap-2">
      <Icon
        size={12}
        className="group-hover/link:scale-110 transition-transform"
      />
      <span className="text-[9px] font-black uppercase tracking-widest">
        {label}
      </span>
    </div>
  </a>
);

export default DataPrivacy;
