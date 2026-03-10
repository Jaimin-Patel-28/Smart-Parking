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

// 1. Added 'data' prop to receive real-time numbers
const DashboardCharts = ({ chartData = [] }) => {
  // 2. Default labels if API data isn't available yet
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Bookings",
        // 3. Use real data from API or fall back to zeros if loading
        data: chartData.length > 0 ? chartData : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#10b981",
        hoverBackgroundColor: "#059669",
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        displayColors: false,
        callbacks: {
          label: (context) => ` ${context.raw} Bookings`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8", font: { size: 12 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f1f5f9" },
        ticks: {
          color: "#94a3b8",
          font: { size: 12 },
          // Dynamically adjust step size based on data volume
          stepSize:
            chartData.length > 0 ? Math.ceil(Math.max(...chartData) / 5) : 10,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Weekly Performance
          </h2>
          <p className="text-xs text-slate-500">Live booking analytics</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded uppercase tracking-wider">
            Real-time
          </span>
        </div>
      </div>

      <div className="h-[250px] sm:h-[300px] w-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardCharts;
