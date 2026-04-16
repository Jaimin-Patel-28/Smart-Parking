import api from "../../../Shared/Services/api";

export const auditTrailService = {
  getAuditTrails: (params = {}) =>
    api.get("/super-admin/audit-trail", { params }),
};
