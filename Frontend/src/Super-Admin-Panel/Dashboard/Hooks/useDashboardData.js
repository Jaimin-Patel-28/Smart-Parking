import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getRecentBookings,
  getSystemStatus
} from "../services/dashboardService";

const useDashboardData = () => {
  const [stats, setStats] = useState({});
  const [bookings, setBookings] = useState([]);
  const [systemStatus, setSystemStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsData = await getDashboardStats();
        const bookingsData = await getRecentBookings();
        const systemData = await getSystemStatus();

        setStats(statsData);
        setBookings(bookingsData);
        setSystemStatus(systemData);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
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
    loading
  };
};

export default useDashboardData;