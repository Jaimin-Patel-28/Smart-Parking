import api from "../../../Shared/Services/api";

export const settingsService = {
  getSettings: () => api.get("/super-admin/settings"),

  updateGeneralSettings: (payload) =>
    api.put("/super-admin/settings/general", payload),

  updatePricingSettings: (payload) =>
    api.put("/super-admin/settings/pricing", payload),

  updateSecuritySettings: (payload) =>
    api.put("/super-admin/settings/security", payload),

  updateNotificationSettings: (payload) =>
    api.put("/super-admin/settings/notifications", payload),
};
