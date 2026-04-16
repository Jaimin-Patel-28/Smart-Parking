import { Loader, AlertCircle, Calendar, TrendingUp, DollarSign, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import useShiftMetrics from "../Hooks/useShiftMetrics";
import StatsCard from "../Components/StatsCard";

const ShiftSummary = () => {
  const { metrics, loading, error, timeRange, fetchMetrics } = useShiftMetrics();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-[#FA8112] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#FAF3E1]">Shift Summary</h2>
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 text-rose-400 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#FAF3E1]">Shift Summary</h2>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-amber-400">
          <p>No data available for the selected time range.</p>
        </div>
      </div>
    );
  }

  const periodStart = new Date(metrics.period?.startDate).toLocaleDateString();
  const periodEnd = new Date(metrics.period?.endDate).toLocaleDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#FAF3E1]">Shift Summary</h2>
          <p className="text-[#FAF3E1]/50 text-sm mt-1">
            {periodStart} to {periodEnd}
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {["today", "week", "month"].map((range) => (
            <button
              key={range}
              onClick={() => fetchMetrics(range)}
              className={`px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition ${
                timeRange === range
                  ? "bg-[#FA8112] text-[#222222]"
                  : "bg-[#FAF3E1]/10 text-[#FAF3E1] border border-[#F5E7C6]/10 hover:bg-[#FAF3E1]/20"
              }`}
            >
              {range === "today" ? "Today" : range === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Overview */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-widest">Total Actions</p>
          <p className="text-3xl font-black text-[#FAF3E1]">{metrics.summary?.totalActions || 0}</p>
        </div>

        <div className="space-y-2">
          <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-widest">Successful</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-emerald-400">{metrics.summary?.totalSuccess || 0}</p>
            <p className="text-lg font-semibold text-emerald-400">{metrics.summary?.overallSuccessRate || 0}%</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-widest">Failed</p>
          <p className="text-3xl font-black text-rose-400">
            {(metrics.summary?.totalActions || 0) - (metrics.summary?.totalSuccess || 0)}
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Entries */}
        <StatsCard
          icon={CheckCircle}
          label="Total Entries"
          value={metrics.entries?.total || 0}
          subtext={`${metrics.entries?.successful || 0} successful`}
          trend={`${metrics.entries?.successRate || 0}% success rate`}
          color="#10b981"
        />

        {/* Exits */}
        <StatsCard
          icon={CheckCircle}
          label="Total Exits"
          value={metrics.exits?.total || 0}
          subtext={`${metrics.exits?.successful || 0} successful`}
          trend={`${metrics.exits?.successRate || 0}% success rate`}
          color="#3b82f6"
        />

        {/* Verifications */}
        <StatsCard
          icon={TrendingUp}
          label="Verifications"
          value={metrics.verifications?.total || 0}
          subtext={`${metrics.verifications?.successful || 0} successful`}
          trend={`${metrics.verifications?.successRate || 0}% success rate`}
          color="#8b5cf6"
        />

        {/* Overrides */}
        <StatsCard
          icon={AlertTriangle}
          label="Overrides"
          value={metrics.overrides?.total || 0}
          subtext={`${metrics.overrides?.successful || 0} successful`}
          trend={`${metrics.overrides?.successRate || 0}% success rate`}
          color="#f59e0b"
        />
      </div>

      {/* Processing Time */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-[#FA8112]" />
          <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider">Processing Time</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[#FAF3E1]/50 text-sm uppercase tracking-widest">Average (Entry/Exit)</p>
            <p className="text-4xl font-black text-[#FA8112]">
              {metrics.avgProcessingTimeSecs === "N/A" ? "N/A" : `${metrics.avgProcessingTimeSecs}s`}
            </p>
          </div>
          <div className="bg-[#222222]/50 rounded-xl p-4 flex items-center">
            <div className="space-y-1">
              <p className="text-[#FAF3E1]/50 text-xs uppercase tracking-widest">Based on</p>
              <p className="text-xl font-semibold text-[#FAF3E1]">
                {(metrics.entries?.total || 0) + (metrics.exits?.total || 0)} operations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exception Breakdown */}
      {Object.keys(metrics.exceptionBreakdown || {}).length > 0 && (
        <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6">
          <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider mb-6">Exception Breakdown</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(metrics.exceptionBreakdown).map(([type, count]) => {
              // Format the exception type name
              let displayName = type;
              let color = "#FA8112";

              switch (type) {
                case "ALLOW_ENTRY":
                  displayName = "Allow Entry";
                  color = "#10b981";
                  break;
                case "ALLOW_EXIT_PENDING_PAYMENT":
                  displayName = "Exit w/ Pending";
                  color = "#f59e0b";
                  break;
                case "MARK_NO_SHOW":
                  displayName = "No-Show";
                  color = "#ef4444";
                  break;
                case "FORCE_COMPLETE_OVERSTAY":
                  displayName = "Force Complete";
                  color = "#3b82f6";
                  break;
                default:
                  displayName = type;
              }

              return (
                <div key={type} className="bg-[#222222]/50 border border-[#F5E7C6]/10 rounded-xl p-4 space-y-3">
                  <p className="text-[#FAF3E1]/50 text-sm font-semibold uppercase tracking-widest">{displayName}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black" style={{ color }}>
                      {count}
                    </p>
                    <p className="text-xs" style={{ color: `${color}88` }}>
                      {count === 1 ? "case" : "cases"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Detailed Action Breakdown */}
      <div className="bg-[#FAF3E1]/2 border border-[#F5E7C6]/10 rounded-2xl p-6">
        <h3 className="text-lg font-black text-[#FAF3E1] uppercase tracking-wider mb-6">Action Breakdown</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#F5E7C6]/10">
                <th className="py-3 px-4 text-[#FAF3E1]/50 text-xs font-black uppercase tracking-widest">Action</th>
                <th className="py-3 px-4 text-[#FAF3E1]/50 text-xs font-black uppercase tracking-widest">Total</th>
                <th className="py-3 px-4 text-[#FAF3E1]/50 text-xs font-black uppercase tracking-widest">Successful</th>
                <th className="py-3 px-4 text-[#FAF3E1]/50 text-xs font-black uppercase tracking-widest">Failed</th>
                <th className="py-3 px-4 text-[#FAF3E1]/50 text-xs font-black uppercase tracking-widest">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Entries", data: metrics.entries },
                { label: "Exits", data: metrics.exits },
                { label: "Verifications", data: metrics.verifications },
                { label: "Overrides", data: metrics.overrides },
              ].map((item) => (
                <tr key={item.label} className="border-t border-[#F5E7C6]/10 hover:bg-[#222222]/30 transition">
                  <td className="py-3 px-4 text-[#FAF3E1] font-semibold">{item.label}</td>
                  <td className="py-3 px-4 text-[#FAF3E1]">{item.data?.total || 0}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{item.data?.successful || 0}</td>
                  <td className="py-3 px-4 text-rose-400 font-semibold">{item.data?.failed || 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-[#222222] overflow-hidden">
                        <div
                          className="h-full bg-[#FA8112]"
                          style={{ width: `${item.data?.successRate || 0}%` }}
                        />
                      </div>
                      <span className="text-[#FAF3E1] text-sm font-semibold">{item.data?.successRate || 0}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Time Period Info */}
      <div className="bg-[#FAF3E1]/5 border border-[#F5E7C6]/10 rounded-2xl p-4 flex items-center gap-3 text-[#FAF3E1]/70 text-sm">
        <Calendar className="w-5 h-5 shrink-0" />
        <span>
          Data period: <strong>{periodStart}</strong> to <strong>{periodEnd}</strong> • Last updated:{" "}
          <strong>{new Date().toLocaleTimeString()}</strong>
        </span>
      </div>
    </div>
  );
};

export default ShiftSummary;
