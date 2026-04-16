import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ErrorBoundary from "../../Super-Admin-Panel/Dashboard/Components/ErrorBoundary";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#222222] text-[#FAF3E1] overflow-hidden font-sans">
      {/* Sidebar */}
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#222222]/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <AdminHeader onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto bg-[#222222]">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>

          <footer className="px-8 py-6 text-center text-[10px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 border-t border-[#F5E7C6]/10">
            © 2026 Smart Parking Admin System •{" "}
            <span className="text-[#FA8112]">v1.2.4</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
