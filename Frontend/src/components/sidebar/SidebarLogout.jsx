import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SidebarLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔐 JWT clear (actual logout in MERN)
    localStorage.removeItem("token");

    // optional cleanup
    sessionStorage.removeItem("loginPrefill");

    // redirect to auth (register screen by rule)
    navigate("/auth", { replace: true });
  };

  return (
    <div className="px-2">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all group border border-transparent hover:border-rose-500/20"
      >
        <LogOut
          size={18}
          className="opacity-60 group-hover:opacity-100 transition-opacity"
        />
        <span className="text-xs font-black uppercase tracking-widest">
          Sign Out
        </span>
      </button>
    </div>
  );
};

export default SidebarLogout;
