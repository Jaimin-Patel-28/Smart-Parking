import React from "react";
import { Settings as SettingsIcon, ShieldCheck } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-black text-[#FAF3E1] uppercase tracking-tighter">
          System <span className="text-[#FA8112]">Settings</span>
        </h1>
        <p className="text-[#FAF3E1]/40 text-xs font-black uppercase tracking-[0.2em] mt-1">
          Configuration and operational preferences
        </p>
      </div>

      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-4xl p-8 space-y-4">
        <div className="flex items-center gap-3 text-[#FA8112]">
          <SettingsIcon size={20} />
          <h2 className="text-sm font-black uppercase tracking-widest">
            Settings Route Enabled
          </h2>
        </div>
        <p className="text-sm text-[#FAF3E1]/70 leading-relaxed">
          This page replaces the previous placeholder and is ready for real
          settings forms.
        </p>
        <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#FAF3E1]/60">
          <ShieldCheck size={14} className="text-[#FA8112]" />
          Access restricted to super-admin users
        </div>
      </div>
    </div>
  );
};

export default Settings;
