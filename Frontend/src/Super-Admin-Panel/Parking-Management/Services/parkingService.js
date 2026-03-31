import api from "../../../Shared/Services/api";

export const parkingService = {
  getAll: () => api.get("/super-admin/parking"),
  getById: (id) => api.get(`/super-admin/parking/${id}`),
  create: (data) => api.post("/super-admin/parking/add", data),
  update: (id, data) => api.put(`/super-admin/parking/${id}`, data),
  delete: (id) => api.delete(`/super-admin/parking/${id}`),
};
