import api from "../../../Shared/Services/api";

export const verifyTicketCode = async (bookingCode, reason = "") => {
  const res = await api.get(`/admin/gate/verify/${encodeURIComponent(bookingCode)}`, {
    params: { reason },
  });
  return res.data;
};

export const markEntryByCode = async (bookingCode, reason = "") => {
  const res = await api.put(`/admin/gate/entry/${encodeURIComponent(bookingCode)}`, {
    reason,
  });
  return res.data;
};

export const markExitByCode = async (bookingCode, reason = "") => {
  const res = await api.put(`/admin/gate/exit/${encodeURIComponent(bookingCode)}`, {
    reason,
  });
  return res.data;
};

export const getGateLogs = async (params = {}) => {
  const res = await api.get("/admin/gate/logs", { params });
  return res.data;
};

export const getExceptions = async (params = {}) => {
  const res = await api.get("/admin/gate/exceptions", { params });
  return res.data;
};

export const applyOverride = async (payload) => {
  const res = await api.post("/admin/gate/override", payload);
  return res.data;
};

export const getOperationalAlerts = async () => {
  const res = await api.get("/admin/gate/alerts");
  return res.data;
};

export const getShiftNotes = async (params = {}) => {
  const res = await api.get("/admin/gate/shift-notes", { params });
  return res.data;
};

export const createShiftNote = async (payload) => {
  const res = await api.post("/admin/gate/shift-notes", payload);
  return res.data;
};
