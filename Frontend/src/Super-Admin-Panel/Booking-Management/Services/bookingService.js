import api from "../../../Shared/Services/api";

export const bookingService = {
  // GET /api/admin/bookings?status=...
  getAll: (status) => api.get("/admin/bookings", { params: { status } }),

  // GET /api/admin/bookings/:id
  getById: (id) => api.get(`/admin/bookings/${id}`),

  // PATCH /api/admin/bookings/:id/status
  updateStatus: (id, status) =>
    api.patch(`/admin/bookings/${id}/status`, { status }),
};
