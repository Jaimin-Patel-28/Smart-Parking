import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../components/sidebar/UserNavbar";

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
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
