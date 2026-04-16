import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const StatusToggle = ({ initialStatus, onToggle }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const handleToggle = async (e) => {
    e.stopPropagation(); // Prevent row click events in tables
    const newStatus = status === "Active" ? "Maintenance" : "Active";
    setLoading(true);
    try {
      await onToggle(newStatus);
      setStatus(newStatus);
    } catch (error) {
      console.error("Toggle failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none border border-[#F5E7C6]/10 shadow-inner ${
        status === "Active"
          ? "bg-[#FA8112] shadow-[#FA8112]/20"
          : "bg-[#FAF3E1]/10"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {loading ? (
        <Loader2 className="animate-spin mx-auto text-[#FAF3E1]" size={12} />
      ) : (
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-[#FAF3E1] transition-transform duration-300 shadow-md ${
            status === "Active" ? "translate-x-6" : "translate-x-1"
          }`}
        />
      )}
    </button>
  );
};

export default StatusToggle;
