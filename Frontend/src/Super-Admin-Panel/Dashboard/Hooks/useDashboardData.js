import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getRecentBookings,
  getSystemStatus
} from "../Services/dashboardService";

const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setError("");
        const statsData = await getDashboardStats();
        const bookingsData = await getRecentBookings();
        const systemData = await getSystemStatus();

        setStats(statsData);
        setBookings(bookingsData);
        setSystemStatus(systemData);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError(error?.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    bookings,
    systemStatus,
    loading,
    error,
  };
};

export default useDashboardData;