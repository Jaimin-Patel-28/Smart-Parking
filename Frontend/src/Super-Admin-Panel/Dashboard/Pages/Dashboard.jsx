import React from "react";
import useDashboardData from "../Hooks/useDashboardData";
import DashboardStats from "../Components/DashboardStats";
import RecentBookings from "../Components/RecentBookings";
import SystemStatus from "../Components/SystemStatus";
import DashboardCharts from "../Components/DashboardCharts";
import { Car, Zap, Plus, FileDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isStaffAdmin = user?.role === "admin";

  // 1. Consume the Custom Hook
  const { stats, bookings, systemStatus, loading, error } = useDashboardData();

  const handlePrimaryAction = () => {
    navigate(isStaffAdmin ? "/admin/bookings" : "/super-admin/slots");
  };

  const handleExportDashboardPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 16;

      doc.setFontSize(18);
      doc.text("Smart Parking - Dashboard Snapshot", 14, y);
      y += 8;
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);
      y += 10;

      doc.setFontSize(12);
      doc.text("KPI Summary", 14, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(`Total Revenue: INR ${Number(stats?.totalRevenue || 0).toLocaleString()}`, 14, y);
      y += 6;
      doc.text(`Active Users: ${stats?.activeUsers || 0}`, 14, y);
      y += 6;
      doc.text(`Parking Slots: ${stats?.occupiedSlots || 0}/${stats?.totalSlots || 0}`, 14, y);
      y += 6;
      doc.text(`Completed Bookings: ${stats?.completedBookings || 0}`, 14, y);
      y += 10;

      doc.setFontSize(12);
      doc.text("Weekly Performance (Mon-Sun)", 14, y);
      y += 7;
      doc.setFontSize(10);
      (stats?.weeklyLabels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]).forEach(
        (label, idx) => {
          const value = stats?.weeklyBookings?.[idx] || 0;
          doc.text(`${label}: ${value} bookings`, 14, y);
          y += 6;
        },
      );

      doc.save(`dashboard-snapshot-${new Date().toISOString().slice(0, 10)}.pdf`);
      toast.success("Dashboard PDF exported");
    } catch (exportError) {
      console.error("Dashboard PDF export failed", exportError);
      toast.error("Failed to export dashboard PDF");
    }
  };

  // 2. Operational Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        {/* Accent: #FA8112 */}
        <Loader2 className="h-10 w-10 animate-spin text-[#FA8112]" />
        <p className="text-[#FAF3E1]/60 font-bold animate-pulse uppercase tracking-widest text-xs">
          Synchronizing with parking sensors...
        </p>
      </div>
    );
  }

  return (
    // Page BG: #222222 | Text: #FAF3E1
    <div className="max-w-400 mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10 px-2 sm:px-0 bg-[#222222]">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-[#FAF3E1] tracking-tight">
            Operational <span className="text-[#FA8112]">Overview</span>
          </h2>
          <p className="text-[#FAF3E1]/50 text-sm font-medium italic">
            Live updates from {bookings?.length || 0} active parking sessions.
          </p>
        </div>
        {/* Accent Label: Background #FA8112 with Dark Text #222222 */}
        <div className="flex self-start md:self-center items-center gap-2 text-[10px] font-black text-[#222222] bg-[#FA8112] px-4 py-2 rounded-full shadow-lg shadow-[#FA8112]/20 tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FAF3E1] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FAF3E1]"></span>
          </span>
          SYSTEM LIVE
        </div>
      </div>

      {error ? (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-300 text-sm font-semibold">
          {error}
        </div>
      ) : null}

      {/* 2. Stats Row */}
      <DashboardStats data={stats} />

      {/* 3. Graphical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Main Chart Section - Card BG: #FAF3E1/0.02 | Border: #F5E7C6/10 */}
          <div className="w-full overflow-hidden bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-6 lg:p-8">
            <DashboardCharts
              chartData={stats?.weeklyBookings}
              labels={stats?.weeklyLabels}
            />
          </div>

          {/* Table Section */}
          <div className="w-full bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-1">
            <RecentBookings data={bookings} />
          </div>

          {/* Smart Analysis Banner - Darker Gradient using #222222 and Accent #FA8112 */}
          <div className="bg-linear-to-br from-[#FA8112] to-[#b85e0d] rounded-[2.5rem] p-8 lg:p-10 text-[#222222] flex items-center justify-between overflow-hidden relative shadow-2xl">
            <div className="z-10">
              <div className="flex items-center gap-2 text-[#222222] mb-3">
                <Zap size={18} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  AI Prediction
                </span>
              </div>
              <h4 className="text-2xl font-black tracking-tighter">
                Smart Analysis
              </h4>
              <p className="text-[#222222]/80 text-sm mt-3 max-w-sm leading-relaxed font-bold">
                Peak hours are expected between 5 PM - 8 PM today.
                Recommendation: Open North-Gate Exit B to reduce congestion.
              </p>
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-2.5 -bottom-5 text-[#222222]/10 transform rotate-12 pointer-events-none">
              <Car size={200} />
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* System Status Container */}
          <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-[2.5rem] p-1">
            <SystemStatus data={systemStatus} />
          </div>

          {/* Quick Actions Card */}
          <div className="bg-[#FAF3E1]/2 p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm">
            <h3 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Plus size={16} className="text-[#FA8112]" /> Quick Actions
            </h3>
            <div className="flex flex-col gap-4">
              <button
                onClick={handlePrimaryAction}
                className="flex items-center justify-center gap-3 p-4 bg-[#FAF3E1]/5 text-[#FAF3E1] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#FA8112] hover:text-[#222222] transition-all border border-[#F5E7C6]/10"
              >
                <Plus size={18} /> {isStaffAdmin ? "Open Bookings" : "Add Slot"}
              </button>
              <button
                onClick={handleExportDashboardPDF}
                className="flex items-center justify-center gap-3 p-4 bg-[#FA8112] text-[#222222] rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#FAF3E1] transition-all shadow-lg shadow-[#FA8112]/20"
              >
                <FileDown size={18} /> Export PDF
              </button>
            </div>
          </div>

          {/* Mini Operational Note - Warning style using Accent */}
          <div className="p-6 bg-[#FA8112]/10 border border-[#FA8112]/20 rounded-4xl">
            <p className="text-xs text-[#FA8112] font-bold leading-relaxed">
              <strong className="block mb-2 uppercase tracking-widest underline underline-offset-4">
                Maintenance Note:
              </strong>
              Sensor calibration is scheduled for tonight at 02:00 AM. System
              latency may increase during this period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
