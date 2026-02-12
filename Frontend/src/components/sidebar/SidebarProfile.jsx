import React from "react";
import { useNavigate } from "react-router-dom";
import { User, CheckCircle2 } from "lucide-react";

const SidebarProfile = ({ isOpen = true }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* REMOVED: The branding div containing ShieldCheck and "SmartPark" text 
          has been deleted to fix the redundancy shown in your inspector.
      */}

      {/* USER INFO CARD (CLICKABLE → PROFILE PAGE) */}
      <div
        onClick={() => navigate("/user/profile")}
        className={`flex items-center gap-3 p-2.5 rounded-2xl bg-[#F5E7C6]/50 border-2 border-transparent hover:border-[#222222]/5 hover:bg-white transition-all duration-300 cursor-pointer ${!isOpen && "justify-center"}`}
      >
        {/* AVATAR: Using Charcoal and Beige for a humanized feel */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-xl bg-[#222222] flex items-center justify-center text-[#FAF3E1] shadow-md shadow-[#222222]/10 transition-transform group-hover:scale-105">
            <User size={20} strokeWidth={2.5} />
          </div>
          {/* Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FAF3E1] rounded-full flex items-center justify-center border-2 border-[#FAF3E1]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* DETAILS: High-contrast typography for your viva presentation */}
        {isOpen && (
          <div className="flex flex-col overflow-hidden">
            <p className="text-xs font-black text-[#222222] tracking-tight truncate">
              Jaimin Patel
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <CheckCircle2
                size={12}
                strokeWidth={3}
                className="text-[#FA8112]"
              />
              <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#FA8112]">
                Verified User
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarProfile;
