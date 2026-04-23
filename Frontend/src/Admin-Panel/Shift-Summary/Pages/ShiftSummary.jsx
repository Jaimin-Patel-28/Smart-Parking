import {
  Loader,
  AlertCircle,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowLeft,
  BarChart3,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useShiftMetrics from "../Hooks/useShiftMetrics";
import StatsCard from "../Components/StatsCard";

const ShiftSummary = () => {
  const navigate = useNavigate();
  const { metrics, loading, error, timeRange, fetchMetrics } =
    useShiftMetrics();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
        <p className="text-[#FAF3E1]/40 text-[10px] uppercase font-bold tracking-widest">
          Aggregating Metrics...
        </p>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FAF3E1] transition-all"
        >
          <ArrowLeft size={16} />{" "}
          <span className="text-xs font-bold uppercase tracking-widest">
            Back
          </span>
        </button>
        <div
          className={`p-6 rounded-xl border ${error ? "bg-rose-500/5 border-rose-500/20 text-rose-300" : "bg-amber-500/5 border-amber-500/20 text-amber-300"}`}
        >
          <div className="flex items-center gap-3">
            <AlertCircle size={20} />
            <p className="font-medium">
              {error || "No data available for the selected time range."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const periodStart = new Date(metrics.period?.startDate).toLocaleDateString();
  const periodEnd = new Date(metrics.period?.endDate).toLocaleDateString();

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-16">
      {/* 1. HEADER & NAVIGATION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[#FAF3E1]/40 hover:text-[#FA8112] transition-all"
          >
            <div className="p-2 rounded-lg bg-[#FAF3E1]/5 group-hover:bg-[#FA8112]/10 border border-[#F5E7C6]/5">
              <ArrowLeft size={16} />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest">
              Dashboard
            </span>
          </button>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#FAF3E1]">
              Shift Analytics
            </h2>
            <p className="text-[#FAF3E1]/40 text-sm mt-1 flex items-center gap-2">
              <Calendar size={14} className="text-[#FA8112]" /> {periodStart} —{" "}
              {periodEnd}
            </p>
          </div>
        </div>

        {/* TIME RANGE SELECTOR */}
        <div className="flex p-1 bg-[#FAF3E1]/5 rounded-lg border border-[#F5E7C6]/5 w-fit">
          {["today", "week", "month"].map((range) => (
            <button
              key={range}
              onClick={() => fetchMetrics(range)}
              className={`px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                timeRange === range
                  ? "bg-[#FA8112] text-[#222222] shadow-lg shadow-[#FA8112]/10"
                  : "text-[#FAF3E1]/40 hover:text-[#FAF3E1]"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 2. OVERALL SUCCESS SUMMARY */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
          <BarChart3 size={120} />
        </div>

        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#FAF3E1]/30">
            Total Transactions
          </p>
          <p className="text-4xl font-bold text-[#FAF3E1]">
            {metrics.summary?.totalActions || 0}
          </p>
        </div>

        <div className="space-y-1 border-l border-[#F5E7C6]/5 sm:pl-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-400/60">
            Success Rate
          </p>
          <div className="flex items-baseline gap-2 text-emerald-400">
            <p className="text-4xl font-bold">
              {metrics.summary?.overallSuccessRate || 0}%
            </p>
            <p className="text-sm font-medium opacity-60">
              ({metrics.summary?.totalSuccess || 0} items)
            </p>
          </div>
        </div>

        <div className="space-y-1 border-l border-[#F5E7C6]/5 sm:pl-8">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-rose-400/60">
            Failure Logs
          </p>
          <p className="text-4xl font-bold text-rose-400">
            {(metrics.summary?.totalActions || 0) -
              (metrics.summary?.totalSuccess || 0)}
          </p>
        </div>
      </div>

      {/* 3. KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={CheckCircle}
          label="Entries"
          value={metrics.entries?.total || 0}
          subtext={`${metrics.entries?.successful || 0} Completed`}
          trend={`${metrics.entries?.successRate || 0}% Rate`}
          color="#10b981"
        />
        <StatsCard
          icon={Activity}
          label="Exits"
          value={metrics.exits?.total || 0}
          subtext={`${metrics.exits?.successful || 0} Completed`}
          trend={`${metrics.exits?.successRate || 0}% Rate`}
          color="#3b82f6"
        />
        <StatsCard
          icon={TrendingUp}
          label="Validations"
          value={metrics.verifications?.total || 0}
          subtext={`${metrics.verifications?.successful || 0} Verified`}
          trend={`${metrics.verifications?.successRate || 0}% Rate`}
          color="#8b5cf6"
        />
        <StatsCard
          icon={AlertTriangle}
          label="Manual Overrides"
          value={metrics.overrides?.total || 0}
          subtext={`${metrics.overrides?.successful || 0} Authorized`}
          trend={`${metrics.overrides?.successRate || 0}% Rate`}
          color="#f59e0b"
        />
      </div>

      {/* 4. PERFORMANCE & EXCEPTIONS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Processing Time */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-xl p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-6 text-[#FA8112]/60">
            <Clock size={16} />
            <h3 className="text-[11px] font-bold uppercase tracking-widest">
              Avg. Processing Speed
            </h3>
          </div>
          <div className="flex items-end gap-4">
            <p className="text-6xl font-bold text-[#FA8112]">
              {metrics.avgProcessingTimeSecs === "N/A"
                ? "N/A"
                : `${metrics.avgProcessingTimeSecs}s`}
            </p>
            <div className="pb-2">
              <p className="text-[10px] text-[#FAF3E1]/30 uppercase font-bold tracking-tighter">
                Per Transaction
              </p>
              <p className="text-xs text-[#FAF3E1]/60 font-medium">
                Based on{" "}
                {(metrics.entries?.total || 0) + (metrics.exits?.total || 0)}{" "}
                operations
              </p>
            </div>
          </div>
        </div>

        {/* Exception Highlights */}
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-xl p-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/30 mb-6">
            Categorized Exceptions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(metrics.exceptionBreakdown || {}).map(
              ([type, count]) => {
                const colors = {
                  ALLOW_ENTRY:
                    "text-emerald-400 bg-emerald-400/5 border-emerald-400/10",
                  MARK_NO_SHOW:
                    "text-rose-400 bg-rose-400/5 border-rose-400/10",
                  default: "text-[#FA8112] bg-[#FA8112]/5 border-[#FA8112]/10",
                };
                const style = colors[type] || colors.default;
                return (
                  <div key={type} className={`p-4 rounded-lg border ${style}`}>
                    <p className="text-[9px] uppercase font-bold tracking-widest opacity-60 mb-1 truncate">
                      {type.replace(/_/g, " ")}
                    </p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* 5. DATA TABLE: ACTION BREAKDOWN */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/5 rounded-xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-[#F5E7C6]/5">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#FAF3E1]/30">
            Full Operational Breakdown
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF3E1]/2 text-[#FAF3E1]/20 uppercase text-[10px] font-bold tracking-widest">
              <tr>
                <th className="py-4 px-6">Metric Category</th>
                <th className="py-4 px-6">Total Vol.</th>
                <th className="py-4 px-6 text-emerald-400/60">Success</th>
                <th className="py-4 px-6 text-rose-400/60">Failed</th>
                <th className="py-4 px-6">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5E7C6]/5">
              {[
                { label: "Gate Entries", data: metrics.entries },
                { label: "Gate Exits", data: metrics.exits },
                { label: "Ticket Validations", data: metrics.verifications },
                { label: "Admin Overrides", data: metrics.overrides },
              ].map((item) => (
                <tr
                  key={item.label}
                  className="hover:bg-[#FAF3E1]/2 transition-colors"
                >
                  <td className="py-4 px-6 text-[#FAF3E1] font-semibold">
                    {item.label}
                  </td>
                  <td className="py-4 px-6 text-[#FAF3E1]/60">
                    {item.data?.total || 0}
                  </td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">
                    {item.data?.successful || 0}
                  </td>
                  <td className="py-4 px-6 text-rose-400 font-bold">
                    {item.data?.failed || 0}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 rounded-full bg-[#222] overflow-hidden">
                        <div
                          className="h-full bg-[#FA8112]"
                          style={{ width: `${item.data?.successRate || 0}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-[#FAF3E1]">
                        {item.data?.successRate || 0}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftSummary;
