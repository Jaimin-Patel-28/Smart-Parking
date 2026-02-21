import { useState } from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";

const DashboardNavbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF3E1]/90 backdrop-blur-md border-b border-[#FA8112]/20">
      <div className="flex items-center justify-between px-6 lg:px-12 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-[#F5E7C6] transition"
          >
            <Menu size={20} className="text-[#222222]" />
          </button>

          <h1 className="text-sm md:text-base font-semibold tracking-wide text-[#222222]">
            Smart Parking Dashboard
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-[#F5E7C6] transition">
            <Bell size={20} className="text-[#222222]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FA8112] rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 hover:bg-[#F5E7C6] px-3 py-2 rounded-xl transition"
            >
              <div className="w-8 h-8 bg-[#FA8112]/20 text-[#FA8112] rounded-full flex items-center justify-center text-xs font-semibold">
                J
              </div>
              <ChevronDown size={16} className="text-[#222222]" />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-[#FA8112]/20 rounded-2xl shadow-lg overflow-hidden">
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5E7C6] transition">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-3 text-sm hover:bg-[#F5E7C6] transition">
                  Settings
                </button>
                <button className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
