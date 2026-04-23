import React from "react";
import { X, AlertTriangle, ShieldQuestion } from "lucide-react";

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  intent = "default",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const intentStyles = {
    // Premium Orange for standard actions
    default:
      "bg-[#FA8112] text-[#222222] hover:bg-[#FA8112]/90 shadow-lg shadow-[#FA8112]/10",
    // Clean Rose for danger/delete actions
    danger:
      "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/10",
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#111111]/80 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      {/* Container: Max-width for mobile, refined rounding */}
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-[#F5E7C6]/10 bg-[#1a1a1a] shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between gap-4 border-b border-[#F5E7C6]/5 p-6 bg-[#FAF3E1]/[0.02]">
          <div className="flex gap-4">
            {/* Icon indicating intent */}
            <div
              className={`mt-1 shrink-0 ${intent === "danger" ? "text-rose-500" : "text-[#FA8112]"}`}
            >
              {intent === "danger" ? (
                <AlertTriangle size={20} />
              ) : (
                <ShieldQuestion size={20} />
              )}
            </div>

            <div>
              <h3 className="text-base font-bold uppercase tracking-wider text-[#FAF3E1]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#FAF3E1]/50">
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

        {/* Footer Actions: Properly spaced for thumb-reach on mobile */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-6 bg-[#1a1a1a]">
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
            className={`w-full sm:w-auto order-1 sm:order-2 rounded-lg px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-all active:scale-95 ${intentStyles[intent] || intentStyles.default}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
