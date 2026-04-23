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
  // Theme: BG #222222 | Text #FAF3E1 | Accent #FA8112 | Border #F5E7C6/5

  const labels =
    customLabels.length === 7
      ? customLabels
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const safeChartData =
    chartData.length === 7 ? chartData : [0, 0, 0, 0, 0, 0, 0];
  const maxBooking = Math.max(...safeChartData, 0);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Bookings",
        data: safeChartData,
        // Using a slight gradient effect or solid premium accent
        backgroundColor: "rgba(250, 129, 18, 0.85)",
        hoverBackgroundColor: "#FA8112",
        borderRadius: 6, // Sharper, professional corners
        borderSkipped: false,
        barThickness: 20, // Slightly thinner for a cleaner look
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1a1a1a", // Slightly darker than page BG for depth
        titleColor: "#FAF3E1",
        bodyColor: "#FAF3E1",
        borderColor: "rgba(245, 231, 198, 0.05)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12, weight: "700", family: "Inter, sans-serif" },
        bodyFont: { size: 12, weight: "500", family: "Inter, sans-serif" },
        displayColors: false,
        callbacks: {
          label: (context) => ` ${context.raw} Bookings`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "rgba(250, 243, 225, 0.2)",
          font: { size: 10, weight: "600" },
          padding: 10,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(245, 231, 198, 0.03)", // Ultra-subtle grid
          drawBorder: false,
        },
        ticks: {
          color: "rgba(250, 243, 225, 0.2)",
          font: { size: 10, weight: "600" },
          padding: 10,
          stepSize: maxBooking > 0 ? Math.max(1, Math.ceil(maxBooking / 5)) : 1,
        },
      },
    },
  };

  return (
    <div className="bg-[#FAF3E1]/2 p-6 md:p-8 rounded-xl border border-[#F5E7C6]/5 shadow-xl h-full flex flex-col">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h2 className="text-[11px] font-bold text-[#FAF3E1]/40 uppercase tracking-[0.2em]">
            System Performance
          </h2>
          <h3 className="text-lg font-bold text-[#FAF3E1] mt-1">
            Weekly Booking Volume
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FA8112]/5 border border-[#FA8112]/10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FA8112] animate-pulse shadow-[0_0_8px_#FA8112]"></div>
          <span className="text-[9px] font-bold text-[#FA8112] uppercase tracking-widest">
            Live Stream
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-[250px] sm:min-h-[300px] w-full">
        <Bar data={data} options={options} />
      </div>

      <div className="mt-6 pt-6 border-t border-[#F5E7C6]/5 flex justify-between items-center">
        <p className="text-[10px] text-[#FAF3E1]/20 uppercase font-bold tracking-widest">
          Last Updated:{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <button className="text-[10px] text-[#FA8112]/60 hover:text-[#FA8112] font-bold uppercase tracking-widest transition-colors">
          View Full Report
        </button>
      </div>
    </div>
  );
};

export default DashboardCharts;
