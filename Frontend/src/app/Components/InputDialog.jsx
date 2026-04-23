import React from "react";
import { X, Edit3 } from "lucide-react";

const InputDialog = ({
  open,
  title,
  message,
  value,
  onChange,
  confirmLabel = "Continue",
  cancelLabel = "Cancel",
  placeholder = "",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      {/* Main Container: Switched from 2rem rounding to a sharper, more modern xl (12px) */}
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#F5E7C6]/5 p-6 bg-[#FAF3E1]/[0.02]">
          <div className="flex gap-4">
            <div className="mt-1 shrink-0 text-[#FA8112]">
              <Edit3 size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-[#FAF3E1]">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#FAF3E1]/50">
                {message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-[#FAF3E1]/20 transition-colors hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 bg-[#1a1a1a]">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-[#FAF3E1]/30 ml-1">
              Required Input
            </label>
            <input
              autoFocus
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-[#F5E7C6]/10 bg-[#222222] px-4 py-3 text-sm font-medium text-[#FAF3E1] outline-none transition-all placeholder:text-[#FAF3E1]/10 focus:border-[#FA8112]/50 focus:ring-1 focus:ring-[#FA8112]/20"
            />
          </div>

          {/* Action Buttons: Responsive stacking for mobile reach */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto order-2 sm:order-1 rounded-lg border border-[#F5E7C6]/10 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/40 transition-all hover:bg-[#FAF3E1]/5 hover:text-[#FAF3E1]"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto order-1 sm:order-2 rounded-lg bg-[#FA8112] px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-[#222222] transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-[#FA8112]/10"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputDialog;
