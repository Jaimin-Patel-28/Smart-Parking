import React from "react";
import Navbar from "./Navbar";
import BottomNavigation from "./BottomNavigation";
import { Terminal, Activity } from "lucide-react";

const UserLayout = ({ children }) => {
  // Theme: BG #222222 | Text #FAF3E1 | Accent #FA8112

  return (
    <div className="min-h-screen bg-[#222222] text-[#FAF3E1] flex flex-col font-sans selection:bg-[#FA8112] selection:text-[#222222]">
      {/* 1. ARCHITECTURAL UNDERLAY: Subtle Technical Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(245,231,198,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(245,231,198,0.01)_1px,transparent_1px)] [background-size:100px_100px] pointer-events-none" />

      {/* 2. COMMAND HEADER */}
      <header className="relative ">
        <Navbar />
      </header>

      {/* 3. CORE VIEWPORT */}
      <main className="relative z-10 flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 pb-32 lg:pb-16 mx-auto w-full max-w-[1600px] transition-all duration-700">
        {/* VIEWPORT SIGNAL: Top left entry point decor */}
        <div className="hidden xl:flex absolute -left-4 top-12 flex-col items-center gap-4 opacity-10">
          <span className="h-24 w-px bg-gradient-to-b from-[#FA8112] to-transparent" />
          <Terminal size={14} />
        </div>

        {/* Dynamic Page Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
          {children}
        </div>

        {/* VIEWPORT END: System footprint */}
        <footer className="mt-20 pt-10 border-t border-[#F5E7C6]/5 flex justify-between items-center opacity-10 grayscale hover:grayscale-0 hover:opacity-30 transition-all">
          <div className="flex items-center gap-3">
            <Activity size={14} className="text-[#FA8112]" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-[0.4em]">
              Node_Status: Encrypted_Link
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.2em]">
            © 2026 SmartPark_Engine
          </span>
        </footer>
      </main>

      {/* 4. MOBILE CONTROL DOCK */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="absolute inset-0 bg-[#222222]/80 backdrop-blur-xl border-t border-[#F5E7C6]/5" />
        <div className="relative z-10">
          <BottomNavigation />
        </div>
      </nav>

      {/* GLOBAL SYSTEM OVERLAY: Scanline effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,3px_100%] z-[9999] opacity-[0.15]" />
    </div>
  );
};

export default UserLayout;
