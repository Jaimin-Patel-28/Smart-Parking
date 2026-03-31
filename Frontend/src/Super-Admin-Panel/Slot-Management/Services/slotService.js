import api from "../../../Shared/Services/api";

export const slotService = {
  // GET /api/admin/slots/:parkingId
  getSlotsByParking: (parkingId) => api.get(`/super-admin/slots/${parkingId}`),

  // PUT /api/admin/slots/:id/status
  updateStatus: (id, status) =>
    api.put(`/super-admin/slots/${id}/status`, { status }),

  // PUT /api/admin/slots/:id/assign
  assignVehicle: (id, vehicleNumber) =>
    api.put(`/super-admin/slots/${id}/assign`, { vehicleNumber }),

  // PUT /api/admin/slots/:id/release
  releaseSlot: (id) => api.put(`/super-admin/slots/${id}/release`),

  // DELETE /api/super-admin/slots/:id
  deleteSlot: (id) => api.delete(`/super-admin/slots/${id}`),
};

