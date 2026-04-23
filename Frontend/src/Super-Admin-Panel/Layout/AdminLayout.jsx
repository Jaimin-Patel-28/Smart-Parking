import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import ErrorBoundary from "../Dashboard/Components/ErrorBoundary";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Operational Logic: Auto-close sidebar on mobile navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#222222] text-[#FAF3E1] overflow-hidden font-sans antialiased">
      {/* 1. SIDEBAR ARCHITECTURE */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isSidebarOpen ? "translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.5)]" : "-translate-x-full"}
          w-[280px] bg-[#1a1a1a] border-r border-[#F5E7C6]/5
        `}
      >
        <AdminSidebar closeMobileMenu={() => setIsSidebarOpen(false)} />
      </aside>

      {/* 2. SECURITY OVERLAY (Mobile Only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#111111]/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* 3. CORE VIEWPORT ENGINE */}
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden relative">
        {/* Persistent Header */}
        <AdminHeader onMenuClick={toggleSidebar} />

        {/* Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto bg-[#222222] scroll-smooth custom-scrollbar">
          <div className="p-4 sm:p-6 lg:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-140px)]">
            <ErrorBoundary>
              {/* Outlet with a subtle entrance animation for sub-pages */}
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <Outlet />
              </div>
            </ErrorBoundary>
          </div>

          {/* SYSTEM FOOTER: Technical Metadata Style */}
          <footer className="px-10 py-8 text-center border-t border-[#F5E7C6]/5 bg-[#FAF3E1]/[0.01]">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/10">
                © 2026{" "}
                <span className="text-[#FAF3E1]/20">Smart Park Management</span>
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/20">
                    Kernel v1.2.4
                  </span>
                </div>
                <div className="h-3 w-px bg-[#F5E7C6]/5"></div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#FA8112]/40">
                  Secure Operational Node
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
