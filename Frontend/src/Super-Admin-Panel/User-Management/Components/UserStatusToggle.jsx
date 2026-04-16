import React from "react";

const UserStatusToggle = ({ status, onToggle, processing }) => {
  const isActive = status === "active";

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  return (
    <button
      disabled={processing}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none border border-[#F5E7C6]/10 shadow-inner ${
        isActive ? "bg-[#FA8112] shadow-[#FA8112]/20" : "bg-[#FAF3E1]/[0.08]"
      } ${processing ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-[#FAF3E1] transition-transform duration-300 shadow-md ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />

      {/* Visual accessibility hint for dark mode */}
      {processing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-black/10 animate-pulse" />
        </div>
      )}
    </button>
  );
};

export default UserStatusToggle;
