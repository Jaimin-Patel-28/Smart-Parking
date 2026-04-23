import React, { useState } from "react";
import {
  BarChart3,
  IndianRupee,
  TrendingUp,
  Users,
  AlertCircle,
  RefreshCw,
  MapPin,
  Terminal,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useReports } from "../hooks/useReports";
import ReportCard from "../components/ReportCard";
import ReportFilters from "../components/ReportFilters";

const Reports = () => {
  const {
    comprehensiveReport,
    revenueReport,
    occupancyReport,
    bookingReport,
    userReport,
    loading,
    error,
    refresh,
  } = useReports();

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    reportType: "comprehensive",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerateReport = () => {
    if (filters.startDate && filters.endDate && filters.startDate > filters.endDate) {
      toast.error("Period Start cannot be later than Period End");
      return;
    }

    refresh(filters);
  };

  return (
    <div className="max-w-400 mx-auto space-y-10 animate-in fade-in duration-700 pb-16">
      {/* 1. ANALYTICS HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#FA8112]">
            <Activity size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Operational Intelligence
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#FAF3E1] tracking-tight uppercase">
            Reports <span className="text-[#FA8112]">Center</span>
          </h1>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-widest">
            High-integrity system analytics & spatial diagnostics
          </p>
        </div>

      </div>

      {/* 2. QUERY ENGINE */}
      <ReportFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onRefresh={handleGenerateReport}
        loading={loading}
      />

      {error && (
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-lg p-4 text-rose-400 text-[11px] font-bold uppercase tracking-widest">
          Critical Sync Error: {error}
        </div>
      )}

      {/* 3. COMPREHENSIVE TELEMETRY (Overview) */}
      {comprehensiveReport && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <ReportCard
            title="Revenue Asset"
            icon={IndianRupee}
            value={`₹${(comprehensiveReport.data?.totalRevenue || 0).toLocaleString()}`}
            trend="+12.4%"
          />
          <ReportCard
            title="Spatial Density"
            icon={MapPin}
            value={`${comprehensiveReport.data?.occupancyRate || 0}%`}
          />
          <ReportCard
            title="User Registry"
            icon={Users}
            value={comprehensiveReport.data?.activeUsers || 0}
            subtitle={`OF ${comprehensiveReport.data?.totalUsers || 0} TOTAL`}
          />
          <ReportCard
            title="Session Completion"
            icon={TrendingUp}
            value={`${comprehensiveReport.data?.completionRate || 0}%`}
          />
          <ReportCard
            title="System Health"
            icon={AlertCircle}
            value="ACTIVE"
            subtitle="PROTOCOL_HEALTHY"
          />
        </div>
      )}

      {/* 4. DATA BREAKDOWN MODULES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* REVENUE ANALYSIS BOX */}
        {revenueReport && (
          <div className="bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 pb-6">
              <div className="flex items-center gap-3">
                <IndianRupee className="text-[#FA8112]/40" size={20} />
                <h2 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                  Revenue <span className="text-[#FA8112]">Diagnostic</span>
                </h2>
              </div>
              <p className="text-[9px] font-mono font-bold text-[#FAF3E1]/10">
                LOG_REF_
                {new Date(revenueReport.generatedAt)
                  .getTime()
                  .toString()
                  .slice(-6)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#F5E7C6]/5 space-y-1">
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                  Net Settlement
                </p>
                <p className="text-2xl font-bold text-emerald-400 tabular-nums tracking-tighter">
                  ₹{(revenueReport.data?.totalRevenue || 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#F5E7C6]/5 space-y-1">
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                  Query Origin
                </p>
                <p className="text-[11px] font-mono font-bold text-[#FAF3E1]/60 uppercase">
                  {revenueReport.data?.period?.startDate || "ALL_TIME"}
                </p>
              </div>
              <div className="bg-[#1a1a1a] rounded-lg p-5 border border-[#F5E7C6]/5 space-y-1">
                <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                  Sync Stamp
                </p>
                <p className="text-[11px] font-mono font-bold text-[#FAF3E1]/60">
                  {new Date(revenueReport.generatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold text-[#FAF3E1]/20 uppercase tracking-[0.3em] ml-1">
                Site Revenue Breakdown
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {revenueReport.data?.revenueByParking?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#F5E7C6]/5 hover:border-[#FA8112]/20 transition-all group"
                  >
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#FAF3E1] uppercase tracking-tight">
                        {item.parkingName}
                      </span>
                      <span className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest">
                        {item.bookingsCount} SEQUENCES
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#FA8112] tabular-nums group-hover:scale-105 transition-transform">
                      ₹{item.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SPATIAL OCCUPANCY BOX */}
        {occupancyReport && (
          <div className="bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl p-8 space-y-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 pb-6">
              <div className="flex items-center gap-3">
                <MapPin className="text-[#FA8112]/40" size={20} />
                <h2 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                  Spatial <span className="text-[#FA8112]">Density Map</span>
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FA8112] animate-pulse" />
                <span className="text-[9px] font-bold text-[#FA8112] uppercase tracking-[0.2em]">
                  Live Telemetry
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {occupancyReport.data?.map((parking) => (
                <div
                  key={parking.parkingId}
                  className="bg-[#1a1a1a] rounded-lg p-5 border border-[#F5E7C6]/5 space-y-4"
                >
                  <div className="space-y-1">
                    <p className="text-[12px] font-bold text-[#FAF3E1] uppercase tracking-tight">
                      {parking.parkingName}
                    </p>
                    <p className="text-[9px] font-bold text-[#FAF3E1]/20 uppercase tracking-widest leading-none">
                      {parking.location}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-bold text-[#FAF3E1]/10 uppercase">
                        Utilization
                      </span>
                      <span className="text-sm font-mono font-bold text-[#FA8112]">
                        {parking.occupancyRate}%
                      </span>
                    </div>
                    <div className="h-1 w-full bg-[#FAF3E1]/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#FA8112] shadow-[0_0_8px_#FA8112]"
                        style={{ width: `${parking.occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 border-t border-[#F5E7C6]/5 pt-3 tabular-nums">
                    <span>{parking.occupiedSlots} ENGAGED</span>
                    <span>{parking.availableSlots} READY</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {bookingReport && (
          <div className="bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 pb-6">
              <h2 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                Booking <span className="text-[#FA8112]">Manifest</span>
              </h2>
              <span className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">
                {bookingReport.data?.stats?.totalBookings || 0} Records
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(bookingReport.data?.stats?.byStatus || {}).map(([status, count]) => (
                <div key={status} className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg p-4">
                  <p className="text-[9px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">{status}</p>
                  <p className="text-xl font-bold text-[#FAF3E1] mt-1">{count}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {userReport && (
          <div className="bg-[#FAF3E1]/1 border border-[#F5E7C6]/5 rounded-xl p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#F5E7C6]/5 pb-6">
              <h2 className="text-sm font-bold text-[#FAF3E1] uppercase tracking-[0.2em]">
                User <span className="text-[#FA8112]">Registry</span>
              </h2>
              <span className="text-[10px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">
                Snapshot
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg p-4">
                <p className="text-[9px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">Total Users</p>
                <p className="text-xl font-bold text-[#FAF3E1] mt-1">{userReport.data?.summary?.totalUsers || 0}</p>
              </div>
              <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 rounded-lg p-4">
                <p className="text-[9px] font-bold text-[#FAF3E1]/30 uppercase tracking-widest">Active Users</p>
                <p className="text-xl font-bold text-emerald-400 mt-1">{userReport.data?.summary?.activeUsers || 0}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. USER METRICS & EMPTY STATE */}
      {loading ? (
        <div className="min-h-100 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <RefreshCw
              size={48}
              className="animate-spin text-[#FA8112]"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 border-2 border-[#FA8112]/5 rounded-full" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/20">
            Synthesizing System Data...
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 opacity-20 py-10">
          <Terminal size={24} />
          <p className="text-[9px] font-bold uppercase tracking-[0.6em]">
            System Audit Manifest • Site_Registry_Anand
          </p>
        </div>
      )}
    </div>
  );
};

export default Reports;
