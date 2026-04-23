import React from "react";
import useDashboardData from "../Hooks/useDashboardData";
import DashboardStats from "../Components/DashboardStats";
import RecentBookings from "../Components/RecentBookings";
import SystemStatus from "../Components/SystemStatus";
import DashboardCharts from "../Components/DashboardCharts";
import {
  Car,
  Zap,
  Plus,
  FileDown,
  Loader2,
  Activity,
  LayoutDashboard,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isStaffAdmin = user?.role === "admin";

  const { stats, bookings, systemStatus, loading, error } = useDashboardData();

  const handlePrimaryAction = () => {
    navigate(isStaffAdmin ? "/admin/bookings" : "/super-admin/slots");
  };

  const handleExportDashboardPDF = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      let y = 20;

      // PDF Styling - Professional Header
      doc.setFillColor(34, 34, 34);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(250, 129, 18);
      doc.setFontSize(22);
      doc.text("SMART PARK", 14, 25);

      doc.setTextColor(250, 243, 225);
      doc.setFontSize(10);
      doc.text("OPERATIONAL SYSTEM SNAPSHOT", 14, 32);

      y = 50;
      doc.setTextColor(34, 34, 34);
      doc.setFontSize(14);
      doc.text("Key Performance Indicators", 14, y);

      y += 10;
      doc.setFontSize(10);
      doc.text(
        `Revenue: INR ${Number(stats?.totalRevenue || 0).toLocaleString()}`,
        14,
        y,
      );
      doc.text(`Active Users: ${stats?.activeUsers || 0}`, 80, y);
      doc.text(
        `Occupancy: ${stats?.occupiedSlots || 0}/${stats?.totalSlots || 0}`,
        140,
        y,
      );

      doc.save(
        `smart-park-report-${new Date().toISOString().slice(0, 10)}.pdf`,
      );
      toast.success("Operational Report Generated");
    } catch (exportError) {
      toast.error("PDF Engine Failure");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <Loader2
            className="h-12 w-12 animate-spin text-[#FA8112]"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 h-12 w-12 border-2 border-[#FA8112]/10 rounded-full"></div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-[#FAF3E1] font-bold uppercase tracking-[0.3em] text-[10px]">
            Synchronizing Nodes
          </p>
          <p className="text-[#FAF3E1]/30 text-[10px] font-medium">
            Fetching real-time sensor data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 px-4 md:px-8">
      {/* 1. TOP COMMAND BAR */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <LayoutDashboard size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              Command Center
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#FAF3E1] tracking-tight">
            Operational <span className="text-[#FA8112]">Intelligence</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end px-4 border-r border-[#F5E7C6]/10">
            <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
              Global Status
            </span>
            <span className="text-[11px] font-bold text-emerald-400 uppercase">
              All Systems Nominal
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#FA8112] text-[#222222] rounded-lg shadow-lg shadow-[#FA8112]/20 text-[10px] font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-[#222222] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#222222]"></span>
            </span>
            Live
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/20 rounded-xl p-4 text-rose-400 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
          <Activity size={16} /> {error}
        </div>
      )}

      {/* 2. KPI GRID */}
      <DashboardStats data={stats} />

      {/* 3. MAIN ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Data Visuals (8/12) */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8">
          <DashboardCharts
            chartData={stats?.weeklyBookings}
            labels={stats?.weeklyLabels}
          />

          <RecentBookings data={bookings} />

          {/* AI PREDICTION BANNER: Redesigned for Pro Look */}
          <div className="bg-[#FA8112] rounded-xl p-8 lg:p-10 text-[#222222] flex items-center justify-between overflow-hidden relative group shadow-2xl">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#222222]/10 rounded border border-[#222222]/10">
                <Zap size={14} fill="currentColor" />
                <span className="text-[9px] font-bold uppercase tracking-widest">
                  Predictive Logic
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold tracking-tight">
                  Peak Congestion Warning
                </h4>
                <p className="text-[13px] text-[#222222]/70 max-w-md font-medium leading-relaxed">
                  Historical data suggests heavy traffic at{" "}
                  <span className="font-bold">17:00 IST</span>. Synchronizing
                  North-Gate B timers is recommended.
                </p>
              </div>
            </div>
            <Car
              size={180}
              className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: System Control (4/12) */}
        <div className="lg:col-span-4 space-y-6 lg:space-y-8">
          <SystemStatus data={systemStatus} />

          {/* ACTION CONSOLE */}
          <div className="bg-[#FAF3E1]/2 p-8 rounded-xl border border-[#F5E7C6]/5 shadow-sm space-y-6">
            <h3 className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em]">
              Operator Console
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handlePrimaryAction}
                className="flex items-center justify-between p-4 bg-[#FAF3E1]/5 text-[#FAF3E1] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#FA8112] hover:text-[#222222] transition-all border border-[#F5E7C6]/5 group"
              >
                <span className="flex items-center gap-3">
                  <Plus size={16} />{" "}
                  {isStaffAdmin ? "Active Registry" : "Initialize Slot"}
                </span>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </button>

              <button
                onClick={handleExportDashboardPDF}
                className="flex items-center justify-center gap-3 p-4 bg-[#FA8112] text-[#222222] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-[#FA8112]/10"
              >
                <FileDown size={16} /> Generate Audit PDF
              </button>
            </div>
          </div>

          {/* SYSTEM MAINTENANCE TILE */}
          <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              <Activity size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Maintenance Window
              </span>
            </div>
            <p className="text-[11px] text-[#FAF3E1]/40 leading-relaxed font-medium">
              Sensor array calibration scheduled for{" "}
              <span className="text-amber-500/80">02:00 AM IST</span>. Expected
              downtime: 12 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
