import api from "../../../Shared/Services/api";

const supportService = {
  sendMessage: (payload) => api.post("/contact", payload),
};

export default supportService;