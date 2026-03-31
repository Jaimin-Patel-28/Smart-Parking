import api from "../../../Shared/Services/api";

export const getDashboardStats = async () => {
  const res = await api.get("/admin/dashboard/stats");
  return res.data;
};

export const getRecentBookings = async () => {
  const res = await api.get("/admin/dashboard/recent-bookings");
  return res.data;
};

export const getSystemStatus = async () => {
  const res = await api.get("/admin/dashboard/system-status");
  return res.data;
};
