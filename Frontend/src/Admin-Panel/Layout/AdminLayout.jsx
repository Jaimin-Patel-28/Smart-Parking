import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ErrorBoundary from "../../Super-Admin-Panel/Dashboard/Components/ErrorBoundary";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Automatically close sidebar when navigation occurs (Crucial for mobile UX)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#222222] text-[#FAF3E1] overflow-hidden font-sans antialiased">
      {/* SIDEBAR: Refined width and border */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 
          transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 bg-[#222222] border-r border-[#F5E7C6]/5
        `}
      >
        <AdminSidebar closeMobileMenu={() => setIsSidebarOpen(false)} />
      </aside>

      {/* OVERLAY: Premium backdrop blur */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#000000]/40 backdrop-blur-[2px] z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <AdminHeader onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-[#222222] scroll-smooth">
          {/* Content Wrapper: Balanced padding and max-width */}
          <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-64px-70px)]">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>

          {/* FOOTER: Fixed "Bold & Big" issue */}
          <footer className="px-8 py-8 text-center border-t border-[#F5E7C6]/5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FAF3E1]/20">
              © 2026 Smart Parking System
              <span className="mx-2 opacity-20">•</span>
              <span className="text-[#FA8112]/50 hover:text-[#FA8112] transition-colors cursor-default">
                Build v1.2.4
              </span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
