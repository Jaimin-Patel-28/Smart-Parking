import React from "react";

const SettingsToggle = ({ label, checked, onChange, hint }) => {
  return (
    <div className="bg-[#222222] border border-[#F5E7C6]/10 rounded-xl px-4 py-3 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-black text-[#FAF3E1] tracking-tight">{label}</p>
        {hint ? (
          <p className="text-[10px] text-[#FAF3E1]/40 uppercase tracking-widest mt-1">
            {hint}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-14 h-8 rounded-full transition-all p-1 ${
          checked ? "bg-[#FA8112]" : "bg-[#FAF3E1]/15"
        }`}
      >
        <span
          className={`block h-6 w-6 rounded-full bg-[#222222] transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsToggle;
