import api from "../../../Shared/Services/api";

export const reportService = {
  // Revenue Reports
  getRevenueReport: (startDate, endDate) =>
    api.get("/super-admin/reports/revenue", {
      params: { startDate, endDate },
    }),

  // Occupancy Reports
  getOccupancyReport: () => api.get("/super-admin/reports/occupancy"),

  // Booking Reports
  getBookingReport: (startDate, endDate, status) =>
    api.get("/super-admin/reports/bookings", {
      params: { startDate, endDate, status },
    }),

  // User Reports
  getUserReport: () => api.get("/super-admin/reports/users"),

  // System Health Report
  getSystemHealthReport: () => api.get("/super-admin/reports/health"),

  // Comprehensive Report
  getComprehensiveReport: () => api.get("/super-admin/reports/comprehensive"),
};
