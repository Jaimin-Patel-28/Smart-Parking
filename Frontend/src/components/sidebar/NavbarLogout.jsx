import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const NavbarLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("loginPrefill");
    navigate("/auth", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="hidden lg:flex items-center gap-2 text-sm font-semibold text-[#222222]/60 hover:text-[#FA8112] transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default NavbarLogout;
