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

const DashboardCharts = ({ stats, recentBookings, statusCounts }) => {
  // 1. Spending Trend - Sleek Area Chart
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        fill: true,
        label: "Spent",
        data: [0, 0, 0, 0, 0, stats?.totalSpent || 0],
        borderColor: "#FA8112",
        backgroundColor: "rgba(250, 129, 18, 0.05)",
        borderWidth: 3,
        pointBackgroundColor: "#FA8112",
        pointBorderColor: "#222222",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // Creates that smooth wave look
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
        titleColor: "#FAF3E1",
        bodyColor: "#FA8112",
        padding: 12,
        cornerRadius: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(245, 231, 198, 0.03)", drawBorder: false },
        ticks: { color: "rgba(245, 231, 198, 0.3)", font: { size: 10 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(245, 231, 198, 0.3)", font: { size: 10 } },
      },
    },
  };

  // 2. Status Breakdown - Modern Doughnut
  const statusObj = statusCounts?.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {}) || {};

  const pieData = {
    labels: Object.keys(statusObj),
    datasets: [
      {
        data: Object.values(statusObj),
        backgroundColor: ["#FA8112", "#FAF3E1", "#444444", "#888888", "#AAAAAA"],
        hoverOffset: 10,
        borderWidth: 0,
        borderRadius: 20,
        spacing: 10,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "80%", // Makes it a thin, elegant ring
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(245, 231, 198, 0.5)",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: { size: 11, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
      {/* Area Chart Container (3/5 width) */}
      <div className="xl:col-span-3 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2.5rem] p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-1">
              Revenue Flow
            </h4>
            <p className="text-2xl font-black text-[#FAF3E1] italic">
              Spending Trend
            </p>
          </div>
          <div className="bg-[#FA8112]/10 px-4 py-2 rounded-full">
            <span className="text-[#FA8112] text-xs font-black">Monthly</span>
          </div>
        </div>

        <div className="h-64">
          <Line data={trendData} options={trendOptions} />
        </div>
      </div>

      {/* Doughnut Chart Container (2/5 width) */}
      <div className="xl:col-span-2 bg-[#FAF3E1]/[0.02] border border-[#F5E7C6]/5 rounded-[2.5rem] p-8 relative flex flex-col">
        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FAF3E1]/30 mb-8">
          Booking Status
        </h4>

        <div className="h-56 relative mb-4">
          <Doughnut data={pieData} options={pieOptions} />
          {/* Center Stat */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-[#FAF3E1] italic">
              {stats?.totalBookings || 0}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FAF3E1]/20">
              Total
            </span>
          </div>
        </div>

        <p className="text-[10px] text-center text-[#FAF3E1]/20 italic mt-auto">
          Real-time status synchronization active
        </p>
      </div>
    </div>
  );
};

export default DashboardCharts;
