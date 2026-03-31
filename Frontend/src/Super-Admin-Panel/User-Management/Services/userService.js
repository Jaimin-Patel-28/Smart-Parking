import api from "../../../Shared/Services/api";

const BASE = "/super-admin/users";

export const userService = {
  getUsers: (search = "") => api.get(`${BASE}?search=${search}`),

  getUserById: (id) => api.get(`${BASE}/${id}`),

  toggleStatus: (id) => api.patch(`${BASE}/${id}/status`),

  deleteUser: (id) => api.delete(`${BASE}/${id}`),

  updateUser: (id, userData) => api.put(`${BASE}/${id}`, userData),
};
