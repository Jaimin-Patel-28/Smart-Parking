import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SidebarLogout = ({ isOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic Preserved: JWT clear for actual MERN logout
    localStorage.removeItem("token");

    // Logic Preserved: Optional cleanup
    sessionStorage.removeItem("loginPrefill");

    // Logic Preserved: Redirect to auth
    navigate("/auth", { replace: true });
  };

  return (
    <div className="px-3">
      <button
        onClick={handleLogout}
        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group
          text-[#222222]/40 hover:bg-[#FA8112] hover:text-[#FAF3E1] border-2 border-transparent
          ${!isOpen && "justify-center px-0"}`}
      >
        <LogOut
          size={20}
          strokeWidth={3}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />

        {isOpen && (
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">
            Sign Out
          </span>
        )}
      </button>
    </div>
  );
};

export default SidebarLogout;
