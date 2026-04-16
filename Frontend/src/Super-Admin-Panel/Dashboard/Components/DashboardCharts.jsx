import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const DashboardCharts = ({ chartData = [], labels: customLabels = [] }) => {
  // Theme Variables:
  // Background: #222222 | Text: #FAF3E1 | Accent: #FA8112 | Border: #F5E7C6/10

  const labels =
    customLabels.length === 7
      ? customLabels
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const safeChartData = chartData.length === 7 ? chartData : [0, 0, 0, 0, 0, 0, 0];
  const maxBooking = Math.max(...safeChartData, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Bookings",
        data: safeChartData,
        // Accent Color: #FA8112
        backgroundColor: "#FA8112",
        hoverBackgroundColor: "#FAF3E1",
        borderRadius: 12,
        borderSkipped: false,
        barThickness: 24,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        // Tooltip using Page Background #222222
        backgroundColor: "#222222",
        titleColor: "#FAF3E1",
        bodyColor: "#FAF3E1",
        borderColor: "rgba(245, 231, 198, 0.1)",
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
        titleFont: { size: 14, weight: "900" },
        bodyFont: { size: 13, weight: "bold" },
        displayColors: false,
        callbacks: {
          label: (context) => ` ${context.raw} Bookings`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        // Text Color: #FAF3E1 at 30% opacity
        ticks: {
          color: "rgba(250, 243, 225, 0.3)",
          font: { size: 11, weight: "900" },
        },
      },
      y: {
        beginAtZero: true,
        // Grid Color: #F5E7C6 at 5% opacity
        grid: { color: "rgba(245, 231, 198, 0.05)" },
        ticks: {
          color: "rgba(250, 243, 225, 0.3)",
          font: { size: 11, weight: "bold" },
          stepSize: maxBooking > 0 ? Math.max(1, Math.ceil(maxBooking / 5)) : 1,
        },
      },
    },
  };

  return (
    // Card Style: #FAF3E1 at 2% opacity
    <div className="bg-[#FAF3E1]/2 p-8 rounded-[2.5rem] border border-[#F5E7C6]/10 shadow-sm h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-sm font-black text-[#FAF3E1] uppercase tracking-widest">
            Weekly Performance
          </h2>
          <p className="text-[10px] text-[#FAF3E1]/30 font-bold uppercase tracking-tighter mt-1">
            Live booking analytics
          </p>
        </div>
        <div className="flex gap-2">
          {/* Status Badge: Accent Background #FA8112 */}
          <span className="flex items-center gap-1.5 text-[9px] font-black text-[#222222] bg-[#FA8112] px-3 py-1.5 rounded-lg uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-[#222222] animate-pulse"></div>
            Real-time
          </span>
        </div>
      </div>

      <div className="h-62.5 sm:h-75 w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardCharts;
