import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const UserLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF3E1] flex flex-col">
      {/* NAVBAR */}
      <UserNavbar
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((prev) => !prev)}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 transition-all duration-300 overflow-x-hidden">
        <div className="max-w-100% mx-auto px-0 sm:px-0 md:px-0 lg:px-0 py-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
