import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ErrorBoundary from "../Components/ErrorBoundary"; // Ensure you create this file

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Operational Logic: Auto-close sidebar when switching pages on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* 1. Sidebar Section */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 
          transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          w-72 bg-[#0f172a]
        `}
      >
        <AdminSidebar closeMobileMenu={() => setIsSidebarOpen(false)} />
      </aside>

      {/* 2. Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* 3. Main Viewport */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        {/* Header - Receiving the toggle function */}
        <AdminHeader onMenuClick={toggleSidebar} />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 scroll-smooth">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
            {/* THE FIX: Wrap Outlet in ErrorBoundary */}
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>

          {/* Operational Footer (Optional but professional) */}
          <footer className="px-8 py-4 text-center text-xs text-slate-400 border-t border-slate-200">
            © 2026 Smart Parking Admin System • v1.2.4
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
