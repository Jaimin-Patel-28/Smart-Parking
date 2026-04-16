import api from "./api";

const supportService = {
  getTickets: (params = {}) => api.get("/support/tickets", { params }),
  getMyTickets: (params = {}) => api.get("/support/my-tickets", { params }),
  reopenMyTicket: (id) => api.patch(`/support/my-tickets/${id}/reopen`),
  getTicket: (id) => api.get(`/support/tickets/${id}`),
  updateTicketStatus: (id, payload) =>
    api.patch(`/support/tickets/${id}`, payload),
};

export default supportService;