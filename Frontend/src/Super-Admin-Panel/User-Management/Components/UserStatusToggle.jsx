import React from "react";

const UserStatusToggle = ({ status, onToggle, processing }) => {
  const isActive = status === "active";

  return (
    <button
      disabled={processing}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        isActive ? "bg-emerald-500" : "bg-slate-300"
      } ${processing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};

export default UserStatusToggle;
