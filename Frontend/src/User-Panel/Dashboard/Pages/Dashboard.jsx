import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Car,
  Calendar,
  Wallet,
  ArrowUpRight,
  MapPin,
  Activity,
  Terminal,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useAuth } from "../../../Authentication-UI/Context/AuthContext";
import useDashboardData from "../Hooks/useDashboardData";
import DashboardStats from "../Components/DashboardStats";
import DashboardCharts from "../Components/DashboardCharts";
import RecentBookings from "../Components/RecentBookings";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, loading, error } = useDashboardData();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#222222] p-8 space-y-10">
        <div className="h-24 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-xl w-full max-w-xl animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-44 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-700">
        <div className="bg-rose-500/5 border border-rose-500/10 p-6 rounded-xl mb-6 text-rose-500">
          <Terminal size={48} strokeWidth={1} />
        </div>
        <h1 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
          Registry <span className="text-rose-500">Sync_Error</span>
        </h1>
        <p className="text-[#FAF3E1]/30 mt-2 mb-8 max-w-xs text-xs font-bold uppercase tracking-widest leading-relaxed">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#FA8112] text-[#222222] font-bold text-[10px] uppercase tracking-[0.2em] px-10 py-3 rounded-lg hover:bg-[#FAF3E1] transition-all"
        >
          Initialize_Retry_Protocol
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. HERO WELCOME: Command Interface */}
      <header className="px-1">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[#FA8112]">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
                Auth_Session_Active
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#FAF3E1] tracking-tight uppercase">
              Terminal_Hello,{" "}
              <span className="text-[#FA8112]">
                {user?.name?.split(" ")[0] || "SUBJECT_NULL"}
              </span>
            </h1>
            <div className="flex items-center gap-4 text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em]">
              <Calendar size={14} className="text-[#FA8112]/60" />
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          <NavLink
            to="/user/find-parking"
            className="flex items-center justify-center gap-3 bg-[#FA8112] text-[#222222] px-8 py-4 rounded-lg font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] transition-all shadow-2xl shadow-[#FA8112]/5 active:scale-95 group"
          >
            Find_Space_Registry{" "}
            <Search
              size={16}
              strokeWidth={2.5}
              className="group-hover:scale-110 transition-transform"
            />
          </NavLink>
        </div>
      </header>

      {/* 2. CORE METRICS ENGINE */}
      <section className="px-1">
        <DashboardStats stats={data?.stats} />
      </section>

      {/* 3. INTERACTIVE DATA VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1">
        {/* Left: Charts (2/3) */}
        <div className="lg:col-span-2">
          <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 shadow-2xl relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA8112]/[0.02] blur-[100px] pointer-events-none" />

            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                  Spatial_Usage_Analytics
                </h3>
                <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
                  Temporal performance data
                </p>
              </div>
              <Activity size={18} className="text-[#FA8112]/40 animate-pulse" />
            </div>
            <DashboardCharts
              stats={data?.stats}
              statusCounts={data?.statusCounts}
            />
          </div>
        </div>

        {/* Right: Recent Sequence Log (1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 shadow-2xl h-full flex flex-col group">
            <div className="flex items-center justify-between mb-10">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                  Sequence_History
                </h3>
                <p className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase tracking-[0.3em]">
                  Latest registry entries
                </p>
              </div>
              <NavLink
                to="/user/bookings"
                className="text-[10px] font-bold text-[#FA8112] uppercase tracking-widest hover:text-[#FAF3E1] transition-colors"
              >
                Access_All
              </NavLink>
            </div>
            <RecentBookings recentBookings={data?.recentBookings} />
          </div>
        </div>
      </div>

      {/* 4. ASSET UPGRADE BANNER */}
      <div className="px-1">
        <div className="relative overflow-hidden rounded-xl border border-[#FA8112]/20 bg-[#1a1a1a] p-10 group shadow-2xl">
          {/* Subtle hardware pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FA8112_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="bg-[#FA8112]/5 border border-[#FA8112]/20 p-5 rounded-lg text-[#FA8112] shadow-[0_0_20px_rgba(250,129,18,0.1)] group-hover:scale-105 transition-transform duration-700">
                <Wallet size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-[#FAF3E1] uppercase tracking-tight">
                  Settlement{" "}
                  <span className="text-[#FA8112]">Optimization</span>
                </h4>
                <p className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-[0.3em]">
                  Utilize Wallet Ledger for 10% instant discount on sequences.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/user/wallet")}
              className="bg-[#FA8112] text-[#222222] px-10 py-3 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#FAF3E1] transition-all active:scale-95 shadow-xl shadow-[#FA8112]/5"
            >
              Initialize_TopUp
            </button>
          </div>

          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#FA8112]/5 rounded-full blur-[100px] group-hover:bg-[#FA8112]/10 transition-colors duration-1000" />
        </div>
      </div>

      {/* 5. SYSTEM FOOTNOTE */}
      <div className="flex flex-col items-center gap-4 pt-4 opacity-20">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-[#FAF3E1]" />
          <Terminal size={14} />
          <span className="h-px w-12 bg-[#FAF3E1]" />
        </div>
        <p className="text-[9px] font-bold text-[#FAF3E1] uppercase tracking-[0.6em]">
          User Dashboard Node • v1.0.4_Secure
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
