import api from "../../../Shared/Services/api";

// ✅ Get admin settings
export const getAdminSettings = async () => {
  const res = await api.get("/admin/settings");
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to fetch settings");
};

// ✅ Update admin settings
export const updateAdminSettings = async (updates) => {
  const res = await api.put("/admin/settings", updates);
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to update settings");
};
