import { useState, useEffect, useCallback } from "react";
import { reportService } from "../services/reportService";

export const useReports = () => {
  const [revenueReport, setRevenueReport] = useState(null);
  const [occupancyReport, setOccupancyReport] = useState(null);
  const [userReport, setUserReport] = useState(null);
  const [systemHealthReport, setSystemHealthReport] = useState(null);
  const [comprehensiveReport, setComprehensiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [revenue, occupancy, users, health, comprehensive] =
        await Promise.all([
          reportService.getRevenueReport(),
          reportService.getOccupancyReport(),
          reportService.getUserReport(),
          reportService.getSystemHealthReport(),
          reportService.getComprehensiveReport(),
        ]);

      setRevenueReport(revenue.data);
      setOccupancyReport(occupancy.data);
      setUserReport(users.data);
      setSystemHealthReport(health.data);
      setComprehensiveReport(comprehensive.data);
    } catch (err) {
      setError(err.message || "Failed to fetch reports");
      console.error("Report fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return {
    revenueReport,
    occupancyReport,
    userReport,
    systemHealthReport,
    comprehensiveReport,
    loading,
    error,
    refresh: fetchReports,
  };
};
