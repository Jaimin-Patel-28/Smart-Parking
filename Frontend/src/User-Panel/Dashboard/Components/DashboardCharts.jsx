import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { Activity, PieChart, TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const DashboardCharts = ({ stats, statusCounts }) => {
  // 1. Spending Trend - Technical Area Chart
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        fill: true,
        label: "Settled_Value",
        data: [0, 0, 0, 0, 0, stats?.totalSpent || 0],
        borderColor: "#FA8112",
        backgroundColor: "rgba(250, 129, 18, 0.03)",
        borderWidth: 2,
        pointBackgroundColor: "#FA8112",
        pointBorderColor: "#222222",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a1a",
        titleFont: { family: "monospace", size: 10 },
        bodyFont: { family: "monospace", size: 12, weight: "bold" },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        borderWidth: 1,
        borderColor: "rgba(250, 129, 18, 0.2)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(245, 231, 198, 0.03)" },
        ticks: {
          color: "rgba(245, 231, 198, 0.2)",
          font: { family: "monospace", size: 9 },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(245, 231, 198, 0.2)",
          font: { family: "monospace", size: 9 },
        },
      },
    },
  };

  // 2. Status Breakdown - Precision Ring
  const statusObj =
    statusCounts?.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}) || {};

  const pieData = {
    labels: Object.keys(statusObj).map((s) => s.toUpperCase()),
    datasets: [
      {
        data: Object.values(statusObj),
        backgroundColor: ["#FA8112", "#FAF3E1", "#333333", "#555555"],
        hoverOffset: 0,
        borderWidth: 2,
        borderColor: "#222222",
        borderRadius: 4,
        spacing: 5,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(245, 231, 198, 0.3)",
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
          font: { family: "monospace", size: 9, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* AREA CHART: SPENDING TELEMETRY */}
      <div className="xl:col-span-3 bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FA8112]/[0.02] blur-[100px] pointer-events-none" />

        <div className="flex items-center justify-between mb-10 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#FA8112]">
              <Activity size={14} className="animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                Financial_Flow
              </span>
            </div>
            <h4 className="text-xl font-bold text-[#FAF3E1] uppercase tracking-tight">
              Spending <span className="text-[#FA8112]">Trend</span>
            </h4>
          </div>
          <div className="bg-[#1a1a1a] border border-[#F5E7C6]/5 px-4 py-1.5 rounded-md">
            <span className="text-[#FAF3E1]/40 text-[9px] font-bold uppercase tracking-widest">
              Temporal_Cycle: Monthly
            </span>
          </div>
        </div>

        <div className="h-64 relative z-10">
          <Line data={trendData} options={trendOptions} />
        </div>
      </div>

      {/* DOUGHNUT CHART: STATUS DISTRIBUTION */}
      <div className="xl:col-span-2 bg-[#FAF3E1]/[0.01] border border-[#F5E7C6]/5 rounded-xl p-8 relative flex flex-col shadow-2xl group">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-[#FA8112]/5 rounded-lg border border-[#FA8112]/10 text-[#FA8112]">
            <PieChart size={16} />
          </div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FAF3E1]/30">
            Allocation_Status
          </h4>
        </div>

        <div className="h-56 relative mb-6">
          <Doughnut data={pieData} options={pieOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-[#FAF3E1] tabular-nums">
              {stats?.totalBookings || 0}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#FAF3E1]/10">
              Total_Units
            </span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[#F5E7C6]/5 flex justify-center">
          <p className="text-[9px] font-mono font-bold text-[#FAF3E1]/10 uppercase tracking-[0.2em] flex items-center gap-2">
            <TrendingUp size={10} /> Sync_Status: Verified_Live
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
