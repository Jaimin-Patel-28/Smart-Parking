import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ErrorBoundary from "../Dashboard/Components/ErrorBoundary";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Operational Logic: Auto-close sidebar when switching pages on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    // Page Background: #222222 | Text: #FAF3E1
    <div className="flex h-screen bg-[#222222] text-[#FAF3E1] overflow-hidden font-sans">
      {/* 1. Sidebar Section */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 
          transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-72 bg-[#222222] border-r border-[#F5E7C6]/10
        `}
      >
        <AdminSidebar closeMobileMenu={() => setIsSidebarOpen(false)} />
      </aside>

      {/* 2. Mobile Overlay */}
      {isSidebarOpen && (
        <div
          // Overlay: #222222 with 60% opacity
          className="fixed inset-0 bg-[#222222]/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* 3. Main Viewport */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Header - Receiving the toggle function */}
        <AdminHeader onMenuClick={toggleSidebar} />

        {/* Scrollable Content Area */}
        {/* Main BG: #222222 */}
        <main className="flex-1 overflow-y-auto bg-[#222222] scroll-smooth">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>

          {/* Operational Footer */}
          {/* Text: #FAF3E1 with 30% opacity | Border: #F5E7C6 at 10% opacity */}
          <footer className="px-8 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 border-t border-[#F5E7C6]/10 bg-[#FAF3E1]/[0.01]">
            © 2026 Smart Parking Admin System •{" "}
            <span className="text-[#FA8112]">v1.2.4</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
