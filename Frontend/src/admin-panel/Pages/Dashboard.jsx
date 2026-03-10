import React from "react";
import useDashboardData from "../Hooks/useDashboardData";
import DashboardStats from "../Components/Dashboard/DashboardStats";
import RecentBookings from "../components/dashboard/RecentBookings";
import SystemStatus from "../components/dashboard/SystemStatus";
import DashboardCharts from "../Components/Dashboard/DashboardCharts";
import { Car, Zap, Plus, FileDown, Loader2 } from "lucide-react";

const Dashboard = () => {
  // 1. Consume the Custom Hook
  const { stats, bookings, systemStatus, loading } = useDashboardData();

  // 2. Operational Loading State
  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600" />
        <p className="text-slate-500 font-medium animate-pulse">
          Synchronizing with parking sensors...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10 px-2 sm:px-0">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-800 tracking-tight">
            Operational Overview
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Live updates from {bookings?.length || 0} active parking sessions.
          </p>
        </div>
        <div className="flex self-start md:self-center items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          SYSTEM LIVE
        </div>
      </div>

      {/* 2. Stats Row */}
      <DashboardStats data={stats} />

      {/* 3. Graphical Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Main Chart Section - Passing weeklyBookings from stats */}
          <div className="w-full overflow-hidden">
            <DashboardCharts chartData={stats?.weeklyBookings} />
          </div>

          {/* Table Section - Passing bookings array */}
          <div className="w-full">
            <RecentBookings data={bookings} />
          </div>

          {/* Smart Analysis Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-6 lg:p-8 text-white flex items-center justify-between overflow-hidden relative shadow-lg">
            <div className="z-10">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <Zap size={16} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  AI Prediction
                </span>
              </div>
              <h4 className="text-xl font-bold">Smart Analysis</h4>
              <p className="opacity-80 text-sm mt-2 max-w-sm leading-relaxed">
                Peak hours are expected between 5 PM - 8 PM today.
                Recommendation: Open North-Gate Exit B to reduce congestion.
              </p>
            </div>
            <div className="absolute right-[-10px] bottom-[-20px] opacity-10 transform rotate-12 pointer-events-none">
              <Car size={180} />
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <SystemStatus data={systemStatus} />

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              Quick Actions
            </h3>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-emerald-600 hover:text-white transition-all border border-transparent shadow-sm">
                <Plus size={16} /> Add Slot
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200">
                <FileDown size={16} /> Export PDF
              </button>
            </div>
          </div>

          {/* Mini Operational Note */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl shadow-inner">
            <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
              <strong className="block mb-1 underline">
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
