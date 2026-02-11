import { useNavigate } from "react-router-dom";
import { User, CheckCircle2, ShieldCheck } from "lucide-react";

const SidebarProfile = ({ isOpen = true }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      {/* 1. BRANDING */}
      <div
        className="flex items-center gap-2 px-2 cursor-pointer"
        onClick={() => navigate("/userlayout/dashboard")}
      >
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <ShieldCheck size={16} className="text-white" />
        </div>

        {isOpen && (
          <h3 className="text-lg font-black text-white tracking-tighter uppercase italic">
            SmartPark
          </h3>
        )}
      </div>

      {/* 2. USER INFO CARD (CLICKABLE → PROFILE PAGE) */}
      <div
        onClick={() => navigate("/user/profile")}
        className="flex items-center gap-3 bg-white/5 border border-white/5 p-2 rounded-2xl
                   hover:bg-white/10 transition-all cursor-pointer"
      >
        {/* AVATAR */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <User size={20} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-950 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* DETAILS (hide when collapsed) */}
        {isOpen && (
          <div className="flex flex-col">
            <p className="text-xs font-black text-white tracking-tight">
              Jaimin Patel
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <CheckCircle2 size={10} className="text-cyan-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-cyan-400/80">
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
