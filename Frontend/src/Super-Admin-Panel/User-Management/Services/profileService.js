import api from "../../../Shared/Services/api";

export const profileService = {
  getMyProfile: () => api.get("/super-admin/users/me"),
  updateMyProfile: (payload) => api.patch("/super-admin/users/me", payload),
};
