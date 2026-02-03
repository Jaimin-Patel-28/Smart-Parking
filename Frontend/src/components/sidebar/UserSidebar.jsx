import { useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, Calendar, Wallet, Settings, Bell, LifeBuoy, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarProfile from "./SidebarProfile";

const UserSidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
        sticky top-0 h-screen bg-slate-950 border-r border-white/5
        flex flex-col transition-all duration-500 ease-in-out z-50
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      {/* 1. TOP SECTION: Branding + Toggle Button */}
      <div className={`flex items-center p-6 ${isOpen ? "justify-between" : "justify-center"}`}>
        {isOpen && (
          <div className="flex items-center gap-3 animate-in fade-in duration-500">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">SP</div>
            <span className="font-black tracking-tighter text-white">SMARTPARK</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all active:scale-95"
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* 2. PROFILE SECTION: Hidden when collapsed for 'Icons Only' look */}
      <div className="px-4 mb-6">
        {isOpen ? (
          <SidebarProfile />
        ) : (
          <div className="mx-auto w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
            JP
          </div>
        )}
      </div>

      {/* 3. NAVIGATION: Icons remain visible, text fades */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-2">
        <NavItem icon={LayoutDashboard} label="Dashboard" isOpen={isOpen} active />
        <NavItem icon={Car} label="Find Parking" isOpen={isOpen} />
        <NavItem icon={Calendar} label="My Bookings" isOpen={isOpen} />
        <NavItem icon={Wallet} label="Wallet Hub" isOpen={isOpen} />
        
        <div className="my-6 border-t border-white/5 mx-2" />
        
        <NavItem icon={Settings} label="Profile Settings" isOpen={isOpen} />
        <NavItem icon={Bell} label="Notifications" isOpen={isOpen} badge="3" />
        <NavItem icon={LifeBuoy} label="Help Center" isOpen={isOpen} />
      </nav>

      {/* 4. FOOTER: Sign Out stays at bottom */}
      <div className="p-4 border-t border-white/5 bg-slate-950/50">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-xl hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all ${!isOpen && "justify-center"}`}
        >
          <LogOut size={20} />
          {isOpen && <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

/* Reusable NavItem to handle the Icon-vs-Text logic */
const NavItem = ({ icon: Icon, label, isOpen, active, badge }) => (
  <div className={`
    group flex items-center gap-4 p-3.5 rounded-2xl cursor-pointer transition-all
    ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:bg-white/5 hover:text-white"}
    ${!isOpen && "justify-center px-0"}
  `}>
    <Icon size={20} className="shrink-0" />
    {isOpen && (
      <div className="flex-1 flex justify-between items-center animate-in slide-in-from-left-2 duration-300">
        <span className="text-xs font-black tracking-wide truncate">{label}</span>
        {badge && (
          <span className="bg-orange-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-md">
            {badge}
          </span>
        )}
      </div>
    )}
  </div>
);

export default UserSidebar;