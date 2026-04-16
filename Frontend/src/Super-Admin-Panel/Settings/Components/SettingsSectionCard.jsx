import React from "react";
import { Save } from "lucide-react";

const SettingsSectionCard = ({
  title,
  description,
  icon: Icon,
  children,
  onSave,
  saving,
}) => {
  return (
    <section className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2rem] p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight text-[#FAF3E1] flex items-center gap-3">
            {Icon && <Icon size={20} className="text-[#FA8112]" />}
            {title}
          </h2>
          <p className="text-[#FAF3E1]/45 text-xs font-bold uppercase tracking-[0.18em] mt-1">
            {description}
          </p>
        </div>

        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FA8112] text-[#222222] text-[10px] font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FAF3E1] transition-colors"
        >
          {saving ? "Saving..." : "Save"}
          <Save size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </section>
  );
};

export default SettingsSectionCard;
