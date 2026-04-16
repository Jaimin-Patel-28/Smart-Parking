import api from "../../../Shared/Services/api";

export const bookingService = {
  // GET /api/super-admin/bookings?status=...
  getAll: (status) =>
    api.get("/super-admin/bookings", { params: { status } }),

  // GET /api/super-admin/bookings/:id
  getById: (id) => api.get(`/super-admin/bookings/${id}`),

  // PATCH /api/super-admin/bookings/:id/status
  updateStatus: (id, status) =>
    api.patch(`/super-admin/bookings/${id}/status`, { status }),
};
