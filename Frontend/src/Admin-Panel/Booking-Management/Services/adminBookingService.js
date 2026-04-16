import api from "../../../Shared/Services/api";

// ✅ Get bookings
export const getAdminBookings = async () => {
  const res = await api.get("/admin/bookings");
  if (Array.isArray(res.data)) {
    return res.data;
  } else if (res.data.success && Array.isArray(res.data.data)) {
    return res.data.data;
  } else {
    throw new Error(res.data.message || 'Failed to fetch bookings');
  }
};

// ✅ Get single booking detail
export const getAdminBookingById = async (id) => {
  const res = await api.get(`/admin/bookings/${id}`);
  if (res.data?.success && res.data?.data) {
    return res.data.data;
  }
  if (res.data && typeof res.data === "object") {
    return res.data;
  }
  throw new Error("Failed to fetch booking detail");
};

// ✅ Mark Entry
export const markEntry = async (id) => {
  const res = await api.put(`/admin/booking/${id}/entry`);
  if (res.data.success) {
    return res.data.data;
  } else if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
    return res.data;
  } else {
    throw new Error(res.data.message || 'Failed to mark entry');
  }
};

// ✅ Mark Exit
export const markExit = async (id) => {
  const res = await api.put(`/admin/booking/${id}/exit`);
  if (res.data.success) {
    return res.data.data;
  } else if (res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
    return res.data;
  } else {
    throw new Error(res.data.message || 'Failed to mark exit');
  }
};
