import { useState, useEffect, useCallback } from "react";
import { reportService } from "../services/reportService";

export const useReports = () => {
  const [revenueReport, setRevenueReport] = useState(null);
  const [occupancyReport, setOccupancyReport] = useState(null);
  const [bookingReport, setBookingReport] = useState(null);
  const [userReport, setUserReport] = useState(null);
  const [systemHealthReport, setSystemHealthReport] = useState(null);
  const [comprehensiveReport, setComprehensiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const nextFilters = {
        startDate: filters.startDate || "",
        endDate: filters.endDate || "",
        reportType: filters.reportType || "comprehensive",
      };

      // Clear previous payloads to avoid showing stale sections.
      setRevenueReport(null);
      setOccupancyReport(null);
      setBookingReport(null);
      setUserReport(null);
      setSystemHealthReport(null);
      setComprehensiveReport(null);

      switch (nextFilters.reportType) {
        case "revenue": {
          const revenue = await reportService.getRevenueReport(
            nextFilters.startDate,
            nextFilters.endDate,
          );
          setRevenueReport(revenue.data);
          break;
        }
        case "occupancy": {
          const occupancy = await reportService.getOccupancyReport();
          setOccupancyReport(occupancy.data);
          break;
        }
        case "bookings": {
          const bookings = await reportService.getBookingReport(
            nextFilters.startDate,
            nextFilters.endDate,
          );
          setBookingReport(bookings.data);
          break;
        }
        case "users": {
          const users = await reportService.getUserReport();
          setUserReport(users.data);
          break;
        }
        case "comprehensive":
        default: {
          const [comprehensive, health] = await Promise.all([
            reportService.getComprehensiveReport(),
            reportService.getSystemHealthReport(),
          ]);
          setComprehensiveReport(comprehensive.data);
          setSystemHealthReport(health.data);
          break;
        }
      }
    } catch (err) {
      setError(err.message || "Failed to fetch reports");
      console.error("Report fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports({ reportType: "comprehensive" });
  }, [fetchReports]);

  return {
    revenueReport,
    occupancyReport,
    bookingReport,
    userReport,
    systemHealthReport,
    comprehensiveReport,
    loading,
    error,
    refresh: fetchReports,
  };
};
