import { useNavigate } from "react-router-dom";
import { User, CheckCircle2 } from "lucide-react";

const NavbarProfile = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/user/profile")}
      className="hidden lg:flex items-center gap-3 cursor-pointer bg-[#F5E7C6]/60 hover:bg-white px-4 py-2 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#222222]/10"
    >
      <div className="w-9 h-9 rounded-xl bg-[#222222] flex items-center justify-center text-[#FAF3E1]">
        <User size={18} />
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-bold text-[#222222]">Jaimin Patel</span>
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} className="text-[#FA8112]" />
          <span className="text-[9px] uppercase font-bold text-[#FA8112]">
            Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarProfile;
