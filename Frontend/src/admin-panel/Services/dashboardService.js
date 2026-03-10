import api from "../../Shared/Services/api";

export const getDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
};

export const getRecentBookings = async () => {
  const response = await api.get("/admin/dashboard/recent-bookings");
  return response.data;
};

export const getSystemStatus = async () => {
  const response = await api.get("/admin/dashboard/system-status");
  return response.data;
};
