import api from "../../../Shared/Services/api";

// ✅ Get shift metrics
export const getShiftMetrics = async (timeRange = "today") => {
  const res = await api.get("/admin/shift-metrics", {
    params: { timeRange },
  });
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to fetch shift metrics");
};
