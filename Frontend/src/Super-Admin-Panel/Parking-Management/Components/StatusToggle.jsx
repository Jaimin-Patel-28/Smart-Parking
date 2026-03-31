import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const StatusToggle = ({ initialStatus, onToggle }) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        status === "Active" ? "bg-emerald-500" : "bg-slate-300"
      }`}
    >
      {loading ? (
        <Loader2 className="animate-spin mx-auto text-white" size={12} />
      ) : (
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            status === "Active" ? "translate-x-6" : "translate-x-1"
          }`}
        />
      )}
    </button>
  );
};

export default StatusToggle;
