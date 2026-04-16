import api from "../../../Shared/Services/api";

// ✅ Get admin profile
export const getAdminProfile = async () => {
  const res = await api.get("/admin/profile");
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to fetch profile");
};

// ✅ Update admin profile
export const updateAdminProfile = async (updates) => {
  const res = await api.put("/admin/profile", updates);
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to update profile");
};
